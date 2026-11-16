import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdKeyboardArrowRight,
  MdDownload,
  MdCalendarToday,
  MdSearch,
  MdFilterList,
  MdMenuBook,
  MdPublic,
  MdPeople,
  MdLightbulb,
  MdVisibility,
  MdSchool,
  MdHealthAndSafety,
  MdRocketLaunch,
  MdLocalHospital,
  MdHandshake,
} from "react-icons/md";

const NursingAdminJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  // Articles data - using the format provided
  const articles = [
    {
      vol: "Vol 1 Article 1",
      title:
        "OCCUPATIONAL STRESS AND SATISFACTION AMONG NURSE EDUCATORS IN AHMADU BELLO UNIVERSITY, ZARIA.",
      link: "https://drive.google.com/file/d/16mnu6HwqfR3anKDMCpE2eJtt_LVON24p/view?usp=sharing",
      year: "2026",
      authors: "BELLO HUSSAINAT TAIYE, BNSC, RN, RM, PGDE",
      abstract:
        "This research was carried out on occupational stress and job satisfaction among nurse educators in Ahmadu Bello University, Zaria with the aim of identifying the type of stress nurse educators encounter in their work,",
    },
    {
      vol: "Vol 1 Article 2",
      title:
        "CAPACITY BUILDING FOR IMPLEMENTATION AND UTILIZATION OF NURSING RESEARCH AND EVIDENCE-BASED PRACTICE",
      link: "https://drive.google.com/file/d/1Wm7-rFwzU8HZou4saYYnxfp3eamkhme-/view?usp=sharing",
      year: "2024",
      authors: "DR. IDONGESIT I. AKPABIO",
      abstract:
        "The requirement for accountability in health care delivery has brought about an increasing need for reliable and valid information as basis for decision making and practice.",
    },
    {
      vol: "Vol 2 Article 1",
      title:
        "EFFECTIVENESS OF CONVERSATIONAL LEARNING STRATEGY IN NURSING EDUCATION IN BAYELSA STATE",
      link: "https://drive.google.com/file/d/1Ic-jUAW2Qwt7j3G3SEISA_orCXTV1uye/view?usp=sharing",
      year: "2025",
      authors: "Lawrence Ayah Iruo, B. Ed (Hons), M.Ed. RN, RPN.",
      abstract:
        "This study centered on the development of a Conversational Learning Instructional Package (CLIP), a video CD, using Anatomy as a subject base.",
    },
    {
      vol: "Vol 2 Article 2",
      title:
        "KNOWLEDGE AND UTILIZATION OF STANDARDIZED NURSING LANGUAGE AMONG NURSES IN JOS UNIVERSITY TEACHING HOSPITAL PLATEAU STATE, NIGERIA.",
      link: "https://drive.google.com/file/d/1CZUBcWVx0Rz3Hga9KzDg3SK9OY7qjulA/view?usp=sharing",
      year: "2026",
      authors: "AJAYI, Abraham Dare RN, BSc, MSc, PhD, FWACN",
      abstract:
        "Standardized Nursing Language is an emerging concept which marks the dawn of a new era in nursing practice.",
    },
    {
      vol: "Vol 3 Article 1",
      title:
        "IMPACT OF CRANIAL CAPACITY ON ACADEMIC PERFORMANCE OF SECONDARY SCHOOL STUDENTS IN NNEWI.",
      link: "https://drive.google.com/file/d/1JmxOyCQm0U7P63zmYDTmYZhTrCxcYjh8/view?usp=sharing",
      year: "2026",
      authors: "Enemuo Emeka Hyacinth",
      abstract:
        "Cranial capacity is the volume of the interior of the cranium of vertebrates that possess a cranium and a brain.",
    },
  ];

  const regions = [
    "All",
    "Africa",
    "Asia Pacific",
    "Europe",
    "Americas",
    "Middle East",
    "Global",
  ];

  // Get unique years
  const years = [
    "All",
    ...new Set(articles.map((article) => article.year)),
  ].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return b.localeCompare(a);
  });

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesRegion =
      selectedRegion === "All" || article.region === selectedRegion;
    const matchesYear = selectedYear === "All" || article.year === selectedYear;
    return matchesSearch && matchesRegion && matchesYear;
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
      scale: 1.02,
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

  // Helper for region icon
  const regionIcon = (region) => {
    if (region === "Global") return "🌍";
    if (region === "Africa") return "🌍";
    if (region === "Asia Pacific") return "🌏";
    if (region === "Europe") return "🌍";
    if (region === "Americas") return "🌎";
    if (region === "Middle East") return "🌏";
    return "🌐";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">
                NurseAdmin{" "}
                <span className="font-light text-blue-600">· Global</span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                🌐 nursing leadership · policy · management · worldwide
              </p>
            </div>
            <div className="bg-blue-50 px-5 py-2 rounded-full text-sm font-medium text-blue-700">
              🌎 International · 2026
            </div>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 max-w-6xl"
      >
        {/* Journal Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-3"
          >
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Global Journal of Nursing Administration
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-blue-600 italic"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0 rgba(37,99,235,0)",
                  "0 0 8px rgba(37,99,235,0.2)",
                  "0 0 0 rgba(37,99,235,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Advancing Nursing Leadership, Policy, and Healthcare Management
              Worldwide
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl mb-12 relative bg-gradient-to-r from-blue-600 to-indigo-600 h-64 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="text-white text-center p-8">
            <div className="text-6xl mb-4">🏥</div>
            <h2 className="text-3xl font-bold mb-2">
              Nursing Administration Excellence
            </h2>
            <p className="text-lg opacity-90">
              Empowering nurse leaders worldwide
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                Peer-Reviewed
              </span>
              <span className="bg-indigo-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                Open Access
              </span>
              <span className="bg-blue-400/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                Global Impact
              </span>
            </div>
          </div>
        </motion.div>

        {/* Journal Content */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-blue-100"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          {/* Introduction Section */}
          <motion.section className="mb-12" variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("intro")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.intro ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdHealthAndSafety className="text-blue-600" />
              </motion.div>
              The Heart of Healthcare: Nursing Administration as a Cornerstone
              of Global Health
            </motion.h2>
            <AnimatePresence>
              {expandedSections.intro && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Global Journal of Nursing Administration stands at the
                    forefront of advancing nursing leadership, healthcare
                    management, and policy development worldwide. We recognize
                    that effective nursing administration is essential for
                    delivering high-quality, safe, and compassionate care to
                    diverse populations across the globe.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    This journal serves as a global platform for nurse leaders,
                    administrators, researchers, and policymakers to share
                    evidence, innovations, and best practices that strengthen
                    healthcare systems and improve patient outcomes. We are
                    committed to promoting excellence in nursing leadership
                    across all regions and healthcare settings.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Vision Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("vision")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.vision ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdVisibility className="text-blue-600" />
              </motion.div>
              Our Vision: Excellence in Nursing Leadership Worldwide
            </motion.h2>
            <AnimatePresence>
              {expandedSections.vision && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We envision a world where nursing leaders are empowered with
                    the knowledge, skills, and resources to drive positive
                    change in healthcare systems. A world where nursing
                    administration is recognized as a vital specialty that
                    shapes patient care, workforce development, and health
                    policy at local, national, and global levels.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <MdLocalHospital className="text-3xl" />,
                        title: "Quality Care",
                        desc: "Driving excellence in patient care through effective leadership and management",
                      },
                      {
                        icon: <MdPeople className="text-3xl" />,
                        title: "Empowered Workforce",
                        desc: "Developing and supporting the next generation of nursing leaders",
                      },
                      {
                        icon: <MdPublic className="text-3xl" />,
                        title: "Global Impact",
                        desc: "Strengthening healthcare systems through innovative administration",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100"
                        whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
                      >
                        <div className="text-blue-600 flex justify-center mb-2">
                          {item.icon}
                        </div>
                        <h4 className="font-semibold text-blue-800">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Research Focus Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("research")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.research ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdLightbulb className="text-blue-600" />
              </motion.div>
              Advancing Nursing Administration Through Evidence-Based Research
            </motion.h2>
            <AnimatePresence>
              {expandedSections.research && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our journal prioritizes research that addresses critical
                    challenges in nursing administration and healthcare
                    management. We welcome studies that explore:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <MdLocalHospital />,
                        title: "Clinical Excellence",
                        desc: "Evidence-based protocols for improving patient outcomes through leadership",
                      },
                      {
                        icon: <MdPeople />,
                        title: "Workforce Development",
                        desc: "Staff retention, professional development, and creating healthy work environments",
                      },
                      {
                        icon: <MdSchool />,
                        title: "Leadership Education",
                        desc: "Curriculum development, mentorship programs, and leadership competencies",
                      },
                      {
                        icon: <MdHandshake />,
                        title: "Health Systems Strengthening",
                        desc: "Policy development, healthcare reform, and resource management",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm"
                        variants={fadeInLeft}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(37,99,235,0.1)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-blue-500 text-2xl">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Call to Action */}
          <motion.section variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("cta")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.cta ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdRocketLaunch className="text-blue-600" />
              </motion.div>
              Join the Global Nursing Administration Movement
            </motion.h2>
            <AnimatePresence>
              {expandedSections.cta && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The Global Journal of Nursing Administration invites
                    researchers, educators, practitioners, and advocates from
                    around the world to contribute to this growing body of
                    knowledge. Together, we can transform healthcare leadership,
                    strengthen healthcare systems, and ensure that every patient
                    receives the highest quality care.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3 text-center">
                      <motion.span animate={floatingAnimation}>
                        🌟 Empowering Nurse Leaders. Transforming Healthcare.
                        Everywhere. 🌟
                      </motion.span>
                    </h3>
                    <p className="text-center text-gray-600 text-sm">
                      Submissions open year-round. Join us in advancing nursing
                      administration for a healthier world.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
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
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Nursing Administration Research Archive
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore peer-reviewed articles, leadership studies, and policy
            analyses advancing nursing administration worldwide.
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
                  placeholder="Search by title, author, abstract, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
                />
              </motion.div>
              <motion.div
                className="md:w-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 z-10" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white appearance-none cursor-pointer transition-all duration-300"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === "All" ? "All Regions" : region}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div
                className="md:w-40 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdCalendarToday className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 z-10" />
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
                className="space-y-8 max-w-5xl"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 20 }}
              >
                {sortedYears.map((year) => (
                  <motion.div
                    key={year}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{
                        background:
                          "linear-gradient(to right, #1d4ed8, #4f46e5)",
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <MdCalendarToday />
                      </motion.div>
                      <h3 className="text-lg font-semibold">Year {year}</h3>
                      <motion.span
                        className="bg-blue-400/30 text-sm px-2 py-1 rounded-full ml-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {groupedArticles[year].length}{" "}
                        {groupedArticles[year].length === 1
                          ? "Article"
                          : "Articles"}
                      </motion.span>
                    </motion.div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-4">
                        {groupedArticles[year].map((article, index) => (
                          <motion.a
                            key={index}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-5 border border-blue-100 rounded-lg hover:border-blue-300 transition-colors"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {article.vol}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    •
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {article.year}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    •
                                  </span>
                                  <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                                    {regionIcon(article.region)}{" "}
                                    {article.region}
                                  </span>
                                  {article.keywords &&
                                    article.keywords
                                      .slice(0, 2)
                                      .map((keyword, i) => (
                                        <span
                                          key={i}
                                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                                        >
                                          #{keyword}
                                        </span>
                                      ))}
                                </div>
                                <motion.h4
                                  className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-lg"
                                  whileHover={{ x: 5 }}
                                >
                                  {article.title}
                                </motion.h4>
                                <p className="text-sm text-gray-500 mt-1">
                                  {article.authors}
                                </p>
                                {article.abstract && (
                                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {article.abstract}
                                  </p>
                                )}
                              </div>
                              <motion.div
                                whileHover={{ rotate: 15, scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="ml-4 flex-shrink-0"
                              >
                                <MdDownload className="text-xl text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </motion.div>
                            </div>
                            <motion.div
                              className="mt-3 flex items-center text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              initial={{ x: -10 }}
                              whileHover={{ x: 0 }}
                            >
                              <span>Download Full Article</span>
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
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔍
                </motion.div>
                <motion.p
                  className="text-gray-500 text-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  No articles found matching your criteria.
                </motion.p>
                <motion.button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedRegion("All");
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
            whileHover={{ backgroundColor: "#f3f4f6" }}
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
              years of publication •
              <span className="font-semibold ml-1">
                {new Set(articles.map((a) => a.vol)).size}
              </span>{" "}
              volumes
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NursingAdminJournal;
