import React, { useEffect, useState } from "react";
import TimelineCard from "./TimelineCard";
import { useTranslation } from "../context/TranslationContext";

// New components for the sidebar
import SentimentAnalysis from "./SentimentGraph";


export default function Timeline() {
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedHeadlines, setSavedHeadlines] = useState([]); // State for saved headlines
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));
  // Filters
  const [timeframe, setTimeframe] = useState("today");
  const [sentiment, setSentiment] = useState("all sentiments");
  const [source, setSource] = useState("all sources");


  
  // SAFE translation extraction:
  const translation = useTranslation();
  const t = translation?.t || ((k) => k);
  const currentLanguage =
    translation?.currentLanguage ?? translation?.i18n?.language ?? "en";
  const setLanguageFromContext = translation?.setLanguage;
  const i18n = translation?.i18n;

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
  // helper to change language safely
  const safeSetLanguage = (lng) => {
    if (typeof setLanguageFromContext === "function") {
      setLanguageFromContext(lng);
      return;
    }
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng);
      return;
    }
    console.warn("No language setter available in Translation context");
  };

  // A handler to update the saved list when a headline is saved
  const handleHeadlineSaved = (newHeadline) => {
    setSavedHeadlines(prev => [...prev, newHeadline]);
  };

  // ✅ New function to fetch saved headlines - THIS IS THE CORRECTED CODE
  const fetchSavedHeadlines = async (userEmail) => {
    if (!userEmail) return;
    try {
      const res = await fetch("http://127.0.0.1:5000/saved-headlines", {
        method: "POST", // ✅ Change this from GET to POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }), // ✅ Send email in the request body
      });
      if (!res.ok) throw new Error("Failed to fetch saved headlines");
      const data = await res.json();
      setSavedHeadlines(data);
    } catch (err) {
      console.error("Error fetching saved headlines:", err);
    }
  };

  // Effect hook to fetch news headlines
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `http://127.0.0.1:5000/scrape-timeline?timeframe=${timeframe}&sentiment=${sentiment}&source=${source}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        let sortedData = [];

        if (Array.isArray(data)) {
          sortedData = data.sort((a, b) => {
            const dateA = a.published_at || a.scraped_at || "";
            const dateB = b.published_at || b.scraped_at || "";
            if (!dateA) return 1;
            if (!dateB) return -1;
            return new Date(dateB) - new Date(dateA);
          });
        } else if (data.status === "success" && Array.isArray(data.headlines)) {
          sortedData = data.headlines.sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          );
        } else {
          throw new Error(data.message || "Unexpected API response");
        }

        setAllItems(sortedData);
        setVisibleItems(sortedData.slice(0, 20));
        setVisibleCount(20);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [timeframe, sentiment, source]);

  // Effect hook to fetch saved headlines
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    fetchSavedHeadlines(userEmail);
  }, []); // Run only once on component mount

  const handleShowMore = () => {
    const newCount = visibleCount + 20;
    setVisibleCount(newCount);
    setVisibleItems(allItems.slice(0, newCount));
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold   ${darkMode ?"text-white":"text-gray-900"}`}>
              {t("Latest Headlines")}
            </h2>
          </div>

          {/* Filters UI */}
          <div className={`flex flex-col sm:flex-row flex-wrap gap-4 p-4 rounded-lg  ${darkMode ?"bg-gray-800 ":"bg-gray-100"}`}>
            <div className="flex-1">
              <label className={`block  mb-1 font-semibold text-sm ${darkMode ? "text-gray-300":"text-gray-700"}`}>
                {t("Timeframe")}
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className={`w-full p-2 text-sm border  rounded-md ${darkMode ?"bg-gray-700 text-gray-100":"text-gray-900 border-gray-300 bg-white"}`}
              >
                <option value="today">{t("Today")}</option>
                <option value="this week">{t("This Week")}</option>
                <option value="this month">{t("This Month")}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className={`block mb-1 font-semibold text-sm ${darkMode ? "text-gray-300":"text-gray-700"}`}>
                {t("Sentiment")}
              </label>
              <select
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value)}
                className={`w-full p-2 text-sm border rounded-md ${darkMode ? "border-gray-600 bg-gray-700 text-gray-100":"text-gray-900 bg-white border-gray-300"}`}
              >
                <option value="all sentiments">{t("All Sentiments")}</option>
                <option value="positive">{t("Positive")}</option>
                <option value="neutral">{t("Neutral")}</option>
                <option value="negative">{t("Negative")}</option>
              </select>
            </div>
            <div className="flex-1">
              <label className={`block mb-1 font-semibold text-sm ${darkMode ?"text-gray-300":"text-gray-700"}`}>
                {t("Source")}
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={`w-full p-2 text-sm border rounded-md    ${darkMode ?"bg-gray-700 text-gray-100 border-gray-600":"text-gray-900 bg-white border-gray-300"}`}
              >
                <option value="all sources">{t("All Sources")}</option>
                <option value="Times of India">{t("Times of India")}</option>
                <option value="The Hindu">{t("The Hindu")}</option>
                <option value="Indian Express">{t("Indian Express")}</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-20 text-gray-500">{t("Loading timeline...")}</p>
          ) : error ? (
            <p className="text-center py-20 text-red-500">{t("Error")}: {error}</p>
          ) : visibleItems.length > 0 ? (
            <>
              {visibleItems.map((item) => (
                <TimelineCard
                  key={item._id || item.link}
                  item={item}
                  savedHeadlines={savedHeadlines}
                  onSave={handleHeadlineSaved}
                />
              ))}
              {visibleItems.length < allItems.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
                    {t("Show More")}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center">{t("No news available for the selected filters.")}</p>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <SentimentAnalysis timeframe={timeframe} sentiment={sentiment} source={source} />

        </div>
      </div>
    </div>
  );
}