# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime

# def scrape_toi():
#     url = "https://timesofindia.indiatimes.com/"
#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
#     }

#     try:
#         response = requests.get(url, headers=headers, timeout=10)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, "html.parser")

#         news_items = []

#         for fig in soup.find_all("figure"):
#             caption_tag = fig.find("figcaption")
#             if not caption_tag:
#                 continue

#             title = caption_tag.get_text(strip=True)
#             link_tag = fig.find("a", href=True)
#             link = link_tag["href"] if link_tag else None
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link

#             # Try to get published date/time
#             meta_li = fig.find_next("li")
#             if meta_li:
#                 spans = meta_li.find_all("span")
#                 if len(spans) >= 2:
#                     published_str = spans[1].get_text(strip=True)
#                 else:
#                     published_str = ""
#             else:
#                 published_str = ""

#             # Convert time to ISO for frontend
#             try:
#                 published_at = datetime.strptime(published_str, "Updated: %b %d, %Y, %H:%M %Z").isoformat()
#             except:
#                 published_at = datetime.utcnow().isoformat()

#             news_items.append({
#                 "title": title,
#                 "link": link,
#                 "sources": ["Times of India"],
#                 "published_at": published_at,
#                 "fetched_at": datetime.utcnow().isoformat(),
#                 "summary": None,
#                 "sentiment": "neutral"
#             })

#         return news_items

#     except Exception as e:
#         print("Scraper error:", e)
#         return []
# toi.py
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime
# from pymongo import MongoClient

# # MongoDB connection
# client = MongoClient("mongodb://localhost:27017/")
# db = client["newsdb"]
# collection = db["toi_news"]

# def get_article_time(article_url):
#     """Fetch article published/updated time from the article page."""
#     try:
#         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#         soup = BeautifulSoup(res.text, "lxml")

#         # TOI usually has the date inside .as_byline or .publish_on or similar
#         time_tag = soup.select_one("span.as_byline, div.publish_on")
#         if time_tag:
#             return time_tag.get_text(strip=True)
#     except Exception as e:
#         print(f"Error fetching time for {article_url}: {e}")
#     return None

# def scrape_toi():
#     url = "https://timesofindia.indiatimes.com/home/headlines"
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(url, headers=headers, timeout=10)
#     soup = BeautifulSoup(res.text, "lxml")

#     headlines = []

#     # 1) Regular text headlines
#     for a in soup.select("span.w_tle > a"):
#         title = a.get_text(strip=True)
#         link = a.get("href", "")
#         if link and not link.startswith("http"):
#             link = "https://timesofindia.indiatimes.com" + link
        
#         published_at = get_article_time(link)
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "Times of India",
#             "scraped_at": datetime.now()
#         })

#     # 2) Video headlines
#     for fig in soup.select("figcaption"):
#         title = fig.get_text(strip=True)
#         parent_a = fig.find_parent("a")
#         if parent_a:
#             link = parent_a.get("href", "")
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link
            
#             published_at = get_article_time(link)
#             headlines.append({
#                 "title": title,
#                 "link": link,
#                 "published_at": published_at,
#                 "source": "Times of India",
#                 "scraped_at": datetime.now()
#             })

#     return headlines

# if __name__ == "__main__":
#     data = scrape_toi()
#     print(f"Scraped TOI headlines: {len(data)}")
    
#     if data:
#         collection.insert_many(data)
#         print(f"Inserted {len(data)} headlines into MongoDB.")
#     else:
#         print("No headlines to insert!")

#     for item in data[:5]:
#         print(item)
# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime
# from pymongo import MongoClient

# app = Flask(__name__)

# # MongoDB connection
# client = MongoClient("mongodb://localhost:27017/")
# db = client["newsdb"]
# collection = db["toi_news"]

# def get_article_time(article_url):
#     """Fetch article published/updated time from the article page."""
#     try:
#         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#         soup = BeautifulSoup(res.text, "lxml")
#         time_tag = soup.select_one("span.as_byline, div.publish_on")
#         if time_tag:
#             return time_tag.get_text(strip=True)
#     except Exception as e:
#         print(f"Error fetching time for {article_url}: {e}")
#     return None

# def scrape_toi(limit=5):
#     url = "https://timesofindia.indiatimes.com/home/headlines"
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(url, headers=headers, timeout=10)
#     soup = BeautifulSoup(res.text, "lxml")

#     headlines = []

#     # 1) Regular text headlines
#     #for a in soup.select("span.w_tle > a"):
#     for i, a in enumerate(soup.select("span.w_tle > a")):
#         if i >= limit:  # stop after 5 for speed
#             break
#         title = a.get_text(strip=True)
#         link = a.get("href", "")
#         if link and not link.startswith("http"):
#             link = "https://timesofindia.indiatimes.com" + link
            
#         published_at = get_article_time(link)
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "Times of India",
#             "scraped_at": datetime.now()
#         })

#     # 2) Video headlines
#     for fig in soup.select("figcaption"):
#         title = fig.get_text(strip=True)
#         parent_a = fig.find_parent("a")
#         if parent_a:
#             link = parent_a.get("href", "")
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link
#             published_at = get_article_time(link)
#             headlines.append({
#                 "title": title,
#                 "link": link,
#                 "published_at": published_at,
#                 "source": "Times of India",
#                 "scraped_at": datetime.now()
#             })

#     return headlines

# if __name__ == "__main__":
#     data = scrape_toi()
#     print(f"Scraped TOI headlines: {len(data)}")
    
#     if data:
#         collection.insert_many(data)
#         print(f"Inserted {len(data)} headlines into MongoDB.")
#     else:
#         print("No headlines to insert!")

#     for item in data[:5]:
#         print(item)
# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime
# from pymongo import MongoClient

# app = Flask(__name__)

# # MongoDB connection
# client = MongoClient("mongodb://localhost:27017/")
# db = client["newsdb"]
# collection = db["toi_news"]

# def get_article_time(article_url):
#     """Fetch article published/updated time from the article page and return ISO format."""
#     try:
#         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#         soup = BeautifulSoup(res.text, "lxml")
#         time_tag = soup.select_one("span.as_byline, div.publish_on")
#         if time_tag:
#             raw_time = time_tag.get_text(strip=True)

#             # Try known TOI format: "Updated: Aug 12, 2025, 10:35 IST"
#             try:
#                 dt = datetime.strptime(raw_time, "Updated: %b %d, %Y, %H:%M %Z")
#                 return dt.isoformat()
#             except ValueError:
#                 pass  # Couldn’t parse, will fall back later

#             # Return raw if parsing failed (optional)
#             return raw_time
#     except Exception as e:
#         print(f"Error fetching time for {article_url}: {e}")
#     return None

# def scrape_toi(limit=20):
#     url = "https://timesofindia.indiatimes.com/home/headlines"
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(url, headers=headers, timeout=10)
#     soup = BeautifulSoup(res.text, "lxml")

#     headlines = []

#     # 1) Regular text headlines
#     for i, a in enumerate(soup.select("span.w_tle > a")):
#         if i >= limit:
#             break
#         title = a.get_text(strip=True)
#         link = a.get("href", "")
#         if link and not link.startswith("http"):
#             link = "https://timesofindia.indiatimes.com" + link

#         published_at = get_article_time(link)
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "Times of India",
#             "scraped_at": datetime.utcnow().isoformat()
#         })

#     # 2) Video headlines
#     for fig in soup.select("figcaption"):
#         title = fig.get_text(strip=True)
#         parent_a = fig.find_parent("a")
#         if parent_a:
#             link = parent_a.get("href", "")
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link

#             published_at = get_article_time(link)
#             headlines.append({
#                 "title": title,
#                 "link": link,
#                 "published_at": published_at,
#                 "source": "Times of India",
#                 "scraped_at": datetime.utcnow().isoformat()
#             })

#     return headlines

# if __name__ == "__main__":
#     data = scrape_toi()
#     print(f"Scraped TOI headlines: {len(data)}")
    
#     if data:
#         collection.insert_many(data)
#         print(f"Inserted {len(data)} headlines into MongoDB.")
#     else:
#         print("No headlines to insert!")

#     for item in data[:20]:
#         print(item)

# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime
# from pymongo import MongoClient

# app = Flask(__name__)

# # MongoDB connection
# # client = MongoClient("mongodb://localhost:27017/")
# # db = client["newsdb"]
# # collection = db["toi_news"]

# def get_article_time(article_url):
#     """Fetch article published/updated time from TOI article page and return 'Aug 12, 2025, 23:39'."""
#     try:
#         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#         soup = BeautifulSoup(res.text, "lxml")

#         time_tag = soup.select_one("div.xf8Pm.byline span")
#         if time_tag:
#             raw_time = time_tag.get_text(strip=True)  # e.g. "Updated: Aug 12, 2025, 23:39 IST"

#             # Just strip known prefixes/suffixes
#             cleaned_time = (
#                 raw_time.replace("Updated:", "")
#                         .replace("Published on", "")
#                         .replace("IST", "")
#                         .strip()
#             )

#             return cleaned_time  # directly return "Aug 12, 2025, 23:39"

#     except Exception as e:
#         print(f"Error fetching time for {article_url}: {e}")
#     return "Unknown"



# def scrape_toi(limit=20):
#     url = "https://timesofindia.indiatimes.com/home/headlines"
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(url, headers=headers, timeout=10)
#     soup = BeautifulSoup(res.text, "lxml")

#     headlines = []

#     # Text headlines
#     for i, a in enumerate(soup.select("span.w_tle > a")):
#         if i >= limit:
#             break
#         title = a.get_text(strip=True)
#         link = a.get("href", "")
#         if link and not link.startswith("http"):
#             link = "https://timesofindia.indiatimes.com" + link

#         published_at = get_article_time(link)
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "Times of India",
#             "scraped_at": datetime.utcnow().isoformat()
#         })

#     # Video headlines
#     for fig in soup.select("figcaption"):
#         title = fig.get_text(strip=True)
#         parent_a = fig.find_parent("a")
#         if parent_a:
#             link = parent_a.get("href", "")
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link

#             published_at = get_article_time(link)
#             headlines.append({
#                 "title": title,
#                 "link": link,
#                 "published_at": published_at,
#                 "source": "Times of India",
#                 "scraped_at": datetime.utcnow().isoformat()
#             })

#     return headlines




# # 



# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup
# from datetime import datetime
# from pymongo import MongoClient

# app = Flask(__name__)

# client = MongoClient("mongodb://localhost:27017/")
# db = client["newsdb"]
# collection = db["toi_news"]

# # def get_article_time(article_url):
# #     """Fetch article published/updated time from TOI article page and return 'Aug 12, 2025, 23:39'."""
# #     try:
# #         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
# #         soup = BeautifulSoup(res.text, "lxml")

# #         time_tag = soup.select_one("div.xf8Pm.byline span")
# #         if time_tag:
# #             raw_time = time_tag.get_text(strip=True)  # e.g. "Updated: Aug 12, 2025, 23:39 IST"

# #             # Just strip known prefixes/suffixes
# #             cleaned_time = (
# #                 raw_time.replace("Updated:", "")
# #                         .replace("Published on", "")
# #                         .replace("IST", "")
# #                         .strip()
# #             )

# #             return cleaned_time  # directly return "Aug 12, 2025, 23:39"

# #     except Exception as e:
# #         print(f"Error fetching time for {article_url}: {e}")
# #     return "Unknown"

# def get_article_time(article_url):
#     """Fetch article published/updated time from TOI article page and return 'Aug 16, 2025, 19:17'."""
#     try:
#         res = requests.get(article_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
#         res.raise_for_status()
#         soup = BeautifulSoup(res.text, "lxml")

#         # Select the <span> inside the byline div
#         time_tag = soup.select_one("div.xf8Pm.byline span")
#         if time_tag:
#             raw_time = time_tag.get_text(strip=True)  # "Updated: Aug 16, 2025, 19:17 IST"
#             cleaned_time = raw_time.replace("Updated:", "").replace("Published on", "").replace("IST", "").strip()
#             return cleaned_time  # Output: Aug 16, 2025, 19:17

#     except Exception as e:
#         print(f"Error fetching time for {article_url}: {e}")
#         return "Unknown"



# def scrape_toi(limit=20):
#     url = "https://timesofindia.indiatimes.com/home/headlines"
#     headers = {"User-Agent": "Mozilla/5.0"}
#     res = requests.get(url, headers=headers, timeout=10)
#     soup = BeautifulSoup(res.text, "lxml")

#     headlines = []

#     # Text headlines
#     for i, a in enumerate(soup.select("span.w_tle > a")):
#         if i >= limit:
#             break
#         title = a.get_text(strip=True)
#         link = a.get("href", "")
#         if link and not link.startswith("http"):
#             link = "https://timesofindia.indiatimes.com" + link

#         # Fetch published_at from article page
#         published_at = get_article_time(link)
#         #print(published_at)
#         headlines.append({
#             "title": title,
#             "link": link,
#             "published_at": published_at,
#             "source": "Times of India",
#             "scraped_at": datetime.utcnow().isoformat()
#         })

#     # Video headlines
#     for fig in soup.select("figcaption"):
#         title = fig.get_text(strip=True)
#         parent_a = fig.find_parent("a")
#         if parent_a:
#             link = parent_a.get("href", "")
#             if link and not link.startswith("http"):
#                 link = "https://timesofindia.indiatimes.com" + link

#             published_at = get_article_time(link)

#             headlines.append({
#                 "title": title,
#                 "link": link,
#                 "published_at": published_at,
#                 "source": "Times of India",
#                 "scraped_at": datetime.utcnow().isoformat()
#             })

#     return headlines

# if __name__ == "__main__":
#     data = scrape_toi()
#     print(f"Scraped TOI headlines: {len(data)}")

#     if data:
#         collection.insert_many(data)
#         print(f"Inserted {len(data)} headlines into MongoDB.")

#     for item in data[:20]:
#         print(item)
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient

# Note: The scraper files themselves don't need to be Flask apps.
# The `if __name__ == "__main__"` block is for local testing.
# I've removed the redundant app/client setup here to make it a clean module.

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
    url = "https://timesofindia.indiatimes.com/home/headlines"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    headlines = []
    try:
        res = requests.get(url, headers=headers, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "lxml")

        # Text headlines
        for i, a in enumerate(soup.select("span.w_tle > a")):
            if i >= limit:
                break
            title = a.get_text(strip=True)
            link = a.get("href", "")
            if link and not link.startswith("http"):
                link = "https://timesofindia.indiatimes.com" + link

            published_at = get_article_time(link)
            
            headlines.append({
                "title": title,
                "link": link,
                "published_at": published_at,
                "source": "Times of India",
                "scraped_at": datetime.utcnow().isoformat()
            })

        # Video headlines
        for fig in soup.select("figcaption"):
            if len(headlines) >= limit:
                break
            title = fig.get_text(strip=True)
            parent_a = fig.find_parent("a")
            if parent_a:
                link = parent_a.get("href", "")
                if link and not link.startswith("http"):
                    link = "https://timesofindia.indiatimes.com" + link

                published_at = get_article_time(link)

                headlines.append({
                    "title": title,
                    "link": link,
                    "published_at": published_at,
                    "source": "Times of India",
                    "scraped_at": datetime.utcnow().isoformat()
                })
    except requests.exceptions.RequestException as e:
        print(f"Error scraping TOI: {e}")
        return []

    return headlines

if __name__ == "__main__":
    data = scrape_toi()
    print(f"Scraped TOI headlines: {len(data)}")
    for item in data[:5]:
        print(item)