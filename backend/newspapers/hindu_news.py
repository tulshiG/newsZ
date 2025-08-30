# import requests
# from bs4 import BeautifulSoup
# from .utils import get_db, clean_text

# def scrape_hindu():
#     url = "https://www.thehindu.com/news/"
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, "html.parser")

#     db = get_db()
#     hindu_col = db["the_hindu"]

#     articles = []
#     for item in soup.select("a.story-card"):  # adjust selector
#         title = clean_text(item.get_text())
#         link = item.get("href")
#         category = "General"

#         data = {"title": title, "link": link, "category": category, "source": "The Hindu"}
#         articles.append(data)
#         hindu_col.update_one({"link": link}, {"$set": data}, upsert=True)

#     return articles

import requests
from bs4 import BeautifulSoup

def scrape_thehindu():
    url = "https://www.thehindu.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    articles = []
    for item in soup.select("a"):
        title = item.get_text().strip()
        link = item.get("href")

        if title and link:
            if any(word in title.lower() for word in ["politics", "parliament"]):
                category = "Politics"
            elif any(word in title.lower() for word in ["match", "cricket", "sports"]):
                category = "Sports"
            elif any(word in title.lower() for word in ["business", "finance", "economy"]):
                category = "Business"
            else:
                category = "General"

            articles.append({
                "title": title,
                "link": link,
                "source": "The Hindu",
                "category": category
            })

    return articles
