import requests
from bs4 import BeautifulSoup
from .utils import get_db, clean_text

def scrape_indianexpress():
    url = "https://indianexpress.com/section/india/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    db = get_db()
    ie_col = db["indian_express"]

    articles = []
    for item in soup.select("div.title a"):  # adjust selector
        title = clean_text(item.get_text())
        link = item.get("href")
        category = "India"

        data = {"title": title, "link": link, "category": category, "source": "Indian Express"}
        articles.append(data)
        ie_col.update_one({"link": link}, {"$set": data}, upsert=True)

    return articles
