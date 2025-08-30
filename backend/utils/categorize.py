import re

KEYWORDS = {
    "Business": ["market", "stocks", "economy", "bank", "startup", "gdp"],
    "Sports": ["cricket", "football", "tennis", "olympic", "ipl", "match"],
    "Technology": ["tech", "ai", "software", "app", "gadget", "startup"],
    "Entertainment": ["movie", "film", "bollywood", "music", "celebrity", "show"],
    "International": ["us ", "china", "russia", "world", "uk", "pakistan"],
    "Science": ["space", "isro", "nasa", "research", "study", "scientist"],
    "Opinion": ["opinion", "editorial", "column", "view"],
}

PATH_HINTS = [
    ("Business", ["business", "economy", "markets"]),
    ("Sports", ["sports", "cricket", "football"]),
    ("Technology", ["technology", "tech", "gadgets"]),
    ("Entertainment", ["entertainment", "bollywood", "lifestyle"]),
    ("International", ["world", "international"]),
    ("Science", ["science", "space"]),
    ("Opinion", ["opinion", "editorial"]),
]

def categorize(title: str, url: str) -> str:
    url_l = (url or "").lower()
    for cat, parts in PATH_HINTS:
        if any(p in url_l for p in parts):
            return cat
    t = (title or "").lower()
    for cat, kws in KEYWORDS.items():
        if any(re.search(r"\b" + re.escape(k) + r"\b", t) for k in kws):
            return cat
    # fallback by geography hint
    if any(x in t for x in ["state", "minister", "parliament", "assembly"]):
        return "National"
    return "National"