import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
  MdStar,
  MdTrendingUp,
  MdThermostat,
  MdVaccines,
  MdAttachMoney,
  MdEqualizer,
  MdEngineering,
  MdAnalytics,
  MdPrecisionManufacturing,
  MdChat,
  MdLocationOn,
  MdAssignment,
  MdVideoLibrary,
  MdPodcasts,
  MdInfo,
  MdWarning,
  MdSecurity,
  MdCircle
} from "react-icons/md";
import Communnity from "../../assets/journal/community.jpg";
import { Link } from "react-router-dom";

const CommunityJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
        { vol: "Vol 2 No. 1", link: "https://drive.google.com/file/d/11A4ct_shlliMyrVi00-LLl2l51bU2Sjy/view?usp=sharing", year: "2024" },
        { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/1-y37ZKyNZLSP6OvATvUeCopBd2ojHcDa/view?usp=sharing", year: "2023" }
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[100px] px-6 lg:px-[100px]"
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
            className="text-[20px] lg:text-[28px] font-bold underline leading-tight text-teal-800"
          >
            ELEVATING YOUR INTERNATIONAL JOURNAL OF PUBLIC AND COMMUNITY HEALTH:
            A PROFILE FOR GROWTH AND IMPACT
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
            src={Communnity}
            alt="community journal"
            className="w-full max-w-5xl h-auto rounded-md shadow-md"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="w-full max-w-5xl mt-[35px] text-[16px] font-mono"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Introduction */}
          <motion.div 
            className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdHealthAndSafety className="text-teal-600" />
              </motion.div>
              Introduction
            </motion.h2>
            <AnimatePresence>
              {expandedSections.intro && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4">
                    Our journal stands at a pivotal moment in the evolution of public
                    and community health research. The field is rapidly changing, driven
                    by technological advancements, particularly the rise of artificial
                    intelligence (AI). To maintain its relevance and impact, your
                    journal needs to embrace this transformation and position itself as
                    a leading platform for innovative and impactful research.
                  </p>
                  <p>
                    <span className="font-semibold text-teal-600">
                      <i> Vision: </i>
                    </span>{" "}
                    To be a leading international platform for transformative research
                    that advances public and community health, embracing
                    interdisciplinary approaches, leveraging the power of artificial
                    intelligence, and driving real-world impact.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Content and Scope */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdScience className="text-teal-600" />
              </motion.div>
              Content and Scope
            </motion.h2>
            <AnimatePresence>
              {expandedSections.scope && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Focus on Emerging Trends */}
                  <div>
                    <h3 className="font-semibold text-teal-600 mb-3 flex items-center gap-2">
                      <MdTrendingUp className="text-xl" />
                      Focus on Emerging Trends:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: <MdThermostat />, title: "Climate Change and Health", desc: "Research exploring the impact of climate change on health, including heatwaves, air pollution, and infectious disease outbreaks." },
                        { icon: <MdVaccines />, title: "Pandemics and Infectious Diseases", desc: "Research on pandemic preparedness, disease surveillance, and the development of innovative treatments and vaccines." },
                        { icon: <MdAttachMoney />, title: "Rising Healthcare Costs and Access", desc: "Research focused on improving access to healthcare, reducing costs, and ensuring equitable health outcomes." },
                        { icon: <MdEqualizer />, title: "Health Inequities", desc: "Research examining the social determinants of health, addressing disparities in access to healthcare, and promoting health equity." }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500"
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <div className="flex items-center gap-2 mb-2 text-teal-600">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            >
                              {item.icon}
                            </motion.div>
                            <h4 className="font-semibold">{item.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Embrace Interdisciplinarity */}
                  <div>
                    <h3 className="font-semibold text-teal-600 mb-3 flex items-center gap-2">
                      <MdPeople className="text-xl" />
                      Embrace Interdisciplinarity:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: <MdPublic />, title: "Public Health", desc: "Epidemiology, biostatistics, health policy, environmental health" },
                        { icon: <MdLocalHospital />, title: "Medicine", desc: "Clinical research, public health medicine, global health" },
                        { icon: <MdSocialDistance />, title: "Social Sciences", desc: "Sociology, anthropology, psychology, economics" },
                        { icon: <MdEngineering />, title: "Engineering", desc: "Bioengineering, data science, computer science" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          variants={fadeInLeft}
                          whileInView="animate"
                          initial="initial"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className="text-teal-500 mt-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Special Issues */}
                  <div>
                    <h3 className="font-semibold text-teal-600 mb-3 flex items-center gap-2">
                      <MdStar className="text-xl" />
                      Special Issues:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: <MdBiotech />, title: "AI in Public Health", desc: "Disease surveillance, risk assessment, personalized medicine" },
                        { icon: <MdPrecisionManufacturing />, title: "Precision Medicine", desc: "Tailoring interventions to individual patients" },
                        { icon: <MdEqualizer />, title: "Social Determinants", desc: "Impact of social factors on health outcomes" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg text-center"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <motion.div 
                            className="text-3xl text-teal-600 mb-2"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 1 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* AI Integration Section */}
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('ai')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.ai ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdBiotech className="text-purple-600" />
              </motion.div>
              AI Integration in Public Health
            </motion.h2>
            <AnimatePresence>
              {expandedSections.ai && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Research Methodology */}
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-3">AI in Research Methodology</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: <MdAnalytics />, title: "Data Analysis", desc: "Machine learning, deep learning for trend identification" },
                        { icon: <MdWarning />, title: "Disease Surveillance", desc: "Outbreak detection, early warning systems" },
                        { icon: <MdSecurity />, title: "Risk Assessment", desc: "Individual health risk prediction" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white p-4 rounded-lg shadow-sm"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <motion.div 
                            className="text-2xl text-purple-600 mb-2"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Applications */}
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-3">AI in Clinical Applications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: <MdLocalHospital />, title: "Diagnosis and Treatment", desc: "Image analysis, personalized treatment recommendations" },
                        { icon: <MdComputer />, title: "Remote Patient Monitoring", desc: "AI-powered devices for early intervention" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg"
                          variants={fadeInLeft}
                          whileInView="animate"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className="text-2xl text-purple-600"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Community Health Interventions */}
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-3">AI in Community Health Interventions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: <MdChat />, title: "Health Education", desc: "Chatbots for health information" },
                        { icon: <MdLocationOn />, title: "Community Engagement", desc: "Community mapping, vulnerable populations" },
                        { icon: <MdAssignment />, title: "Resource Allocation", desc: "Data-driven resource optimization" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white p-3 rounded-lg text-center"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <motion.div 
                            className="text-2xl text-purple-600 mb-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h4 className="font-semibold text-xs mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Journal Structure */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('structure')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.structure ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdMenuBook className="text-teal-600" />
              </motion.div>
              Journal Structure and Features
            </motion.h2>
            <AnimatePresence>
              {expandedSections.structure && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    { icon: <MdCircle />, title: "Rigorous Peer Review", desc: "Double-blind peer review with AI-assisted screening" },
                    { icon: <MdComputer />, title: "Modern Online Platform", desc: "User-friendly website with advanced search" },
                    { icon: <MdVideoLibrary />, title: "Multimedia Content", desc: "Infographics, podcasts, videos" },
                    { icon: <MdPublic />, title: "Open Access Options", desc: "Increased visibility and accessibility" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg"
                      variants={fadeInLeft}
                      whileInView="animate"
                      whileHover={{ x: 5, backgroundColor: "#ccfbf1" }}
                    >
                      <motion.div 
                        className="text-teal-500 text-xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Critical Components */}
          <motion.div 
            className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection('critical')}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.critical ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div {...rotateAnimation}>
                <MdWarning className="text-amber-600" />
              </motion.div>
              Critical Components
            </motion.h2>
            <AnimatePresence>
              {expandedSections.critical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {[
                    { icon: <MdPeople />, title: "Diversity and Inclusion", desc: "Diverse representation among authors, reviewers, and editorial board" },
                    { icon: <MdSecurity />, title: "Ethical Guidelines", desc: "Clear guidelines for research and publication, especially for AI use" },
                    { icon: <MdVisibility />, title: "Transparency and Openness", desc: "Transparent editorial process, review criteria, and funding sources" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg"
                      variants={fadeInLeft}
                      whileInView="animate"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="text-amber-500 text-xl"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Conclusion */}
          <motion.div 
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-lg shadow-md mb-6"
            variants={sectionVariants}
            whileInView="whileInView"
            initial="initial"
          >
            <motion.h2 
              className="text-xl font-semibold mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdRocketLaunch className="text-white" />
              </motion.div>
              Conclusion
            </motion.h2>
            <AnimatePresence>
              {expandedSections.conclusion && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/90"
                >
                  By embracing these elements, your journal can become a leading voice
                  in the rapidly evolving field of public and community health,
                  leveraging the power of AI to advance research, improve health
                  outcomes for all, and create a healthier future. Remember,
                  continuous innovation, thoughtful adaptation, and a commitment to
                  ethical principles are essential for your journal's sustained
                  success and impact.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ISSN Badge */}
        <motion.div 
          className="mb-8 flex justify-center mt-8"
          variants={fadeInUp}
        >
          <motion.div 
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 1 }}
            animate={pulseAnimation}
          >
            <p className="font-bold text-lg">
              <span className="mr-2">ISSN</span>
              <motion.span
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                3043-5188
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
              <MdMenuBook className="text-3xl text-teal-600" />
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Journal Articles</h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Access our complete archive of peer-reviewed articles, research papers, and community health studies. 
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
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white appearance-none cursor-pointer transition-all duration-300"
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
                      className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{ background: "linear-gradient(to right, #0d9488, #059669)" }}
                    >
                      <motion.div {...rotateAnimation}>
                        <MdCalendarToday />
                      </motion.div>
                      <h3 className="text-lg font-semibold">Year {year}</h3>
                      <motion.span 
                        className="bg-teal-400 text-sm px-2 py-1 rounded-full ml-2"
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
                            className="group block p-4 border border-teal-100 rounded-lg"
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
                                  className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors"
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

export default CommunityJournal;