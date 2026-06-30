import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Innovation from "../../assets/journal/innovations.jpg";
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
} from "react-icons/md";
import { Link } from "react-router-dom";

const InnovationJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedSections, setExpandedSections] = useState({});

  const articles = [
    {
      vol: "Vol 2 No. 1",
      link: "https://drive.google.com/file/d/1mi4K5LbymGHDLMI4DYk2h2uZu1a68nWW/view?usp=sharing",
      year: "2024",
    },
    {
      vol: "Art. 1 Vol. 2 No. 1 (Main work)",
      link: "https://drive.google.com/file/d/195sarNHLSMfx9MIYNaLoqHW98TxNNTGp/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 1 Vol. 2 No. 1 (Prelim)",
      link: "https://drive.google.com/file/d/1GWso94KesaGyoZnplTkb7UvB9ZOxPcbX/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 3 Vol. 2 No. 1",
      link: "https://drive.google.com/file/d/1kcKUDYsuEo0hPfYK4hdxp29orwJHo3px/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 4 Vol. 2 No. 1",
      link: "https://drive.google.com/file/d/1lXbAQ9F57pN4Y_I8K_9R9zg-1BIr-hqM/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 5 Vol. 2 No. 1",
      link: "https://drive.google.com/file/d/14BbWmdJjGjWKSHeFw39miOG572rPOjaY/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 6 Vol. 2 No. 1",
      link: "https://drive.google.com/file/d/1VF_3RUwzlMjQMXfQVoOhKFgT-rajcSb9/view?usp=drive_link",
      year: "2024",
    },
    {
      vol: "Art. 8 Vol. 2 No. 1",
      link: "https://drive.google.com/file/d/1wIGnNOA0tzvO1jw-ZFcUO7cPEdf-rWzO/view?usp=drive_link",
      year: "2024",
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
    <div className="min-h-screen bg-gray-50">
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
            className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2"
          >
            THE INTERNATIONAL JOURNAL OF MULTIDISCIPLINARY RESEARCHES AND
            INNOVATIONS (IJMRI)
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-indigo-600 italic"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0 rgba(79,70,229,0)",
                  "0 0 8px rgba(79,70,229,0.3)",
                  "0 0 0 rgba(79,70,229,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              A Beacon of Hope in a World Seeking Well-being
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={Innovation}
            alt="Multidisciplinary Research and Innovation"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Journal Content */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12"
          variants={sectionVariants}
          whileInView="whileInView"
          initial="initial"
        >
          {/* Introduction Section */}
          <motion.section className="mb-12" variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdHealthAndSafety className="text-indigo-600" />
              </motion.div>
              A New Era of Health: Embracing the Interconnectedness of Life
            </motion.h2>
            <AnimatePresence>
              {expandedSections.intro && (
                <motion.p
                  className="text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  The world is facing a health crisis, a complex tapestry woven
                  from chronic diseases, mental health challenges, and a growing
                  disconnect from our own well-being. The traditional medical
                  model, focused on treating disease, is proving insufficient in
                  addressing the intricate web of factors that influence human
                  health. We need a new paradigm, one that embraces a holistic
                  approach, recognizing the interconnectedness of physical,
                  mental, emotional, and spiritual well-being. This is the call
                  to action that drives the International Journal of
                  Multidisciplinary Researches and Innovations (IJMRI).
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Vision Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdVisibility className="text-indigo-600" />
              </motion.div>
              A Vision for a Healthier World: Where Well-being is the Guiding
              Star
            </motion.h2>
            <AnimatePresence>
              {expandedSections.vision && (
                <motion.p
                  className="text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  IJMRI is more than just a journal; it is a platform for a
                  global dialogue on Multidisciplinary Researches and
                  Innovations, a catalyst for groundbreaking research, and a
                  beacon of hope for a world seeking well-being. We believe that
                  true health is not simply the absence of disease, but a state
                  of vibrant vitality and flourishing, where individuals are
                  empowered to live their lives to the fullest potential. This
                  vision is not a utopian dream, but a tangible goal that can be
                  achieved through a collective effort, a shared commitment to
                  understanding and nurturing the interconnectedness of life.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Disciplines Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => toggleSection("disciplines")}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ rotate: expandedSections.disciplines ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdKeyboardArrowRight className="text-2xl" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <MdScience className="text-indigo-600" />
              </motion.div>
              A Tapestry of Disciplines, Woven Together for a Common Purpose
            </motion.h2>
            <AnimatePresence>
              {expandedSections.disciplines && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 leading-relaxed mb-6">
                    IJMRI embraces the understanding that health is a complex
                    phenomenon that cannot be understood in isolation. We
                    welcome contributions from a diverse range of disciplines,
                    recognizing that true health is a symphony of interconnected
                    elements.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <MdHealthAndSafety className="text-2xl" />,
                        title: "Medical Professionals",
                        content:
                          "Physicians, nurses, pharmacists, and other healthcare providers committed to a holistic approach to patient care, integrating traditional and alternative medicine, and embracing the power of personalized medicine.",
                      },
                      {
                        icon: <MdPsychology className="text-2xl" />,
                        title: "Psychologists and Mental Health Professionals",
                        content:
                          "Clinicians, researchers, and educators who explore the intricate relationship between mental health and overall well-being, recognizing the profound impact of our thoughts, emotions, and beliefs on our physical health.",
                      },
                      {
                        icon: <MdRestaurant className="text-2xl" />,
                        title: "Nutritionists and Dietitians",
                        content:
                          "Experts in food science, nutrition, and the impact of diet on health and disease, understanding the power of food as medicine and the importance of sustainable food systems.",
                      },
                      {
                        icon: <MdPark className="text-2xl" />,
                        title: "Traditional Healers",
                        content:
                          "Practitioners of Ayurveda, Traditional Chinese Medicine, Indigenous healing traditions, and other complementary therapies, sharing their knowledge and wisdom about the interconnectedness of body, mind, and spirit.",
                      },
                      {
                        icon: <MdSocialDistance className="text-2xl" />,
                        title: "Social Scientists",
                        content:
                          "Sociologists, anthropologists, and cultural studies scholars who examine the social determinants of health, recognizing the profound impact of social factors on health outcomes.",
                      },
                    ].map((discipline, index) => (
                      <motion.div
                        key={index}
                        className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500"
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                            className="text-indigo-600"
                          >
                            {discipline.icon}
                          </motion.div>
                          <h3 className="font-semibold text-indigo-800">
                            {discipline.title}
                          </h3>
                        </div>
                        <p className="text-gray-700">{discipline.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Research Commitment Section */}
          <motion.section className="mb-12" variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdLightbulb className="text-indigo-600" />
              </motion.div>
              A Commitment to Rigorous Research and Innovative Solutions
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
                    IJMRI is committed to publishing high-quality research that
                    meets the highest standards of scientific rigor and peer
                    review. We prioritize research that:
                  </p>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Pushes the boundaries of knowledge",
                        content:
                          "We seek groundbreaking research that challenges conventional thinking and offers new insights into the nature of health and well-being, exploring the frontiers of scientific understanding and embracing the power of interdisciplinary collaboration.",
                      },
                      {
                        title: "Addresses real-world challenges",
                        content:
                          "We focus on research that has the potential to improve health outcomes and address pressing health issues facing communities around the world, seeking solutions that are both effective and sustainable.",
                      },
                      {
                        title: "Promotes a culture of collaboration",
                        content:
                          "We encourage interdisciplinary research and collaboration between researchers, practitioners, and community members, recognizing that true progress is achieved through shared knowledge and collective action.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        variants={fadeInLeft}
                        whileInView="animate"
                        initial="initial"
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="bg-indigo-100 text-indigo-700 rounded-full p-2 mr-4"
                          animate={{
                            scale: [1, 1.2, 1],
                            backgroundColor: ["#e0e7ff", "#c7d2fe", "#e0e7ff"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-indigo-700 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700">{item.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Global Platform Section */}
          <motion.section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdPublic className="text-indigo-600" />
              </motion.div>
              A Global Platform for Dialogue and Action
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
                    IJMRI is committed to making its content accessible to a
                    global audience, fostering a worldwide dialogue on
                    Multidisciplinary Researches and Innovations.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <MdLanguage className="text-3xl" />,
                        title: "Publish online",
                        content:
                          "The journal will be freely available online, ensuring open access to its content, breaking down barriers to knowledge.",
                      },
                      {
                        icon: <MdTranslate className="text-3xl" />,
                        title: "Multilingual support",
                        content:
                          "We will translate key articles into multiple languages to reach a wider audience, bridging cultural divides.",
                      },
                      {
                        icon: <MdForum className="text-3xl" />,
                        title: "Interactive features",
                        content:
                          "We will incorporate multimedia elements, podcasts, and online forums to enhance engagement and foster dialogue.",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-indigo-100 p-6 rounded-lg shadow-sm"
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.div
                          className="text-indigo-600 mb-3 flex justify-center"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="font-semibold text-indigo-700 mb-3 text-center">
                          {feature.title}
                        </h3>
                        <p className="text-gray-700 text-center">
                          {feature.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ISSN Badge */}
          <motion.div className="mb-8 flex justify-center" variants={fadeInUp}>
            <motion.div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg inline-block"
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
          </motion.div>

          {/* Call to Action */}
          <motion.section variants={fadeInUp}>
            <motion.h2
              className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center gap-2 cursor-pointer"
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
                <MdRocketLaunch className="text-indigo-600" />
              </motion.div>
              A Call to Action: Join the Movement for Multidisciplinary
              Researches and Innovations
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
                    IJMRI invites researchers, practitioners, and individuals
                    passionate about health and well-being to join us in this
                    journey. Together, we can create a world where health is not
                    just a goal, but a reality for all, a world where well-being
                    is the guiding star, illuminating the path to a healthier,
                    more vibrant future.
                  </p>

                  <motion.h3
                    className="text-xl font-semibold text-indigo-700 mb-4 text-center"
                    animate={floatingAnimation}
                  >
                    The Future of Health: A Tapestry Woven from Science, Art,
                    and the Human Spirit.
                  </motion.h3>
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
              <MdMenuBook className="text-3xl text-indigo-600" />
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
            papers, and clinical studies. Browse by year or use the search to
            find specific volumes.
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
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Search articles by volume..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
                />
              </motion.div>
              <motion.div
                className="md:w-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 z-10" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white appearance-none cursor-pointer transition-all duration-300"
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
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 flex items-center gap-2"
                      whileHover={{
                        background:
                          "linear-gradient(to right, #4f46e5, #9333ea)",
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
                        className="bg-indigo-400 text-sm px-2 py-1 rounded-full ml-2"
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
                            className="group block p-4 border border-indigo-100 rounded-lg"
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
                                  className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors"
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
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <MdDownload className="text-xl text-gray-400 group-hover:text-indigo-600 transition-colors" />
                              </motion.div>
                            </div>
                            <motion.div
                              className="mt-3 flex items-center text-sm text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="mt-4 text-indigo-600 hover:text-indigo-800 underline"
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
              <span className="font-semibold">{articles.length}</span> total
              articles in archive •
              <span className="font-semibold ml-1">
                {new Set(articles.map((a) => a.year)).size}
              </span>{" "}
              years of publication
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default InnovationJournal;
