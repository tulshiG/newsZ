# thehindu.py
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime

# def scrape_thehindu():
#     url = "https://www.thehindu.com/"
#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
#     }

#     try:
#         response = requests.get(url, headers=headers, timeout=10)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, "html.parser")

#         news_items = []

#         # Main headlines usually inside <a> with class "title"
#         for a_tag in soup.find_all("a", attrs={"data-section": "top-news"}, href=True):
#             title = a_tag.get_text(strip=True)
#             link = a_tag["href"]
#             if not link.startswith("http"):
#                 link = "https://www.thehindu.com" + link

#             news_items.append({
#                 "title": title,
#                 "link": link,
#                 "sources": ["The Hindu"],
#                 "published_at": datetime.utcnow().isoformat(),
#                 "fetched_at": datetime.utcnow().isoformat(),
#                 "summary": None,
#                 "sentiment": "neutral"
#             })

#         return news_items

#     except Exception as e:
#         print("The Hindu scraper error:", e)
#         return []
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime

# def scrape_thehindu():
#     url = "https://www.thehindu.com/latest-news/"
#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
#     }

#     try:
#         response = requests.get(url, headers=headers, timeout=10)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, "html.parser")

#         news_items = []

#         timeline_ul = soup.find("ul", class_="timeline")
#         if not timeline_ul:
#             return []

#         for li in timeline_ul.find_all("li"):
#             a_tag = li.find("a", href=True)
#             if not a_tag:
#                 continue

#             title = a_tag.get_text(strip=True)
#             link = a_tag["href"]

#             time_span = li.find("span", class_="timePublished")
#             if time_span and time_span.has_attr("data-published"):
#                 published_at = time_span["data-published"]
#             else:
#                 published_at = datetime.utcnow().isoformat()

#             news_items.append({
#                 "title": title,
#                 "link": link,
#                 "sources": ["The Hindu"],
#                 "published_at": published_at,
#                 "fetched_at": datetime.utcnow().isoformat(),
#                 "summary": None,
#                 "sentiment": "neutral",
#                 "category": "latest-news"
#             })

#         # return news_items
#         print(news_items)

#     except Exception as e:
#         print("The Hindu scraper error:", e)
#         return []
# scrapers/thehindu.py
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime

# def scrape_thehindu_rss(limit=20):
#     url = "https://www.thehindu.com/news/national/feeder/default.rss"
#     res = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#     res.raise_for_status()

#     soup = BeautifulSoup(res.content, "xml")
#     items = soup.find_all("item", limit=limit)

#     headlines = []
#     for item in items:
#         title = item.title.text
#         link = item.link.text
#         pub_date = item.pubDate.text  # e.g. "Mon, 18 Aug 2025 08:16:38 +0530"
#         published_at = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %z").isoformat()
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "The Hindu",
#             "scraped_at": datetime.utcnow().isoformat()
#         })

#     return headlines

# # # Test run
# # if __name__ == "__main__":
# #     data = scrape_thehindu_rss()
# #     for item in data:
# #         print(item)
import requests
from bs4 import BeautifulSoup
from datetime import datetime

def scrape_thehindu_rss(limit=20):
    url = "https://www.thehindu.com/news/national/feeder/default.rss"
    
    headlines = []
    try:
        res = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        res.raise_for_status()

        soup = BeautifulSoup(res.content, "xml")
        items = soup.find_all("item", limit=limit)

        for item in items:
            title = item.title.text
            link = item.link.text
            pub_date = item.pubDate.text  # e.g. "Mon, 18 Aug 2025 08:16:38 +0530"
            published_at = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %z").isoformat()
            headlines.append({
                "title": title,
                "link": link,
                "published_at": published_at,
                "source": "The Hindu",
                "scraped_at": datetime.utcnow().isoformat()
            })
    except (requests.exceptions.RequestException, ValueError, AttributeError) as e:
        print(f"Error scraping The Hindu RSS: {e}")
        return []

    return headlines

if __name__ == "__main__":
    data = scrape_thehindu_rss()
    print(f"Scraped The Hindu headlines: {len(data)}")
    for item in data[:5]:
        print(item)