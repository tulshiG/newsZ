import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { motion } from "framer-motion";
import { FaRegClock, FaNewspaper, FaRegEye, FaClock, FaHourglassHalf } from "react-icons/fa";

// 1. Import the WeatherSection component
import WeatherSection from "./WeatherSection";

// Define the feature data array
const features = [
  {
    icon: <FaRegClock />,
    title: "Real-time Updates",
    description: "Get instant headlines as they break from across the country."
  },
  {
    icon: <FaNewspaper />,
    title: "Multiple Newspapers",
    description: "Access news from a curated list of India's top publications in one place."
  },
  {
    icon: <FaHourglassHalf />,
    title: "Time-Saving",
    description: "Quickly scan trending topics and read what matters most to you."
  }
];

export default function Hero() {
  const { t } = useTranslation();
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
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className={`relative w-full py-20 overflow-hidden ${darkMode ? " text-white" : "bg-gray-50 text-gray-900 "}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content (Centered) */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="lg:max-w-3xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-bl ${darkMode ? "from-blue-600 to-purple-600 " : "from-blue-600 to-sky-600"}`}
                variants={itemVariants}
              >
                {t("Save Time. Stay Informed.")}
              </motion.h1>
              <motion.p
                className={`text-lg max-w-2xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                variants={itemVariants}
              >
                {t("Your go-to source for a timeline of Indian news, consolidating headlines from multiple newspapers for a fast, efficient reading experience.")}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <a
                  href="/newspapers"
                  className={`px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors`}
                >
                  {t("Explore News")}
                </a>
                <a
                  href="/timeline"
                  className={`px-8 py-4 border-2 border-gray-400 dark:border-gray-600 rounded-full font-bold text-lg transition-colors ${darkMode ? "text-gray-200 hover:bg-gray-800 " : "text-gray-900 hover:bg-gray-200"}`}
                >
                  {t("View Timeline")}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* 2. Render the WeatherSection component here */}
        <WeatherSection />
        
        {/* Feature Cards Section */}
        <div className="mt-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ${darkMode ? "hover:bg-gray-700 bg-gray-800" : "hover:bg-gray-200 bg-white"}`}
                variants={itemVariants}
              >
                <div className={`text-4xl mb-4 flex justify-center ${darkMode ? "text-purple-400" : "text-blue-500"}`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{t(feature.description)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
