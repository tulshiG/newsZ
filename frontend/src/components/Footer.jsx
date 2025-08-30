import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center space-x-2 group">
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
            </a>
            <p className="mt-4 text-sm max-w-xs">
              Your daily source for the latest Indian news. We aggregate headlines from leading newspapers and provide tools to help you stay informed.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                <FaYoutube size={24} />
              </a>
              <a href="#" aria-label="Whatsapp" className="hover:text-white transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:pl-10">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/newspapers" className="hover:text-blue-400 transition-colors">Newspapers</a>
              </li>
              <li>
                <a href="/timeline" className="hover:text-blue-400 transition-colors">Timeline</a>
              </li>
              <li>
                <a href="/wordcloud" className="hover:text-blue-400 transition-colors">Word Cloud</a>
              </li>
              <li>
                <a href="/saved" className="hover:text-blue-400 transition-colors">Saved News</a>
              </li>
            </ul>
          </div>
          
          {/* Categories
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="/category/politics" className="hover:text-blue-400 transition-colors">Politics</a>
              </li>
              <li>
                <a href="/category/business" className="hover:text-blue-400 transition-colors">Business</a>
              </li>
              <li>
                <a href="/category/technology" className="hover:text-blue-400 transition-colors">Technology</a>
              </li>
              <li>
                <a href="/category/sports" className="hover:text-blue-400 transition-colors">Sports</a>
              </li>
              <li>
                <a href="/category/entertainment" className="hover:text-blue-400 transition-colors">Entertainment</a>
              </li>
            </ul>
          </div> */}
          
          {/* Contact & Legal */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@newsz.com" className="hover:text-blue-400 transition-colors">Email: info@newsz.com</a>
              </li>
              <li>
                <a href="tel:+911234567890" className="hover:text-blue-400 transition-colors">Phone: +91 1234 567 890</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p className="text-gray-500">&copy; 2024 NewsZ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;