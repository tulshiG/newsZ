import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/TranslationContext";

export default function WeatherSection() {
  const { t } = useTranslation();

  const weatherData = [
    { icon: "🌞", value: "28°C", label: t("Mumbai") },
    { icon: "💨", value: "12 km/h", label: t("Wind") },
    { icon: "💧", value: "65%", label: t("Humidity") },
    { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
  ];

  const weatherContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5, // Delays the whole weather section animation
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const weatherItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={weatherContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            {weatherData.map((w, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                variants={weatherItemVariants}
              >
                <span className="text-lg">{w.icon}</span>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {w.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {w.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
            {t("Last updated")}: 10:38:31 am
          </div>
        </div>
      </div>
    </motion.div>
  );
}