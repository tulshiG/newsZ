
import React from "react";
import { useTranslation } from "../context/TranslationContext";

export default function TrendingKeywords() {
   const { t } = useTranslation();

   // This data would ideally be fetched from a server endpoint
   // For now, it's hardcoded to match your design
   const keywords = [
      { label: t("Climate"), color: "bg-blue-200 text-blue-800" },
      { label: t("Technology"), color: "bg-green-200 text-green-800" },
      { label: t("Economy"), color: "bg-yellow-200 text-yellow-800" },
      { label: t("Healthcare"), color: "bg-red-200 text-red-800" },
      { label: t("Elections"), color: "bg-purple-200 text-purple-800" },
      { label: t("Innovation"), color: "bg-indigo-200 text-indigo-800" },
   ];

   return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t("Trending Keywords")}
         </h3>
         <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
               <span
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full font-medium ${keyword.color}`}
               >
                  {keyword.label}
               </span>
            ))}
         </div>
      </div>
   );
}