// import React from "react";

// export default function Hero() {
//   return (
//     <section className="relative  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//       {/* Hero Text */}
      
      
//       <div className="text-center">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6">
//           Your Gateway to
//           <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//             Indian News
//           </span>
//         </h1>
//         <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
//           Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="/newspapers"
//             className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
//           >
//             Explore Newspapers
//           </a>
//           <a
//             href="/timeline"
//             className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
//           >
//             View Timeline
//           </a>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
//         <div>
//           <div className="flex justify-center mb-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-globe h-8 w-8 text-blue-600"
//             >
//               <circle cx="12" cy="12" r="10"></circle>
//               <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
//               <path d="M2 12h20"></path>
//             </svg>
//           </div>
//           <div className="text-2xl font-bold">6</div>
//           <div className="text-blue-200 text-sm">Newspapers</div>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-book-open h-8 w-8 text-green-600"
//             >
//               <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//               <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//             </svg>
//           </div>
//           <div className="text-2xl font-bold">2.4K</div>
//           <div className="text-blue-200 text-sm">Articles Today</div>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-users h-8 w-8 text-purple-600"
//             >
//               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
//               <circle cx="9" cy="7" r="4"></circle>
//               <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
//               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//             </svg>
//           </div>
//           <div className="text-2xl font-bold">45.2K</div>
//           <div className="text-blue-200 text-sm">Active Readers</div>
//         </div>

//         <div>
//           <div className="flex justify-center mb-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-zap h-8 w-8 text-orange-600"
//             >
//               <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
//             </svg>
//           </div>
//           <div className="text-2xl font-bold">24/7</div>
//           <div className="text-blue-200 text-sm">Live Updates</div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React from "react";

// export default function Hero() {
//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//       {/* Hero Text */}
//       <div className="text-center">
//         <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           Your Gateway to
//           <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//             Indian News
//           </span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="/newspapers"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
//           >
//             Explore Newspapers
//           </a>
//           <a
//             href="/timeline"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//           >
//             View Timeline
//           </a>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//         {/* Each stat */}
//         {[
//           { icon: "🌐", number: "6", label: "Newspapers" },
//           { icon: "📰", number: "2.4K", label: "Articles Today" },
//           { icon: "👥", number: "45.2K", label: "Active Readers" },
//           { icon: "⚡", number: "24/7", label: "Live Updates" },
//         ].map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//             <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//             <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Weather & AQI Section */}
//       <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 p-4 sm:p-6 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           {/* Weather items */}
//           <div className="flex flex-wrap justify-center md:justify-start gap-6">
//             {[
//               { icon: "🌞", value: "28°C", label: "Mumbai" },
//               { icon: "💨", value: "12 km/h", label: "Wind" },
//               { icon: "💧", value: "65%", label: "Humidity" },
//               { icon: "🌫️", value: "AQI 95", label: "Moderate" },
//             ].map((w, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="text-lg">{w.icon}</span>
//                 <div>
//                   <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                     {w.value}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">{w.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Last updated */}
//           <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//             Last updated: 10:38:31 am
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React from "react";
// import { useTranslation } from "../context/TranslationContext"; // Import the useTranslation hook

// // Remove the props t and currentLanguage from the component signature
// export default function Hero() {
//   // Get the translation function 't' from the context
//   const { t } = useTranslation();

//   // The rest of the component logic remains the same

//   // Example weather data (can be dynamic later)
//   const weatherData = [
//     { icon: "🌞", value: "28°C", label: t("Mumbai") },
//     { icon: "💨", value: "12 km/h", label: t("Wind") },
//     { icon: "💧", value: "65%", label: t("Humidity") },
//     { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
//   ];

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//       {/* Hero Text */}
//       <div className="text-center">
//         <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           {t("Your Gateway to")}
//           <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//             {t("Indian News")}
//           </span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           {t(
//             "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//           )}
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="/newspapers"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
//           >
//             {t("Explore Newspapers")}
//           </a>
//           <a
//             href="/timeline"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//           >
//             {t("View Timeline")}
//           </a>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//         {statsData.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//             <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//             <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Weather & AQI Section */}
//       <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 p-4 sm:p-6 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           {/* Weather items */}
//           <div className="flex flex-wrap justify-center md:justify-start gap-6">
//             {weatherData.map((w, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="text-lg">{w.icon}</span>
//                 <div>
//                   <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                     {w.value}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">{w.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Last updated */}
//           <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//             {t("Last updated")}: 10:38:31 am
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React from "react";
// import { useTranslation } from "../context/TranslationContext";

// export default function Hero() {
//   const { t } = useTranslation();

//   const weatherData = [
//     { icon: "🌞", value: "28°C", label: t("Mumbai") },
//     { icon: "💨", value: "12 km/h", label: t("Wind") },
//     { icon: "💧", value: "65%", label: t("Humidity") },
//     { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
//   ];

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//       <div className="text-center">
//         <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           {t("Your Gateway to")}
//           <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//             {t("Indian News")}
//           </span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           {t(
//             "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//           )}
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="/newspapers"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
//           >
//             {t("Explore Newspapers")}
//           </a>
//           <a
//             href="/timeline"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//           >
//             {t("View Timeline")}
//           </a>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//         {statsData.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//             <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//             <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 p-4 sm:p-6 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div className="flex flex-wrap justify-center md:justify-start gap-6">
//             {weatherData.map((w, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="text-lg">{w.icon}</span>
//                 <div>
//                   <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                     {w.value}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">{w.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//             {t("Last updated")}: 10:38:31 am
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





// import React from "react";
// import { useTranslation } from "../context/TranslationContext";


// export default function Hero() {
//   const { t } = useTranslation();

//   const weatherData = [
//     { icon: "🌞", value: "28°C", label: t("Mumbai") },
//     { icon: "💨", value: "12 km/h", label: t("Wind") },
//     { icon: "💧", value: "65%", label: t("Humidity") },
//     { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
//   ];

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//       <div className="text-center">
//         <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           {t("Your Gateway to")}
//           <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//             {t("Indian News")}
//           </span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           {t(
//             "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//           )}
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <a
//             href="/newspapers"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
//           >
//             {t("Explore Newspapers")}
//           </a>
//           <a
//             href="/timeline"
//             className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//           >
//             {t("View Timeline")}
//           </a>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//         {statsData.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//             <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//             <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 p-4 sm:p-6 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div className="flex flex-wrap justify-center md:justify-start gap-6">
//             {weatherData.map((w, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="text-lg">{w.icon}</span>
//                 <div>
//                   <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                     {w.value}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {w.label}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//             {t("Last updated")}: 10:38:31 am
//           </div>
//         </div>
//       </div>

     
//     </section>
//   );
// }
// import React from "react";
// import { useTranslation } from "../context/TranslationContext";

// export default function Hero() {
//   const { t } = useTranslation();

//   const weatherData = [
//     { icon: "🌞", value: "28°C", label: t("Mumbai") },
//     { icon: "💨", value: "12 km/h", label: t("Wind") },
//     { icon: "💧", value: "65%", label: t("Humidity") },
//     { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
//   ];

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <>
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
//         <div className="text-center">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//               {t("Indian News")}
//             </span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
//             >
//               {t("Explore Newspapers")}
//             </a>
//             <a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//             >
//               {t("View Timeline")}
//             </a>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//           {statsData.map((item, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Weather section moved outside the main Hero component */}
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 relative z-10">
//         <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-lg shadow-lg">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex flex-wrap justify-center md:justify-start gap-6">
//               {weatherData.map((w, i) => (
//                 <div key={i} className="flex items-center gap-2">
//                   <span className="text-lg">{w.icon}</span>
//                   <div>
//                     <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                       {w.value}
//                     </div>
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       {w.label}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//               {t("Last updated")}: 10:38:31 am
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import React from "react";
// import { motion } from "framer-motion";
// import { useTranslation } from "../context/TranslationContext";
// import WeatherSection from "./WeatherSection"; // Import the new component

// export default function Hero() {
//   const { t } = useTranslation();

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   // Animation variants
//   const heroContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const heroItemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 10,
//         stiffness: 100,
//       },
//     },
//   };

//   const statItemVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         damping: 10,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
//         <motion.div
//           className="text-center"
//           variants={heroContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1
//             className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
//             variants={heroItemVariants}
//           >
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//               {t("Indian News")}
//             </span>
//           </motion.h1>

//           <motion.p
//             className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
//             variants={heroItemVariants}
//           >
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </motion.p>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//             variants={heroItemVariants}
//           >
//             <motion.a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {t("Explore Newspapers")}
//             </motion.a>
//             <motion.a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold transition-all duration-300 text-center"
//               whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#2563eb" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {t("View Timeline")}
//             </motion.a>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center"
//           variants={heroContainerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {statsData.map((item, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center"
//               variants={statItemVariants}
//             >
//               <motion.div
//                 className="text-2xl sm:text-3xl mb-2"
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 {item.icon}
//               </motion.div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* Separate Weather Section Component */}
//       <WeatherSection />
//     </>
//   );
// }
// import React from "react";
// import { useTranslation } from "../context/TranslationContext";

// export default function Hero() {
//   const { t } = useTranslation();

//   const weatherData = [
//     { icon: "🌞", value: "28°C", label: t("Mumbai") },
//     { icon: "💨", value: "12 km/h", label: t("Wind") },
//     { icon: "💧", value: "65%", label: t("Humidity") },
//     { icon: "🌫️", value: "AQI 95", label: t("Moderate") },
//   ];

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <>
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
//         <div className="text-center animate-fade-in-up">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent transform translate-y-0 opacity-100 transition-transform duration-1000">
//               {t("Indian News")}
//             </span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
//             <a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
//             >
//               {t("Explore Newspapers")}
//             </a>
//             <a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//             >
//               {t("View Timeline")}
//             </a>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center animate-fade-in">
//           {statsData.map((item, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div className="text-2xl sm:text-3xl mb-2 animate-pulse-icon">
//                 {item.icon}
//               </div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Weather Section - Now a separate block */}
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up-delay">
//         <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-lg">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
//               {weatherData.map((w, i) => (
//                 <div key={i} className="flex items-center gap-2 animate-fade-in-up">
//                   <span className="text-lg">{w.icon}</span>
//                   <div>
//                     <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
//                       {w.value}
//                     </div>
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       {w.label}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//               {t("Last updated")}: 10:38:31 am
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "../context/TranslationContext";

// export default function Hero() {
//   const { t } = useTranslation();

//   const [weatherData, setWeatherData] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState("");
//   const [city, setCity] = useState("New Delhi"); // Default city
//   const [error, setError] = useState(null);

//   // Replace with your OpenWeatherMap API key
//   const API_KEY = "2310ecb13383dc2ac14b99c8f5c7b3ad";
  

//   const getAQIStatus = (aqi) => {
//     if (aqi <= 50) return { label: t("Good"), color: "text-green-500" };
//     if (aqi <= 100) return { label: t("Moderate"), color: "text-yellow-500" };
//     if (aqi <= 150) return { label: t("Unhealthy for Sensitive Groups"), color: "text-orange-500" };
//     if (aqi <= 200) return { label: t("Unhealthy"), color: "text-red-500" };
//     if (aqi <= 300) return { label: t("Very Unhealthy"), color: "text-purple-500" };
//     return { label: t("Hazardous"), color: "text-gray-500" };
//   };

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       // Fetch current weather
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//       );
//       const weather = await weatherRes.json();

//       // Fetch AQI
//       const aqiRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//       );
//       const aqi = await aqiRes.json();
//       const aqiValue = aqi.list[0].main.aqi;
//       const aqiStatus = getAQIStatus(aqiValue);

//       // Set the city name from the API response
//       setCity(weather.name);

//       setWeatherData([
//         { icon: "🌡️", value: `${Math.round(weather.main.temp)}°C`, label: t("Temperature") },
//         { icon: "💨", value: `${Math.round(weather.wind.speed)} km/h`, label: t("Wind") },
//         { icon: "💧", value: `${weather.main.humidity}%`, label: t("Humidity") },
//         { icon: "🌫️", value: `AQI ${aqiValue}`, label: aqiStatus.label, color: aqiStatus.color },
//       ]);

//       const now = new Date();
//       setLastUpdated(now.toLocaleTimeString());
//       setError(null);

//     } catch (err) {
//       console.error("Failed to fetch weather data:", err);
//       setError("Failed to fetch weather data. Please try again.");
//     }
//   };

//   useEffect(() => {
//     // Attempt to get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           fetchWeatherData(position.coords.latitude, position.coords.longitude);
//         },
//         () => {
//           console.log("Geolocation denied or unavailable. Falling back to New Delhi.");
//           // Fallback to New Delhi if geolocation is denied or unavailable
//           fetchWeatherData(28.7041, 77.1025);
//         }
//       );
//     } else {
//       console.log("Geolocation not supported by browser. Falling back to New Delhi.");
//       // Fallback to New Delhi if geolocation is not supported
//       fetchWeatherData(28.7041, 77.1025);
//     }
    
//     // Refresh data every 10 minutes (600000 ms)
//     const interval = setInterval(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             fetchWeatherData(position.coords.latitude, position.coords.longitude);
//           },
//           () => {
//             fetchWeatherData(28.7041, 77.1025);
//           }
//         );
//       } else {
//         fetchWeatherData(28.7041, 77.1025);
//       }
//     }, 600000);

//     return () => clearInterval(interval);
//   }, []);

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <>
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
//         <div className="text-center animate-fade-in-up">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent transform translate-y-0 opacity-100 transition-transform duration-1000">
//               {t("Indian News")}
//             </span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
//             <a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
//             >
//               {t("Explore Newspapers")}
//             </a>
//             <a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-center"
//             >
//               {t("View Timeline")}
//             </a>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center animate-fade-in">
//           {statsData.map((item, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div className="text-2xl sm:text-3xl mb-2 animate-pulse-icon">
//                 {item.icon}
//               </div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Weather Section - Now with dynamic data */}
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up-delay">
//         <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-lg">
//           {error ? (
//             <div className="text-center text-red-500 dark:text-red-400">{error}</div>
//           ) : (
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
//                 {weatherData.map((w, i) => (
//                   <div key={i} className="flex items-center gap-2 animate-fade-in-up">
//                     <span className="text-lg">{w.icon}</span>
//                     <div>
//                       <div className={`text-sm sm:text-base font-semibold text-gray-900 dark:text-white ${w.color}`}>
//                         {w.value}
//                       </div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {w.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//                 {lastUpdated ? `${t("Last updated")}: ${lastUpdated}` : t("Loading...")}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useTranslation } from "../context/TranslationContext";

// export default function Hero() {
//   const { t } = useTranslation();

//   const [weatherData, setWeatherData] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState("");
//   const [city, setCity] = useState("New Delhi"); // Default city
//   const [error, setError] = useState(null);

//   // Replace with your OpenWeatherMap API key
//   const API_KEY = "2310ecb13383dc2ac14b99c8f5c7b3ad";

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       // Fetch current weather
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//       );
//       const weather = await weatherRes.json();

//       if (!weatherRes.ok) {
//         throw new Error(weather.message || "Weather API failed");
//       }

//       // Debugging logs
//       console.log("Weather API:", weather);

//       // Set the city name from the API response
//       setCity(weather.name);

//       setWeatherData([
//         {
//           icon: "🌡️",
//           value: `${Math.round(weather.main.temp)}°C`,
//           label: t("Temperature"),
//         },
//         {
//           icon: "💨",
//           value: `${Math.round(weather.wind.speed)} km/h`,
//           label: t("Wind"),
//         },
//         {
//           icon: "💧",
//           value: `${weather.main.humidity}%`,
//           label: t("Humidity"),
//         },
//       ]);

//       const now = new Date();
//       setLastUpdated(now.toLocaleTimeString());
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch weather data:", err);
//       setError("Failed to fetch weather data. Please try again.");
//     }
//   };

//   useEffect(() => {
//     // Attempt to get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           fetchWeatherData(position.coords.latitude, position.coords.longitude);
//         },
//         () => {
//           console.log("Geolocation denied. Falling back to New Delhi.");
//           fetchWeatherData(28.7041, 77.1025);
//         }
//       );
//     } else {
//       console.log("Geolocation not supported. Falling back to New Delhi.");
//       fetchWeatherData(28.7041, 77.1025);
//     }

//     // Refresh data every 10 minutes
//     const interval = setInterval(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             fetchWeatherData(position.coords.latitude, position.coords.longitude);
//           },
//           () => {
//             fetchWeatherData(28.7041, 77.1025);
//           }
//         );
//       } else {
//         fetchWeatherData(28.7041, 77.1025);
//       }
//     }, 600000);

//     return () => clearInterval(interval);
//   }, []);

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
//         <div className="text-center animate-fade-in-up">
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//               {t("Indian News")}
//             </span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg"
//             >
//               {t("Explore Newspapers")}
//             </a>
//             <a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
//             >
//               {t("View Timeline")}
//             </a>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//           {statsData.map((item, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Weather Section */}
//       {/* <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
//           {error ? (
//             <div className="text-center text-red-500 dark:text-red-400">{error}</div>
//           ) : (
//             <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//               <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6">
//                 {weatherData.map((w, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     <span className="text-lg">{w.icon}</span>
//                     <div>
//                       <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
//                         {w.value}
//                       </div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {w.label}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//                 {lastUpdated ? `${t("Last updated")}: ${lastUpdated}` : t("Loading...")}
//               </div>
//             </div>
//           )}
//         </div>
//       </div> */}
//       {/* Weather Section */}
// <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
//     {error ? (
//       <div className="text-center text-red-500 dark:text-red-400">{error}</div>
//     ) : (
//       <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//         <div>
//           {/* ✅ Show City Name */}
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left">
//             {t("Weather in")} {city}
//           </h2>

//           <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6">
//             {weatherData.map((w, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <span className="text-lg">{w.icon}</span>
//                 <div>
//                   <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
//                     {w.value} 
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {w.label}
//                   </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//               <div className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
//                 {lastUpdated ? `${t("Last updated")}: ${lastUpdated}` : t("Loading...")}
//               </div>
//             </div>
//           )}
//       </div>
//     </div>

//     </>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "../context/TranslationContext";
// import { motion } from "framer-motion"; // ✅ Import animations

// export default function Hero() {
//   const { t } = useTranslation();

//   const [weatherData, setWeatherData] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState("");
//   const [city, setCity] = useState("New Delhi"); // Default city
//   const [error, setError] = useState(null);

//   const API_KEY = "2310ecb13383dc2ac14b99c8f5c7b3ad";

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//       );
//       const weather = await weatherRes.json();

//       if (!weatherRes.ok) {
//         throw new Error(weather.message || "Weather API failed");
//       }

//       setCity(weather.name);

//       setWeatherData([
//         {
//           icon: "🌡️",
//           value: `${Math.round(weather.main.temp)}°C`,
//           label: t("Temperature"),
//         },
//         {
//           icon: "💨",
//           value: `${Math.round(weather.wind.speed)} km/h`,
//           label: t("Wind"),
//         },
//         {
//           icon: "💧",
//           value: `${weather.main.humidity}%`,
//           label: t("Humidity"),
//         },
//       ]);

//       const now = new Date();
//       setLastUpdated(now.toLocaleTimeString());
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch weather data:", err);
//       setError("Failed to fetch weather data. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           fetchWeatherData(position.coords.latitude, position.coords.longitude);
//         },
//         () => {
//           fetchWeatherData(28.7041, 77.1025); // fallback New Delhi
//         }
//       );
//     } else {
//       fetchWeatherData(28.7041, 77.1025);
//     }

//     const interval = setInterval(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             fetchWeatherData(position.coords.latitude, position.coords.longitude);
//           },
//           () => {
//             fetchWeatherData(28.7041, 77.1025);
//           }
//         );
//       } else {
//         fetchWeatherData(28.7041, 77.1025);
//       }
//     }, 600000);

//     return () => clearInterval(interval);
//   }, []);

//   const statsData = [
//     { icon: "🌐", number: "6", label: t("Newspapers") },
//     { icon: "📰", number: "2.4K", label: t("Articles Today") },
//     { icon: "👥", number: "45.2K", label: t("Active Readers") },
//     { icon: "⚡", number: "24/7", label: t("Live Updates") },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 overflow-hidden">
//         <motion.div
//           className="text-center"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
//             {t("Your Gateway to")}
//             <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
//               {t("Indian News")}
//             </span>
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             {t(
//               "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform."
//             )}
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="/newspapers"
//               className="px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg"
//             >
//               {t("Explore Newspapers")}
//             </a>
//             <a
//               href="/timeline"
//               className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all"
//             >
//               {t("View Timeline")}
//             </a>
//           </div>
//         </motion.div>

//         {/* Stats Section with animation */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 sm:mt-16 text-center">
//           {statsData.map((item, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//               <div className="text-lg sm:text-2xl font-bold">{item.number}</div>
//               <div className="text-xs sm:text-sm text-blue-200">{item.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Weather Section */}

//       <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       {/* <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
//         <motion.div
//           className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {error ? (
//             <div className="text-center text-red-500 dark:text-red-400">{error}</div>
//           ) : (
//             <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <motion.h2
//                   className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   {t("Weather in")} {city}
//                 </motion.h2>

//                 <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6">
//                   {weatherData.map((w, i) => (
//                     <motion.div
//                       key={i}
//                       className="flex items-center gap-2"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.6, delay: i * 0.2 }}
//                     >
//                       <span className="text-lg">{w.icon}</span>
//                       <div>
//                         <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
//                           {w.value}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           {w.label}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               <motion.div
//                 className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 {lastUpdated ? `${t("Last updated")}: ${lastUpdated}` : t("Loading...")}
//               </motion.div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//       </section>
//       {/* New Section for Why Choose NewsHub? */}
       
//          <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
//           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t("Why Choose NewsHub?")}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             <div className="text-center">
//               <div className="text-4xl mb-4">🔄</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Live Updates")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("Real-time news scraping from multiple sources")}</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">📝</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Smart Notes")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("Highlight text and save personalized notes")}</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Fake News Detection")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("AI-powered verification of news authenticity")}</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">🌐</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Multi-Language")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("Support for Hindi, English, and regional languages")}</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">🎯</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Timeline Analysis")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("Common trending topics across newspapers")}</p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">☁️</div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t("Word Cloud")}</h3>
//               <p className="text-gray-600 dark:text-gray-400">{t("Visual representation of trending keywords")}</p>
//             </div>
//           </div>
//         </section>
//     </>
//   );
// }





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useTranslation } from "../context/TranslationContext";
// import { motion } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa";

// export default function Hero() {
//     const { t } = useTranslation();
//     const [headlines, setHeadlines] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const API_BASE_URL = "http://localhost:5000";

//     useEffect(() => {
//         const fetchTopHeadlines = async () => {
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/scrape-timeline`);
//                 setHeadlines(response.data); // Assuming the response is an array of headline objects
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Failed to fetch top headlines:", err);
//                 setError("Failed to load top headlines. Please check the server connection.");
//                 setLoading(false);
//             }
//         };

//         fetchTopHeadlines();
//     }, []);

//     const cardVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut",
//             },
//         },
//     };

//     return (
//         <div className="bg-white dark:bg-gray-900 min-h-screen">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//                 {/* Main Hero Section */}
//                 <div className="text-center mb-16">
//                     <motion.h1
//                         className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         {t("News at Your Fingertips.")}
//                     </motion.h1>
//                     <motion.p
//                         className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                     >
//                         {t("Stay informed with live headlines from India's leading newspapers. All in one place.")}
//                     </motion.p>
//                 </div>

//                 {/* Today's Top Headlines Section */}
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center sm:text-left">
//                     {t("Today's Top Headlines")}
//                 </h2>

//                 {loading ? (
//                     <div className="text-center text-lg text-gray-500 dark:text-gray-400">
//                         {t("Loading top headlines...")}
//                     </div>
//                 ) : error ? (
//                     <div className="text-center text-lg text-red-500">{error}</div>
//                 ) : (
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                         initial="hidden"
//                         animate="visible"
//                         variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//                     >
//                         {headlines.slice(0, 6).map((headline, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
//                                 variants={cardVariants}
//                             >
//                                 <img
//                                     src={headline.image || "https://via.placeholder.com/600x400.png?text=Image+Not+Found"}
//                                     alt={headline.title}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
//                                         {headline.title}
//                                     </h3>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                                         {headline.description ? `${headline.description.substring(0, 100)}...` : ""}
//                                     </p>
//                                     <div className="flex justify-between items-center text-sm font-medium text-gray-500 dark:text-gray-400">
//                                         <span>{t("Source")}: {headline.newspaper_name}</span>
//                                         <a
//                                             href={headline.url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
//                                         >
//                                             {t("Read More")} <FaArrowRight />
//                                         </a>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 )}

//                 {/* Call-to-action to explore more */}
//                 <div className="flex justify-center mt-12">
//                     <a
//                         href="/newspapers"
//                         className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors"
//                     >
//                         {t("Explore All Newspapers")}
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import React from "react";
// import { useTranslation } from "../context/TranslationContext";
// import { motion } from "framer-motion";
// import { FaRegClock, FaNewspaper, FaRegEye } from "react-icons/fa"; // Using FaRegClock for a cleaner look

// const features = [
//     {
//         icon: <FaRegClock />,
//         title: "Real-time Updates",
//         description: "Get instant headlines as they break from across the country."
//     },
//     {
//         icon: <FaNewspaper />,
//         title: "Multiple Newspapers",
//         description: "Access news from a curated list of India's top publications in one place."
//     },
//     {
//         icon: <FaRegEye />,
//         title: "Time-Saving",
//         description: "Quickly scan trending topics and read what matters most to you."
//     }
// ];

// export default function Hero() {
//     const { t } = useTranslation();

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.5
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//     };

//     return (
//         <section className="relative w-full py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
//                     {/* Text Content */}
//                     <div className="lg:w-1/2 text-center lg:text-left">
//                         <motion.div
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             <motion.h1
//                                 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
//                                 variants={itemVariants}
//                             >
//                                 {t("Save Time. Stay Informed.")}
//                             </motion.h1>
//                             <motion.p
//                                 className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8"
//                                 variants={itemVariants}
//                             >
//                                 {t("Your go-to source for a timeline of Indian news, consolidating headlines from multiple newspapers for a fast, efficient reading experience.")}
//                             </motion.p>
//                             <motion.div
//                                 className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//                                 variants={itemVariants}
//                             >
//                                 <a
//                                     href="/newspapers"
//                                     className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors"
//                                 >
//                                     {t("Explore News")}
//                                 </a>
//                                 <a
//                                     href="/timeline"
//                                     className="px-8 py-4 border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
//                                 >
//                                     {t("View Timeline")}
//                                 </a>
//                             </motion.div>
//                         </motion.div>
//                     </div>

//                     {/* Image/Illustration */}
//                     <div className="lg:w-1/2 flex justify-center lg:justify-end">
//                         <motion.div
//                             className="w-full max-w-md lg:max-w-none"
//                             initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
//                             animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                             transition={{ duration: 1, ease: "easeOut", delay: 1 }}
//                         >
                            
//                         </motion.div>
//                     </div>
//                 </div>

//                 {/* Feature Cards Section */}
//                 <div className="mt-20">
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                     >
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="text-center p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800"
//                                 variants={itemVariants}
//                             >
//                                 <div className="text-4xl text-blue-500 dark:text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
//                                 <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
//                                 <p className="text-gray-600 dark:text-gray-400">{t(feature.description)}</p>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }






// import React from "react";
// import  { useState} from "react";
// import { useTranslation } from "../context/TranslationContext";
// import { motion } from "framer-motion";
// import { FaRegClock, FaNewspaper, FaRegEye } from "react-icons/fa"; 

// // Importing icons for the feature cards

// // Define the feature data array again
// const features = [
//     {
//         icon: <FaRegClock />,
//         title: "Real-time Updates",
//         description: "Get instant headlines as they break from across the country."
//     },
//     {
//         icon: <FaNewspaper />,
//         title: "Multiple Newspapers",
//         description: "Access news from a curated list of India's top publications in one place."
//     },
//     {
//         icon: <FaRegEye />,
//         title: "Time-Saving",
//         description: "Quickly scan trending topics and read what matters most to you."
//     }
// ];

// export default function Hero() {
//     const { t } = useTranslation();
//     const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.5
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//     };

//     return (
//         <section className="relative w-full py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Main Hero Content (Centered) */}
//                 <div className="flex flex-col items-center justify-center text-center">
//                     <div className="lg:max-w-3xl">
//                         <motion.div
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             <motion.h1
//                                 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
//                                 variants={itemVariants}
//                             >
//                                 {t("Save Time. Stay Informed.")}
//                             </motion.h1>
//                             <motion.p
//                                 className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
//                                 variants={itemVariants}
//                             >
//                                 {t("Your go-to source for a timeline of Indian news, consolidating headlines from multiple newspapers for a fast, efficient reading experience.")}
//                             </motion.p>
//                             <motion.div
//                                 className="flex flex-col sm:flex-row gap-4 justify-center"
//                                 variants={itemVariants}
//                             >
//                                 <a
//                                     href="/newspapers"
//                                     className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors"
//                                 >
//                                     {t("Explore News")}
//                                 </a>
//                                 <a
//                                     href="/timeline"
//                                     className="px-8 py-4 border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
//                                 >
//                                     {t("View Timeline")}
//                                 </a>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </div>

//                 {/* Feature Cards Section (Restored) */}
//                 <div className="mt-20">
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                     >
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="text-center p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105"
//                                 variants={itemVariants}
//                             >
//                                 <div className="text-4xl text-blue-500 dark:text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
//                                 <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
//                                 <p className="text-gray-600 dark:text-gray-400">{t(feature.description)}</p>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }




// import React, { useEffect, useState } from "react";
// import { useTranslation } from "../context/TranslationContext";
// import { motion } from "framer-motion";
// import { FaRegClock, FaNewspaper, FaRegEye, FaClock,FaHourglassHalf  } from "react-icons/fa";

// // Define the feature data array
// const features = [
//     {
//         icon: <FaRegClock />,
//         title: "Real-time Updates",
//         description: "Get instant headlines as they break from across the country."
//     },
//     {
//         icon: <FaNewspaper />,
//         title: "Multiple Newspapers",
//         description: "Access news from a curated list of India's top publications in one place."
//     },
//     {
//         icon: <FaHourglassHalf />,
//         title: "Time-Saving",
//         description: "Quickly scan trending topics and read what matters most to you."
//     }
// ];

// export default function Hero() {
//     const { t } = useTranslation();
//     const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

//     useEffect(() => {
//         // Function to update the darkMode state
//         const updateDarkModeState = () => {
//             setDarkMode(document.documentElement.classList.contains("dark"));
//         };

//         // Create a new MutationObserver
//         const observer = new MutationObserver((mutations) => {
//             mutations.forEach((mutation) => {
//                 if (mutation.attributeName === "class") {
//                     updateDarkModeState();
//                 }
//             });
//         });

//         // Start observing the <html> element for attribute changes
//         observer.observe(document.documentElement, { attributes: true });

//         // Initial check in case the state was already set before the component mounted
//         updateDarkModeState();

//         // Cleanup function to disconnect the observer when the component unmounts
//         return () => observer.disconnect();
//     }, []); // Empty dependency array ensures this effect runs only once on mount

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.5
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//     };

//     return (
//         <section className={`relative w-full py-20  overflow-hidden ${darkMode ? " text-white":"bg-gray-50 text-gray-900 "}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Main Hero Content (Centered) */}
//                 <div className="flex flex-col items-center justify-center text-center">
//                     <div className="lg:max-w-3xl">
//                         <motion.div
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             <motion.h1
//                                 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-bl ${darkMode ? "from-blue-600 to-purple-600 ":"from-blue-600  to-sky-600"}}`}
//                                 variants={itemVariants}
//                             >
//                                 {t("Save Time. Stay Informed.")}
//                             </motion.h1>
//                             <motion.p
//                                 className={`text-lg  max-w-2xl mx-auto mb-8 ${darkMode ? "text-gray-300":"text-gray-700"}`}
//                                 variants={itemVariants}
//                             >
//                                 {t("Your go-to source for a timeline of Indian news, consolidating headlines from multiple newspapers for a fast, efficient reading experience.")}
//                             </motion.p>
//                             <motion.div
//                                 className="flex flex-col sm:flex-row gap-4 justify-center"
//                                 variants={itemVariants}
//                             >
//                                 <a
//                                     href="/newspapers"
//                                     className={`px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors`}
//                                 >
//                                     {t("Explore News")}
//                                 </a>
//                                 <a
//                                     href="/timeline"
//                                     className={`px-8 py-4 border-2 border-gray-400 dark:border-gray-600  rounded-full font-bold text-lg  dark: transition-colors ${darkMode ? "text-gray-200 hover:bg-gray-800 ":"text-gray-900 hover:bg-gray-200"}`}
//                                 >
//                                     {t("View Timeline")}
//                                 </a>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </div>

//                 {/* Feature Cards Section */}
//                 <div className="mt-20">
//                     <motion.div
//                         className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                     >
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className={`text-center p-8 rounded-xl shadow-lg  transition-transform duration-300 hover:scale-105 ${darkMode ? "hover:bg-gray-700 bg-gray-800":"hover:bg-gray-200 bg-white"}`}
//                                 variants={itemVariants}
//                             >
//                                 <div className={`text-4xl mb-4 flex justify-center ${darkMode ?"text-purple-400":"text-blue-500"}`}>{feature.icon}</div>
//                                 <h3 className="text-xl font-bold mb-2">{t(feature.title)}</h3>
//                                 <p className={` ${darkMode ?"text-gray-400":"text-gray-600"}`}>{t(feature.description)}</p>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }


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