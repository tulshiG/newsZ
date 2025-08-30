import React, { useEffect, useState } from "react";

export default function WordCloud() {
  const [imgUrl, setImgUrl] = useState(null);
  const [frequentWords, setFrequentWords] = useState([]);
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
    // Fetch word cloud image
    fetch("http://127.0.0.1:5000/wordcloud")
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImgUrl(url);
      })
      .catch(err => console.error("Error fetching word cloud:", err));

    // Fetch frequent words
    fetch("http://127.0.0.1:5000/frequent-words")
      .then(res => res.json())
      .then(data => setFrequentWords(data))
      .catch(err => console.error("Error fetching frequent words:", err));
  }, []);

  // Find the max count for scaling progress bars
  const maxCount = frequentWords.length > 0 ? Math.max(...frequentWords.map(w => w.count)) : 1;

  return (
    <div className={`min-h-screen px-7 py-10 ${darkMode ?"bg-gray-900":"bg-white"}`}>
      {/* Word Cloud */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 flex items-center justify-center ${darkMode ?"text-white":"text-gray-900"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud h-10 w-10 mr-3 text-blue-600">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
            News Word Cloud
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ?"text-gray-400":"text-gray-600"}`}>
            Visualize trending keywords and topics from news headlines across different newspapers and categories.
          </p>
        </div>
        </div>
      <div className="flex justify-center mb-10">
        {imgUrl ? (
          <img 
            src={imgUrl} 
            alt="Headline Cloud" 
            className="max-w-full h-auto rounded-lg shadow-lg" 
          />
        ) : (
          <p className="text-gray-300">Loading Word Cloud...</p>
        )}
      </div>

      {/* Most Frequent Words */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-5">Most Frequent Words</h2>
        <ul className="space-y-3">
          {frequentWords.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-gray-300">
                <span className="font-bold text-white mr-2">#{index + 1}</span>
                {item.word}
              </span>
              <div className="flex items-center space-x-2 w-1/2">
                <span className="text-sm text-gray-400">{item.count} times</span>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

