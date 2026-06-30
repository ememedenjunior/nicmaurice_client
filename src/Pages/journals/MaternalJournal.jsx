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
  MdSchool,
  MdHealthAndSafety,
  MdRocketLaunch,
  MdMedicalServices,
  MdLocalHospital,
  MdComputer,
  MdCheckCircle,
  MdStar,
  MdTrendingUp,
  MdChildCare,
  MdPregnantWoman,
  MdFamilyRestroom,
  MdPedalBike,
  MdBabyChangingStation,
  MdHeartBroken,
} from "react-icons/md";
import { FaBaby } from "react-icons/fa";

const MaternalChildJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    {
      vol: "Vol 1 No. 1",
      link: "https://drive.google.com/file/d/1vjnS4Fn6uTyzLuZq7rZwD3pt0fIBVSGq/view?usp=sharing",
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
      <div className="bg-gradient-to-b from-pink-50 to-blue-50 min-h-screen py-10 px-4 sm:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Content Card */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg mb-8"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            {/* Header with Icons */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={fadeInUp}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-pink-500"
              >
                <MdChildCare className="text-4xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-blue-500"
              >
                <FaBaby className="text-4xl" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mb-6"
            >
              International Specialty Journal of Maternal and Child Health
              Nursing Research
            </motion.h1>

            {/* Overview Section */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-pink-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("overview")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.overview ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdHealthAndSafety className="text-pink-600" />
                </motion.div>
                Overview
              </motion.h2>
              <AnimatePresence>
                {expandedSections.overview && (
                  <motion.p
                    className="text-gray-700 bg-pink-50 p-4 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    The{" "}
                    <strong>
                      International Specialty Journal of Maternal and Child
                      Health Nursing Research
                    </strong>{" "}
                    is a peer-reviewed, scholarly journal dedicated to
                    publishing high-quality research and innovative practices
                    that focus on maternal and child health. The journal aims to
                    disseminate evidence-based findings that enhance education,
                    practice, and outcomes related to maternal, fetal, neonatal,
                    childhood, and adolescent health.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Aims and Scope */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-blue-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("aims")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.aims ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdScience className="text-blue-600" />
                </motion.div>
                Aims and Scope
              </motion.h2>
              <AnimatePresence>
                {expandedSections.aims && (
                  <motion.ul
                    className="list-disc list-inside text-gray-700 space-y-1 bg-blue-50 p-4 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      "To publish original research articles, systematic reviews, clinical studies, and case reports that contribute to the knowledge base of maternal and child health nursing.",
                      "To highlight innovative practices and evidence-based interventions that address critical issues affecting maternal and child health outcomes.",
                      "To foster interdisciplinary collaboration among healthcare professionals, educators, and policymakers in improving health systems and practices.",
                      "To serve as a resource for nursing education by providing materials for undergraduate and graduate programs.",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInLeft}
                        whileInView="animate"
                        initial="initial"
                        className="flex items-start gap-2"
                      >
                        <motion.span
                          className="text-blue-500 mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          <MdCheckCircle className="inline" />
                        </motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Types of Articles */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-purple-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("types")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.types ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdArticle className="text-purple-600" />
                </motion.div>
                Types of Articles Accepted
              </motion.h2>
              <AnimatePresence>
                {expandedSections.types && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      "Original Research Articles",
                      "Systematic Reviews and Meta-Analyses",
                      "Qualitative Studies",
                      "Case Reports",
                      "Review Articles",
                      "Practice Innovations",
                      "Policy Analysis",
                      "Commentary and Opinion Pieces",
                      "Letters to the Editor",
                    ].map((type, index) => (
                      <motion.div
                        key={index}
                        className="bg-purple-50 p-3 rounded-lg flex items-center gap-2"
                        variants={cardVariants}
                        whileHover="hover"
                      >
                        <motion.span
                          className="text-purple-500"
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <MdStar />
                        </motion.span>
                        <span className="text-sm text-gray-700">{type}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Target Audience */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("audience")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.audience ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdPeople className="text-green-600" />
                </motion.div>
                Target Audience
              </motion.h2>
              <AnimatePresence>
                {expandedSections.audience && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      {
                        icon: <MdPregnantWoman />,
                        text: "Maternal and child health nurses",
                      },
                      {
                        icon: <MdMedicalServices />,
                        text: "Healthcare practitioners",
                      },
                      { icon: <MdSchool />, text: "Nurse educators" },
                      {
                        icon: <MdScience />,
                        text: "Researchers in maternal and child health",
                      },
                      {
                        icon: <MdPublic />,
                        text: "Public health professionals",
                      },
                      { icon: <MdPolicy />, text: "Policy makers" },
                      {
                        icon: <MdPeople />,
                        text: "Students in nursing and related fields",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                        variants={fadeInLeft}
                        whileInView="animate"
                        whileHover={{ x: 5, backgroundColor: "#dcfce7" }}
                      >
                        <motion.div
                          className="text-green-500 text-xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-sm text-gray-700">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Editorial Board */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-amber-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("board")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.board ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdPeople className="text-amber-600" />
                </motion.div>
                Editorial Board
              </motion.h2>
              <AnimatePresence>
                {expandedSections.board && (
                  <motion.div
                    className="bg-amber-50 p-4 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700">
                      The journal is led by a distinguished editorial board
                      comprised of experts in maternal and child health nursing,
                      public health, pediatrics, and related disciplines. They
                      ensure the integrity, quality, and relevance of all
                      published content.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Publication Frequency & Open Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.section
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h2
                  className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleSection("frequency")}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: expandedSections.frequency ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdKeyboardArrowRight className="text-xl" />
                  </motion.div>
                  <motion.div {...rotateAnimation}>
                    <MdCalendarToday className="text-blue-600" />
                  </motion.div>
                  Publication Frequency
                </motion.h2>
                <AnimatePresence>
                  {expandedSections.frequency && (
                    <motion.p
                      className="text-gray-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      The journal is published seamlessly with special issues
                      that highlight specific themes or trends in maternal and
                      child health.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.section>

              <motion.section
                className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h2
                  className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleSection("openaccess")}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: expandedSections.openaccess ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdKeyboardArrowRight className="text-xl" />
                  </motion.div>
                  <motion.div {...rotateAnimation}>
                    <MdPublic className="text-green-600" />
                  </motion.div>
                  Open Access Policy
                </motion.h2>
                <AnimatePresence>
                  {expandedSections.openaccess && (
                    <motion.p
                      className="text-gray-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      This journal follows an open-access model, making all
                      articles freely accessible to promote global dissemination
                      of research findings that improve maternal and child
                      health.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.section>
            </div>

            {/* Submission Process */}
            <motion.section
              className="mb-8"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold text-indigo-700 mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("submission")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.submission ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdRocketLaunch className="text-indigo-600" />
                </motion.div>
                Submission Process
              </motion.h2>
              <AnimatePresence>
                {expandedSections.submission && (
                  <motion.ol
                    className="list-decimal list-inside text-gray-700 space-y-2 bg-indigo-50 p-4 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      "Register and log in on the journal's website.",
                      "Submit the manuscript according to formatting guidelines.",
                      "Undergo the peer review process.",
                      "Revise and resubmit until final acceptance.",
                    ].map((step, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        variants={fadeInLeft}
                        whileInView="animate"
                      >
                        <motion.span
                          className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          {index + 1}
                        </motion.span>
                        {step}
                      </motion.li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Ethical Standards & Indexing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.section
                className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h2
                  className="text-xl font-semibold text-red-700 mb-2 flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleSection("ethics")}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: expandedSections.ethics ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdKeyboardArrowRight className="text-xl" />
                  </motion.div>
                  <motion.div {...rotateAnimation}>
                    <MdHeartBroken className="text-red-600" />
                  </motion.div>
                  Ethical Standards
                </motion.h2>
                <AnimatePresence>
                  {expandedSections.ethics && (
                    <motion.p
                      className="text-gray-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      The journal upholds high ethical standards. Authors must
                      adhere to research ethics, transparent reporting, and
                      disclose any conflicts of interest.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.section>

              <motion.section
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.h2
                  className="text-xl font-semibold text-purple-700 mb-2 flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleSection("indexing")}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: expandedSections.indexing ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MdKeyboardArrowRight className="text-xl" />
                  </motion.div>
                  <motion.div {...rotateAnimation}>
                    <MdStar className="text-purple-600" />
                  </motion.div>
                  Indexing and Abstracting
                </motion.h2>
                <AnimatePresence>
                  {expandedSections.indexing && (
                    <motion.p
                      className="text-gray-700"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      The journal is working toward indexing in major academic
                      databases like PubMed, CINAHL, and Scopus to increase
                      research visibility.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.section>
            </div>

            {/* Conclusion */}
            <motion.section
              className="bg-gradient-to-r from-pink-600 to-blue-600 text-white p-6 rounded-lg"
              variants={sectionVariants}
              whileInView="whileInView"
            >
              <motion.h2
                className="text-2xl font-semibold mb-2 flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection("conclusion")}
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: expandedSections.conclusion ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowRight className="text-2xl" />
                </motion.div>
                <motion.div {...rotateAnimation}>
                  <MdHeartBroken className="text-white" />
                </motion.div>
                Conclusion
              </motion.h2>
              <AnimatePresence>
                {expandedSections.conclusion && (
                  <motion.p
                    className="text-white/90"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    The{" "}
                    <strong>
                      International Specialty Journal of Maternal and Child
                      Health Nursing Research
                    </strong>{" "}
                    is dedicated to advancing the field through impactful,
                    peer-reviewed publications. We welcome contributions that
                    inform, engage, and inspire practitioners and scholars to
                    improve maternal and child health outcomes worldwide.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.section>
          </motion.div>

          {/* ISSN Badge */}
          <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
            <motion.div
              className="bg-gradient-to-r from-pink-600 to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
              whileHover={{ scale: 1.05, rotate: 1 }}
              animate={pulseAnimation}
            >
              <p className="font-bold text-lg">
                <span className="mr-2">ISSN</span>
                <motion.span
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  3043-5196
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* Articles Section */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg mb-8"
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
                <MdMenuBook className="text-3xl text-pink-600" />
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
              papers, and clinical studies in maternal and child health nursing.
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
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" />
                  <input
                    type="text"
                    placeholder="Search articles by volume..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  className="md:w-48 relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 z-10" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none cursor-pointer transition-all duration-300"
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
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-pink-100"
                      variants={fadeInUp}
                      whileHover={{
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-pink-600 to-blue-600 text-white px-6 py-3 flex items-center gap-2"
                        whileHover={{
                          background:
                            "linear-gradient(to right, #db2777, #2563eb)",
                        }}
                      >
                        <motion.div {...rotateAnimation}>
                          <MdCalendarToday />
                        </motion.div>
                        <h3 className="text-lg font-semibold">Year {year}</h3>
                        <motion.span
                          className="bg-pink-400 text-sm px-2 py-1 rounded-full ml-2"
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
                              className="group block p-4 border border-pink-100 rounded-lg hover:shadow-md transition-shadow"
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              whileHover="hover"
                              whileTap="tap"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <motion.h4
                                    className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors"
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
                                  <MdDownload className="text-xl text-gray-400 group-hover:text-pink-600 transition-colors" />
                                </motion.div>
                              </div>
                              <motion.div
                                className="mt-3 flex items-center text-sm text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    className="mt-4 text-pink-600 hover:text-pink-800 underline"
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

          {/* CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-xl p-8 text-center shadow-lg"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h3
              className="text-2xl font-bold mb-4"
              animate={floatingAnimation}
            >
              Join Our Maternal and Child Health Nursing Research Community
            </motion.h3>
            <motion.p className="mb-6 text-pink-100" variants={fadeInUp}>
              Contribute to advancing evidence-based practice in maternal and
              child health nursing
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/publish">
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-white text-pink-600 rounded-lg font-medium transition duration-200 shadow-lg"
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

export default MaternalChildJournal;
