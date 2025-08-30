

import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";

export default function SentimentAnalysis({ timeframe, sentiment, source }) {
  const { t } = useTranslation();
  const [graphData, setGraphData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [hoveredSentiment, setHoveredSentiment] = useState(null);
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

  useEffect(() => {
    const fetchSentimentData = async () => {
      setLoading(true);
      setError(null);
      setStartAnimation(false); // Reset animation state on new fetch
      try {
        const url = `http://127.0.0.1:5000/sentiment-graph?timeframe=${timeframe}&sentiment=${sentiment}&source=${source}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        setGraphData(data);
        setTimeout(() => setStartAnimation(true), 100); // Trigger animation slightly after data is set
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSentimentData();
  }, [timeframe, sentiment, source]);

  const getConicGradient = (data) => {
    let currentPercentage = 0;
    const colors = {
      positive: "#10B981", // green-500
      neutral: "#3B82F6", // blue-500
      negative: "#EF4444", // red-500
    };

    const segments = [];
    if (data.positive > 0) {
      segments.push(`${colors.positive} 0% ${data.positive}%`);
    }
    currentPercentage += data.positive;
    if (data.neutral > 0) {
      segments.push(`${colors.neutral} ${currentPercentage}% ${currentPercentage + data.neutral}%`);
    }
    currentPercentage += data.neutral;
    if (data.negative > 0) {
      segments.push(`${colors.negative} ${currentPercentage}% ${currentPercentage + data.negative}%`);
    }
    return `conic-gradient(${segments.join(", ")})`;
  };

  const sentimentDataArray = [
    { label: t("Positive"), value: graphData.positive, color: "#10B981", key: "positive" },
    { label: t("Neutral"), value: graphData.neutral, color: "#3B82F6", key: "neutral" },
    { label: t("Negative"), value: graphData.negative, color: "#EF4444", key: "negative" },
  ];

  if (loading) {
    return (
      <div className={`p-6 rounded-lg shadow-md flex items-center justify-center h-48 ${darkMode ?"bg-gray-800":"bg-white"}`}>
        <p className="text-gray-500">Loading graph...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={` p-6 rounded-lg shadow-md flex items-center justify-center h-48 ${darkMode ?"bg-gray-800":"bg-white"}`}>
        <p className="text-red-500">Error loading graph.</p>
      </div>
    );
  }

  return (
    <div className={`  p-6 rounded-lg shadow-md ${startAnimation ? 'animate-fadeIn' : ''} ${darkMode ?"bg-gray-800":"bg-white"}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          z-index: 10;
          font-size: 0.875rem;
          white-space: nowrap;
          transform: translate(-50%, -100%);
          pointer-events: none;
          transition: opacity 0.2s ease-in-out;
          opacity: 0;
        }
        .tooltip-visible {
          opacity: 1;
        }
        .segment {
          transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
        }
        .segment:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      <h3 className={`text-lg font-bold   mb-4 ${darkMode ?"text-white":"text-gray-900"}`}>
        {t("Sentiment Analysis")}
      </h3>
      <div className="relative w-48 h-48 mx-auto" onMouseLeave={() => setHoveredSentiment(null)}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" strokeWidth="10" />
          {sentimentDataArray.map((item, index) => {
            if (item.value > 0) {
              const prevTotal = sentimentDataArray.slice(0, index).reduce((acc, curr) => acc + curr.value, 0);
              const startAngle = (prevTotal / 100) * 360;
              const endAngle = ((prevTotal + item.value) / 100) * 360;
              const largeArcFlag = item.value > 50 ? 1 : 0;
              
              const startX = 50 + 45 * Math.cos(startAngle * Math.PI / 180);
              const startY = 50 + 45 * Math.sin(startAngle * Math.PI / 180);
              const endX = 50 + 45 * Math.cos(endAngle * Math.PI / 180);
              const endY = 50 + 45 * Math.sin(endAngle * Math.PI / 180);

              return (
                <path 
                  key={item.key} 
                  d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                  fill={item.color}
                  className="segment"
                  onMouseEnter={() => setHoveredSentiment(item)}
                />
              );
            }
            return null;
          })}
        </svg>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full w-24 h-24 flex items-center justify-center border-4   ${darkMode ? "border-gray-800 bg-gray-800":"border-white bg-white "}`}>
          <div className="text-center">
            <span className="block text-red-500 text-2xl font-bold">{graphData.negative}%</span>
            <span className="block text-sm text-gray-500">{t("Negative")}</span>
          </div>
        </div>
        {hoveredSentiment && (
          <div className="tooltip" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -120%)' }}>
            {hoveredSentiment.label} ({hoveredSentiment.value}%)
          </div>
        )}
      </div>
      <div className={`flex justify-around mt-4 text-sm font-medium transition-all duration-1000 ease-in-out ${startAnimation ? 'opacity-100' : 'opacity-0'}`}>
        {sentimentDataArray.map((item) => (
          <div key={item.key} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className={` dark: ${darkMode ?"text-white":"text-gray-900"}`}>{item.label} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
