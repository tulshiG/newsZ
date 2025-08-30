# import feedparser
# import re
# from datetime import datetime, timezone

# # A simple mapping for categories based on feed URLs
# # This is a placeholder; a more robust solution would involve scraping content.
# SOURCE_CATEGORIES = {
#     "toi": {
#         "https://timesofindia.indiatimes.com/rssfeedstopstories.cms": ["National", "International"],
#         "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms": ["Business"],
#         "https://timesofindia.indiatimes.com/rssfeeds/4719658.cms": ["Sports"]
#     },
#     "thehindu": {
#         "https://www.thehindu.com/news/national/feeder/default.rss": ["National"],
#         "https://www.thehindu.com/news/international/feeder/default.rss": ["International"],
#         "https://www.thehindu.com/business/feeder/default.rss": ["Business"],
#         "https://www.thehindu.com/sport/feeder/default.rss": ["Sports"]
#     },
#     # Add more newspapers and their categories here
#     "divyabhaskar": {
#         "https://www.divyabhaskar.co.in/rss-feed": ["Gujarat", "National", "Business", "Sports"]
#     },
#     "sandesh": {
#         "https://sandesh.com/feed/": ["Gujarat", "National", "Business", "Sports"]
#     }
# }

# def get_category_from_url(url, source):
#     """Assigns a category based on the URL."""
#     for feed_url, categories in SOURCE_CATEGORIES.get(source, {}).items():
#         if feed_url in url:
#             return categories
#     return ["General"]

# def scrape_data(source, limit=50):
#     """
#     Scrapes headlines from a specified source (e.g., 'toi', 'thehindu').
#     Returns a list of dictionaries with headline data.
#     """
#     headlines = []
#     source_feeds = SOURCE_CATEGORIES.get(source, {})
#     if not source_feeds:
#         print(f"⚠️ No RSS feeds configured for source: {source}")
#         return []

#     for url, categories in source_feeds.items():
#         try:
#             feed = feedparser.parse(url)
#             for entry in feed.entries[:limit]:
#                 title = entry.get("title", "Unknown Title")
#                 link = entry.get("link", "")
#                 published_at = entry.get("published", datetime.now(timezone.utc).isoformat())

#                 # Clean up title and remove HTML tags
#                 clean_title = re.sub(r'<[^>]+>', '', title)

#                 headlines.append({
#                     "title": clean_title,
#                     "link": link,
#                     "published_at": published_at,
#                     "source": source,
#                     "category": categories[0] if categories else "General" # Take the first category for now
#                 })
#         except Exception as e:
#             print(f"Error scraping {source} from {url}: {e}")

#     # Deduplicate and return the combined list
#     unique_links = set()
#     unique_headlines = []
#     for h in headlines:
#         if h["link"] not in unique_links:
#             unique_links.add(h["link"])
#             unique_headlines.append(h)
            
#     return unique_headlines

# if __name__ == '__main__':
#     # Example usage for testing
#     toi_headlines = scrape_data("toi")
#     print(f"Scraped {len(toi_headlines)} headlines from TOI.")
    
#     hindu_headlines = scrape_data("thehindu")
#     print(f"Scraped {len(hindu_headlines)} headlines from The Hindu.")
import feedparser
import re
from datetime import datetime, timezone
from pymongo import MongoClient

# Mapping of RSS feed URLs to categories
# This is a simple way to add a category to each scraped item.
SOURCE_CATEGORIES = {
    "toi": {
        "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms": "World",
        "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms": "Sports",
        "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms": "Business",
        "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms": "Technology"
    },
    "thehindu": {
        "https://www.thehindu.com/news/national/feeder/default.rss": "National",
        "https://www.thehindu.com/news/international/feeder/default.rss": "International",
        "https://www.thehindu.com/business/feeder/default.rss": "Business",
        "https://www.thehindu.com/sport/feeder/default.rss": "Sports"
    }
}

def scrape_data(source, limit=50):
    """Scrapes headlines from a specified source (e.g., 'toi', 'thehindu')."""
    headlines = []
    source_feeds = SOURCE_CATEGORIES.get(source, {})
    
    if not source_feeds:
        print(f"⚠️ No RSS feeds configured for source: {source}")
        return []

    for url, category in source_feeds.items():
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:limit]:
                title = entry.get("title", "Unknown Title")
                link = entry.get("link", "")
                published_at = entry.get("published", datetime.now(timezone.utc).isoformat())

                clean_title = re.sub(r'<[^>]+>', '', title)

                headlines.append({
                    "title": clean_title,
                    "link": link,
                    "published_at": published_at,
                    "source": source,
                    "category": category
                })
        except Exception as e:
            print(f"Error scraping {source} from {url}: {e}")

    # Deduplicate and return the combined list
    unique_links = set()
    unique_headlines = []
    for h in headlines:
        if h["link"] and h["link"] not in unique_links:
            unique_links.add(h["link"])
            unique_headlines.append(h)
    
    return unique_headlines