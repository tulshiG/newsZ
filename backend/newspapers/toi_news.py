# from flask import Flask, jsonify, request
# from pymongo import MongoClient, ASCENDING, DESCENDING
# from pymongo.errors import DuplicateKeyError
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin
# import requests
# from datetime import datetime
# import os
# import re

# # =========================
# # Config
# # =========================
# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# DB_NAME = os.getenv("DB_NAME", "news_db")
# COLLECTION_NAME = os.getenv("COLLECTION_NAME", "toi_newspaper")

# TOI_BASE = "https://timesofindia.indiatimes.com/"
# CATEGORY_URLS = {
#     "india":         "https://timesofindia.indiatimes.com/india",
#     "business":      "https://timesofindia.indiatimes.com/business",
#     "technology":    "https://timesofindia.indiatimes.com/technology",
#     "sports":        "https://timesofindia.indiatimes.com/sports",
#     "entertainment": "https://timesofindia.indiatimes.com/entertainment",
#     "world":         "https://timesofindia.indiatimes.com/world",
#     "lifestyle":     "https://timesofindia.indiatimes.com/life-style",
# }

# CATEGORY_SELECTORS = {
#     "india": ["div.WavNE"],
#     "business": ["div.hoid1 figcaption", "div.yCs_c"],
#     "technology": ["div.yCs_c"],
#     "sports": ["div.O1LaH"],
#     "entertainment": ["div.ZEK5z.bg_color", "div.ZEK5z"],
#     "world": ["div.O1LaH div.WavNE", "div.WavNE"],
#     "lifestyle": ["div.clam2"],
# }

# HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

# # =========================
# # DB setup
# # =========================
# mongo_client = MongoClient(MONGO_URI)
# db = mongo_client[DB_NAME]
# col = db[COLLECTION_NAME]

# col.create_index([("link", ASCENDING)], unique=True)
# col.create_index([("category", ASCENDING), ("published_at", DESCENDING)])
# col.create_index([("scraped_at", DESCENDING)])

# # =========================
# # Helpers
# # =========================
# def clean_text(s: str) -> str:
#     if not s:
#         return ""
#     return re.sub(r"\s+", " ", s).strip()

# def find_nearest_link(node, base_url: str) -> str | None:
#     parent = node
#     for _ in range(5):
#         if getattr(parent, "name", None) == "a" and parent.get("href"):
#             return urljoin(base_url, parent.get("href"))
#         parent = getattr(parent, "parent", None)
#         if parent is None:
#             break

#     a_inside = node.find("a", href=True)
#     if a_inside:
#         return urljoin(base_url, a_inside.get("href"))

#     if node.parent:
#         a_parent = node.parent.find("a", href=True)
#         if a_parent:
#             return urljoin(base_url, a_parent.get("href"))

#     for sib in list(node.previous_siblings) + list(node.next_siblings):
#         if getattr(sib, "find", None):
#             a_sib = sib.find("a", href=True)
#             if a_sib:
#                 return urljoin(base_url, a_sib.get("href"))
#     return None

# def extract_title_for_block(block) -> str:
#     img = block.find("img", alt=True)
#     if img and clean_text(img.get("alt")):
#         return clean_text(img.get("alt"))

#     if block.name == "figcaption" or block.find("figcaption"):
#         fc = block if block.name == "figcaption" else block.find("figcaption")
#         if fc and clean_text(fc.get_text()):
#             return clean_text(fc.get_text())

#     return clean_text(block.get_text())

# # =========================
# # Scraper
# # =========================
# def scrape_category(category: str) -> list[dict]:
#     if category not in CATEGORY_URLS:
#         raise ValueError(f"Unsupported category: {category}")

#     url = CATEGORY_URLS[category]
#     r = requests.get(url, headers=HEADERS, timeout=20)
#     r.raise_for_status()

#     soup = BeautifulSoup(r.text, "html.parser")
#     results = []

#     for selector in CATEGORY_SELECTORS.get(category, []):
#         for block in soup.select(selector):
#             title = clean_text(extract_title_for_block(block))
#             if not title:
#                 continue

#             link = find_nearest_link(block, TOI_BASE)
#             if not link:
#                 continue

#             item = {
#                 "title": title,
#                 "link": link,
#                 "category": category,
#                 "source": "The Times of India",
#                 "published_at": datetime.utcnow(),
#                 "scraped_at": datetime.utcnow(),
#             }
#             results.append(item)

#     return results

# def save_items(items: list[dict]) -> dict:
#     inserted, duplicates = 0, 0
#     for doc in items:
#         try:
#             col.insert_one(doc)
#             inserted += 1
#         except DuplicateKeyError:
#             duplicates += 1
#     return {"inserted": inserted, "duplicates": duplicates}

# def get_news_from_db(category: str | None = None, limit: int = 50) -> list[dict]:
#     q = {}
#     if category:
#         q["category"] = category.lower()

#     cursor = col.find(q).sort(
#         [("published_at", DESCENDING), ("scraped_at", DESCENDING)]
#     ).limit(limit)

#     data = []
#     for d in cursor:
#         d["_id"] = str(d["_id"])
#         data.append(d)
#     return data

# # =========================
# # Flask API
# # =========================
# app = Flask(__name__)

# @app.route("/news", methods=["GET"])
# def api_get_news():
#     category = request.args.get("category")
#     limit = int(request.args.get("limit", 50))
#     news = get_news_from_db(category, limit)
#     return jsonify({"status": "ok", "count": len(news), "data": news})

# @app.route("/scrape-toi-news", methods=["GET", "POST"])
# def api_scrape_news():
#     all_items = []
#     for category in CATEGORY_URLS.keys():
#         try:
#             items = scrape_category(category)
#             result = save_items(items)
#             all_items.extend(items)
#         except Exception as e:
#             print(f"Error scraping {category}: {e}")
#     return jsonify({"status": "ok", "scraped": len(all_items)})

# if __name__ == "__main__":
#     app.run(debug=True)


# from pymongo import MongoClient, ASCENDING, DESCENDING
# from pymongo.errors import DuplicateKeyError
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin
# import requests
# from datetime import datetime
# import os
# import re

# # =========================
# # Config
# # =========================
# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# DB_NAME = os.getenv("DB_NAME", "newsdb")
# COLLECTION_NAME = os.getenv("COLLECTION_NAME", "toi_newspaper")

# TOI_BASE = "https://timesofindia.indiatimes.com/"
# CATEGORY_URLS = {
#     "india":         "https://timesofindia.indiatimes.com/india",
#     "business":      "https://timesofindia.indiatimes.com/business",
#     "technology":    "https://timesofindia.indiatimes.com/technology",
#     "sports":        "https://timesofindia.indiatimes.com/sports",
#     "entertainment": "https://timesofindia.indiatimes.com/entertainment",
#     "world":         "https://timesofindia.indiatimes.com/world",
#     "lifestyle":     "https://timesofindia.indiatimes.com/life-style",
# }

# CATEGORY_SELECTORS = {
#     "india": ["div.WavNE"],
#     "business": ["div.hoid1 figcaption", "div.yCs_c"],
#     "technology": ["div.yCs_c"],
#     "sports": ["div.O1LaH"],
#     "entertainment": ["div.ZEK5z.bg_color", "div.ZEK5z"],
#     "world": ["div.O1LaH div.WavNE", "div.WavNE"],
#     "lifestyle": ["div.clam2"],
# }

# HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

# # =========================
# # DB setup
# # =========================
# mongo_client = MongoClient(MONGO_URI)
# db = mongo_client[DB_NAME]
# col = db[COLLECTION_NAME]

# col.create_index([("link", ASCENDING)], unique=True)
# col.create_index([("category", ASCENDING), ("published_at", DESCENDING)])
# col.create_index([("scraped_at", DESCENDING)])

# # =========================
# # Helpers
# # =========================
# def clean_text(s: str) -> str:
#     if not s:
#         return ""
#     return re.sub(r"\s+", " ", s).strip()

# def find_nearest_link(node, base_url: str) -> str | None:
#     parent = node
#     for _ in range(5):
#         if getattr(parent, "name", None) == "a" and parent.get("href"):
#             return urljoin(base_url, parent.get("href"))
#         parent = getattr(parent, "parent", None)
#         if parent is None:
#             break

#     a_inside = node.find("a", href=True)
#     if a_inside:
#         return urljoin(base_url, a_inside.get("href"))

#     if node.parent:
#         a_parent = node.parent.find("a", href=True)
#         if a_parent:
#             return urljoin(base_url, a_parent.get("href"))

#     for sib in list(node.previous_siblings) + list(node.next_siblings):
#         if getattr(sib, "find", None):
#             a_sib = sib.find("a", href=True)
#             if a_sib:
#                 return urljoin(base_url, a_sib.get("href"))
#     return None

# def extract_title_for_block(block) -> str:
#     img = block.find("img", alt=True)
#     if img and clean_text(img.get("alt")):
#         return clean_text(img.get("alt"))

#     if block.name == "figcaption" or block.find("figcaption"):
#         fc = block if block.name == "figcaption" else block.find("figcaption")
#         if fc and clean_text(fc.get_text()):
#             return clean_text(fc.get_text())

#     return clean_text(block.get_text())

# # =========================
# # Scraper functions
# # =========================
# def scrape_category(category: str) -> list[dict]:
#     if category not in CATEGORY_URLS:
#         raise ValueError(f"Unsupported category: {category}")

#     url = CATEGORY_URLS[category]
#     r = requests.get(url, headers=HEADERS, timeout=20)
#     r.raise_for_status()

#     soup = BeautifulSoup(r.text, "html.parser")
#     results = []

#     for selector in CATEGORY_SELECTORS.get(category, []):
#         for block in soup.select(selector):
#             title = clean_text(extract_title_for_block(block))
#             if not title:
#                 continue

#             link = find_nearest_link(block, TOI_BASE)
#             if not link:
#                 continue

#             item = {
#                 "title": title,
#                 "link": link,
#                 "category": category,
#                 "source": "The Times of India",
#                 "published_at": datetime.utcnow(),
#                 "scraped_at": datetime.utcnow(),
#             }
#             results.append(item)

#     return results

# def save_items(items: list[dict]) -> dict:
#     inserted, duplicates = 0, 0
#     for doc in items:
#         try:
#             col.insert_one(doc)
#             inserted += 1
#         except DuplicateKeyError:
#             duplicates += 1
#     return {"inserted": inserted, "duplicates": duplicates}

# def get_news_from_db(category: str | None = None, limit: int = 50) -> list[dict]:
#     q = {}
#     if category:
#         q["category"] = category.lower()

#     cursor = col.find(q).sort(
#         [("published_at", DESCENDING), ("scraped_at", DESCENDING)]
#     ).limit(limit)

#     data = []
#     for d in cursor:
#         d["_id"] = str(d["_id"])
#         data.append(d)
#     return data
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import requests
from datetime import datetime
import re

TOI_BASE = "https://timesofindia.indiatimes.com/"
CATEGORY_URLS = {
    "india":         "https://timesofindia.indiatimes.com/india",
    "business":      "https://timesofindia.indiatimes.com/business",
    "technology":    "https://timesofindia.indiatimes.com/technology",
    "sports":        "https://timesofindia.indiatimes.com/sports",
    "entertainment": "https://timesofindia.indiatimes.com/entertainment",
    "world":         "https://timesofindia.indiatimes.com/world",
    "lifestyle":     "https://timesofindia.indiatimes.com/life-style",
}

CATEGORY_SELECTORS = {
    "india": ["div.WavNE"],
    "business": ["div.hoid1 figcaption", "div.yCs_c"],
    "technology": ["div.yCs_c"],
    "sports": ["div.O1LaH"],
    "entertainment": ["div.ZEK5z.bg_color", "div.ZEK5z"],
    "world": ["div.O1LaH div.WavNE", "div.WavNE"],
    "lifestyle": ["div.clam2"],
}

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}


def clean_text(s: str) -> str:
    if not s:
        return ""
    return re.sub(r"\s+", " ", s).strip()

def find_nearest_link(node, base_url: str) -> str | None:
    parent = node
    for _ in range(5):
        if getattr(parent, "name", None) == "a" and parent.get("href"):
            return urljoin(base_url, parent.get("href"))
        parent = getattr(parent, "parent", None)
        if parent is None:
            break

    a_inside = node.find("a", href=True)
    if a_inside:
        return urljoin(base_url, a_inside.get("href"))

    if node.parent:
        a_parent = node.parent.find("a", href=True)
        if a_parent:
            return urljoin(base_url, a_parent.get("href"))

    for sib in list(node.previous_siblings) + list(node.next_siblings):
        if getattr(sib, "find", None):
            a_sib = sib.find("a", href=True)
            if a_sib:
                return urljoin(base_url, a_sib.get("href"))
    return None

def extract_title_for_block(block) -> str:
    img = block.find("img", alt=True)
    if img and clean_text(img.get("alt")):
        return clean_text(img.get("alt"))

    if block.name == "figcaption" or block.find("figcaption"):
        fc = block if block.name == "figcaption" else block.find("figcaption")
        if fc and clean_text(fc.get_text()):
            return clean_text(fc.get_text())

    return clean_text(block.get_text())

def scrape_category(category: str) -> list[dict]:
    if category not in CATEGORY_URLS:
        raise ValueError(f"Unsupported category: {category}")

    url = CATEGORY_URLS[category]
    r = requests.get(url, headers=HEADERS, timeout=20)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "html.parser")
    results = []

    for selector in CATEGORY_SELECTORS.get(category, []):
        for block in soup.select(selector):
            title = clean_text(extract_title_for_block(block))
            if not title:
                continue

            link = find_nearest_link(block, TOI_BASE)
            if not link:
                continue

            item = {
                "title": title,
                "link": link,
                "category": category,
                "source": "The Times of India",
                "published_at": datetime.utcnow().isoformat(),
                "scraped_at": datetime.utcnow().isoformat(),
            }
            results.append(item)

    return results
