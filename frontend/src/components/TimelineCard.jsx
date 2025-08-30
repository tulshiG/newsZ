import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";

export default function TimelineCard({ item, savedHeadlines, onSave }) {
  const translation = useTranslation();
  const t = translation?.t || ((k) => k);
  const currentLanguage =
    translation?.currentLanguage ?? translation?.i18n?.language ?? "en";

  const [translatedTitle, setTranslatedTitle] = useState(item.title);
  const [translatedSummary, setTranslatedSummary] = useState(item.summary);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
 const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));
 useEffect(() => {
         // Function to update the darkMode state
         const updateDarkModeState = () => {
             setDarkMode(document.documentElement.classList.contains("dark"));
         };
 
         // Create a new MutationObserver
         const observer = new MutationObserver((mutations) => {
             mutations.forEach((mutation) => {
                 if (mutation.attributeName === "class") {
                     updateDarkModeState();
                 }
             });
         });
 
         // Start observing the <html> element for attribute changes
         observer.observe(document.documentElement, { attributes: true });
 
         // Initial check in case the state was already set before the component mounted
         updateDarkModeState();
 
         // Cleanup function to disconnect the observer when the component unmounts
         return () => observer.disconnect();
     }, []);
  // Mark as saved if it's in savedHeadlines prop
  useEffect(() => {
    if (savedHeadlines?.some((h) => h.headline_id === item._id || h._id === item._id)) {
      setSaved(true);
    }
  }, [savedHeadlines, item._id]);

  // Translate text on language change
  useEffect(() => {
    const translateText = async (text, setState) => {
      if (!text || currentLanguage === "en") {
        setState(text);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:5000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text, lang: currentLanguage }),
        });

        const data = await res.json();
        if (data?.translated) {
          setState(data.translated);
        } else {
          setState(text);
        }
      } catch (err) {
        console.error("Translation error:", err);
        setState(text);
      }
    };

    translateText(item.title, setTranslatedTitle);
    translateText(item.summary, setTranslatedSummary);
  }, [item.title, item.summary, currentLanguage]);

  // Handle saving the headline
  const handleSave = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in to save headlines.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/save_headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          headline_id: item._id,
          title: item.title,
          source: item.source,
          sentiment: item.sentiment,
          link: item.link,
          summary: item.summary,
          published_at: item.published_at || item.scraped_at,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        if (onSave) onSave({ ...item, headline_id: item._id }); // ✅ Notify parent
      } else {
        alert(data.message || "Failed to save headline");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong while saving");
    } finally {
      setSaving(false);
    }
  };

  const sentimentColors = {
    positive: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    negative: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    neutral: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  };

  const sourceColors = {
    "The Hindu": "bg-red-100 text-red-600",
    "Times of India": "bg-purple-100 text-purple-700",
    "The Pioneer": "bg-blue-100 text-blue-700",
  };

  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.round(hours / 24)} days ago`;
  };

  return (
    <div className={`  rounded-lg p-6 shadow-md border  ${darkMode ?"bg-gray-800 border-gray-700":"bg-white border-gray-200"}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-sm font-bold uppercase  ${darkMode ?"text-gray-300":"text-gray-700"}`}>
          {item.category || ""}
           <span>• </span>
          <span>{formatTimeAgo(item.published_at || item.scraped_at)}</span>
        </span>
        {item.sentiment && (
          <span
            className={`px-2 py-1 text-xs rounded-full font-semibold ${
              sentimentColors[item.sentiment?.toLowerCase()]
            }`}
          >
            {t(item.sentiment)}
          </span>
        )}
      </div>

      <h3 className={`text-lg font-bold mb-2 leading-snug ${darkMode ?"text-white":"text-gray-900 "}`}>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {translatedTitle}
          </a>
        ) : (
          translatedTitle
        )}
      </h3>

      {translatedSummary && (
        <p className={`  text-sm mb-3${darkMode ?"text-gray-400":"text-gray-600"}`}>
          {translatedSummary}
        </p>
      )}
       
      <div className={`flex items-center space-x-2 text-sm  mb-3 ${darkMode ? "text-gray-400":"text-gray-500"}`}>
        {item.source && (
          <>
            <span
              className={`px-2 py-1 text-xs rounded-full font-semibold ${
                sourceColors[item.source] || "bg-gray-100 text-gray-600"
              }`}
            >
              {item.source}
            </span>
           
          </>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving || saved}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          saved
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {saved ? "Saved" : saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
