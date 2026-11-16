import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const NicmauriceLogo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className="flex-shrink-0"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="10" fill="url(#logoGradient)" />
    <path
      d="M10 14 L18 9 L26 14 L26 22 L18 27 L10 22 Z"
      fill="white"
      opacity="0.95"
    />
    <circle cx="18" cy="18" r="3" fill="white" opacity="0.9" />
    <path
      d="M15 20 L18 23 L21 20"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const Header = () => {
  return (
    <nav className="px-4 sm:px-6 py-4 sticky top-0 bg-white/90 backdrop-blur-lg z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/academy" className="flex items-center space-x-3 group">
          <NicmauriceLogo />
          <div>
            <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Nicmaurice Nursing Academy
            </div>
            <div className="text-xs text-gray-500 -mt-1">
              Excellence in Nursing Education
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex space-x-8">
          {["Home", "Specializations", "Admissions", "About"].map(
            (item) => (
             <Link to={`/academy/${item === "Home" ? "/" : item.toLocaleLowerCase()}`}>
              <h1
                key={item}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium hover:font-semibold"
              >
                {item}
              </h1>
             </Link>
            ),
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/academy/login">
            <button className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium hidden sm:block">
              Student Portal
            </button>
          </Link>
          <Link to="/academy/enroll">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              Apply Now
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
