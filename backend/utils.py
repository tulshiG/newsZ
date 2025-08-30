import re
from difflib import SequenceMatcher

def normalize_title(title):
    # remove punctuation, lower, collapse spaces
    t = re.sub(r"[^\w\s]", "", title or "").lower()
    t = re.sub(r"\s+", " ", t).strip()
    return t

def compute_sentiment(text):
    # simple placeholder: you can replace with TextBlob or a model
    # naive: if contains 'rise' or 'gain' -> positive, 'drop' or 'attack' -> negative
    txt = (text or "").lower()
    if any(x in txt for x in ["gain","rise","historic","agree","win","growth","record"]):
        return "positive"
    if any(x in txt for x in ["crash","attack","dies","dead","decline","drop","loss","accident"]):
        return "negative"
    return "neutral"
