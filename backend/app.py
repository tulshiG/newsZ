from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from bson import ObjectId
from wordcloud import WordCloud, STOPWORDS as WC_STOPWORDS
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from dateutil.parser import parse, ParserError
from datetime import datetime, timezone, timedelta
import numpy as np
from collections import Counter
from werkzeug.security import generate_password_hash, check_password_hash
from deep_translator import GoogleTranslator
# Import your scrapers
from scrapers.toi import scrape_toi
from scrapers.thehindu import scrape_thehindu_rss
from newspapers.toi_news import scrape_category, CATEGORY_URLS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5174"}})


# ---------------- MongoDB Setup ----------------
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    client.server_info()  # Force connection check
    db = client["newsdb"]
    
    toi_collection = db["toi_news"]
    hindu_collection = db["hindu_news"]
    combined_collection = db["combined_news"]
    users_collection = db["users"]
    toi_np = db["toi_newspaper"]
    # New collection for saved news
    saved_news_collection = db["saved_news"]
    
    mongo_connected = True
    print("✅ MongoDB connected successfully")
except ServerSelectionTimeoutError:
    mongo_connected = False
    print("⚠️ MongoDB not available. Running in fallback mode.")

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered!"}), 400

    hashed_pw = generate_password_hash(password)
    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "Signup successful! Please login."})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found!"}), 404

    if check_password_hash(user["password"], password):
        # Return user details on successful login to be stored in the frontend
        return jsonify({"message": f"Welcome back, {user['name']}!", "user": {"email": user["email"], "name": user["name"]}})
    else:
        return jsonify({"message": "Invalid password!"}), 401
# ---------------- NLP Pipelines ----------------
try:
    translator = pipeline("translation_en_to_hi", model="Helsinki-NLP/opus-mt-en-hi")
    sentiment_model_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"
    tokenizer = AutoTokenizer.from_pretrained(sentiment_model_name)
    model = AutoModelForSequenceClassification.from_pretrained(sentiment_model_name)
    sentiment_analyzer = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    print(f"✅ Sentiment model loaded: {sentiment_model_name}")
except Exception as e:
    print(f"⚠️ Failed to load NLP models: {e}. Some features will be unavailable.")
    translator = None
    sentiment_analyzer = None

# ---------------- Helpers ----------------
def serialize_doc(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc

def get_common_headlines(limit=50):
    combined = []
    if mongo_connected:
        try:
            toi_news = list(toi_collection.find({}, {"_id": 0, "title": 1, "link": 1, "published_at": 1, "source": 1, "sentiment": 1}).limit(limit))
            hindu_news = list(hindu_collection.find({}, {"_id": 0, "title": 1, "link": 1, "published_at": 1, "source": 1, "sentiment": 1}).limit(limit))
            combined = toi_news + hindu_news
        except Exception as e:
            print("Error fetching from MongoDB:", e)
            toi_news = scrape_toi(limit)
            hindu_news = scrape_thehindu_rss(limit)
            combined = toi_news + hindu_news
    else:
        toi_news = scrape_toi(limit)
        hindu_news = scrape_thehindu_rss(limit)
        combined = toi_news + hindu_news

    for item in combined:
        published = item.get("published_at")
        if not published or published.lower() == "unknown":
            item["published_at"] = datetime.now(timezone.utc).isoformat()
        else:
            try:
                dt = parse(published)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                item["published_at"] = dt.isoformat()
            except (ParserError, TypeError):
                item["published_at"] = datetime.now(timezone.utc).isoformat()

    combined.sort(key=lambda x: parse(x["published_at"]), reverse=True)
    return combined[:limit]

def analyze_sentiment(headlines):
    if not sentiment_analyzer:
        print("⚠️ Sentiment analyzer not loaded. Skipping analysis.")
        for item in headlines:
            item["sentiment"] = "neutral"
        return headlines

    titles = [item.get("title", "") for item in headlines]
    results = sentiment_analyzer(titles, truncation=True)

    for i, item in enumerate(headlines):
        if i < len(results):
            result = results[i]
            label = result["label"].lower()
            if "positive" in label:
                sentiment = "positive"
            elif "negative" in label:
                sentiment = "negative"
            elif "neutral" in label:
                sentiment = "neutral"
            else:
                sentiment = "neutral"
            item["sentiment"] = sentiment
        else:
            item["sentiment"] = "neutral"
    return headlines

def insert_if_new(collection, data):
    inserted_count = 0
    for doc in data:
        if not collection.find_one({"link": doc["link"]}):
            collection.insert_one(doc)
            inserted_count += 1
    return inserted_count

def get_news_from_db(category: str | None = None, limit: int = 50) -> list[dict]:
    q = {}
    if category:
        q["category"] = category.lower()

    cursor = toi_np.find(q).sort("published_at", -1).limit(limit)
    data = []
    for d in cursor:
        d["_id"] = str(d["_id"])
        data.append(d)
    return data

# ---------------- Routes ----------------
@app.route("/scrape-toi")
def scrape_toi_route():
    data = scrape_toi()
    if not data:
        return jsonify({"status": "error", "message": "No headlines scraped"}), 500
    
    data = analyze_sentiment(data)

    if mongo_connected:
        try:
            result = toi_collection.insert_many(data)
            for doc, oid in zip(data, result.inserted_ids):
                doc["_id"] = str(oid)
            print(f"Inserted {len(result.inserted_ids)} TOI headlines into MongoDB")
        except Exception as e:
            print("Error inserting TOI headlines into MongoDB:", e)
    return jsonify({"status": "success", "inserted": len(data), "headlines": data})

@app.route("/scrape-thehindu")
def scrape_thehindu_route():
    data = scrape_thehindu_rss()
    if not data:
        return jsonify({"status": "error", "message": "No headlines scraped"}), 500
    
    data = analyze_sentiment(data)

    if mongo_connected:
        try:
            result = hindu_collection.insert_many(data)
            for doc, oid in zip(data, result.inserted_ids):
                doc["_id"] = str(oid)
            print(f"Inserted {len(result.inserted_ids)} Hindu headlines into MongoDB")
        except Exception as e:
            print("Error inserting Hindu headlines into MongoDB:", e)
    return jsonify({"status": "success", "inserted": len(data), "headlines": data})

@app.route("/scrape-timeline")
def scrape_timeline():
    toi_news = scrape_toi(limit=50)
    hindu_news = scrape_thehindu_rss(limit=50)
    combined = toi_news + hindu_news
    
    combined = analyze_sentiment(combined)
    
    if mongo_connected:
        try:
            inserted_count = insert_if_new(combined_collection, combined)
            print(f"Inserted {inserted_count} new combined headlines into MongoDB.")
            
            filter_query = {}
            sentiment = request.args.get("sentiment")
            if sentiment and sentiment.lower() != "all sentiments":
                filter_query["sentiment"] = sentiment.lower()
            
            timeframe = request.args.get("timeframe")
            now = datetime.now(timezone.utc)
            if timeframe == "today":
                start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
                filter_query["published_at"] = {"$gte": start_of_day.isoformat()}
            elif timeframe == "this week":
                start_of_week = now - timedelta(days=now.weekday())
                start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)
                filter_query["published_at"] = {"$gte": start_of_week.isoformat()}
            elif timeframe == "this month":
                start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                filter_query["published_at"] = {"$gte": start_of_month.isoformat()}
            
            source = request.args.get("source")
            if source and source.lower() != "all sources":
                filter_query["source"] = source
            
            headlines_from_db = list(combined_collection.find(filter_query).sort("published_at", -1))
            serialized_combined = [serialize_doc(doc) for doc in headlines_from_db]
            print(f"Returning {len(serialized_combined)} headlines with applied filters.")
            return jsonify(serialized_combined)
        except Exception as e:
            print(f"Error handling combined headlines in MongoDB: {e}")
            return jsonify([serialize_doc(doc) for doc in combined])
    else:
        return jsonify([serialize_doc(doc) for doc in combined])

@app.route("/scrape-toi-news", methods=["GET", "POST"])
def api_scrape_news():
    all_items = []
    totals = {"inserted": 0, "scraped": 0}
    details = {}
    for category in CATEGORY_URLS.keys():
        try:
            items = scrape_category(category)
            inserted_count = insert_if_new(toi_np, items)
            all_items.extend(items)
            totals["scraped"] += len(items)
            totals["inserted"] += inserted_count
            details[category] = {"scraped": len(items), "inserted": inserted_count}
        except Exception as e:
            details[category] = {"error": str(e)}
    return jsonify({"status": "ok", "totals": totals, "details": details})

@app.route("/news", methods=["GET"])
def api_get_news():
    limit = 10
    all_news = []
    categories = ["politics", "sports", "business", "entertainment", "technology", "world"]
    for cat in categories:
        news_items = get_news_from_db(cat, limit)
        for item in news_items:
            item["category"] = cat
        all_news.extend(news_items)
    return jsonify({
        "count": len(all_news),
        "data": all_news
    })
    
# This is the corrected version of your original route
@app.route("/newspapers", methods=["GET"])
def get_newspapers():
    """
    Fetches and returns newspaper data with filtering options.
    """
    # This route should only return the static list of newspapers to display on the page.
    # The actual headlines for a selected newspaper will be fetched by a separate route.
    all_newspapers_data = [
        {
            "id": "divya_bhaskar",
            "name": "Divya Bhaskar",
            "description": "Leading Gujarati newspaper",
            "languages": ["GU", "HI"],
            "categories": ["Gujarat", "National", "Business", "Sports", "+2"],
            "logo_url": "http://example.com/divya_bhaskar.png"
        },
        {
            "id": "indian_express",
            "name": "Indian Express",
            "description": "Daily English-language newspaper",
            "languages": ["EN"],
            "categories": ["National", "International", "Business", "Sports", "+2"],
            "logo_url": "http://example.com/indian_express.png"
        },
        {
            "id": "sandesh",
            "name": "Sandesh",
            "description": "Gujarat's premier Gujarati daily",
            "languages": ["GU"],
            "categories": ["Gujarat", "National", "Business", "Sports", "+1"],
            "logo_url": "http://example.com/sandesh.png"
        },
        {
            "id": "the_hindu",
            "name": "The Hindu",
            "description": "South India's national newspaper",
            "languages": ["EN"],
            "categories": ["National", "International", "Business", "Sports"],
            "logo_url": "http://example.com/the_hindu.png"
        },
        {
            "id": "the_pioneer",
            "name": "The Pioneer",
            "description": "English language daily newspaper",
            "languages": ["EN"],
            "categories": ["National", "International", "Business"],
            "logo_url": "http://example.com/the_pioneer.png"
        },
        {
            "id": "times_of_india",
            "name": "Times of India",
            "description": "India's largest English daily newspaper",
            "languages": ["EN", "HI"],
            "categories": ["National", "International", "Business", "Sports", "+2"],
            "logo_url": "http://example.com/toi.png"
        },
    ]

    # The filter logic for this route is correct as it stands
    filtered_newspapers = []
    language = request.args.get("language")
    category = request.args.get("category")
    for np in all_newspapers_data:
        is_match = True
        if language and language.upper() not in np["languages"]:
            is_match = False
        if category and category.lower() not in [c.lower() for c in np["categories"]]:
            is_match = False
        if is_match:
            filtered_newspapers.append(np)
    return jsonify(filtered_newspapers)


# This is the correct route to fetch filtered headlines for a SPECIFIC newspaper.
@app.route("/newspapers/data", methods=["GET"])
def get_all_newspaper_data():
    newspaper_id = request.args.get("newspaperId")
    category = request.args.get("category")
    limit = int(request.args.get("limit", 20))
    
    newspaper_data_sources = {
        "times_of_india": toi_np,
        "the_hindu": hindu_collection,
    }
    
    if newspaper_id not in newspaper_data_sources:
        return jsonify({"error": "Newspaper not supported"}), 404

    collection = newspaper_data_sources[newspaper_id]
    
    query = {}
    if category and category.lower() != "all":
        query["category"] = category.lower()
    
    try:
        headlines = list(collection.find(query).sort("published_at", -1).limit(limit))
        serialized_headlines = [serialize_doc(h) for h in headlines]
        return jsonify({"status": "ok", "data": serialized_headlines})
    except Exception as e:
        print(f"Error fetching newspaper data: {e}")
        return jsonify({"error": "Failed to fetch data"}), 500

# The old route is removed as it is now replaced by the new /newspapers/data route
@app.route("/newspapers/<string:newspaper_id>/headlines", methods=["GET"])
def get_newspaper_headlines(newspaper_id):
    if not mongo_connected:
        return jsonify({"error": "MongoDB not connected"}), 503

    category = request.args.get("category", "all")
    try:
        if newspaper_id == "times_of_india":
            if category.lower() == "all":
                headlines = list(toi_collection.find().limit(20))
            else:
                headlines = list(toi_np.find({"category": category.lower()}).limit(20))
        elif newspaper_id == "the_hindu":
            if category.lower() == "all":
                headlines = list(hindu_collection.find().limit(20))
            else:
                headlines = list(hindu_collection.find({"category": category.lower()}).limit(20))
        else:
            return jsonify({"error": "Newspaper not supported for headlines"}), 404
        
        serialized_headlines = [serialize_doc(h) for h in headlines]
        return jsonify(serialized_headlines)
    except Exception as e:
        print(f"Error fetching headlines: {e}")
        return jsonify({"error": "Failed to fetch headlines"}), 500
        
# ---------------- Word Cloud & Sentiment Analysis Routes ----------------
custom_stopwords = {"said", "will", "new", "today", "also", "more", "breaking","as","after","of","the","says","with","on","to","in","at","S","s"}
all_stopwords = WC_STOPWORDS.union(custom_stopwords)

@app.route("/wordcloud")
def generate_wordcloud():
    filter_query = {}
    sentiment = request.args.get("sentiment")
    if sentiment and sentiment.lower() != "all sentiments":
        filter_query["sentiment"] = sentiment.lower()

    headlines_cursor = combined_collection.find(filter_query, {"title": 1, "_id": 0})
    headlines = [h["title"] for h in headlines_cursor if "title" in h]

    if not headlines:
        return jsonify({"error": "No headlines found for the selected filter"}), 404

    text = " ".join(headlines)

    wc = WordCloud(
        width=800,
        height=400,
        background_color="white",
        stopwords=all_stopwords
    ).generate(text)

    img_io = io.BytesIO()
    plt.figure(figsize=(10, 5))
    plt.imshow(wc, interpolation="bilinear")
    plt.axis("off")
    plt.savefig(img_io, format="PNG")
    plt.close()
    img_io.seek(0)
    return send_file(img_io, mimetype="image/png")

@app.route("/sentiment-graph")
def sentiment_graph():
    if not mongo_connected:
        return jsonify({"error": "MongoDB not connected"}), 503

    try:
        filter_query = {}
        timeframe = request.args.get("timeframe")
        now = datetime.now(timezone.utc)
        if timeframe == "today":
            start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
            filter_query["published_at"] = {"$gte": start_of_day.isoformat()}
        elif timeframe == "this week":
            start_of_week = now - timedelta(days=now.weekday())
            start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)
            filter_query["published_at"] = {"$gte": start_of_week.isoformat()}
        elif timeframe == "this month":
            start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            filter_query["published_at"] = {"$gte": start_of_month.isoformat()}
        
        sentiment_counts_cursor = combined_collection.aggregate([
            {"$match": filter_query},
            {"$group": {"_id": "$sentiment", "count": {"$sum": 1}}}
        ])

        counts = {doc["_id"]: doc["count"] for doc in sentiment_counts_cursor}
        total_count = sum(counts.values())
        if total_count == 0:
            return jsonify({"positive": 0, "neutral": 0, "negative": 0})
        
        positive_percent = (counts.get("positive", 0) / total_count) * 100
        neutral_percent = (counts.get("neutral", 0) / total_count) * 100
        negative_percent = (counts.get("negative", 0) / total_count) * 100
        
        return jsonify({
            "positive": round(positive_percent, 1),
            "neutral": round(neutral_percent, 1),
            "negative": round(negative_percent, 1)
        })
    except Exception as e:
        print(f"Error in sentiment graph route: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.json
    text = data.get("text", "")
    target_lang = data.get("lang", "hi")
    try:
        translated = GoogleTranslator(source="auto", target=target_lang).translate(text)
        return jsonify({"translated": translated})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- Fake News Model ----------------
try:
    fake_news_model_name = "mrm8488/bert-tiny-finetuned-fake-news-detection"
    fake_news_tokenizer = AutoTokenizer.from_pretrained(fake_news_model_name)
    fake_news_model = AutoModelForSequenceClassification.from_pretrained(fake_news_model_name)
    fake_news_detector = pipeline("text-classification", model=fake_news_model, tokenizer=fake_news_tokenizer)
    print(f"✅ Fake News model loaded: {fake_news_model_name}")
except Exception as e:
    print(f"⚠️ Failed to load Fake News model: {e}")
    fake_news_detector = None
    
# Define stopwords (you can expand this list as needed)
STOPWORDS = {
    "the", "is", "in", "and", "to", "of", "a", "for", "on", "with", "at",
    "by", "from", "an", "as", "be", "this", "that", "it", "are", "was",
    "were", "or", "has", "have", "had", "but", "not", "they", "their",
    "you", "we", "he", "she", "will", "would", "can", "could", "about",
    "after", "before", "up", "down", "out", "over", "under", "so", "if","says","said","more","also","new","today","breaking","after","of","as","us","give","given","got","few","many","how","hey","what","when","where","go","going","get","make","made","like","just","see","came","come","back","take","time","times","place","between","'s","our","their","no","|","I","-","/","!",",",".","@","#","&","*","~","S"
}

@app.route("/frequent-words")
def frequent_words():
    try:
        headlines = list(combined_collection.find().sort("published_at", -1).limit(200))
        words = []
        for h in headlines:
            if "title" in h:
                words.extend(h["title"].lower().split())
        filtered_words = [w.strip(".,!?;:()[]\"'") for w in words if w.lower() not in STOPWORDS]
        counter = Counter(filtered_words)
        most_common = counter.most_common(15)
        result = [{"word": w, "count": c} for w, c in most_common]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})

# ----------------- New Routes for Saved Headlines -----------------

@app.route('/save_headline', methods=['POST'])
def save_headline():
    data = request.json
    email = data.get("email")
    headline_id = data.get("headline_id")
    title = data.get("title")
    source = data.get("source")
    sentiment = data.get("sentiment")

    if not email or not headline_id:
        return jsonify({"message": "Missing data"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Save as an object (not just string)
    headline_data = {
        "headline_id": headline_id,
        "title": title,
        "source": source,
        "sentiment": sentiment,
    }

    users_collection.update_one(
        {"email": email},
        {"$addToSet": {"saved_headlines": headline_data}}
    )

    return jsonify({"message": "Headline saved successfully"}), 200

@app.route('/saved-headlines', methods=['POST'])
def get_saved_headlines():
    data = request.json
    email = data.get("email")   # ✅ now matches frontend
    if not email:
        return jsonify({"message": "Email required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    saved_headlines = user.get("saved_headlines", [])
    return jsonify(saved_headlines), 200

@app.route('/delete_headline', methods=['POST'])
def delete_headline():
    data = request.json
    email = data.get("email")
    headline_id = data.get("headline_id")

    if not email or not headline_id:
        return jsonify({"message": "Missing email or headline ID"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Use $pull to remove the item from the array
    # The condition inside $pull matches the item to be removed
    users_collection.update_one(
        {"email": email},
        {"$pull": {"saved_headlines": {"headline_id": headline_id}}}
    )

    return jsonify({"message": "Headline deleted successfully"}), 200
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, threaded=True)