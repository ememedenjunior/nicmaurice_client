import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowRight, MdDownload, MdArticle, MdCalendarToday, MdSearch, MdFilterList, MdMenuBook, MdCircle } from "react-icons/md";
import { 
  FaFlask, 
  FaHeartbeat, 
  FaUsers, 
  FaGlobe, 
  FaHandsHelping, 
  FaBalanceScale,
  FaChartLine,
  FaLeaf,
  FaMicroscope,
  FaCalculator,
  FaHistory,
  FaHandshake
} from "react-icons/fa";
import { 
  GiHealthNormal, 
  GiBrain, 
  GiEarthAmerica, 
  GiMicroscope, 
  GiMaterialsScience,
  GiThink
} from "react-icons/gi";
import Multidisciplinary from "../../assets/journal/multidisciplinary.jpg";
import { Link } from "react-router-dom";

const MultidisciplinaryJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    { vol: "Vol. 2 No. 2", link: "https://drive.google.com/file/d/1TJmz2k2WS2Dmho9wM6uhCmnPjlU4cN2q/view?usp=sharing", year: "2024" },
    { vol: "Vol. 2 No. 1", link: "https://drive.google.com/file/d/1klCCW_XPVd5bZtfIotpm6CEpyVUAeeOS/view?usp=sharing", year: "2024" },
    { vol: "Vol 1. No. 2", link: "https://drive.google.com/file/d/11TvBFjw4MH4SB9B3q5thHqn-3pkJFc2_/view?usp=sharing", year: "2023" },
    { vol: "Vol 1. No. 1", link: "https://drive.google.com/file/d/1c5a4Hb4xdyQGICmAvR_EYrmezPGve-iQ/view?usp=sharing", year: "2023" },
    { vol: "No. 26", link: "https://drive.google.com/file/d/1KRgZ4aKOUmV00uv5KdBB8cdCZsSnJ_jz/view?usp=drive_link", year: "2026" }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    viewport: { once: true, amount: 0.2 }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateAnimation = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Get unique years for filter
  const years = ["All", ...new Set(articles.map(article => article.year))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return b.localeCompare(a);
  });

  // Filter articles based on search and year
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.vol.toLowerCase().includes(searchTerm.toLowerCase());
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
  const sortedYears = Object.keys(groupedArticles).sort((a, b) => b.localeCompare(a));

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Discipline categories with icons
  const disciplines = [
    { icon: <FaHeartbeat className="text-2xl" />, name: "Healthcare professions", items: ["medicine", "nursing", "allied health"], color: "red" },
    { icon: <FaUsers className="text-2xl" />, name: "Social sciences", items: ["sociology", "psychology", "anthropology"], color: "purple" },
    { icon: <GiHealthNormal className="text-2xl" />, name: "Public health", items: ["epidemiology", "health policy", "health education"], color: "green" },
    { icon: <FaLeaf className="text-2xl" />, name: "Environmental sciences", items: ["environmental health", "ecology", "conservation"], color: "emerald" },
    { icon: <GiMicroscope className="text-2xl" />, name: "Biological sciences", items: ["biology", "microbiology", "genetics"], color: "blue" },
    { icon: <GiMaterialsScience className="text-2xl" />, name: "Physical sciences", items: ["physics", "chemistry", "engineering"], color: "indigo" },
    { icon: <FaCalculator className="text-2xl" />, name: "Mathematical and computational sciences", items: ["biostatistics", "data science"], color: "orange" },
    { icon: <GiThink className="text-2xl" />, name: "Humanities", items: ["ethics", "philosophy", "history"], color: "amber" }
  ];

  // Mission points
  const missionPoints = [
    { icon: <FaHandshake />, text: "Interdisciplinary collaboration and knowledge sharing" },
    { icon: <FaFlask />, text: "Innovative research and methodologies" },
    { icon: <FaHeartbeat />, text: "Best practices in healthcare delivery, education, and community engagement" },
    { icon: <FaGlobe />, text: "Global collaboration and knowledge exchange" }
  ];

  // Editorial board roles
  const editorialRoles = [
    { role: "Shape the journal's direction and scope" },
    { role: "Ensure the quality and relevance of published articles" },
    { role: "Identify emerging trends and topics in multidisciplinary practices" },
    { role: "Develop strategic partnerships and collaborations" }
  ];

  // Reviewer roles
  const reviewerRoles = [
    { role: "Evaluating manuscripts through a rigorous and constructive peer-review process" },
    { role: "Providing feedback that enhances the quality and impact of published research" },
    { role: "Ensuring that our journal maintains the highest standards of scientific integrity and excellence" }
  ];

  // Author contributions
  const authorContributions = [
    "Sharing innovative research and ideas",
    "Showcasing best practices and case studies",
    "Exploring new methodologies and frameworks",
    "Addressing complex health issues and challenges",
    "Presenting theoretical and conceptual frameworks",
    "Sharing empirical research and data-driven findings",
    "Offering critical perspectives and analyses"
  ];

  // Journal goals
  const journalGoals = [
    { icon: <FaBalanceScale />, text: "Breaks down disciplinary silos and fosters interdisciplinary collaboration" },
    { icon: <FaChartLine />, text: "Showcases cutting-edge research and innovation in public and community health" },
    { icon: <FaUsers />, text: "Provides a platform for underrepresented voices and perspectives" },
    { icon: <FaHandsHelping />, text: "Informs policy and practice with evidence-based research" },
    { icon: <FaGlobe />, text: "Contributes to improving health equity, access, and outcomes globally" },
    { icon: <FaBalanceScale />, text: "Fosters a culture of inclusivity, diversity, and equity" }
  ];

  return (
    <>
      <Header />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[80px] px-6 lg:px-[100px]"
      >
        {/* Header Section */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-[20px] lg:text-[28px] font-bold underline leading-tight text-orange-800"
          >
            International Research Journal of Multidisciplinary Practices,
            Public and Community Health
          </motion.h1>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={Multidisciplinary}
            alt="multidisciplinary journal"
            className="w-full max-w-5xl h-auto rounded-md shadow-md"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="w-full max-w-5xl mt-[30px] text-[16px] font-mono"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >

          {/* Introduction */}
          <motion.div 
            className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.p
              variants={fadeInUp}
            >
              <span className="font-semibold text-orange-600">
                <i> Representing </i>
              </span>{" "}
              diverse disciplines and expertise, you are the pillars of our
              journal's success. As we embark on this new venture, we
              acknowledge the vast scope of multidisciplinary practices in
              public and community health.
            </motion.p>
          </motion.div>

          {/* Disciplines Grid */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-orange-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('disciplines')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.disciplines ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaFlask className="text-orange-600" />
              </motion.div>
              Our Disciplines
            </motion.h2>
            <AnimatePresence>
              {expandedSections.disciplines && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {disciplines.map((discipline, index) => (
                    <motion.div
                      key={index}
                      className={`bg-${discipline.color}-50 p-4 rounded-lg border-l-4 border-${discipline.color}-500`}
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div 
                          className={`text-${discipline.color}-600`}
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                        >
                          {discipline.icon}
                        </motion.div>
                        <h3 className="font-semibold text-gray-800">{discipline.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {discipline.items.map((item, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mission Section */}
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('mission')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.mission ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaHandsHelping className="text-green-600" />
              </motion.div>
              Our Mission
            </motion.h2>
            <AnimatePresence>
              {expandedSections.mission && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4">
                    <span className="font-semibold text-green-600">
                      <i> Our mission </i>
                    </span>{" "}
                    is to create a platform where researchers, practitioners, and
                    policymakers can converge, share ideas, and learn from each
                    other's perspectives, fostering:
                  </p>
                  <div className="space-y-2">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-white rounded-lg"
                        variants={fadeInLeft}
                        whileInView="animate"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="text-green-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {point.icon}
                        </motion.div>
                        <span className="text-gray-700">{point.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Editorial Board Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('editorial')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.editorial ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaUsers className="text-blue-600" />
              </motion.div>
              Editorial Board Members
            </motion.h2>
            <AnimatePresence>
              {expandedSections.editorial && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4">
                    <span className="font-semibold text-blue-600">
                      <i> As Editorial Board Members, </i>
                    </span>{" "}
                    your guidance and expertise will help us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {editorialRoles.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg"
                        variants={cardVariants}
                        whileHover="hover"
                      >
                        <motion.span 
                          className="text-blue-500"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <MdCircle />
                        </motion.span>
                        <span className="text-sm text-gray-700">{item.role}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Reviewers Section */}
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('reviewers')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.reviewers ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaMicroscope className="text-purple-600" />
              </motion.div>
              Reviewers
            </motion.h2>
            <AnimatePresence>
              {expandedSections.reviewers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4">
                    <span className="font-semibold text-purple-600">
                      <i> As Reviewers, your input is crucial in: </i>
                    </span>{" "}
                  </p>
                  <div className="space-y-3">
                    {reviewerRoles.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg"
                        variants={fadeInLeft}
                        whileInView="animate"
                      >
                        <motion.span 
                          className="text-purple-500 mt-1"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <MdCircle className="text-lg" />
                        </motion.span>
                        <span className="text-gray-700">{item.role}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Authors Section */}
          <motion.div 
            className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('authors')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.authors ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaUsers className="text-amber-600" />
              </motion.div>
              Authors
            </motion.h2>
            <AnimatePresence>
              {expandedSections.authors && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4">
                    <span className="font-semibold text-amber-600">
                      <i> As Authors, your contributions are vital in: </i>
                    </span>{" "}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {authorContributions.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg"
                        variants={cardVariants}
                        whileHover="hover"
                      >
                        <motion.span 
                          className="text-amber-500"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <MdStar />
                        </motion.span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Journal Goals */}
          <motion.div 
            className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('goals')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.goals ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <FaGlobe className="text-teal-600" />
              </motion.div>
              Together, we create a journal that:
            </motion.h2>
            <AnimatePresence>
              {expandedSections.goals && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {journalGoals.map((goal, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg"
                      variants={fadeInLeft}
                      whileInView="animate"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="text-teal-500"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                      >
                        {goal.icon}
                      </motion.div>
                      <span className="text-gray-700">{goal.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Commitment Section */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.p variants={fadeInUp}>
              We are committed to maintaining the highest ethical standards,
              transparency, and inclusivity in our publication process. We will
              work tirelessly to ensure that our journal is:
            </motion.p>
            <motion.ul className="mt-4 space-y-2">
              {[
                "Indexed in major databases",
                "Widely disseminated and accessible to diverse audiences",
                "Compliant with international publication ethics and standards"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-2"
                  variants={fadeInLeft}
                  whileInView="animate"
                >
                  <motion.span 
                    className="text-indigo-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <MdCircle />
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className="mt-6" variants={fadeInUp}>
              Thank you for your dedication, expertise, and time. Let us work
              together to create a journal that makes a meaningful impact in the
              field of public and community health. Please feel free to contact
              us with any questions, suggestions, or ideas. We look forward to
              collaborating with you and producing a journal that we can all be
              proud of.
            </motion.p>

            <motion.p className="mt-4" variants={fadeInUp}>Best regards,</motion.p>

            <motion.p className="mt-2 font-bold text-orange-600" variants={fadeInUp}>
              International Research Journal of Multidisciplinary Practices,
              Public and Community Health
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ISSN Badge */}
        <motion.div 
          className="mb-8 flex justify-center mt-8"
          variants={fadeInUp}
        >
          <motion.div 
            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={pulseAnimation}
          >
            <p className="font-bold text-lg">
              <span className="mr-2">ISSN</span>
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                3043-4793
              </motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* Articles Section */}
        <motion.div 
          className="mt-16 mb-12"
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
              <MdMenuBook className="text-3xl text-orange-600" />
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Journal Articles</h2>
          </motion.div>
          
          <motion.p 
           className="text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Access our complete archive of peer-reviewed articles spanning multiple disciplines in public and community health. 
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
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                <input
                  type="text"
                  placeholder="Search articles by volume..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
                />
              </motion.div>
              <motion.div 
                className="md:w-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 z-10" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white appearance-none cursor-pointer transition-all duration-300"
                >
                  {years.map(year => (
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
                className="space-y-8 max-w-5xl"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 20 }}
              >
                {sortedYears.map(year => (
                  <motion.div 
                    key={year} 
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{ background: "linear-gradient(to right, #ea580c, #d97706)" }}
                    >
                      <motion.div {...rotateAnimation}>
                        <MdCalendarToday />
                      </motion.div>
                      <h3 className="text-lg font-semibold">Year {year}</h3>
                      <motion.span 
                        className="bg-orange-400 text-sm px-2 py-1 rounded-full ml-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {groupedArticles[year].length} {groupedArticles[year].length === 1 ? 'Article' : 'Articles'}
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
                            className="group block p-4 border border-orange-100 rounded-lg"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <motion.h4 
                                  className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors"
                                  whileHover={{ x: 5 }}
                                >
                                  {article.vol}
                                </motion.h4>
                                <p className="text-sm text-gray-500 mt-1">Published: {article.year}</p>
                              </div>
                              <motion.div
                                whileHover={{ rotate: 15, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <MdDownload className="text-xl text-gray-400 group-hover:text-orange-600 transition-colors" />
                              </motion.div>
                            </div>
                            <motion.div 
                              className="mt-3 flex items-center text-sm text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="text-center py-12 bg-gray-50 rounded-lg max-w-5xl"
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
                  className="mt-4 text-orange-600 hover:text-orange-800 underline"
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
            className="mt-8 bg-gray-50 p-4 rounded-lg max-w-5xl"
            variants={fadeInUp}
            whileHover={{ backgroundColor: "#e5e7eb" }}
          >
            <motion.p 
              className="text-gray-600"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-semibold">{articles.length}</span> total articles in archive • 
              <span className="font-semibold ml-1">{new Set(articles.map(a => a.year)).size}</span> years of publication
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
};

export default MultidisciplinaryJournal;