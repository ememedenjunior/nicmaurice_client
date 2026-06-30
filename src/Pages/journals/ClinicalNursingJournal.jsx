import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
  MdPeople,
  MdVisibility,
  MdSchool,
  MdHealthAndSafety,
  MdLocalHospital,
  MdPolicy,
  MdComputer,
  MdCheckCircle,
  MdStar,
  MdTrendingUp
} from "react-icons/md";

const ClinicalNursingJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/1TUSnfyZ6jn8jgeau5yevkXrlpCFeR-GQ/view?usp=sharing", year: "2023" }
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with Image */}
        <motion.header 
          className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl shadow-lg mb-8 overflow-hidden"
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
            <motion.h1 
              variants={fadeInLeft}
              className="text-3xl md:text-4xl font-bold border-b-2 border-blue-400 pb-4"
            >
              INTERNATIONAL SPECIALTY JOURNAL OF ADVANCED CLINICAL NURSING
              RESEARCH
            </motion.h1>
            <motion.p 
              variants={fadeInLeft}
              className="mt-4 text-xl text-blue-200"
            >
              <motion.span
                animate={{ 
                  textShadow: ["0 0 0 rgba(96,165,250,0)", "0 0 8px rgba(96,165,250,0.5)", "0 0 0 rgba(96,165,250,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                A Robust Profile
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.header>

        {/* Introduction */}
        <motion.section 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('intro')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.intro ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdHealthAndSafety className="text-blue-600" />
            </motion.div>
            Introduction
          </motion.h2>
          <AnimatePresence>
            {expandedSections.intro && (
              <motion.p 
                className="text-gray-700 mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                The International Specialty Journal of Advanced Clinical Nursing
                Research (ISJACNR) stands as a beacon of excellence in the field of
                nursing scholarship. Dedicated to publishing cutting-edge, original
                research that advances clinical nursing practice, ISJACNR serves as
                a vital platform for disseminating knowledge and fostering
                innovation within the global nursing community.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Scope and Focus */}
        <motion.section 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('scope')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.scope ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdScience className="text-blue-600" />
            </motion.div>
            Scope and Focus
          </motion.h2>
          <AnimatePresence>
            {expandedSections.scope && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  {
                    icon: <MdLocalHospital className="text-2xl" />,
                    title: "Clinical Practice",
                    content:
                      "Research that explores innovative interventions, best practices, and evidence-based care strategies across diverse clinical settings including studies examining new treatments, care models, and tools to enhance patient outcomes.",
                  },
                  {
                    icon: <MdSchool className="text-2xl" />,
                    title: "Nursing Education",
                    content:
                      "Research on advancements in nursing education, curriculum development, faculty research, and the impact of educational interventions including simulation-based learning and virtual reality teaching methods.",
                  },
                  {
                    icon: <MdPeople className="text-2xl" />,
                    title: "Nursing Leadership",
                    content:
                      "Research on leadership theories, strategies, and challenges faced by nurses in various roles, including leadership styles' impact on team performance and promoting equity in healthcare systems.",
                  },
                  {
                    icon: <MdPolicy className="text-2xl" />,
                    title: "Health Policy",
                    content:
                      "Research analyzing health policy impact on nursing workforce, access to care, and healthcare delivery including telehealth policies, chronic disease management, and sustainable healthcare systems.",
                  },
                  {
                    icon: <MdComputer className="text-2xl" />,
                    title: "Technology in Nursing",
                    content:
                      "Research on technology integration in clinical practice including telehealth, EHRs, AI applications, and the ethical implications of technology in patient care.",
                  },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="text-blue-600"
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="font-semibold text-lg text-blue-800">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-700">{item.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Target Audience */}
        <motion.section 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('audience')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.audience ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdPeople className="text-blue-600" />
            </motion.div>
            Target Audience
          </motion.h2>
          <AnimatePresence>
            {expandedSections.audience && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  "Advanced Practice Nurses: Nurse practitioners and clinical specialists",
                  "Nursing Researchers: Faculty and students advancing nursing science",
                  "Healthcare Professionals: Physicians and pharmacists collaborating with nurses",
                  "Policymakers: Individuals shaping health policy impacting nursing",
                  "Patients and Consumers: Those engaged in patient-centered care research",
                ].map((audience, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
                    variants={fadeInLeft}
                    whileInView="animate"
                    initial="initial"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.span 
                      className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        backgroundColor: ["#3b82f6", "#2563eb", "#3b82f6"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <MdCheckCircle className="h-4 w-4" />
                    </motion.span>
                    <span className="text-gray-700">{audience}</span>
                  </motion.div>
                ))}
              </motion.div>
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
            className="text-2xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('features')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.features ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdStar className="text-blue-600" />
            </motion.div>
            Key Features
          </motion.h2>
          <AnimatePresence>
            {expandedSections.features && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  "Rigorous Peer Review: Expert-led double-blind review process",
                  "Open Access: Freely available global research dissemination",
                  "High Impact Factor: Widely cited influential publications",
                  "International Scope: Global research perspectives",
                  "Innovative Formats: Multimedia and interactive content",
                  "Future Trends: VR, AI, and wearable tech in nursing",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-3 bg-gray-50 rounded-lg border border-blue-100"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.span 
                      className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <MdCheckCircle className="h-4 w-4" />
                    </motion.span>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Benefits */}
        <motion.section 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('benefits')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.benefits ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdTrendingUp className="text-blue-600" />
            </motion.div>
            Benefits of Publishing in ISJACNR
          </motion.h2>
          <AnimatePresence>
            {expandedSections.benefits && (
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  "Increased Visibility: Reach a global audience of nursing professionals",
                  "Enhanced Credibility: Peer-reviewed validation of your research",
                  "Networking Opportunities: Connect with international colleagues",
                  "Career Advancement: Demonstrate your research leadership",
                  "Practice Impact: Directly influence clinical nursing improvements",
                ].map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={fadeInLeft}
                    whileInView="animate"
                    initial="initial"
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="bg-blue-500 text-white rounded-full p-1 mr-3"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <MdCheckCircle className="h-5 w-5" />
                    </motion.span>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ISSN Badge */}
        <motion.div 
          className="mb-8 flex justify-center"
          variants={fadeInUp}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={pulseAnimation}
          >
            <p className="font-bold text-lg">
              <span className="mr-2">ISSN</span>
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                3043-517X
              </motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* Conclusion */}
        <motion.section 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          <motion.h2 
            className="text-2xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 mb-6 flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('conclusion')}
            whileHover={{ x: 10 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.conclusion ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </motion.div>
            <motion.div {...rotateAnimation}>
              <MdVisibility className="text-blue-600" />
            </motion.div>
            Conclusion
          </motion.h2>
          <AnimatePresence>
            {expandedSections.conclusion && (
              <motion.p 
                className="text-gray-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                The International Specialty Journal of Advanced Clinical Nursing
                Research stands as a leading platform for disseminating cutting-edge
                research that advances clinical nursing practice. Its rigorous peer
                review process, open access policy, high impact factor,
                international scope, commitment to innovation, and focus on future
                trends make it a valuable resource for researchers, clinicians,
                policymakers, and patients seeking to improve patient care and shape
                the future of nursing.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>

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
              <MdMenuBook className="text-3xl text-blue-600" />
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Journal Articles</h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Access our complete archive of peer-reviewed articles, research papers, and clinical studies. 
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
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search articles by volume..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{ background: "linear-gradient(to right, #2563eb, #4f46e5)" }}
                    >
                      <motion.div {...rotateAnimation}>
                        <MdCalendarToday />
                      </motion.div>
                      <h3 className="text-lg font-semibold">Year {year}</h3>
                      <motion.span 
                        className="bg-blue-400 text-sm px-2 py-1 rounded-full ml-2"
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
                            className="group block p-4 border border-blue-100 rounded-lg"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <motion.h4 
                                  className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors"
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
                                <MdDownload className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </motion.div>
                            </div>
                            <motion.div 
                              className="mt-3 flex items-center text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
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
      </div>
      <Footer />
    </>
  );
};

export default ClinicalNursingJournal;