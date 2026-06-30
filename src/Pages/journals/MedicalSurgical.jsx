import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdDownload,
  MdArticle,
  MdCalendarToday,
  MdSearch,
  MdFilterList,
  MdMenuBook,
  MdScience,
  MdPublic,
  MdPeople,
  MdLightbulb,
  MdVisibility,
  MdShare,
  MdSchool,
  MdHealthAndSafety,
  MdPsychology,
  MdRestaurant,
  MdPark,
  MdSocialDistance,
  MdLanguage,
  MdTranslate,
  MdForum,
  MdRocketLaunch,
  MdLink,
  MdMedicalServices,
  MdLocalHospital,
  MdBiotech,
  MdPolicy,
  MdComputer,
  MdCheckCircle,
  MdStar,
  MdTrendingUp,
  MdHealing,
  MdEmergency,
  MdMonitorHeart,
  MdBloodtype,
  MdScience as MdMedicalScience,
  MdSupport,
} from "react-icons/md";
import {
  FaSyringe,
  FaHeartbeat,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";

const MedicalSurgicalNursingJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    {
      vol: "Vol 1 No. 1",
      link: "https://drive.google.com/file/d/11fkYlw-HiJE9aJMh4F9PbKU3diPXEPGV/view?usp=sharing",
      year: "2023",
    },
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    viewport: { once: true, amount: 0.2 },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const rotateAnimation = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Get unique years for filter
  const years = [
    "All",
    ...new Set(articles.map((article) => article.year)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return b.localeCompare(a);
  });

  // Filter articles based on search and year
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.vol
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === "All" || article.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  // Group articles by year
  const groupedArticles = filteredArticles.reduce((groups, article) => {
    const year = article.year;
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(article);
    return groups;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedArticles).sort((a, b) =>
    b.localeCompare(a),
  );

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header with Surgical Nursing Theme */}
          <motion.header
            className="relative bg-gradient-to-r from-teal-900 to-cyan-900 text-white rounded-xl shadow-lg mb-8 overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative z-10 p-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-teal-300"
                >
                  <FaStethoscope className="text-4xl" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="text-cyan-300"
                >
                  <FaSyringe className="text-4xl" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="text-teal-300"
                >
                  <FaHeartbeat className="text-4xl" />
                </motion.div>
              </div>

              <motion.h1
                variants={fadeInLeft}
                className="text-3xl md:text-4xl font-bold border-b-2 border-teal-400 pb-4"
              >
                INTERNATIONAL SPECIALTY JOURNAL OF MEDICAL AND SURGICAL NURSING
                RESEARCH
              </motion.h1>
              <motion.p
                variants={fadeInLeft}
                className="mt-4 text-xl text-teal-200"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 0 rgba(45,212,191,0)",
                      "0 0 8px rgba(45,212,191,0.5)",
                      "0 0 0 rgba(45,212,191,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Advancing Evidence-Based Practice in Medical-Surgical Nursing
                </motion.span>
              </motion.p>
            </motion.div>
          </motion.header>

          {/* Profile Summary */}
          <motion.section
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2
              className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("summary")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.summary ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdMedicalServices className="text-teal-600" />
              </motion.div>
              Profile Summary
            </motion.h2>
            <AnimatePresence>
              {expandedSections.summary && (
                <motion.p
                  className="text-gray-700 mb-4 bg-teal-50 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  The International Specialty Journal of Medical and Surgical
                  Nursing Research is a peer-reviewed academic journal dedicated
                  to advancing the field of nursing through innovative research
                  and evidence-based practice. Our mission is to provide a
                  platform for nursing professionals, researchers, and educators
                  to share original research, systematic reviews, and clinical
                  guidelines that focus on medical and surgical nursing.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Key Features */}
          <motion.section
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2
              className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("features")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.features ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdStar className="text-teal-600" />
              </motion.div>
              Key Features
            </motion.h2>
            <AnimatePresence>
              {expandedSections.features && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {[
                    {
                      icon: <MdSupport className="text-2xl" />,
                      title: "Focus Areas",
                      content:
                        "Perioperative care, postoperative management, patient safety, pain management, surgical innovations, and nursing interventions in medical-surgical settings.",
                      color: "teal",
                    },
                    {
                      icon: <MdMedicalScience className="text-2xl" />,
                      title: "Peer Review Process",
                      content:
                        "Rigorous peer-review by experts to ensure research quality and relevance to contemporary nursing practices.",
                      color: "cyan",
                    },
                    {
                      icon: <MdPublic className="text-2xl" />,
                      title: "Open Access",
                      content:
                        "Freely accessible research findings for practitioners, educators, and students worldwide.",
                      color: "teal",
                    },
                    {
                      icon: <MdPeople className="text-2xl" />,
                      title: "Interdisciplinary Collaboration",
                      content:
                        "Encourages teamwork between nursing and other healthcare professions for holistic patient care.",
                      color: "cyan",
                    },
                    {
                      icon: <MdSchool className="text-2xl" />,
                      title: "Continuing Education",
                      content:
                        "Interactive case studies and clinical scenarios for practical application of research findings.",
                      color: "teal",
                    },
                    {
                      icon: <MdPublic className="text-2xl" />,
                      title: "Global Perspective",
                      content:
                        "Research from diverse cultural and geographic backgrounds on medical-surgical nursing practices.",
                      color: "cyan",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`bg-${feature.color}-50 p-5 rounded-lg border border-${feature.color}-100 hover:shadow-md transition-all duration-200`}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <div className="flex items-center mb-3">
                        <motion.div
                          className={`bg-${feature.color}-100 p-2 rounded-full mr-3 text-${feature.color}-600`}
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold text-teal-800">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-700">{feature.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Submission Guidelines */}
          <motion.section
            className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-8 border-l-4 border-teal-500"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2
              className="text-2xl font-bold text-teal-900 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("guidelines")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.guidelines ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdArticle className="text-teal-600" />
              </motion.div>
              Submission Guidelines
            </motion.h2>
            <AnimatePresence>
              {expandedSections.guidelines && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 mb-4">
                    Authors are invited to submit original research articles,
                    reviews, case studies, and clinical reports that contribute
                    to the scientific understanding of medical and surgical
                    nursing. Our journal welcomes:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {[
                      "Original research articles",
                      "Systematic reviews",
                      "Clinical case studies",
                      "Evidence-based practice reports",
                      "Innovative care model descriptions",
                      "Quality improvement projects",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        variants={fadeInLeft}
                        whileInView="animate"
                        initial="initial"
                      >
                        <motion.span
                          className="bg-teal-500 text-white rounded-full p-1 mr-2 mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <MdCheckCircle className="h-4 w-4" />
                        </motion.span>
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    className="text-gray-700 font-medium"
                    variants={fadeInUp}
                  >
                    Detailed submission guidelines and author instructions can
                    be found on our website.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Mission Statement */}
          <motion.section
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2
              className="text-2xl font-bold text-teal-900 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("mission")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.mission ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdHealing className="text-teal-600" />
              </motion.div>
              Our Commitment
            </motion.h2>
            <AnimatePresence>
              {expandedSections.mission && (
                <motion.div
                  className="text-center max-w-3xl mx-auto"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-gray-700 text-lg bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg"
                    variants={fadeInUp}
                  >
                    The International Specialty Journal of Medical and Surgical
                    Nursing Research is committed to enhancing nursing knowledge
                    and practice, ultimately improving care for patients across
                    the globe. We invite you to explore our latest issues,
                    engage with our research community, and contribute to the
                    advancement of nursing science.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ISSN Badge */}
          <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
            <motion.div
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
              whileHover={{ scale: 1.05, rotate: 1 }}
              animate={pulseAnimation}
            >
              <p className="font-bold text-lg">
                <span className="mr-2">ISSN</span>
                <motion.span
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  3043-520X
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileInView={{ x: [-20, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <MdMenuBook className="text-3xl text-teal-600" />
              </motion.div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Journal Articles
              </h2>
            </motion.div>

            <motion.p
              className="text-gray-600 mb-8 max-w-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Access our complete archive of peer-reviewed articles, research
              papers, and clinical studies in medical and surgical nursing.
              Browse by year or use the search to find specific volumes.
            </motion.p>

            {/* Search and Filter Bar */}
            <motion.div
              className="bg-blue-50 p-6 rounded-lg mb-8 max-w-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
                  <input
                    type="text"
                    placeholder="Search articles by volume..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  className="md:w-48 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 z-10" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer transition-all duration-300"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === "All" ? "All Years" : year}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* Articles Grid */}
            <AnimatePresence mode="wait">
              {filteredArticles.length > 0 ? (
                <motion.div
                  key="articles"
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: 20 }}
                >
                  {sortedYears.map((year) => (
                    <motion.div
                      key={year}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100"
                      variants={fadeInUp}
                      whileHover={{
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 flex items-center gap-2"
                        whileHover={{
                          background:
                            "linear-gradient(to right, #0d9488, #0891b2)",
                        }}
                      >
                        <motion.div {...rotateAnimation}>
                          <MdCalendarToday />
                        </motion.div>
                        <h3 className="text-lg font-semibold">Year {year}</h3>
                        <motion.span
                          className="bg-teal-400 text-sm px-2 py-1 rounded-full ml-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          {groupedArticles[year].length}{" "}
                          {groupedArticles[year].length === 1
                            ? "Article"
                            : "Articles"}
                        </motion.span>
                      </motion.div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {groupedArticles[year].map((article, index) => (
                            <motion.a
                              key={index}
                              href={article.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block p-4 border border-teal-100 rounded-lg hover:shadow-md transition-shadow"
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <motion.h4
                                    className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors"
                                    whileHover={{ x: 5 }}
                                  >
                                    {article.vol}
                                  </motion.h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Published: {article.year}
                                  </p>
                                </div>
                                <motion.div
                                  whileHover={{ rotate: 15, scale: 1.2 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                  }}
                                >
                                  <MdDownload className="text-xl text-gray-400 group-hover:text-teal-600 transition-colors" />
                                </motion.div>
                              </div>
                              <motion.div
                                className="mt-3 flex items-center text-sm text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                              >
                                <span>Read Article</span>
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <MdKeyboardArrowRight className="ml-1" />
                                </motion.div>
                              </motion.div>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  className="text-center py-12 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-gray-500 text-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    No articles found matching your criteria.
                  </motion.p>
                  <motion.button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedYear("All");
                    }}
                    className="mt-4 text-teal-600 hover:text-teal-800 underline"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Archive Stats */}
            <motion.div
              className="mt-8 bg-gray-50 p-4 rounded-lg"
              variants={fadeInUp}
              whileHover={{ backgroundColor: "#e5e7eb" }}
            >
              <motion.p
                className="text-gray-600"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-semibold">{articles.length}</span> total
                articles in archive •
                <span className="font-semibold ml-1">
                  {new Set(articles.map((a) => a.year)).size}
                </span>{" "}
                years of publication
              </motion.p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="bg-gradient-to-r from-teal-900 to-cyan-900 text-white rounded-xl p-8 text-center shadow-lg"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h3
              className="text-2xl font-bold mb-4"
              animate={floatingAnimation}
            >
              Join Our Medical-Surgical Nursing Research Community
            </motion.h3>
            <motion.p className="mb-6 text-teal-100" variants={fadeInUp}>
              Contribute to advancing evidence-based practice in medical and
              surgical nursing
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/publish">
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium text-white transition duration-200 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Your Research
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default MedicalSurgicalNursingJournal;
