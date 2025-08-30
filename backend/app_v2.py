from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, UpdateOne
from pymongo.errors import ServerSelectionTimeoutError
from datetime import datetime, timezone
from transformers import pipeline

from scrapers_v2.toi import scrape_toi
from scrapers_v2.thehindu import scrape_thehindu
from scrapers_v2.indianexpress import scrape_indianexpress

app = Flask(__name__)
CORS(app, resources={r"/api/v2/*": {"origins": "*"}}, supports_credentials=True)

# ---------------- Mongo ----------------
try:
    mongo = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    mongo.server_info()
    db = mongo["newshub_v2"]  # NEW database
    sources_col = db["sources"]          # NEW collection
    articles_col = db["articles"]        # NEW collection

    # indexes: prevent dupes and speed filters
    articles_col.create_index([("source", 1), ("link", 1)], unique=True)
    articles_col.create_index([("category", 1)])
    articles_col.create_index([("published_at", -1)])
    sources_col.create_index([("slug", 1)], unique=True)

    mongo_ok = True
    print("✅ Mongo v2 ready")
except ServerSelectionTimeoutError:
    mongo_ok = False
    print("❌ Mongo not available")

# ---------------- Translator (EN→HI and HI→EN)
try:
    translator_en_hi = pipeline("translation_en_to_hi", model="Helsinki-NLP/opus-mt-en-hi")
    translator_hi_en = pipeline("translation_hi_to_en", model="Helsinki-NLP/opus-mt-hi-en")
except Exception:
    translator_en_hi = translator_hi_en = None

# ---------------- Source Catalog (static meta)
CATALOG = [
    {
        "name": "Times of India",
        "slug": "toi",
        "site": "https://timesofindia.indiatimes.com",
        "languages": ["en", "hi"],
        "categories": ["National", "International", "Business", "Sports", "Entertainment", "Technology"]
    },
    {
        "name": "The Hindu",
        "slug": "thehindu",
        "site": "https://www.thehindu.com",
        "languages": ["en"],
        "categories": ["National", "International", "Business", "Sports", "Science", "Opinion"]
    },
    {
        "name": "Indian Express",
        "slug": "indianexpress",
        "site": "https://indianexpress.com",
        "languages": ["en"],
        "categories": ["National", "International", "Business", "Sports", "Technology", "Entertainment"]
    }
]

# Persist catalog once (idempotent)
if mongo_ok:
    ops = [UpdateOne({"slug": s["slug"]}, {"$set": s}, upsert=True) for s in CATALOG]
    sources_col.bulk_write(ops)

# ---------------- Helpers ----------------
SCRAPER_MAP = {
    "toi": scrape_toi,
    "thehindu": scrape_thehindu,
    "indianexpress": scrape_indianexpress,
}

def upsert_articles(items):
    if not items:
        return 0
    # normalize + upsert
    ops = []
    now_iso = datetime.now(timezone.utc).isoformat()
    for it in items:
        it["published_at"] = it.get("published_at") or now_iso
        it["language"] = it.get("language") or "en"
        it["created_at"] = it.get("created_at") or now_iso
        # Unique key: (source, link)
        ops.append(UpdateOne({"source": it["source"], "link": it["link"]}, {"$set": it}, upsert=True))
    if ops:
        res = articles_col.bulk_write(ops, ordered=False)
        # inserted count approximation: upserts where upserted_id is not None
        return len([r for r in res.upserted_ids.values()])
    return 0

# ---------------- Routes (ALL NEW) ----------------
@app.get("/api/v2/sources")
def api_sources():
    docs = list(sources_col.find({}, {"_id": 0})) if mongo_ok else CATALOG
    # attach simple counts per source
    counts = {d["_id"]["source"]: d["count"] for d in articles_col.aggregate([
        {"$group": {"_id": {"source": "$source"}, "count": {"$sum": 1}}}
    ])} if mongo_ok else {}
    for d in docs:
        d["articles"] = counts.get(d["name"], 0)
    return jsonify(docs)

@app.post("/api/v2/scrape")
def api_scrape():
    """Run selected scrapers and upsert results. Query: sources=toi,thehindu,indianexpress&limit=50"""
    if not mongo_ok:
        return jsonify({"error": "Mongo not connected"}), 503
    srcs = request.args.get("sources", "toi,thehindu,indianexpress").split(",")
    limit = int(request.args.get("limit", 60))
    collected = []
    for s in srcs:
        s = s.strip()
        fn = SCRAPER_MAP.get(s)
        if fn:
            try:
                items = fn(limit=limit)
                collected.extend(items)
            except Exception as e:
                print(f"scraper {s} failed:", e)
    inserted = upsert_articles(collected)
    return jsonify({"status": "ok", "scraped": len(collected), "inserted": inserted})

@app.get("/api/v2/articles")
def api_articles():
    """Query params: source, category, q, limit (default 90)."""
    if not mongo_ok:
        return jsonify([])
    q = {}
    source = request.args.get("source")
    category = request.args.get("category")
    search = request.args.get("q")
    if source and source.lower() != "all":
        # accept slug or full name
        if source in SCRAPER_MAP.keys():
            # map slug to display name
            src_name = next((c["name"] for c in CATALOG if c["slug"] == source), source)
            q["source"] = src_name
        else:
            q["source"] = source
    if category and category.lower() != "all":
        q["category"] = category
    if search:
        q["title"] = {"$regex": search, "$options": "i"}
    limit = int(request.args.get("limit", 90))
    docs = list(articles_col.find(q).sort("published_at", -1).limit(limit))
    for d in docs:
        d["_id"] = str(d["_id"])  # serialize id
    return jsonify(docs)

@app.post("/api/v2/translate")
def api_translate():
    if not (translator_en_hi and translator_hi_en):
        return jsonify({"error": "translator unavailable"}), 503
    body = request.get_json(force=True) or {}
    text = body.get("text", "")
    target = body.get("target", "hi")
    if not text:
        return jsonify({"error": "no text"}), 400
    if target == "hi":
        out = translator_en_hi(text)[0]["translation_text"]
    else:
        out = translator_hi_en(text)[0]["translation_text"]
    return jsonify({"translated": out})

@app.get("/api/v2/categories")
def api_categories():
    cats = sorted(list({d["_id"] for d in articles_col.aggregate([
        {"$group": {"_id": "$category"}}
    ]) if d["_id"]})) if mongo_ok else []
    return jsonify(cats)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)