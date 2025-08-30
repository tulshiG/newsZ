# # timeline_merge.py
# from toi import scrape_toi
# from thehindu import scrape_thehindu

# def normalize_title(title):
#     return " ".join(title.lower().split())

# def get_common_headlines():
#     toi_news = scrape_toi()
#     hindu_news = scrape_thehindu()

#     # Create a map for titles
#     toi_map = {normalize_title(n["title"]): n for n in toi_news}
#     hindu_map = {normalize_title(n["title"]): n for n in hindu_news}

#     common = []
#     for title_norm, toi_item in toi_map.items():
#         if title_norm in hindu_map:
#             hindu_item = hindu_map[title_norm]
#             merged_item = {
#                 "title": toi_item["title"],
#                 "link": toi_item["link"],  # could merge links if needed
#                 "sources": sorted(set(toi_item["sources"] + hindu_item["sources"])),
#                 "published_at": toi_item["published_at"],
#                 "fetched_at": toi_item["fetched_at"],
#                 "summary": None,
#                 "sentiment": "neutral"
#             }
#             common.append(merged_item)

#     return common

# if __name__ == "__main__":
#     for item in get_common_headlines():
#         print(item)
# backend/scrapers/timeline_merge.py
# backend/scrapers/timeline_merge.py
from scrapers.toi import scrape_toi
from scrapers.thehindu import scrape_thehindu
from datetime import datetime
from difflib import SequenceMatcher

SIMILARITY_THRESHOLD = 0.75  # Adjust: 1.0 = exact match, lower = looser match


def are_similar(title1, title2):
    return SequenceMatcher(None, title1.lower(), title2.lower()).ratio() >= SIMILARITY_THRESHOLD


def get_common_headlines():
    toi_news = scrape_toi()
    hindu_news = scrape_thehindu()

    merged = []

    for toi_item in toi_news:
        matched = False
        for hindu_item in hindu_news:
            if are_similar(toi_item["title"], hindu_item["title"]):
                merged.append({
                    "title": toi_item["title"],
                    "link": toi_item["link"],  # Prefer TOI link if similar
                    "sources": list(set(toi_item["sources"] + hindu_item["sources"])),
                    "published_at": toi_item.get("published_at") or hindu_item.get("published_at"),
                    "fetched_at": datetime.utcnow().isoformat(),
                    "summary": toi_item.get("summary") or hindu_item.get("summary"),
                    "sentiment": "neutral"
                })
                matched = True
                break
        if not matched:
            merged.append(toi_item)

    # Add The Hindu news that didn’t match any TOI
    for hindu_item in hindu_news:
        if not any(are_similar(hindu_item["title"], m["title"]) for m in merged):
            merged.append(hindu_item)

    return merged
