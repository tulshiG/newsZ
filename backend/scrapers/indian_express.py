import feedparser
from datetime import datetime, timezone

def scrape_indian_express(limit=25):
    """
    Scrapes headlines from Indian Express's RSS feed, including categories.
    """
    url = "http://www.indianexpress.com/feed/indianexpress.xml" # Use a known RSS feed URL
    try:
        feed = feedparser.parse(url)
        headlines = []
        for entry in feed.entries[:limit]:
            # Categories for Indian Express are often in the 'tags' attribute
            category = "general"
            if hasattr(entry, 'tags') and entry.tags:
                category = entry.tags[0].term.lower()

            published_date = datetime.now(timezone.utc)
            if hasattr(entry, 'published_parsed'):
                published_date = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)

            headlines.append({
                "title": entry.title,
                "link": entry.link,
                "published_at": published_date.isoformat(),
                "summary": entry.summary,
                "source": "Indian Express",
                "language": "English",
                "category": category,
            })
        return headlines
    except Exception as e:
        print(f"Error scraping Indian Express: {e}")
        return []