import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Innovation from "../../assets/journal/grjmp.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
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
  MdSocialDistance,
  MdRocketLaunch,
  MdChildCare,
  MdPregnantWoman,
  MdLocalHospital,
  MdFamilyRestroom,
  MdHandshake,
  MdHeartBroken,
  MdVaccines,
  MdAccessible,
  MdEmojiPeople,
  MdGroups,
  MdWoman,
} from "react-icons/md";
import { Link } from "react-router-dom";

const MidwiferyJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    {
      vol: "Vol 1",
      title: "PAIN PERCEPTION AND BEHAVIOUR AMONG WOMEN IN LABOUR",
      link: "https://drive.google.com/file/d/1e1B1paIfYQb3Ch_FvpjXiF2QSxqVMTWk/view?usp=sharing",
      year: "2026",
      authors: "Chiejina E.N, Odira C.C, Okafor C.N, & Sibeudu, F.T",
      abstract: "This study explored pain perception and behavior among women in labour."
    },
    {
      vol: "Vol 2",
      title: "PERCEPTION AND UTILIZATION OF FOCUSED ANTENATAL CARE AMONG WOMEN OF CHILDBEARING AGE",
      link: "https://drive.google.com/file/d/1TWiC7J-slDc_aFMP3ilklAJsdX6j1mvz/view?usp=drive_link",
      year: "2026",
      authors: "AJAYI, Abraham Dare RN, BSc, MSc, PhD, FWACN & Co.",
      abstract: "Focused antenatal care is an evidence-based, goal directed action, family-centered care, that emphasizes quality rather than quantity of visits.."
    },
    {
      vol: "Vol 3",
      title: "MIDWIVE’S PERCEPTION OF OBJECTIVE STRUCTURED CLINICAL EXAMINATION (OSCE) AND THEIR PERFORMANCE",
      link: "https://drive.google.com/file/d/1Ic-jUAW2Qwt7j3G3SEISA_orCXTV1uye/view?usp=sharing",
      year: "2026",
      authors: "Duke, Emon Umoe, B.Sc (Nursing) M.Ed. FWACN",
      abstract: "This study was designed to assess midwive’s perception of objective structured clinical examination (OSCE) and their performance in OSCE, in Akwa Ibom and Cross River States of Nigeria."
    },
    {
      vol: "Vol. 4",
      title: "ATTITUDE OF FAMILY PLANNING PROVIDERS TOWARDS THE USE OF CONTRACEPTIVES BY ADOLESCENTS",
      link: "https://drive.google.com/file/d/1CZUBcWVx0Rz3Hga9KzDg3SK9OY7qjulA/view?usp=sharing",
      year: "2026",
      authors: "Samson-Akpan, Patience E.",
      abstract: "An unmet need for contraception seems to exist among adolescents."
    },
    {
      vol: "Vol. 5",
      title: "ATTITUDE OF PREGNANT WOMEN TOWARDS GROUP HEALTH TALK DURING ANTENATAL CARE",
      link: "https://drive.google.com/file/d/1JmxOyCQm0U7P63zmYDTmYZhTrCxcYjh8/view?usp=sharing",
      year: "2026",
      authors: "MARAGRET OMOWALEOLA AKINWAARE. RN, BNSc.",
      abstract: "Antenatal care is widely established and provides an opportunity to inform and educate pregnant women about pregnancy, childbirth and care of the newborn."
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
      .includes(searchTerm.toLowerCase()) ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.authors.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white">
      <Header />

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
            <span className="bg-gradient-to-r from-rose-700 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              Global Research Journal on Midwifery Practice
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-rose-600 italic"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0 rgba(225,29,72,0)",
                  "0 0 8px rgba(225,29,72,0.2)",
                  "0 0 0 rgba(225,29,72,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Advancing Maternal and Newborn Health Through Research, Education,
              and Compassionate Care
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Hero Image with Overlay */}
        <motion.div
          className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl mb-12 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.01 }}
        >
          <img
            src={Innovation}
            alt="Midwifery Practice and Maternal Care"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-rose-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Peer-Reviewed
                </span>
                <span className="bg-pink-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Open Access
                </span>
                <span className="bg-rose-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  Global Impact
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journal Content */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-rose-100"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          {/* Introduction Section */}
          <motion.section className="mb-12" variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdHealthAndSafety className="text-rose-600" />
              </motion.div>
              The Heart of Maternal Care: Midwifery as a Cornerstone of Global Health
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
                    Every year, millions of women and newborns face preventable
                    complications during pregnancy, childbirth, and the postnatal
                    period. The world's maternal mortality ratio remains
                    unacceptably high, with approximately 287,000 women dying
                    each year from causes related to pregnancy and childbirth.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The International Journal of Midwifery Practice stands at the
                    forefront of addressing these challenges. We recognize that
                    skilled midwifery care is one of the most cost-effective and
                    impactful interventions for improving maternal and newborn
                    health outcomes. This journal serves as a global platform for
                    researchers, practitioners, educators, and policymakers to
                    share evidence, innovations, and best practices that
                    strengthen midwifery services worldwide.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Vision Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdVisibility className="text-rose-600" />
              </motion.div>
              Our Vision: A World Where Every Birth is Safe and Empowered
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
                    We envision a world where every woman has access to
                    respectful, evidence-based midwifery care throughout her
                    pregnancy, childbirth, and postnatal journey. A world where
                    midwives are recognized as essential healthcare providers,
                    equipped with the knowledge, skills, and resources to deliver
                    high-quality care that respects cultural diversity and
                    promotes maternal and newborn well-being.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <MdChildCare className="text-3xl" />,
                        title: "Safe Births",
                        desc: "Reducing maternal and neonatal mortality through skilled attendance at every birth",
                      },
                      {
                        icon: <MdPregnantWoman className="text-3xl" />,
                        title: "Empowered Women",
                        desc: "Promoting informed decision-making and respectful care for all women",
                      },
                      {
                        icon: <MdFamilyRestroom className="text-3xl" />,
                        title: "Healthy Families",
                        desc: "Strengthening family health through comprehensive reproductive care",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-rose-50 p-4 rounded-lg text-center border border-rose-100"
                        whileHover={{ scale: 1.05, backgroundColor: "#fce4ec" }}
                      >
                        <div className="text-rose-600 flex justify-center mb-2">
                          {item.icon}
                        </div>
                        <h4 className="font-semibold text-rose-800">{item.title}</h4>
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
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdLightbulb className="text-rose-600" />
              </motion.div>
              Advancing Midwifery Through Evidence-Based Research
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
                    Our journal prioritizes research that addresses critical gaps
                    in midwifery practice and maternal health. We welcome studies
                    that explore:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <MdLocalHospital />,
                        title: "Clinical Excellence",
                        desc: "Evidence-based protocols for managing complications, emergency care, and high-risk pregnancies",
                      },
                      {
                        icon: <MdPeople />,
                        title: "Community Engagement",
                        desc: "Community-based interventions, health promotion, and addressing social determinants of health",
                      },
                      {
                        icon: <MdSchool />,
                        title: "Education & Training",
                        desc: "Curriculum development, simulation training, competency assessment, and professional development",
                      },
                      {
                        icon: <MdHandshake />,
                        title: "Health Systems Strengthening",
                        desc: "Integration of midwifery services into health systems, policy development, and workforce planning",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-rose-100 p-4 rounded-lg shadow-sm"
                        variants={fadeInLeft}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(225,29,72,0.1)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-rose-500 text-2xl">{item.icon}</div>
                          <div>
                            <h4 className="font-semibold text-rose-800">{item.title}</h4>
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

          {/* Global Impact Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("global")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.global ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdPublic className="text-rose-600" />
              </motion.div>
              Global Impact: Midwifery Around the World
            </motion.h2>
            <AnimatePresence>
              {expandedSections.global && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Midwifery is a global profession with diverse practices and
                    unique challenges across different contexts. Our journal
                    promotes international collaboration and knowledge exchange
                    to advance midwifery practice worldwide.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { region: "Africa", icon: "🌍", stat: "+40%", label: "Maternal mortality reduction" },
                      { region: "Asia", icon: "🌏", stat: "82%", label: "Skilled attendance rate" },
                      { region: "Europe", icon: "🌍", stat: "95%", label: "Midwife-led care access" },
                      { region: "Americas", icon: "🌎", stat: "89%", label: "Prenatal coverage" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-lg text-center border border-rose-100"
                        whileHover={{
                          scale: 1.05,
                          background:
                            "linear-gradient(to bottom right, #fce4ec, #f8bbd0)",
                        }}
                      >
                        <div className="text-3xl mb-1">{item.icon}</div>
                        <div className="font-bold text-rose-700 text-lg">{item.stat}</div>
                        <div className="text-xs text-gray-600">{item.region}</div>
                        <div className="text-xs text-rose-600">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Midwifery Values Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("values")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.values ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdHeartBroken className="text-rose-600" />
              </motion.div>
              Core Values of Midwifery Practice
            </motion.h2>
            <AnimatePresence>
              {expandedSections.values && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {[
                    {
                      icon: <MdWoman className="text-3xl" />,
                      title: "Respectful Care",
                      desc: "Treating every woman with dignity, respect, and compassion, honoring her autonomy and cultural values.",
                    },
                    {
                      icon: <MdVaccines className="text-3xl" />,
                      title: "Evidence-Based Practice",
                      desc: "Delivering care grounded in the best available evidence, adapted to individual needs and preferences.",
                    },
                    {
                      icon: <MdAccessible className="text-3xl" />,
                      title: "Equity & Access",
                      desc: "Advocating for equitable access to quality maternal healthcare for all women, regardless of background.",
                    },
                    {
                      icon: <MdEmojiPeople className="text-3xl" />,
                      title: "Continuity of Care",
                      desc: "Providing comprehensive, coordinated care throughout the maternity journey and beyond.",
                    },
                    {
                      icon: <MdGroups className="text-3xl" />,
                      title: "Cultural Safety",
                      desc: "Ensuring care is free from racism, discrimination, and bias, honoring diverse cultural practices.",
                    },
                    {
                      icon: <MdSocialDistance className="text-3xl" />,
                      title: "Collaboration",
                      desc: "Working in partnership with women, families, and interprofessional teams for optimal outcomes.",
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="bg-white border border-rose-100 p-5 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-rose-500 flex justify-center mb-2">
                        {value.icon}
                      </div>
                      <h4 className="font-semibold text-rose-800">{value.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{value.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ISSN Badge */}
          {/* <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
            <motion.div
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
              whileHover={{ scale: 1.05, rotate: 1 }}
              animate={pulseAnimation}
            >
              <p className="font-bold text-lg">
                <span className="mr-2">ISSN</span>
                <motion.span
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  3043-5161
                </motion.span>
              </p>
            </motion.div>
          </motion.div> */}

          {/* Call to Action */}
          <motion.section variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-rose-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdRocketLaunch className="text-rose-600" />
              </motion.div>
              Join the Global Midwifery Movement
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
                    The International Journal of Midwifery Practice invites
                    researchers, educators, practitioners, and advocates from
                    around the world to contribute to this growing body of
                    knowledge. Together, we can transform maternal healthcare,
                    save lives, and ensure that every birth is a celebration of
                    life and health.
                  </p>

                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
                    <h3 className="text-xl font-semibold text-rose-700 mb-3 text-center">
                      <motion.span animate={floatingAnimation}>
                        🌟 Every Mother. Every Newborn. Everywhere. 🌟
                      </motion.span>
                    </h3>
                    <p className="text-center text-gray-600 text-sm">
                      Submissions open year-round. Join us in advancing midwifery
                      practice for a healthier world.
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
              <MdMenuBook className="text-3xl text-rose-600" />
            </motion.div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Midwifery Research Archive
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore peer-reviewed articles, systematic reviews, case studies, and
            clinical guidelines advancing midwifery practice worldwide.
          </motion.p>

          {/* Search and Filter Bar */}
          <motion.div
            className="bg-rose-50 p-6 rounded-lg mb-8 max-w-5xl"
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
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400" />
                <input
                  type="text"
                  placeholder="Search by title, author, or volume..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 bg-white"
                />
              </motion.div>
              <motion.div
                className="md:w-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 z-10" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white appearance-none cursor-pointer transition-all duration-300"
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
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{
                        background:
                          "linear-gradient(to right, #e11d48, #db2777)",
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
                        className="bg-rose-400/30 text-sm px-2 py-1 rounded-full ml-2"
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
                            className="group block p-5 border border-rose-100 rounded-lg hover:border-rose-300 transition-colors"
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                            custom={index}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                                    {article.vol}
                                  </span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{article.year}</span>
                                </div>
                                <motion.h4
                                  className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors text-lg"
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
                                <MdDownload className="text-xl text-gray-400 group-hover:text-rose-600 transition-colors" />
                              </motion.div>
                            </div>
                            <motion.div
                              className="mt-3 flex items-center text-sm text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    setSelectedYear("All");
                  }}
                  className="mt-4 text-rose-600 hover:text-rose-800 underline"
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

      <Footer />
    </div>
  );
};

export default MidwiferyJournal;