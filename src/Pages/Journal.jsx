import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Journals from "../components/Journals";
import JournalsCol from "../components/Jourrnals-col";
import JournalsCol2 from "../components/Journal1";

const Journal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pageTitle = "All Journals";
  
  // Animation on scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600">
              Explore our comprehensive collection of peer-reviewed journals and research publications
            </p>
            
            {/* Quick Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="text-sm text-gray-500">Quick links:</span>
              <a href="#featured" className="text-sm text-blue-600 hover:underline">Featured</a>
              <a href="#specialty" className="text-sm text-blue-600 hover:underline">Specialty</a>
              <a href="#clinical" className="text-sm text-blue-600 hover:underline">Clinical</a>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Sections with IDs for navigation */}
      <section id="featured">
        <Journals head={true} />
      </section>
      
      <section id="specialty">
        <JournalsCol />
      </section>
      
      <section id="clinical">
        <JournalsCol2 />
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        aria-label="Back to top"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
      
      <Footer />
    </>
  );
};

export default Journal;