import feedparser
from datetime import datetime, timezone
import requests
from bs4 import BeautifulSoup

def scrape_divya_bhaskar(limit=25):
    """
    Scrapes headlines from Divya Bhaskar's RSS feed, including categories.
    """
    url = "https://www.divyabhaskar.co.in/rss.xml" # Use the correct RSS feed URL
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        feed = feedparser.parse(response.content)
        headlines = []
        for entry in feed.entries[:limit]:
            # Divya Bhaskar's categories might be in the link or tags
            category = "general"
            if hasattr(entry, 'category'):
                category = entry.category.lower()
            elif hasattr(entry, 'link'):
                if 'sports' in entry.link.lower():
                    category = 'sports'
                # Add more category logic based on URL patterns

            published_date = datetime.now(timezone.utc)
            if hasattr(entry, 'published_parsed'):
                published_date = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
            
            # Use BeautifulSoup to get a clean description
            soup = BeautifulSoup(entry.summary, 'html.parser')
            clean_summary = soup.get_text()

            headlines.append({
                "title": entry.title,
                "link": entry.link,
                "published_at": published_date.isoformat(),
                "summary": clean_summary,
                "source": "Divya Bhaskar",
                "language": "Gujarati",
                "category": category,
            })
        return headlines
    except Exception as e:
        print(f"Error scraping Divya Bhaskar: {e}")
        return []