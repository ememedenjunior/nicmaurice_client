import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nursing from "../../assets/journal/nursing.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
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
  MdSchool
} from "react-icons/md";
import { Link } from "react-router-dom";

const NursingJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    { vol: "Vol. 2 No. 1", link: "https://drive.google.com/file/d/1UXS9vTu51v21MCilhokOloR2f-BGqi85/view?usp=sharing", year: "2024" },
    { vol: "Vol. 1 No. 1", link: "https://drive.google.com/file/d/1G2Ny0EzrLYVIAMtLzTwvnl1L_q-q6tXO/view?usp=sharing", year: "2023" },
    { vol: "No. 013", link: "https://drive.google.com/file/d/1GnlHVApSoW8Fe3r9oFrpYrAEUxegOgfu/view?usp=drive_link", year: "2026" },
    { vol: "No. 014", link: "https://drive.google.com/file/d/1JlSmDpv2BfiaxAFDW25Y4MM7yevEhx6R/view?usp=drive_link", year: "2026" },
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

  const actionPointVariants = {
    initial: { opacity: 0, x: -20 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      x: 10,
      backgroundColor: "#f0f9ff",
      transition: { duration: 0.2 }
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[100px] px-6 lg:px-[100px]"
      >
        {/* Header Section */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[20px] lg:text-[28px] font-bold underline leading-tight"
          >
            A CALL TO REVOLUTIONIZE NURSING RESEARCH: REIMAGINING THE
            INTERNATIONAL JOURNAL OF ADVANCED NURSING RESEARCH (IJANR)
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 lg:text-[18px] text-[14px] mt-2 font-mono italic"
          >
            A global platform for nursing excellence
          </motion.p>
        </motion.div>

        {/* Featured Image */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={Nursing}
            alt="nursing research journal"
            className="w-full max-w-5xl h-auto rounded-md shadow-md transition-shadow duration-300 hover:shadow-xl"
          />
        </motion.div>

        {/* ISSN Badge */}
        <motion.div 
          className="mt-6 inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg">
            <p className="font-semibold">
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ISSN - 3043 5153
              </motion.span>
            </p>
          </div>
        </motion.div>

        {/* Main Content with Interactive Sections */}
        <motion.div 
          className="mt-10 text-[16px] lg:text-[18px] font-mono text-gray-800 space-y-8 max-w-5xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Introduction */}
          <motion.div variants={fadeInUp} className="bg-white p-6 rounded-lg shadow-md">
            <p>
              To the esteemed Editor-in-Chief and fellow editors of the
              International Journal of Advanced Nursing Research, and to the
              dedicated professional nurses worldwide, We stand at a crossroads.
              The world of nursing research is brimming with potential, yet the
              International Journal of Advanced Nursing Research, while a valuable
              resource, has not fully captured the dynamism and innovation that
              defines our profession. This is not a critique, but a call to
              action. A call to revolutionize the journal, to transform it into a
              platform that truly reflects the global landscape of nursing, its
              challenges, its triumphs, and its unwavering commitment to improving
              patient care.
            </p>
          </motion.div>

          {/* Pressing Issues Section */}
          <motion.div 
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
            className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg shadow-md"
          >
            <motion.h3 
              className="font-semibold text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('issues')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.issues ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <i>The Pressing Issues: A Call for Transformation</i>
            </motion.h3>
            <AnimatePresence>
              {expandedSections.issues && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  The International Journal of Advanced Nursing Research has the
                  potential to be a beacon of excellence, a catalyst for change, and a
                  platform for global collaboration. However, to achieve this, it must
                  address several pressing issues that currently hinder its impact and
                  relevance.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Global Perspective Section */}
          <motion.div 
            variants={sectionVariants}
            whileInView="whileInView"
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md"
          >
            <motion.h3 
              className="font-semibold text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('global')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.global ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <div className="flex items-center gap-2">
                <MdPublic className="text-blue-600" />
                <i>1. A Global Perspective: Beyond Borders, Towards a Unified Voice</i>
              </div>
            </motion.h3>
            <AnimatePresence>
              {expandedSections.global && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden space-y-4"
                >
                  <p>
                    The world faces a multitude of health challenges, from pandemics and
                    climate change to rising healthcare costs and disparities in access
                    to care. These challenges are amplified in the developing world,
                    where nurses often work in resource-limited settings, facing unique
                    obstacles and demonstrating remarkable resilience. The journal must
                    actively seek and publish research that addresses these global
                    issues, providing a platform for nurses worldwide to share their
                    experiences, innovations, and solutions.
                  </p>
                  
                  {/* Action Points */}
                  <div className="space-y-2 ml-4">
                    {[
                      "Dedicated sections for global health research",
                      "Translation and accessibility",
                      "Partnerships with international organizations",
                      "Funding opportunities for global research"
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        variants={actionPointVariants}
                        whileInView="whileInView"
                        whileHover="hover"
                        className="flex items-center gap-2 p-2 rounded-lg cursor-pointer"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.5 
                          }}
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        </motion.div>
                        <span className="text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Diversity Section */}
          <motion.div 
            variants={sectionVariants}
            whileInView="whileInView"
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-md"
          >
            <motion.h3 
              className="font-semibold text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('diversity')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.diversity ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <div className="flex items-center gap-2">
                <MdPeople className="text-purple-600" />
                <i>2. Diversity and Inclusion: Amplifying the Voices of All Nurses</i>
              </div>
            </motion.h3>
            <AnimatePresence>
              {expandedSections.diversity && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden space-y-4"
                >
                  <p>
                    Nursing research must reflect the diversity of our profession. The
                    journal should actively seek contributions from nurses of all
                    backgrounds, including those from underrepresented groups, ensuring
                    that the research published reflects the experiences and
                    perspectives of nurses from all corners of the globe. This includes
                    nurses of different races, ethnicities, genders, sexual
                    orientations, and socioeconomic backgrounds.
                  </p>
                  
                  <h4 className="font-semibold">Concrete Actions:</h4>
                  <div className="space-y-2 ml-4">
                    {[
                      "Targeted recruitment of diverse authors",
                      "Diversity training for editors and reviewers",
                      "Dedicated sections for research on marginalized populations",
                      "Mentorship programs for diverse researchers"
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        variants={actionPointVariants}
                        whileInView="whileInView"
                        whileHover="hover"
                        className="flex items-center gap-2 p-2 rounded-lg"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <div className="w-2 h-2 bg-purple-600 rounded-full" />
                        </motion.div>
                        <span className="text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Impact Section */}
          <motion.div 
            variants={sectionVariants}
            whileInView="whileInView"
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-md"
          >
            <motion.h3 
              className="font-semibold text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('impact')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.impact ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <div className="flex items-center gap-2">
                <MdLightbulb className="text-green-600" />
                <i>3. Impact and Relevance: Bridging the Gap Between Research and Practice</i>
              </div>
            </motion.h3>
            <AnimatePresence>
              {expandedSections.impact && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden space-y-4"
                >
                  <p>
                    The research published in the journal must be relevant to the
                    real-world challenges faced by nurses. This means focusing on
                    research that has the potential to improve patient care, advance
                    nursing practice, and shape healthcare policy. The journal should
                    actively promote the translation of research findings into practice,
                    ensuring that the research published has a tangible impact on the
                    lives of patients and nurses.
                  </p>
                  
                  <div className="space-y-2 ml-4">
                    {[
                      "Focus on translational research",
                      "Collaboration with practitioners",
                      "Dissemination strategies",
                      "Case studies and implementation reports"
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        variants={actionPointVariants}
                        whileInView="whileInView"
                        whileHover="hover"
                        className="flex items-center gap-2 p-2 rounded-lg"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                        </motion.div>
                        <span className="text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Technology Section */}
          <motion.div 
            variants={sectionVariants}
            whileInView="whileInView"
            className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-lg shadow-md"
          >
            <motion.h3 
              className="font-semibold text-lg flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('technology')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.technology ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <div className="flex items-center gap-2">
                <MdScience className="text-cyan-600" />
                <i>4. Embracing Innovation: Harnessing the Power of Emerging Technologies</i>
              </div>
            </motion.h3>
            <AnimatePresence>
              {expandedSections.technology && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden space-y-4"
                >
                  <p>
                    The field of nursing is rapidly evolving, with new technologies and
                    innovations emerging at an unprecedented pace. The journal must
                    embrace these advancements, publishing research that explores the
                    potential of these technologies to improve patient care, enhance
                    nursing practice, and transform the healthcare landscape.
                  </p>
                  
                  <div className="space-y-2 ml-4">
                    {[
                      "Dedicated sections for technology-focused research",
                      "Interdisciplinary collaborations",
                      "Ethical considerations of technology",
                      "Workshops and webinars on technology"
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        variants={actionPointVariants}
                        whileInView="whileInView"
                        whileHover="hover"
                        className="flex items-center gap-2 p-2 rounded-lg"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <div className="w-2 h-2 bg-cyan-600 rounded-full" />
                        </motion.div>
                        <span className="text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* More sections can be added following the same pattern... */}

          {/* Call to Action */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="font-semibold text-xl mb-4 flex items-center gap-2"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MdVisibility className="text-2xl" />
              <i>A Call to Action: Reimagining the Future of Nursing Research</i>
            </motion.h3>
            
            <motion.p 
              className="mb-4"
              variants={fadeInUp}
            >
              We urge the Editor-in-Chief and fellow editors of the International
              Journal of Advanced Nursing Research to embrace these challenges and
              opportunities. By taking concrete steps to address these pressing
              issues, the journal can become a truly transformative force in the
              field of nursing research, serving as a platform for innovation,
              collaboration, and impact.
            </motion.p>

            <motion.p 
              className="mb-4 font-semibold"
              variants={fadeInUp}
            >
              To the dedicated professional nurses worldwide:
            </motion.p>

            <motion.p variants={fadeInUp}>
              We are the driving force behind nursing research. We are the ones
              who witness the challenges and opportunities in our daily practice.
              We are the ones who have the knowledge, experience, and passion to
              drive innovation and improve patient care. Let us demand a journal
              that reflects our commitment to excellence, our dedication to our
              profession, and our unwavering commitment to improving the lives of
              our patients.
            </motion.p>

            <motion.div 
              className="mt-6 flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{ 
                  boxShadow: ["0 0 0 rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.5)", "0 0 0 rgba(255,255,255,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <p className="text-xl font-bold text-yellow-300">
                  THE TIME FOR CHANGE IS NOW
                </p>
              </motion.div>
            </motion.div>
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
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{ background: "linear-gradient(to right, #2563eb, #1e40af)" }}
                    >
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
                    </motion.div>
                    <div className="p-6">
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
      </motion.div>

      <Footer />
    </>
  );
};

export default NursingJournal;