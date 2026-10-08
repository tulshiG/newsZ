import requests
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

RSS = "https://www.thehindu.com/news/national/feeder/default.rss"


def scrape_thehindu_rss(limit=20):
    headlines = []
    try:
        res = requests.get(RSS, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        res.raise_for_status()
        root = ET.fromstring(res.content)
        for item in root.iter("item"):
            if len(headlines) >= limit:
                break
            title = (item.findtext("title") or "").strip()
            link = (item.findtext("link") or "").strip()
            if not title or not link:
                continue
            try:
                published = parsedate_to_datetime(item.findtext("pubDate")).astimezone(timezone.utc).isoformat()
            except Exception:
                published = datetime.now(timezone.utc).isoformat()
            headlines.append({"title": title, "link": link, "published_at": published,
                              "source": "The Hindu",
                              "scraped_at": datetime.now(timezone.utc).isoformat()})
    except Exception as e:
        print(f"Error scraping The Hindu RSS: {e}")
    return headlines
