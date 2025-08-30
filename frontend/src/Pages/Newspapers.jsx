import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Newspaper = () => {
    const [allNewspapers, setAllNewspapers] = useState([]);
    const [filteredNewspapers, setFilteredNewspapers] = useState([]);
    const [selectedNewspaperId, setSelectedNewspaperId] = useState(null);
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("name");
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const API_BASE_URL = "http://localhost:5000";
    const HEADLINES_PER_PAGE = 20;

    const allCategories = [
        "all", "national", "international", "business", "sports", "entertainment",
        "technology", "opinion", "science", "gujarat", "astrology", "lifestyle"
    ];

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setDarkMode(document.documentElement.classList.contains("dark"));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchNewspapers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/newspapers`);
                const newspapersWithThemes = response.data.map(np => {
                    let themeLight, themeDark;
                    switch (np.id) {
                        case "divya_bhaskar":
                            themeLight = { bg: "bg-red-50", text: "text-gray-900", button: "bg-red-600", border: "border-red-600" };
                            themeDark = { bg: "bg-red-900/40", text: "text-white", button: "bg-red-600", border: "border-red-600" };
                            break;
                        case "indian_express":
                            themeLight = { bg: "bg-orange-50", text: "text-gray-900", button: "bg-orange-600", border: "border-orange-600" };
                            themeDark = { bg: "bg-orange-900/40", text: "text-white", button: "bg-orange-600", border: "border-orange-600" };
                            break;
                        case "sandesh":
                            themeLight = { bg: "bg-green-50", text: "text-gray-900", button: "bg-green-600", border: "border-green-600" };
                            themeDark = { bg: "bg-green-900/40", text: "text-white", button: "bg-green-600", border: "border-green-600" };
                            break;
                        case "the_hindu":
                            themeLight = { bg: "bg-blue-50", text: "text-gray-900", button: "bg-blue-600", border: "border-blue-600" };
                            themeDark = { bg: "bg-blue-900/40", text: "text-white", button: "bg-blue-600", border: "border-blue-600" };
                            break;
                        case "the_pioneer":
                            themeLight = { bg: "bg-purple-50", text: "text-gray-900", button: "bg-purple-600", border: "border-purple-600" };
                            themeDark = { bg: "bg-purple-900/40", text: "text-white", button: "bg-purple-600", border: "border-purple-600" };
                            break;
                        case "times_of_india":
                            themeLight = { bg: "bg-pink-50", text: "text-gray-900", button: "bg-pink-600", border: "border-pink-600" };
                            themeDark = { bg: "bg-pink-900/40", text: "text-white", button: "bg-pink-600", border: "border-pink-600" };
                            break;
                        default:
                            themeLight = { bg: "bg-gray-50", text: "text-gray-900", button: "bg-gray-600", border: "border-gray-600" };
                            themeDark = { bg: "bg-gray-900/40", text: "text-white", button: "bg-gray-600", border: "border-gray-600" };
                            break;
                    }
                    return { ...np, themeLight, themeDark, abstract_image_url: `https://via.placeholder.com/400/${np.id === 'divya_bhaskar' ? 'ff0000' : 'cccccc'}` };
                });
                setAllNewspapers(newspapersWithThemes);
                setFilteredNewspapers(newspapersWithThemes);
            } catch (err) {
                setError("Failed to fetch newspapers.");
                console.error("Error fetching newspapers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewspapers();
    }, []);

    useEffect(() => {
        let filtered = allNewspapers.filter((np) => {
            const matchesSearch = np.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLanguage = selectedLanguage === "all" || np.languages.map(l => l.toLowerCase()).includes(selectedLanguage.toLowerCase());
            const matchesCategory = selectedCategory === "all" || np.categories.map(c => c.toLowerCase()).includes(selectedCategory.toLowerCase());
            return matchesSearch && matchesLanguage && matchesCategory;
        });

        if (sortOption === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        setFilteredNewspapers(filtered);
    }, [allNewspapers, searchQuery, selectedLanguage, selectedCategory, sortOption]);

    useEffect(() => {
        if (selectedNewspaperId) {
            const fetchHeadlines = async () => {
                setLoading(true);
                setError(null);
                try {
                    const params = {
                        newspaperId: selectedNewspaperId,
                        category: selectedCategory,
                        limit: HEADLINES_PER_PAGE,
                        skip: (page - 1) * HEADLINES_PER_PAGE,
                    };
                    const response = await axios.get(`${API_BASE_URL}/newspapers/data`, { params });

                    if (page === 1) {
                        setHeadlines(response.data.data);
                    } else {
                        setHeadlines(prevHeadlines => [...prevHeadlines, ...response.data.data]);
                    }

                    if (response.data.data.length < HEADLINES_PER_PAGE) {
                        setHasMore(false);
                    } else {
                        setHasMore(true);
                    }
                } catch (err) {
                    setHeadlines([]);
                    setError("Failed to fetch headlines for this newspaper.");
                    console.error("Error fetching headlines:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchHeadlines();
        }
    }, [selectedNewspaperId, selectedCategory, page]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedLanguage("all");
        setSelectedCategory("all");
        setSortOption("name");
    };

    const handleBackClick = () => {
        setSelectedNewspaperId(null);
        setHeadlines([]);
        setPage(1);
        setHasMore(true);
    };

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const getSelectedNewspaperName = () => {
        const np = allNewspapers.find(np => np.id === selectedNewspaperId);
        return np ? np.name : "Newspaper";
    };

    const getCurrentTheme = (newspaper) => {
        return darkMode ? newspaper.themeDark : newspaper.themeLight;
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {!selectedNewspaperId ? (
                    <div className="newspaper-filters-and-grid">
                        <div className="mb-10 text-center">
                            <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Indian Newspapers</h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                Explore news from leading newspapers across India. Choose your preferred sources and stay updated with the latest headlines.
                            </p>
                        </div>

                        <div className={`flex flex-wrap items-center justify-between gap-4 p-6 mb-6 rounded-lg shadow-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search newspapers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${darkMode ? "bg-gray-900 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                                    />
                                </div>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className={`block w-full sm:w-auto pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${darkMode ? "bg-gray-900 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                                >
                                    <option value="all">All Languages</option>
                                    <option value="en">English</option>
                                    <option value="gu">Gujarati</option>
                                    <option value="hi">Hindi</option>
                                </select>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`block w-full sm:w-auto pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${darkMode ? "bg-gray-900 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                                >
                                    <option value="all">All Categories</option>
                                    {allCategories.filter(c => c !== "all").map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleClearFilters} className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                                Clear Filters
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Showing {filteredNewspapers.length} of {allNewspapers.length} newspapers
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <p className="col-span-full text-center">Loading newspapers...</p>
                            ) : filteredNewspapers.length === 0 ? (
                                <p className="col-span-full text-center">No newspapers match your filters.</p>
                            ) : (
                                filteredNewspapers.map((np) => {
                                    const theme = getCurrentTheme(np);
                                    return (
                                        <div
                                            key={np.id}
                                            className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${theme.bg}`}
                                            onClick={() => setSelectedNewspaperId(np.id)}
                                        >
                                            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${np.abstract_image_url})` }}></div>
                                            <div className={`relative p-6 flex flex-col items-center text-center ${theme.text}`}>
                                                <h4 className="font-bold text-xl mt-2">{np.name}</h4>
                                                <p className={`text-sm mt-1 opacity-80 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{np.description}</p>
                                                <div className={`mt-4 text-sm flex items-center justify-center space-x-4 opacity-80 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    <p>
                                                        <span className="font-bold">{np.categories.length}</span> categories
                                                    </p>
                                                    <p>
                                                        <span className="font-bold">{np.languages.length}</span> lang
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                                    {np.categories.slice(0, 4).map((cat, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${theme.border} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                    {np.categories.length > 4 && (
                                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${theme.border} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                            +{np.categories.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${theme.button} hover:opacity-90`}
                                                >
                                                    Read Headlines
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <div className={`flex justify-between items-center mb-6 p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleBackClick}
                                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                                </button>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{getSelectedNewspaperName()} Headlines</h3>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setPage(1); // Reset to first page on category change
                                }}
                                className={`block pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${darkMode ? "bg-gray-900 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                            >
                                {allCategories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {loading && page === 1 ? (
                                <p className="col-span-full text-center text-lg font-medium animate-pulse">
                                    Loading headlines...
                                </p>
                            ) : error ? (
                                <p className="col-span-full text-red-500 text-center text-lg font-medium">
                                    {error}
                                </p>
                            ) : headlines.length === 0 ? (
                                <p className="col-span-full text-center text-lg font-medium text-gray-500 dark:text-gray-400">
                                    No headlines found for this category. 😞
                                </p>
                            ) : (
                                headlines.map((headline, index) => (
                                    <div 
                                        key={headline._id || index}
                                        className={`
                                            relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 
                                            backdrop-blur-md hover:scale-[1.02] cursor-pointer 
                                            ${darkMode ? 'bg-white/5 border border-gray-700' : 'bg-white/40 border border-gray-200'}
                                        `}
                                    >
                                        <div className="p-5">
                                            <h4 className="font-bold text-lg md:text-xl leading-tight font-serif">
                                                {headline.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                {new Date(headline.published_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {hasMore && !loading && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleShowMore}
                                    className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 text-white 
                                        ${darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"} 
                                        shadow-lg transform hover:scale-105
                                    `}
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Newspaper;