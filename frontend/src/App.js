// import React from "react";

// export default function App() {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md fixed w-full z-10">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-blue-600">NewsZ</h1>
//           <div className="space-x-3">
//             <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
//               All
//             </button>
//             <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
//               The Hindu
//             </button>
//             <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
//               Times of India
//             </button>
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Search news..."
//               className="border rounded px-3 py-1"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 mt-14">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold">Your Gateway to Indian News</h2>
//           <p className="mt-3 text-lg">
//             Access headlines from leading newspapers, create personalized notes,
//             and stay informed.
//           </p>
//           <div className="mt-6 flex justify-center gap-4">
//             <button className="px-6 py-2 bg-white text-blue-600 rounded shadow hover:bg-gray-100">
//               Explore Newspapers
//             </button>
//             <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300">
//               View Timeline
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="max-w-4xl mx-auto mt-10">
//         <h3 className="text-2xl font-bold mb-4">Timeline Stack</h3>
//         <div className="space-y-4">
//           {/* Example Timeline Card */}
//           <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-500">12:45 PM</span>
//               <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
//                 Positive
//               </span>
//             </div>
//             <h4 className="mt-2 font-semibold">
//               India announces new economic reforms
//             </h4>
//             <p className="text-sm text-gray-600 mt-1">
//               Major policy changes expected to boost growth across industries.
//             </p>
//             <div className="mt-2 flex gap-2">
//               <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
//                 The Hindu
//               </span>
//               <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
//                 TOI
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Icons are replaced with inline SVGs for simplicity in this example.
// In a real project, you would import them from a library like 'lucide-react'.

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Gateway to<span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Indian News</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105" href="/newspapers">
                  Explore Newspapers
                </a>
                <a className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300" href="/timeline">
                  View Timeline
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-8 w-8 text-blue-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-blue-200 text-sm">Newspapers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-8 w-8 text-green-600">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <div className="text-2xl font-bold">2.4K</div>
                <div className="text-blue-200 text-sm">Articles Today</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-8 w-8 text-purple-600">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="text-2xl font-bold">45.2K</div>
                <div className="text-blue-200 text-sm">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-8 w-8 text-orange-600">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Live Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Weather Bar */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-6 w-6 text-orange-500">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">28°C</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Mumbai</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wind h-5 w-5 text-blue-500">
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">12 km/h</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Wind</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-droplets h-5 w-5 text-teal-500">
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">65%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Humidity</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud h-5 w-5 text-gray-500">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">AQI 95</div>
                    <div className="text-xs text-orange-600">Moderate</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Last updated: 3:03:17 pm</div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Timeline Stack */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Timeline Stack</h2>
              <a className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium" href="/timeline">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-5 w-5 ml-1">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </a>
            </div>
            <div className="space-y-6">
              {/* Timeline Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                    <div className="w-px h-16 bg-gray-300 dark:bg-gray-600 mx-auto mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4 text-gray-500 dark:text-gray-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">4:30:00 pm</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">positive</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Climate Summit Reaches Historic Agreement</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">195 countries commit to aggressive carbon reduction targets</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Sources:</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(225, 29, 72, 0.125)', color: 'rgb(225, 29, 72)' }}>Times of India</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(3, 105, 161, 0.125)', color: 'rgb(3, 105, 161)' }}>The Hindu</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(234, 88, 12, 0.125)', color: 'rgb(234, 88, 12)' }}>Indian Express</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Timeline Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                    <div className="w-px h-16 bg-gray-300 dark:bg-gray-600 mx-auto mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4 text-gray-500 dark:text-gray-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">3:45:00 pm</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">neutral</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tech Industry Faces New Regulation Challenges</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Government proposes stricter data privacy laws</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Sources:</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(225, 29, 72, 0.125)', color: 'rgb(225, 29, 72)' }}>Times of India</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(124, 58, 237, 0.125)', color: 'rgb(124, 58, 237)' }}>The Pioneer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured News */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured News</h2>
              <a className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium" href="/articles">
                View All Articles
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured News Card 1 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-64">
                    <img src="https://images.pexels.com/photos/3825574/pexels-photo-3825574.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Tech Giants Announce Major AI Breakthrough in Healthcare" className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2 h-4 w-4">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </button>
                      <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 h-4 w-4">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <img src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Times of India" className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Times of India</span>
                      <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full capitalize">technology</span>
                    </div>
                    <a href="/article/1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-3">Tech Giants Announce Major AI Breakthrough in Healthcare</h2>
                    </a>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">Leading technology companies unveil revolutionary AI system for early disease detection</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-4 w-4 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          5 min read
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4 mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          1010
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-5 w-5">
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">#AI</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">#Healthcare</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">#Technology</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured News Card 2 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48">
                    <img src="https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800" alt="India Launches Ambitious Green Energy Initiative" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2 h-4 w-4">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(3, 105, 161, 0.125)', color: 'rgb(3, 105, 161)' }}>The Hindu</span>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full capitalize">national</span>
                    </div>
                    <a href="/article/2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">India Launches Ambitious Green Energy Initiative</h3>
                    </a>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">Government announces $50 billion investment in renewable energy infrastructure</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-3 w-3 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          4 min
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-3 w-3 mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          452
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 h-4 w-4">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                          </svg>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-4 w-4">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Featured News Card 3 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48">
                    <img src="https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Cricket World Cup 2025: India Dominates Opening Match" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2 h-4 w-4">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(220, 38, 38, 0.125)', color: 'rgb(220, 38, 38)' }}>Divya Bhaskar</span>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full capitalize">sports</span>
                    </div>
                    <a href="/article/3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">Cricket World Cup 2025: India Dominates Opening Match</h3>
                    </a>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">Team India secures commanding victory in tournament opener</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock h-3 w-3 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          3 min
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-3 w-3 mr-1">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          292
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 h-4 w-4">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                          </svg>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-4 w-4">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Newspapers */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Newspapers</h2>
              <a className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium" href="/newspapers">
                View All Newspapers
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Newspaper Card 1 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group" tabIndex="0">
                  <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.125), rgba(225, 29, 72, 0.25))' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
                    <div className="absolute top-4 right-4">
                      <a href="https://timesofindia.indiatimes.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link h-4 w-4">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <img src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Times of India logo" className="w-12 h-12 rounded-full border-3 border-white shadow-lg" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Times of India</h3>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full uppercase">en</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full uppercase">hi</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">India's largest English daily newspaper</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-1">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>20 articles</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-4 w-4 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                            <path d="M2 12h20"></path>
                          </svg>
                          <span>2 lang</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Categories:</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(225, 29, 72, 0.082)', color: 'rgb(225, 29, 72)' }}>national</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(225, 29, 72, 0.082)', color: 'rgb(225, 29, 72)' }}>international</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(225, 29, 72, 0.082)', color: 'rgb(225, 29, 72)' }}>business</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(225, 29, 72, 0.082)', color: 'rgb(225, 29, 72)' }}>sports</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">+2</span>
                      </div>
                    </div>
                    <a className="block w-full py-3 text-center text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105" href="/newspaper/times-of-india" style={{ backgroundColor: 'rgb(225, 29, 72)' }}>
                      Read Headlines
                    </a>
                  </div>
                </div>
              </div>
              {/* Newspaper Card 2 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group" tabIndex="0">
                  <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, rgba(3, 105, 161, 0.125), rgba(3, 105, 161, 0.25))' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
                    <div className="absolute top-4 right-4">
                      <a href="https://www.thehindu.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link h-4 w-4">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <img src="https://images.pexels.com/photos/547285/pexels-photo-547285.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="The Hindu logo" className="w-12 h-12 rounded-full border-3 border-white shadow-lg" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">The Hindu</h3>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full uppercase">en</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">One of the most respected English-language newspapers in India</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-1">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>18 articles</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-4 w-4 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                            <path d="M2 12h20"></path>
                          </svg>
                          <span>1 lang</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Categories:</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(3, 105, 161, 0.082)', color: 'rgb(3, 105, 161)' }}>national</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(3, 105, 161, 0.082)', color: 'rgb(3, 105, 161)' }}>business</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(3, 105, 161, 0.082)', color: 'rgb(3, 105, 161)' }}>sports</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">+1</span>
                      </div>
                    </div>
                    <a className="block w-full py-3 text-center text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105" href="/newspaper/the-hindu" style={{ backgroundColor: 'rgb(3, 105, 161)' }}>
                      Read Headlines
                    </a>
                  </div>
                </div>
              </div>
              {/* Newspaper Card 3 */}
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group" tabIndex="0">
                  <div className="h-32 relative" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.125), rgba(234, 88, 12, 0.25))' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
                    <div className="absolute top-4 right-4">
                      <a href="https://indianexpress.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link h-4 w-4">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </a>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <img src="https://images.pexels.com/photos/1089222/pexels-photo-1089222.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" alt="Indian Express logo" className="w-12 h-12 rounded-full border-3 border-white shadow-lg" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Indian Express</h3>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full uppercase">en</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">Respected daily newspaper known for its investigative journalism</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-1">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>15 articles</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-4 w-4 mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                            <path d="M2 12h20"></path>
                          </svg>
                          <span>1 lang</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Categories:</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(234, 88, 12, 0.082)', color: 'rgb(234, 88, 12)' }}>national</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(234, 88, 12, 0.082)', color: 'rgb(234, 88, 12)' }}>international</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(234, 88, 12, 0.082)', color: 'rgb(234, 88, 12)' }}>business</span>
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: 'rgba(234, 88, 12, 0.082)', color: 'rgb(234, 88, 12)' }}>politics</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">+1</span>
                      </div>
                    </div>
                    <a className="block w-full py-3 text-center text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105" href="/newspaper/indian-express" style={{ backgroundColor: 'rgb(234, 88, 12)' }}>
                      Read Headlines
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;