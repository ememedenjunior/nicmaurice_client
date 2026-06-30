import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Professional from "../../assets/journal/professional.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { 
  MdKeyboardArrowRight, 
  MdDownload, 
  MdCalendarToday,
  MdSearch,
  MdFilterList,
  MdMenuBook,
  MdInfoOutline,
  MdLibraryBooks,
  MdTrendingUp,
  MdPublic,
  MdSchool,
  MdLocalHospital,
  MdGroup,
  MdLightbulb
} from "react-icons/md";
import { Link } from "react-router-dom";

const ProfessionalJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  // Journal metadata
  const journalMeta = {
    title: "INTERNATIONAL PROFESSIONAL NURSING JOURNAL",
    subtitle: "A global platform for nursing excellence",
    issn: "1595-4455",
    established: 1999,
    abbreviation: "IPNJ",
    publisher: "International Research Journals",
    frequency: "Quarterly",
    scope: ["Clinical Practice", "Research", "Education", "Leadership", "Policy", "Ethics"]
  };

  const articles = [
    { vol: "Vol. 22 No. 2", link: "https://drive.google.com/file/d/1piWhbb-rL7lHnyzGvQc2huU1v5Xa7TMM/view?usp=sharing", year: "2024", type: "Research Article", downloads: "1.2k" },
    { vol: "Vol. 22 No. 1", link: "https://drive.google.com/file/d/1VRdQ86nlf7TdrUZMJ4QDVrLqt11XurCV/view?usp=sharing", year: "2024", type: "Review Article", downloads: "850" },
    { vol: "Vol 21. No. 3", link: "https://drive.google.com/file/d/1JginAx_4QtBktAp6FEQo02PMdkzIbi5l/view?usp=sharing", year: "2023", type: "Clinical Study", downloads: "2.1k" },
    { vol: "Vol 21. No. 2", link: "https://drive.google.com/file/d/1aAkQ4r2TpzZw4Crtv9HuzwAMuHwp2L9S/view?usp=drive_link", year: "2023", type: "Research Article", downloads: "1.5k" },
    { vol: "Vol 21. No. 1", link: "https://drive.google.com/file/d/10JqO5Gei5rT24Wuyknd330bWimBqDk25/view?usp=sharing", year: "2023", type: "Systematic Review", downloads: "3k" },
    { vol: "Vol 18. No. 1", link: "https://drive.google.com/file/d/1DvKkwXAKxV6i2Szh7lXwD_dyObjXx895/view?usp=sharing", year: "2020", type: "Research Article", downloads: "4.2k" },
    { vol: "Ipnj 2015", link: "https://drive.google.com/file/d/1q0DcxQYRjbLo-DcGNge8lTDTuwVr5JZz/view?usp=sharing", year: "2015", type: "Archive", downloads: "5.1k" },
    { vol: "Ipnj 2014", link: "https://drive.google.com/file/d/1XweEOJYeoM3Qi04bHFhjG6bA_tVfd7no/view?usp=sharing", year: "2014", type: "Archive", downloads: "3.8k" },
    { vol: "Ipnj 2013", link: "https://drive.google.com/file/d/1RY3UD2FOpWa5NO6FUqdeAn59N3CbNhhw/view?usp=sharing", year: "2013", type: "Archive", downloads: "2.9k" },
    { vol: "Ipnj 2012", link: "https://drive.google.com/file/d/1actsbvJyfAXDvrUujR7WktdT6r-m4M0s/view?usp=sharing", year: "2012", type: "Archive", downloads: "3.4k" },
    { vol: "Ipnj 2011", link: "https://drive.google.com/file/d/1im2wILt9gu2GyDf5mjYIFElDaSOtllyM/view?usp=sharing", year: "2011", type: "Archive", downloads: "2.7k" },
    { vol: "Ipnj 2026, No. 1000", link: "https://drive.google.com/file/d/11oQBSYH43ShjvWnlvzIi-UphGb1_9-Hj/view?usp=drive_link", year: "2026", type: "Special Issue", downloads: "150" },
    { vol: "Ipnj 2026, No. 1001", link: "https://drive.google.com/file/d/1fvDNn_74e_dHmaFBYQP4tZYiCodkqATg/view?usp=drive_link", year: "2026", type: "Special Issue", downloads: "120" },
    { vol: "Ipnj 2026, No. 2", link: " https://drive.google.com/file/d/1pK69wWlJUhsIL7n5y43JL9QRoL5uMfQd/view?usp=drive", year: "2026", type: "Research Article", downloads: "1" }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6 }
  };

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.5 }
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
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const yearHeaderVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 }
  };

  // Get unique years for filter
  const years = useMemo(() => {
    return ["All", ...new Set(articles.map(article => article.year))].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return b.localeCompare(a);
    });
  }, [articles]);

  // Filter articles based on search and year
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.vol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === "All" || article.year === selectedYear;
      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear, articles]);

  // Group articles by year
  const groupedArticles = useMemo(() => {
    return filteredArticles.reduce((groups, article) => {
      const year = article.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(article);
      return groups;
    }, {});
  }, [filteredArticles]);

  // Sort years in descending order
  const sortedYears = useMemo(() => {
    return Object.keys(groupedArticles).sort((a, b) => b.localeCompare(a));
  }, [groupedArticles]);

  // Toggle section expansion
  const toggleSection = (year) => {
    setExpandedSections(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  // Stats
  const stats = useMemo(() => ({
    totalArticles: articles.length,
    totalYears: new Set(articles.map(a => a.year)).size,
    totalDownloads: articles.reduce((sum, article) => sum + parseInt(article.downloads) || 0, 0),
    latestYear: Math.max(...articles.map(a => parseInt(a.year))),
    oldestYear: Math.min(...articles.map(a => parseInt(a.year)))
  }), [articles]);

  const descriptionSections = [
    {
      title: "A Legacy of Global Leadership",
      icon: <MdPublic className="text-blue-600" />,
      content: "The International Professional Nursing Journal (IPNJ) has been a beacon of nursing knowledge and innovation for over two decades. Since 1999, it has delivered high-quality, evidence-based content that informs, inspires, and empowers nurses across specialties and career stages."
    },
    {
      title: "Unwavering Commitment to Quality",
      icon: <MdSchool className="text-blue-600" />,
      content: "IPNJ upholds high standards of academic rigor, with every article undergoing meticulous peer review by an international editorial board."
    },
    {
      title: "Comprehensive Scope",
      icon: <MdLocalHospital className="text-blue-600" />,
      content: "IPNJ embraces the multifaceted nature of nursing—covering clinical practice, research, education, leadership, policy, and ethics—ensuring relevance across specialties."
    },
    {
      title: "Global Reach and Impact",
      icon: <MdGroup className="text-blue-600" />,
      content: "IPNJ connects nurses worldwide, fostering a community of practice and expanding its influence on global healthcare improvement."
    },
    {
      title: "Embracing New Frontiers",
      icon: <MdLightbulb className="text-blue-600" />,
      content: "IPNJ seeks and promotes innovation in nursing research, practice, and education, staying ahead in the profession and shaping the future of healthcare."
    },
    {
      title: "Bridging Theory and Practice",
      icon: <MdTrendingUp className="text-blue-600" />,
      content: "IPNJ translates research into practical insights that nurses can apply in their daily work to improve patient care and outcomes."
    }
  ];

  return (
    <>
      <Header />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[100px] px-6 lg:px-[100px]"
      >
        {/* Header Section with ISSN */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[20px] lg:text-[28px] font-bold leading-tight"
            >
              {journalMeta.title}
            </motion.h1>
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-mono"
            >
              ISSN: {journalMeta.issn}
            </motion.span>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 lg:text-[18px] text-[14px] mt-2 font-mono italic"
          >
            {journalMeta.subtitle}
          </motion.p>

          {/* Journal Metadata Badges */}
          <motion.div 
            className="flex flex-wrap gap-3 mt-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span variants={fadeInScale} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Est. {journalMeta.established}
            </motion.span>
            <motion.span variants={fadeInScale} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {journalMeta.frequency}
            </motion.span>
            <motion.span variants={fadeInScale} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {stats.totalArticles} Articles
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Featured Image */}
        <motion.div 
          className="mt-6 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={Professional}
            alt={journalMeta.title}
            className="w-full max-w-5xl h-auto rounded-md shadow-md transition-shadow duration-300 hover:shadow-xl"
          />
          <motion.div 
            className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="text-sm font-mono">ISSN {journalMeta.issn}</span>
          </motion.div>
        </motion.div>

        {/* Journal Description with Icons */}
        <motion.div 
          className="mt-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
          >
            <MdInfoOutline className="text-blue-600" />
            About the Journal
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {descriptionSections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="mt-1"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {section.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-gray-700 italic bg-blue-50 p-4 rounded-lg max-w-5xl"
          >
            International Professional Nursing Journal: More than a publication—it's a global community 
            united by a passion for nursing excellence and a vision for a healthier future.
          </motion.p>
        </motion.div>

        {/* Articles Section */}
        <motion.div 
          className="mt-16 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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
              <MdLibraryBooks className="text-3xl text-blue-600" />
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
            Browse by year or use the search to find specific volumes. <strong>ISSN {journalMeta.issn}</strong>
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
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by volume..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </motion.div>
              <motion.div 
                className="md:w-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none cursor-pointer transition-all duration-300"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year === "All" ? "All Years" : year}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {(searchTerm || selectedYear !== "All") && (
                <motion.div 
                  className="mt-3 flex items-center gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchTerm && (
                    <motion.span 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      Search: {searchTerm}
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                  {selectedYear !== "All" && (
                    <motion.span 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      Year: {selectedYear}
                      <button 
                        onClick={() => setSelectedYear("All")}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
                    variants={yearHeaderVariants}
                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
                  >
                    <motion.div 
                      className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between cursor-pointer"
                      whileHover={{ backgroundColor: "#2563eb" }}
                      onClick={() => toggleSection(year)}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: expandedSections[year] ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MdKeyboardArrowRight className="text-xl" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <MdCalendarToday />
                        </motion.div>
                        <h3 className="text-lg font-semibold">Year {year}</h3>
                        <motion.span 
                          className="bg-blue-400 text-sm px-2 py-1 rounded-full ml-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          {groupedArticles[year].length} {groupedArticles[year].length === 1 ? 'Article' : 'Articles'}
                        </motion.span>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {expandedSections[year] && (
                        <motion.div 
                          className="p-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupedArticles[year].map((article, index) => (
                              <motion.a
                                key={index}
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block p-4 border border-gray-200 rounded-lg"
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
                                    <p className="text-sm text-gray-500 mt-1">{article.type}</p>
                                    <p className="text-xs text-gray-400 mt-1">Published: {article.year}</p>
                                    <p className="text-xs text-green-600 mt-1">{article.downloads} downloads</p>
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="no-results"
                className="text-center py-12 bg-gray-50 rounded-lg max-w-5xl"
                variants={fadeInScale}
                initial="initial"
                animate="animate"
                exit="exit"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ backgroundColor: "#e5e7eb" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-blue-600">{stats.totalArticles}</p>
                <p className="text-sm text-gray-600">Total Articles</p>
              </motion.div>
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <p className="text-2xl font-bold text-blue-600">{stats.totalYears}</p>
                <p className="text-sm text-gray-600">Years of Publication</p>
              </motion.div>
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                <p className="text-2xl font-bold text-blue-600">{stats.latestYear}</p>
                <p className="text-sm text-gray-600">Latest Year</p>
              </motion.div>
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <p className="text-2xl font-bold text-blue-600">{stats.oldestYear}</p>
                <p className="text-sm text-gray-600">Established</p>
              </motion.div>
            </div>
            <motion.p 
              className="text-center text-gray-500 text-sm mt-4 border-t pt-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              International Standard Serial Number (ISSN): {journalMeta.issn}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
};

export default ProfessionalJournal;