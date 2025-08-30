import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "../context/TranslationContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [langMenu, setLangMenu] = useState(false);
  const { t, translateTexts, currentLanguage } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Theme setup ---
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  // --- Check login state + listen for changes ---
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("userEmail");
      setIsLoggedIn(!!user);
    };

    checkLogin(); // run once on mount
    window.addEventListener("storage", checkLogin); // listen for localStorage updates

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false); // update immediately
    navigate("/login");
  };

  // --- Available languages ---
  const languages = [
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    { name: "Tamil", code: "ta" },
    { name: "Bengali", code: "bn" },
  ];

  const changeLanguage = async (langCode) => {
    if (langCode === currentLanguage) {
      setLangMenu(false);
      return;
    }
    const textsToTranslate = [
      "Home",
      "Newspapers",
      "Timeline",
      "Word Cloud",
      "Sign In",
      "Welcome to NewsZ",
      "Timeline Stack",
      "Loading timeline...",
      "Error",
      "No news available right now.",
      "Source:",
      "Trending",
      "Latest",
      "Your Gateway to",
      "Indian News",
      "Access headlines from leading newspapers, create personalized notes, and stay informed with our intelligent news aggregation platform.",
      "Explore Newspapers",
      "View Timeline",
    ];
    await translateTexts(textsToTranslate, langCode);
    setLangMenu(false);
  };

  return (
    <>
      <nav className="dark:bg-gray-900 bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                {/* <span className="bg-indigo-600 text-white px-2 py-1 rounded-lg">
                  📰
                </span> */}
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:shadow-lg transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-newspaper h-6 w-6 text-white">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M15 18h-5"></path>
                  <path d="M10 6h8v4h-8V6Z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NewsZ
              </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                {t("Home")}
              </Link>
              <Link
                to="/newspapers"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                {t("Newspapers")}
              </Link>
              <Link
                to="/timeline"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                {t("Timeline")}
              </Link>
              <Link
                to="/word-cloud"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                {t("Word Cloud")}
              </Link>
              <Link
                to="/save"
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                {t("Save")}
              </Link>

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangMenu(!langMenu)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <GlobeAltIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
                {langMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {t("Login")}
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangMenu(!langMenu)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <GlobeAltIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
                {langMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Dark light mode*/}
              <div className="px-4 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2"
                >
                  {darkMode ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("Home")}
            </Link>
            <Link
              to="/newspapers"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("Newspapers")}
            </Link>
            <Link
              to="/timeline"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("Timeline")}
            </Link>
            <Link
              to="/word-cloud"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("Word Cloud")}
            </Link>
            <Link
              to="/save"
              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {t("Save")}
            </Link>
            {/* Auth Buttons (Mobile) */}
            <div className="px-4 py-2 space-y-2">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-center"
                >
                  {t("Login")}
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-center"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
