import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import Footer from "./Footer";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUserMd,
  FaBaby,
  FaBrain,
  FaHospital,
  FaUsers,
  FaChartLine,
  FaGraduationCap,
  FaBookMedical,
  FaClinicMedical,
  FaProcedures,
  FaUserNurse,
  FaHandsHelping,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaChevronDown,
  FaPlayCircle,
  FaDownload,
  FaShareAlt,
  FaBookOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NursingDepartment = () => {
  const [activeProgram, setActiveProgram] = useState("bsn");
  const [expandedFaculty, setExpandedFaculty] = useState(null);
  const [activeTab, setActiveTab] = useState("programs");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  // Nursing Programs
  const nursingPrograms = [
    {
      id: "bsn",
      title: "Bachelor of Science in Nursing (BSN)",
      duration: "4 years",
      credits: "120 credits",
      description:
        "Comprehensive program preparing students for RN licensure with strong clinical foundation",
      icon: <FaGraduationCap />,
      color: "from-blue-500 to-blue-600",
      stats: {
        acceptance: "85%",
        graduation: "92%",
        nclex: "94%",
        employment: "96%",
      },
      curriculum: [
        "Fundamentals of Nursing Practice",
        "Anatomy & Physiology",
        "Pharmacology",
        "Pathophysiology",
        "Medical-Surgical Nursing",
        "Pediatric Nursing",
        "Obstetric Nursing",
        "Psychiatric Nursing",
        "Community Health Nursing",
        "Nursing Leadership",
      ],
      admissions: {
        requirements: [
          "High School Diploma",
          "Minimum 3.0 GPA",
          "Prerequisite Courses",
          "TEAS Exam",
        ],
        deadline: "April 15, 2024",
      },
    },
    {
      id: "adn",
      title: "Associate Degree in Nursing (ADN)",
      duration: "2 years",
      credits: "72 credits",
      description:
        "Fast-track program for entry-level nursing positions leading to RN licensure",
      icon: <FaUserNurse />,
      color: "from-purple-500 to-purple-600",
      stats: {
        acceptance: "78%",
        graduation: "88%",
        nclex: "91%",
        employment: "94%",
      },
      curriculum: [
        "Nursing Fundamentals",
        "Adult Health Nursing",
        "Maternal-Child Nursing",
        "Mental Health Nursing",
        "Pharmacology Basics",
        "Clinical Rotations",
      ],
    },
    {
      id: "msn",
      title: "Master of Science in Nursing (MSN)",
      duration: "2-3 years",
      credits: "36-48 credits",
      description: "Advanced practice nursing with specialization tracks",
      icon: <FaUserMd />,
      color: "from-emerald-500 to-emerald-600",
      stats: {
        acceptance: "65%",
        graduation: "90%",
        certification: "95%",
        employment: "98%",
      },
      tracks: [
        "Family Nurse Practitioner",
        "Nurse Anesthetist",
        "Nurse Educator",
        "Nurse Administrator",
        "Clinical Nurse Specialist",
      ],
    },
    {
      id: "dnp",
      title: "Doctor of Nursing Practice (DNP)",
      duration: "3-4 years",
      credits: "60+ credits",
      description: "Highest level of nursing practice education",
      icon: <FaChartLine />,
      color: "from-rose-500 to-rose-600",
      stats: {
        acceptance: "60%",
        graduation: "88%",
        publication: "85%",
        leadership: "90%",
      },
      focus: [
        "Evidence-Based Practice",
        "Healthcare Leadership",
        "Health Policy",
        "Clinical Scholarship",
        "Quality Improvement",
      ],
    },
  ];

  // Specializations
  const specializations = [
    {
      id: "pediatric",
      title: "Pediatric Nursing",
      icon: <FaBaby />,
      description: "Care for infants, children, and adolescents",
      color: "bg-pink-500",
      courses: 8,
      clinical: "Children's Hospital",
    },
    {
      id: "critical",
      title: "Critical Care Nursing",
      icon: <FaHeartbeat />,
      description: "Intensive care unit specialization",
      color: "bg-red-500",
      courses: 10,
      clinical: "ICU/ER",
    },
    {
      id: "psychiatric",
      title: "Psychiatric Nursing",
      icon: <FaBrain />,
      description: "Mental health and behavioral care",
      color: "bg-indigo-500",
      courses: 7,
      clinical: "Mental Health Center",
    },
    {
      id: "oncology",
      title: "Oncology Nursing",
      icon: <FaProcedures />,
      description: "Cancer patient care and treatment",
      color: "bg-purple-500",
      courses: 9,
      clinical: "Cancer Center",
    },
    {
      id: "geriatric",
      title: "Geriatric Nursing",
      icon: <FaHandsHelping />,
      description: "Elderly patient care and management",
      color: "bg-amber-500",
      courses: 6,
      clinical: "Senior Care Facility",
    },
    {
      id: "community",
      title: "Community Health",
      icon: <FaClinicMedical />,
      description: "Public health and prevention",
      color: "bg-green-500",
      courses: 8,
      clinical: "Community Clinics",
    },
  ];

  // Faculty Members
  const faculty = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Department Chair",
      specialty: "Nursing Education",
      education: "PhD in Nursing Education, Johns Hopkins University",
      experience: "25 years",
      research: "Clinical Simulation Effectiveness",
      imageColor: "bg-blue-100",
      publications: 45,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Director of Clinical Education",
      specialty: "Critical Care Nursing",
      education: "DNP, University of Pennsylvania",
      experience: "18 years",
      research: "ICU Patient Outcomes",
      imageColor: "bg-purple-100",
      publications: 32,
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      title: "Pediatric Nursing Lead",
      specialty: "Pediatric Oncology",
      education: "PhD in Nursing, University of California",
      experience: "22 years",
      research: "Childhood Cancer Survivorship",
      imageColor: "bg-pink-100",
      publications: 38,
    },
    {
      id: 4,
      name: "Prof. James Wilson",
      title: "Simulation Lab Director",
      specialty: "Clinical Simulation",
      education: "EdD in Health Education, Columbia University",
      experience: "15 years",
      research: "VR in Nursing Education",
      imageColor: "bg-emerald-100",
      publications: 28,
    },
  ];

  // Clinical Partners
  const clinicalPartners = [
    { name: "City General Hospital", type: "Level I Trauma Center", beds: 750 },
    {
      name: "Children's Medical Center",
      type: "Pediatric Specialty",
      beds: 300,
    },
    { name: "University Medical Center", type: "Teaching Hospital", beds: 600 },
    { name: "Mental Health Institute", type: "Psychiatric Care", beds: 200 },
    { name: "Community Health Network", type: "Primary Care", clinics: 12 },
    {
      name: "Veterans Affairs Hospital",
      type: "Government Facility",
      beds: 450,
    },
  ];

  // Resources
  const resources = [
    {
      title: "Program Catalog",
      icon: <FaBookOpen />,
      format: "PDF",
      size: "2.4 MB",
    },
    {
      title: "Admission Requirements",
      icon: <FaGraduationCap />,
      format: "PDF",
      size: "1.8 MB",
    },
    {
      title: "Clinical Handbook",
      icon: <FaBookMedical />,
      format: "PDF",
      size: "3.2 MB",
    },
    {
      title: "Simulation Lab Tour",
      icon: <FaPlayCircle />,
      format: "Video",
      duration: "4:30",
    },
    {
      title: "Faculty Directory",
      icon: <FaUsers />,
      format: "PDF",
      size: "1.5 MB",
    },
    {
      title: "Research Publications",
      icon: <FaChartLine />,
      format: "PDF",
      size: "4.1 MB",
    },
  ];

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            }}
          />

          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  <FaStethoscope className="text-3xl" />
                </motion.div>
                <span className="px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  College of Health Sciences
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-4">Department of Nursing</h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                Excellence in Nursing Education, Research, and Practice.
                Preparing the next generation of healthcare leaders through
                innovative programs and clinical excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/academy/enroll">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              {[
                {
                  id: "programs",
                  label: "Programs",
                  icon: <FaGraduationCap />,
                },
                {
                  id: "specializations",
                  label: "Specializations",
                  icon: <FaUserMd />,
                },
                { id: "faculty", label: "Faculty", icon: <FaUsers /> },
                {
                  id: "clinical",
                  label: "Clinical Training",
                  icon: <FaHospital />,
                },
                // { id: "resources", label: "Resources", icon: <FaBookOpen /> },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-12">
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                label: "Programs Offered",
                value: "12+",
                icon: <FaGraduationCap />,
                color: "bg-blue-500",
              },
              {
                label: "Faculty Members",
                value: "45+",
                icon: <FaUsers />,
                color: "bg-purple-500",
              },
              {
                label: "Clinical Partners",
                value: "50+",
                icon: <FaHospital />,
                color: "bg-emerald-500",
              },
              {
                label: "Research Grants",
                value: "N2.5M+",
                icon: <FaChartLine />,
                color: "bg-rose-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                whileHover="hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                  </div>
                  <div className={`p-3 ${stat.color} text-white rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {/* Programs Tab */}
            {activeTab === "programs" && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Program Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {nursingPrograms.map((program) => (
                    <motion.div
                      key={program.id}
                      whileHover="hover"
                      variants={cardVariants}
                      onClick={() => setActiveProgram(program.id)}
                      className={`bg-white rounded-2xl shadow-lg border-2 ${
                        activeProgram === program.id
                          ? "border-blue-500"
                          : "border-transparent"
                      } hover:shadow-xl transition-all cursor-pointer overflow-hidden`}
                    >
                      <div
                        className={`bg-gradient-to-r ${program.color} p-6 text-white`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">
                              {program.title}
                            </h3>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm opacity-90">
                                {program.duration}
                              </span>
                              <span className="text-sm opacity-90">•</span>
                              <span className="text-sm opacity-90">
                                {program.credits}
                              </span>
                            </div>
                          </div>
                          <div className="text-3xl">{program.icon}</div>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-gray-600 mb-4">
                          {program.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {Object.entries(program.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-2xl font-bold text-gray-900">
                                {value}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {key.replace("_", " ")} Rate
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-blue-600 font-medium">
                            View Details
                          </span>
                          <FaArrowRight className="text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Active Program Details */}
                <AnimatePresence>
                  <motion.div
                    key={activeProgram}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    {(() => {
                      const program = nursingPrograms.find(
                        (p) => p.id === activeProgram,
                      );
                      return (
                        <>
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {program.title} Details
                            </h3>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                              Download Brochure
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4">
                                Curriculum Highlights
                              </h4>
                              <ul className="space-y-2">
                                {program.curriculum?.map((course, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center space-x-2 text-gray-600"
                                  >
                                    <FaChevronDown className="text-blue-400 text-xs" />
                                    <span>{course}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4">
                                Admission Information
                              </h4>
                              {program.admissions && (
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                      Requirements:
                                    </p>
                                    <ul className="space-y-1">
                                      {program.admissions.requirements.map(
                                        (req, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-center space-x-2"
                                          >
                                            <FaStar className="text-yellow-400 text-xs" />
                                            <span className="text-gray-600">
                                              {req}
                                            </span>
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Application Deadline:
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                      {program.admissions.deadline}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Specializations Tab */}
            {activeTab === "specializations" && (
              <motion.div
                key="specializations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nursing Specializations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specializations.map((spec) => (
                    <motion.div
                      key={spec.id}
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                      onMouseEnter={() => setHoveredCard(spec.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 ${spec.color} text-white rounded-lg`}
                        >
                          {spec.icon}
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {spec.courses} courses
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {spec.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{spec.description}</p>

                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>Clinical: {spec.clinical}</span>
                      </div>

                      <motion.div
                        className="mt-6 pt-4 border-t border-gray-100"
                        initial={{ opacity: 0, height: 0 }}
                        animate={
                          hoveredCard === spec.id
                            ? { opacity: 1, height: "auto" }
                            : {}
                        }
                      >
                        <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                          Explore Specialization
                        </button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Faculty Tab */}
            {activeTab === "faculty" && (
              <motion.div
                key="faculty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Meet Our Faculty
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {faculty.map((member) => (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`${member.imageColor} w-20 h-20 rounded-full flex items-center justify-center text-2xl text-gray-700`}
                          >
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {member.name}
                                </h3>
                                <p className="text-blue-600 font-medium">
                                  {member.title}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  setExpandedFaculty(
                                    expandedFaculty === member.id
                                      ? null
                                      : member.id,
                                  )
                                }
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <FaChevronDown
                                  className={`transition-transform ${
                                    expandedFaculty === member.id
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <FaStethoscope className="mr-2" />
                                <span>Specialty: {member.specialty}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FaGraduationCap className="mr-2" />
                                <span>Education: {member.education}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedFaculty === member.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-100"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Experience
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {member.experience}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Publications
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {member.publications}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-4">
                                <span className="font-medium">
                                  Research Focus:
                                </span>{" "}
                                {member.research}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Clinical Training Tab */}
            {activeTab === "clinical" && (
              <motion.div
                key="clinical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Clinical Training & Partnerships
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-3xl">
                    Our students gain hands-on experience through partnerships
                    with leading healthcare facilities, ensuring comprehensive
                    clinical training across diverse healthcare settings.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinicalPartners.map((partner, index) => (
                      <motion.div
                        key={index}
                        whileHover="hover"
                        variants={cardVariants}
                        className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <FaHospital />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {partner.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {partner.type}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <FaProcedures className="mr-2" />
                              <span>
                                {partner.beds || partner.clinics}{" "}
                                {partner.beds ? "Beds" : "Clinics"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Resources & Downloads
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={index}
                      whileHover="hover"
                      variants={cardVariants}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                          {resource.icon}
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {resource.format}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {resource.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{resource.size || resource.duration}</span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <FaDownload />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <FaShareAlt />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Section */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Contact the Nursing Department
                </h2>
                <p className="text-blue-100 mb-6">
                  Have questions about our programs? Our admissions team is here
                  to help guide you through the application process and answer
                  any questions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-blue-200" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-blue-200" />
                    <span>nursing@university.edu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-blue-200" />
                    <span>Health Sciences Building, Room 301</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">
                  Schedule a Campus Tour
                </h3>
                <p className="text-blue-100 mb-6">
                  Experience our state-of-the-art simulation labs and meet with
                  faculty.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Request a Tour
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default NursingDepartment;
