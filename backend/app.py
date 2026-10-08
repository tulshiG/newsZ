"""
NewsZ Flask API - Render-ready version.

Environment variables (set these in the Render dashboard):
  MONGO_URI           MongoDB Atlas connection string (required for login/save/timeline storage)
  MONGO_DB            database name                      (default: newsdb)
  ALLOWED_ORIGINS     comma-separated frontend origins   (default: *)
  SCRAPE_TTL_SECONDS  min seconds between scrapes        (default: 900)
  SENTIMENT_BACKEND   "vader" (light, default) or "roberta" (needs torch + transformers, ~1 GB RAM)

Start command on Render:
  gunicorn app:app --workers 1 --threads 4 --timeout 120
"""
import io
import os
import threading
import time
from collections import Counter
from datetime import datetime, timedelta, timezone
from functools import lru_cache
from typing import Optional

from bson import ObjectId
from dateutil.parser import ParserError, parse
from deep_translator import GoogleTranslator
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.exceptions import HTTPException
from werkzeug.security import check_password_hash, generate_password_hash
from wordcloud import STOPWORDS as WC_STOPWORDS
from wordcloud import WordCloud

# Your scrapers (these folders must be committed inside backend/)
from newspapers.toi_news import CATEGORY_URLS, scrape_category
from scrapers.thehindu import scrape_thehindu_rss
from scrapers.toi import scrape_toi

# ---------------------------------------------------------------- Config
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")
MONGO_DB_NAME = os.environ.get("MONGO_DB", "newsdb")
SCRAPE_TTL_SECONDS = int(os.environ.get("SCRAPE_TTL_SECONDS", "900"))
SENTIMENT_BACKEND = os.environ.get("SENTIMENT_BACKEND", "vader").lower()
_origins = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "*").split(",") if o.strip()]
ALLOWED_ORIGINS = [
    "https://news-z-qnia.vercel.app"
]

IST = timezone(timedelta(hours=5, minutes=30))  # "today" means today in India

app = Flask(__name__)
# No cookies/sessions are used, so credentials are not needed (and "*" + credentials is invalid anyway).
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

# ---------------------------------------------------------------- MongoDB
mongo_connected = False
db = toi_collection = hindu_collection = combined_collection = None
users_collection = toi_np = saved_news_collection = None

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command("ping")  # force a real connection check
    db = client[MONGO_DB_NAME]
    toi_collection = db["toi_news"]
    hindu_collection = db["hindu_news"]
    combined_collection = db["combined_news"]
    users_collection = db["users"]
    toi_np = db["toi_newspaper"]
    saved_news_collection = db["saved_news"]
    mongo_connected = True
    print("MongoDB connected successfully")
    try:
        combined_collection.create_index("link")
        combined_collection.create_index("published_at")
    except Exception as idx_err:  # indexes are an optimisation, never fatal
        print(f"Index creation skipped: {idx_err}")
except Exception as e:  # ServerSelectionTimeout, ConfigurationError, bad URI, ...
    print(f"MongoDB not available ({e}). Running in fallback mode (no login/save, in-memory timeline).")


def db_unavailable():
    return jsonify({"message": "Database not available"}), 503


# ---------------------------------------------------------------- Errors -> always JSON
@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return jsonify({"message": e.description}), e.code
    app.logger.exception(e)
    return jsonify({"message": "Internal server error"}), 500


# ---------------------------------------------------------------- Sentiment
_vader = None
_roberta = None


def _get_vader():
    global _vader
    if _vader is None:
        from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

        _vader = SentimentIntensityAnalyzer()
    return _vader


def _vader_label(text: str) -> str:
    score = _get_vader().polarity_scores(text or "")["compound"]
    if score >= 0.05:
        return "positive"
    if score <= -0.05:
        return "negative"
    return "neutral"


def _get_roberta():
    global _roberta
    if _roberta is None:
        from transformers import pipeline  # imported lazily so Render never needs torch by default

        _roberta = pipeline(
            "sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest"
        )
    return _roberta


def analyze_sentiment(headlines):
    if not headlines:
        return headlines
    titles = [item.get("title", "") or "" for item in headlines]
    labels = None
    if SENTIMENT_BACKEND == "roberta":
        try:
            results = _get_roberta()(titles, truncation=True, max_length=512)
            labels = []
            for r in results:
                lab = r["label"].lower()
                labels.append("positive" if "positive" in lab else "negative" if "negative" in lab else "neutral")
        except Exception as e:
            print(f"RoBERTa unavailable, falling back to VADER: {e}")
    if labels is None:
        labels = [_vader_label(t) for t in titles]
    for item, label in zip(headlines, labels):
        item["sentiment"] = label
    return headlines


# ---------------------------------------------------------------- Helpers
def serialize_doc(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc


def normalize_published(value) -> str:
    """Return an ISO-8601 UTC string. Needed because timeframe filters compare strings."""
    now = datetime.now(timezone.utc)
    if not value or str(value).strip().lower() == "unknown":
        return now.isoformat()
    try:
        dt = value if isinstance(value, datetime) else parse(str(value))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).isoformat()
    except (ParserError, TypeError, ValueError, OverflowError):
        return now.isoformat()


def normalize_items(items):
    for item in items:
        item["published_at"] = normalize_published(item.get("published_at"))
    return items


def insert_if_new(collection, items) -> int:
    """Bulk insert items whose `link` is not in the collection yet. Returns number inserted."""
    links = [d.get("link") for d in items if d.get("link")]
    if not links:
        return 0
    existing = {d["link"] for d in collection.find({"link": {"$in": links}}, {"link": 1, "_id": 0})}
    seen, fresh = set(), []
    for d in items:
        link = d.get("link")
        if not link or link in existing or link in seen:
            continue
        seen.add(link)
        fresh.append(d)
    if fresh:
        collection.insert_many(fresh)
    return len(fresh)


def timeframe_start_iso(timeframe: Optional[str]) -> Optional[str]:
    now = datetime.now(IST)
    if timeframe == "today":
        start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    elif timeframe == "this week":
        start = (now - timedelta(days=now.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
    elif timeframe == "this month":
        start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    else:
        return None
    return start.astimezone(timezone.utc).isoformat()


def get_news_from_db(category: Optional[str] = None, limit: int = 50) -> list:
    q = {"category": category.lower()} if category else {}
    cursor = toi_np.find(q).sort("published_at", -1).limit(limit)
    return [serialize_doc(d) for d in cursor]


# ---------------------------------------------------------------- Scrape cache
# Scraping + sentiment is slow, so it runs at most once per SCRAPE_TTL_SECONDS,
# not on every page load. With 1 gunicorn worker the lock/cache are shared by all requests.
_scrape_lock = threading.Lock()
_last_scrape_ts = 0.0
_memory_cache: list = []


def refresh_combined_headlines(force: bool = False):
    global _last_scrape_ts, _memory_cache
    with _scrape_lock:
        if not force and (time.time() - _last_scrape_ts) < SCRAPE_TTL_SECONDS:
            return
        items = []
        for fn in (scrape_toi, scrape_thehindu_rss):
            try:
                items.extend(fn(limit=50) or [])
            except Exception as e:
                print(f"Scraper {fn.__name__} failed: {e}")
        if not items:
            return  # leave timestamp alone so the next request retries
        normalize_items(items)
        if mongo_connected:
            try:
                links = [i.get("link") for i in items if i.get("link")]
                existing = {
                    d["link"]
                    for d in combined_collection.find({"link": {"$in": links}}, {"link": 1, "_id": 0})
                }
                new_items = [i for i in items if i.get("link") and i["link"] not in existing]
                analyze_sentiment(new_items)  # only score headlines we haven't stored yet
                inserted = insert_if_new(combined_collection, new_items)
                print(f"Inserted {inserted} new headlines into MongoDB.")
            except Exception as e:
                print(f"Mongo write failed, using memory cache: {e}")
                _memory_cache = analyze_sentiment(items)
        else:
            _memory_cache = analyze_sentiment(items)
        _last_scrape_ts = time.time()


def _safe_refresh():
    try:
        refresh_combined_headlines()
    except Exception as e:
        print(f"refresh failed: {e}")


def _filter_memory(items, timeframe=None, sentiment=None, source=None):
    start = timeframe_start_iso(timeframe)
    out = []
    for i in items:
        if start and i.get("published_at", "") < start:
            continue
        if sentiment and sentiment != "all sentiments" and i.get("sentiment") != sentiment:
            continue
        if source and source.lower() != "all sources" and i.get("source") != source:
            continue
        out.append(i)
    out.sort(key=lambda x: x.get("published_at", ""), reverse=True)
    return out


# ---------------------------------------------------------------- Health
@app.route("/")
def index():
    return jsonify(
        {
            "status": "success",
            "message": "NewsZ Flask API is running",
            "database": "connected" if mongo_connected else "unavailable",
            "endpoints": {
                "news": "/news",
                "newspapers": "/newspapers",
                "sentiment": "/sentiment-graph",
                "timeline": "/scrape-timeline",
                "wordcloud": "/wordcloud",
            },
        }
    )


@app.route("/health")
def health():
    return jsonify({"status": "ok", "database": mongo_connected})


# ---------------------------------------------------------------- Auth
@app.route("/signup", methods=["POST"])
def signup():
    if not mongo_connected:
        return db_unavailable()
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""
    if not name or not email or not password:
        return jsonify({"message": "Name, email and password are required"}), 400
    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered!"}), 400
    users_collection.insert_one(
        {"name": name, "email": email, "password": generate_password_hash(password)}
    )
    return jsonify({"message": "Signup successful! Please login."})


@app.route("/login", methods=["POST"])
def login():
    if not mongo_connected:
        return db_unavailable()
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found!"}), 404
    if check_password_hash(user["password"], password):
        return jsonify(
            {
                "message": f"Welcome back, {user['name']}!",
                "user": {"email": user["email"], "name": user["name"]},
            }
        )
    return jsonify({"message": "Invalid password!"}), 401


# ---------------------------------------------------------------- Scrape / timeline
@app.route("/scrape-toi")
def scrape_toi_route():
    data = scrape_toi()
    if not data:
        return jsonify({"status": "error", "message": "No headlines scraped"}), 500
    normalize_items(data)
    analyze_sentiment(data)
    if mongo_connected:
        try:
            insert_if_new(toi_collection, data)
        except Exception as e:
            print("Error inserting TOI headlines:", e)
    return jsonify({"status": "success", "inserted": len(data), "headlines": [serialize_doc(d) for d in data]})


@app.route("/scrape-thehindu")
def scrape_thehindu_route():
    data = scrape_thehindu_rss()
    if not data:
        return jsonify({"status": "error", "message": "No headlines scraped"}), 500
    normalize_items(data)
    analyze_sentiment(data)
    if mongo_connected:
        try:
            insert_if_new(hindu_collection, data)
        except Exception as e:
            print("Error inserting Hindu headlines:", e)
    return jsonify({"status": "success", "inserted": len(data), "headlines": [serialize_doc(d) for d in data]})


@app.route("/scrape-timeline")
def scrape_timeline():
    _safe_refresh()
    timeframe = request.args.get("timeframe")
    sentiment = (request.args.get("sentiment") or "").lower()
    source = request.args.get("source") or ""

    if mongo_connected:
        q = {}
        if sentiment and sentiment != "all sentiments":
            q["sentiment"] = sentiment
        start = timeframe_start_iso(timeframe)
        if start:
            q["published_at"] = {"$gte": start}
        if source and source.lower() != "all sources":
            q["source"] = source
        docs = combined_collection.find(q).sort("published_at", -1).limit(200)
        return jsonify([serialize_doc(d) for d in docs])

    items = _filter_memory(_memory_cache, timeframe, sentiment, source)
    return jsonify([serialize_doc(dict(i)) for i in items[:200]])


@app.route("/scrape-toi-news", methods=["GET", "POST"])
def api_scrape_news():
    if not mongo_connected:
        return db_unavailable()
    totals = {"inserted": 0, "scraped": 0}
    details = {}
    for category in CATEGORY_URLS.keys():
        try:
            items = scrape_category(category)
            inserted = insert_if_new(toi_np, items)
            totals["scraped"] += len(items)
            totals["inserted"] += inserted
            details[category] = {"scraped": len(items), "inserted": inserted}
        except Exception as e:
            details[category] = {"error": str(e)}
    return jsonify({"status": "ok", "totals": totals, "details": details})


# ---------------------------------------------------------------- News / newspapers
@app.route("/news", methods=["GET"])
def api_get_news():
    if not mongo_connected:
        return jsonify({"count": 0, "data": [], "message": "Database not available"}), 503
    all_news = []
    for cat in ["politics", "sports", "business", "entertainment", "technology", "world"]:
        for item in get_news_from_db(cat, 10):
            item["category"] = cat
            all_news.append(item)
    return jsonify({"count": len(all_news), "data": all_news})


NEWSPAPERS = [
    {"id": "divya_bhaskar", "name": "Divya Bhaskar", "description": "Leading Gujarati newspaper",
     "languages": ["GU", "HI"], "categories": ["Gujarat", "National", "Business", "Sports", "+2"],
     "logo_url": "http://example.com/divya_bhaskar.png"},
    {"id": "indian_express", "name": "Indian Express", "description": "Daily English-language newspaper",
     "languages": ["EN"], "categories": ["National", "International", "Business", "Sports", "+2"],
     "logo_url": "http://example.com/indian_express.png"},
    {"id": "sandesh", "name": "Sandesh", "description": "Gujarat's premier Gujarati daily",
     "languages": ["GU"], "categories": ["Gujarat", "National", "Business", "Sports", "+1"],
     "logo_url": "http://example.com/sandesh.png"},
    {"id": "the_hindu", "name": "The Hindu", "description": "South India's national newspaper",
     "languages": ["EN"], "categories": ["National", "International", "Business", "Sports"],
     "logo_url": "http://example.com/the_hindu.png"},
    {"id": "the_pioneer", "name": "The Pioneer", "description": "English language daily newspaper",
     "languages": ["EN"], "categories": ["National", "International", "Business"],
     "logo_url": "http://example.com/the_pioneer.png"},
    {"id": "times_of_india", "name": "Times of India", "description": "India's largest English daily newspaper",
     "languages": ["EN", "HI"], "categories": ["National", "International", "Business", "Sports", "+2"],
     "logo_url": "http://example.com/toi.png"},
]


@app.route("/newspapers", methods=["GET"])
def get_newspapers():
    language = request.args.get("language")
    category = request.args.get("category")
    result = []
    for paper in NEWSPAPERS:
        if language and language.upper() not in paper["languages"]:
            continue
        if category and category.lower() not in [c.lower() for c in paper["categories"]]:
            continue
        result.append(paper)
    return jsonify(result)


@app.route("/newspapers/data", methods=["GET"])
def get_all_newspaper_data():
    if not mongo_connected:
        return db_unavailable()
    newspaper_id = request.args.get("newspaperId")
    category = request.args.get("category")
    try:
        limit = max(1, min(int(request.args.get("limit", 20)), 100))
    except ValueError:
        limit = 20

    sources = {"times_of_india": toi_np, "the_hindu": hindu_collection}
    if newspaper_id not in sources:
        return jsonify({"error": "Newspaper not supported"}), 404

    query = {}
    if category and category.lower() != "all":
        query["category"] = category.lower()
    try:
        headlines = sources[newspaper_id].find(query).sort("published_at", -1).limit(limit)
        return jsonify({"status": "ok", "data": [serialize_doc(h) for h in headlines]})
    except Exception as e:
        print(f"Error fetching newspaper data: {e}")
        return jsonify({"error": "Failed to fetch data"}), 500


@app.route("/newspapers/<string:newspaper_id>/headlines", methods=["GET"])
def get_newspaper_headlines(newspaper_id):
    if not mongo_connected:
        return jsonify({"error": "MongoDB not connected"}), 503
    category = request.args.get("category", "all").lower()
    try:
        if newspaper_id == "times_of_india":
            headlines = list(toi_collection.find().limit(20)) if category == "all" else list(
                toi_np.find({"category": category}).limit(20))
        elif newspaper_id == "the_hindu":
            query = {} if category == "all" else {"category": category}
            headlines = list(hindu_collection.find(query).limit(20))
        else:
            return jsonify({"error": "Newspaper not supported for headlines"}), 404
        return jsonify([serialize_doc(h) for h in headlines])
    except Exception as e:
        print(f"Error fetching headlines: {e}")
        return jsonify({"error": "Failed to fetch headlines"}), 500


# ---------------------------------------------------------------- Word cloud / sentiment graph
custom_stopwords = {"said", "will", "new", "today", "also", "more", "breaking", "as", "after", "of", "the",
                    "says", "with", "on", "to", "in", "at", "S", "s"}
all_stopwords = WC_STOPWORDS.union(custom_stopwords)


@app.route("/wordcloud")
def generate_wordcloud():
    sentiment = (request.args.get("sentiment") or "").lower()
    if mongo_connected:
        _safe_refresh()
        q = {}
        if sentiment and sentiment != "all sentiments":
            q["sentiment"] = sentiment
        cursor = combined_collection.find(q, {"title": 1, "_id": 0}).sort("published_at", -1).limit(500)
        headlines = [h["title"] for h in cursor if h.get("title")]
    else:
        _safe_refresh()
        items = _filter_memory(_memory_cache, sentiment=sentiment)
        headlines = [i["title"] for i in items if i.get("title")]

    if not headlines:
        return jsonify({"error": "No headlines found for the selected filter"}), 404

    wc = WordCloud(width=800, height=400, background_color="white", stopwords=all_stopwords).generate(
        " ".join(headlines)
    )
    img_io = io.BytesIO()
    wc.to_image().save(img_io, format="PNG")  # no pyplot -> thread-safe, less memory
    img_io.seek(0)
    return send_file(img_io, mimetype="image/png", max_age=300)


@app.route("/sentiment-graph")
def sentiment_graph():
    _safe_refresh()
    timeframe = request.args.get("timeframe")
    source = request.args.get("source") or ""
    keys = ("positive", "neutral", "negative")

    if mongo_connected:
        q = {}
        start = timeframe_start_iso(timeframe)
        if start:
            q["published_at"] = {"$gte": start}
        if source and source.lower() != "all sources":
            q["source"] = source
        rows = combined_collection.aggregate(
            [{"$match": q}, {"$group": {"_id": "$sentiment", "count": {"$sum": 1}}}]
        )
        counts = {r["_id"]: r["count"] for r in rows}
    else:
        items = _filter_memory(_memory_cache, timeframe, None, source)
        counts = Counter(i.get("sentiment") for i in items)

    total = sum(counts.get(k, 0) for k in keys)
    if total == 0:
        return jsonify({k: 0 for k in keys})
    return jsonify({k: round(counts.get(k, 0) / total * 100, 1) for k in keys})


# ---------------------------------------------------------------- Translate
@lru_cache(maxsize=2048)
def _translate_cached(text: str, lang: str) -> str:
    return GoogleTranslator(source="auto", target=lang).translate(text)


@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()[:4900]  # Google limit is 5000 chars
    lang = data.get("lang") or "hi"
    if not text or lang == "en":
        return jsonify({"translated": text})
    try:
        return jsonify({"translated": _translate_cached(text, lang)})
    except Exception as e:
        print(f"Translation error: {e}")
        return jsonify({"error": str(e), "translated": text}), 500


# ---------------------------------------------------------------- Frequent words
@app.route("/frequent-words")
def frequent_words():
    if not mongo_connected:
        return db_unavailable()
    try:
        docs = combined_collection.find({}, {"title": 1, "_id": 0}).sort("published_at", -1).limit(200)
        stop = {w.lower() for w in all_stopwords}
        words = []
        for h in docs:
            for w in (h.get("title") or "").lower().split():
                w = w.strip(".,!?;:()[]\"'")
                if len(w) > 2 and w not in stop:
                    words.append(w)
        return jsonify([{"word": w, "count": c} for w, c in Counter(words).most_common(15)])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------------- Saved headlines
@app.route("/save_headline", methods=["POST"])
def save_headline():
    if not mongo_connected:
        return db_unavailable()
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    headline_id = data.get("headline_id")
    if not email or not headline_id:
        return jsonify({"message": "Missing data"}), 400
    if not users_collection.find_one({"email": email}):
        return jsonify({"message": "User not found"}), 404

    headline = {
        k: data.get(k)
        for k in ("headline_id", "title", "source", "sentiment", "link", "summary", "published_at")
    }
    result = users_collection.update_one(
        {"email": email, "saved_headlines.headline_id": {"$ne": headline_id}},
        {"$push": {"saved_headlines": headline}},
    )
    if result.matched_count == 0:
        return jsonify({"message": "Headline already saved"}), 200
    return jsonify({"message": "Headline saved successfully"}), 200


@app.route("/saved-headlines", methods=["POST"])
def get_saved_headlines():
    if not mongo_connected:
        return db_unavailable()
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    if not email:
        return jsonify({"message": "Email required"}), 400
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.get("saved_headlines", [])), 200


@app.route("/delete_headline", methods=["POST"])
def delete_headline():
    if not mongo_connected:
        return db_unavailable()
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    headline_id = data.get("headline_id")
    if not email or not headline_id:
        return jsonify({"message": "Missing email or headline ID"}), 400
    if not users_collection.find_one({"email": email}):
        return jsonify({"message": "User not found"}), 404
    users_collection.update_one({"email": email}, {"$pull": {"saved_headlines": {"headline_id": headline_id}}})
    return jsonify({"message": "Headline deleted successfully"}), 200


if __name__ == "__main__":
    # Local development only. On Render the start command is gunicorn (see top of file).
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False, threaded=True)
