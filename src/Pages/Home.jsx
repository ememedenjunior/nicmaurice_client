import React from "react";
import Header from "../components/Header";
import Scene from "../assets/scene.jpg";
import Unions from "../components/Unions";
import Journals from "../components/Journals";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: <FiBookOpen className="h-6 w-6" />,
      title: "Diverse Publications",
      description: "Access thousands of peer-reviewed journals across multiple disciplines"
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: "Global Community",
      description: "Connect with researchers, academics, and institutions worldwide"
    },
    {
      icon: <FiAward className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Rigorous peer-review process ensuring academic excellence"
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "Career Growth",
      description: "Boost your academic profile with recognized publications"
    }
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-20 lg:pb-25">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 lg:pr-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Empowering Minds,</span>
                <span className="block text-blue-600 mt-2">Shaping Futures</span>
                <span className="block text-gray-800 mt-2 text-2xl md:text-3xl lg:text-4xl">
                  Where Diversity Meets Opportunity
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Discover a world of opportunities with our diverse programs, experienced faculty, 
                and a community dedicated to your academic and professional success.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/publish"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Publish Your Article
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/journal"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Explore Journals
                </motion.a>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 ml-[-50px]">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Journals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">1K+</div>
                  <div className="text-sm text-gray-600">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 mt-12 lg:mt-0 relative"
            >
              <div className="relative">
                <img
                  src={Scene}
                  alt="Academic Community"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of academics and researchers who trust our platform for their publications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Unions />
      <Journals />
      <Footer />
    </>
  );
};

export default Home;