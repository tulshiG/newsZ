from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient
BASE = "https://timesofindia.indiatimes.com"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}

def _abs(link):
    return link if link.startswith("http") else BASE + link
def get_article_time(article_url):
    """Fetch article published/updated time from TOI article page and return 'Aug 16, 2025, 19:17'."""
    try:
        res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "lxml")

        time_tag = soup.select_one("div.xf8Pm.byline span")
        if time_tag:
            raw_time = time_tag.get_text(strip=True)  # "Updated: Aug 16, 2025, 19:17 IST"
            cleaned_time = raw_time.replace("Updated:", "").replace("Published on", "").replace("IST", "").strip()
            return cleaned_time  # Output: Aug 16, 2025, 19:17

    except Exception as e:
        print(f"Error fetching time for {article_url}: {e}")
        return "Unknown"

def scrape_toi(limit=20):
    headlines, seen = [], set()
    now = datetime.now(timezone.utc).isoformat()
    try:
        res = requests.get(f"{BASE}/home/headlines", headers=HEADERS, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")

        def add(title, link):
            if not title or not link or link in seen or len(headlines) >= limit:
                return
            seen.add(link)
            headlines.append({"title": title, "link": link, "published_at": now,
                              "source": "Times of India", "scraped_at": now})

        for a in soup.select("span.w_tle > a"):
            if a.get("href"):
                add(a.get_text(strip=True), _abs(a["href"]))
        for fig in soup.select("figcaption"):
            pa = fig.find_parent("a")
            if pa and pa.get("href"):
                add(fig.get_text(strip=True), _abs(pa["href"]))
    except Exception as e:
        print(f"Error scraping TOI: {e}")
    return headlines

