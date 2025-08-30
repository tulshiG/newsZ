from pymongo import MongoClient
import os

def get_db():
    client = MongoClient("mongodb://localhost:27017/")  
    db = client["newspapers_db"]  # new db only for newspapers
    return db

def clean_text(text):
    return text.strip().replace("\n", " ") if text else ""
