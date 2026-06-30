import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Maurice from "../assets/maurice.svg";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const academyRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Journals", path: "/journal" },
    { name: "Institutes", path: "/institute" },
    { name: "Geni-Nexus", path: "/archive" },
    { 
      name: "Academy", 
      path: "/academy",
      hasDropdown: true,
      subheader: "Nursing Program",
      dropdownItems: [
        { name: "GIRCONSAT Program", path: "/academy" },
      ]
    },
    { name: "Conference", path: "/seminar" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsNavOpen(false);
    setIsAcademyOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (academyRef.current && !academyRef.current.contains(event.target)) {
        setIsAcademyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find the academy link object
  const academyLink = navLinks.find(link => link.name === "Academy");

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={Maurice}
              alt="Logo"
              className="h-24 w-20 md:h-28 md:w-24 lg:h-32 lg:w-28 transition-all duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.path} className="relative" ref={academyRef}>
                    <button
                      onClick={() => setIsAcademyOpen(!isAcademyOpen)}
                      className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 flex items-center gap-1 ${
                        location.pathname.includes("/academy")
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                      <FiChevronDown className={`transition-transform duration-200 ${
                        isAcademyOpen ? "rotate-180" : ""
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isAcademyOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeIn">
                        {/* Subheader */}
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                          {link.subheader}
                        </div>
                        
                        {/* Dropdown Items */}
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={() => setIsAcademyOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/publish">
              <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                Publish
                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle menu"
          >
            {isNavOpen ? (
              <RiCloseLine className="h-6 w-6" />
            ) : (
              <RiMenu2Fill className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isNavOpen 
            ? "max-h-[600px] opacity-100 py-4" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="space-y-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.path} className="space-y-1">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {link.subheader}
                    </div>
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          location.pathname === item.path
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsNavOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      to={link.path}
                      className="block px-4 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100"
                      onClick={() => setIsNavOpen(false)}
                    >
                      All Academy <FiArrowUpRight className="inline" />
                    </Link>
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <Link to="/publish">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md">
                  Publish Your Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;