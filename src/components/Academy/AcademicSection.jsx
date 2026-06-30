import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaFileAlt,
  FaGraduationCap,
  FaUserGraduate,
  FaBook,
  FaStar,
  FaClipboardCheck,
  FaStethoscope,
  FaHeartbeat,
  FaShieldAlt,
  FaBed,
  FaUtensils,
  FaWifi,
  FaDumbbell,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaClock,
  FaPercentage,
  FaCheckCircle,
  FaCalculator,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Header } from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const AdmissionsSection = () => {
  const [activeTab, setActiveTab] = useState("requirements");
  const [expandedSection, setExpandedSection] = useState(null);
  const [calculatorValues, setCalculatorValues] = useState({
    tuition: 18000,
    housing: "on-campus",
    mealPlan: "standard",
    credits: 15,
    scholarships: 5000,
    financialAid: 3000,
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Admission Requirements
  const admissionRequirements = {
    bsn: {
      academic: [
        {
          requirement: "High School Diploma/GED",
          status: "required",
          icon: <FaGraduationCap />,
        },
        {
          requirement: "Minimum 3.0 GPA",
          status: "required",
          icon: <FaChartLine />,
        },
        {
          requirement: "SAT Score: 1150+ or ACT: 24+",
          status: "recommended",
          icon: <FaBook />,
        },
        {
          requirement: "Biology & Chemistry Courses",
          status: "required",
          icon: <FaStethoscope />,
        },
        {
          requirement: "Algebra & Statistics",
          status: "required",
          icon: <FaCalculator />,
        },
      ],
      documentation: [
        {
          requirement: "Completed Application",
          status: "required",
          icon: <FaFileAlt />,
        },
        {
          requirement: "Official Transcripts",
          status: "required",
          icon: <FaBookOpen />,
        },
        {
          requirement: "Personal Statement",
          status: "required",
          icon: <FaUserGraduate />,
        },
        {
          requirement: "2 Letters of Recommendation",
          status: "required",
          icon: <FaUsers />,
        },
        {
          requirement: "TEAS Exam Scores",
          status: "required",
          icon: <FaClipboardCheck />,
        },
        {
          requirement: "Immunization Records",
          status: "required",
          icon: <FaHeartbeat />,
        },
        {
          requirement: "CPR Certification",
          status: "required",
          icon: <FaShieldAlt />,
        },
        {
          requirement: "Background Check",
          status: "required",
          icon: <FaShieldAlt />,
        },
      ],
      deadlines: [
        { term: "Fall 2024", date: "April 15, 2024", status: "upcoming" },
        { term: "Spring 2025", date: "October 15, 2024", status: "open" },
        { term: "Summer 2025", date: "February 15, 2025", status: "future" },
      ],
    },
    transfer: {
      requirements: [
        "Minimum 2.8 college GPA",
        "Completed prerequisite courses",
        "Good standing at previous institution",
        "Transfer credit evaluation",
      ],
      deadlines: [
        { term: "Fall 2024", date: "June 1, 2024" },
        { term: "Spring 2025", date: "November 1, 2024" },
      ],
    },
    international: {
      requirements: [
        "TOEFL: 80+ or IELTS: 6.5+",
        "Credential evaluation",
        "Financial documentation",
        "Student visa",
      ],
    },
  };

  // Tuition & Fees
  const tuitionData = {
    bsn: {
      perCredit: 1200,
      fullTime: 18000,
      partTime: 9000,
      fees: [
        { name: "Technology Fee", amount: 500, per: "semester" },
        { name: "Lab Fees", amount: 750, per: "semester" },
        { name: "Clinical Fees", amount: 1000, per: "year" },
        { name: "Student Services", amount: 350, per: "semester" },
        { name: "Health Insurance", amount: 1200, per: "year" },
      ],
      paymentOptions: [
        { name: "Full Payment", discount: "2% discount" },
        { name: "Payment Plan", installments: "4 installments" },
        { name: "Financial Aid", type: "Federal/State" },
        { name: "Loans", type: "Federal/Private" },
      ],
    },
    comparison: [
      {
        school: "State University",
        tuition: 25000,
        nclex: "89%",
        employment: "91%",
      },
      {
        school: "Private College",
        tuition: 45000,
        nclex: "92%",
        employment: "94%",
      },
      {
        school: "Community College",
        tuition: 15000,
        nclex: "86%",
        employment: "88%",
      },
      {
        school: "Our Program",
        tuition: 18000,
        nclex: "94%",
        employment: "96%",
        highlight: true,
      },
    ],
  };

  // Financial Aid
  const financialAid = {
    scholarships: [
      {
        name: "Academic Excellence",
        amount: 5000,
        requirements: "3.5+ GPA",
        deadline: "March 1",
      },
      {
        name: "Nursing Leadership",
        amount: 3000,
        requirements: "Leadership experience",
        deadline: "April 15",
      },
      {
        name: "Diversity in Nursing",
        amount: 4000,
        requirements: "Underrepresented group",
        deadline: "February 15",
      },
      {
        name: "Community Service",
        amount: 2500,
        requirements: "100+ service hours",
        deadline: "May 1",
      },
    ],
    grants: [
      {
        name: "Federal Pell Grant",
        amount: "Up to $6,895",
        type: "Need-based",
      },
      {
        name: "State Nursing Grant",
        amount: "Up to $3,000",
        type: "State program",
      },
      { name: "Institutional Grant", amount: "Varies", type: "Merit-based" },
    ],
    workStudy: [
      { position: "Clinical Assistant", hours: "10-15/week", pay: "$15/hour" },
      { position: "Research Assistant", hours: "10-20/week", pay: "$18/hour" },
      { position: "Tutor", hours: "5-10/week", pay: "$20/hour" },
      { position: "Library Assistant", hours: "10-15/week", pay: "$14/hour" },
    ],
  };

  // Accommodation Options
  const accommodationOptions = {
    onCampus: [
      {
        name: "North Residence Hall",
        type: "Traditional Dorm",
        price: 4500,
        per: "semester",
        features: [
          "Shared room",
          "Community bathroom",
          "Study lounges",
          "Laundry facilities",
          "24/7 security",
        ],
        amenities: [FaWifi, FaUtensils, FaDumbbell, FaUsers],
        availability: "Limited",
      },
      {
        name: "Health Sciences Suites",
        type: "Suite-style",
        price: 6500,
        per: "semester",
        features: [
          "Private bedroom",
          "Shared living room",
          "Kitchenette",
          "Private bathroom",
          "Study rooms",
        ],
        amenities: [FaWifi, FaUtensils, FaBed, FaUsers],
        availability: "Available",
      },
      {
        name: "Graduate Apartments",
        type: "Apartment",
        price: 8500,
        per: "semester",
        features: [
          "Private apartment",
          "Full kitchen",
          "Living area",
          "Private bathroom",
          "Parking included",
        ],
        amenities: [FaWifi, FaUtensils, FaBed, FaDumbbell],
        availability: "Waitlist",
      },
    ],
    offCampus: [
      {
        name: "University Heights",
        distance: "0.5 miles",
        price: 1200,
        type: "Studio",
      },
      {
        name: "Campus Court",
        distance: "0.8 miles",
        price: 900,
        type: "Shared",
      },
      {
        name: "Med Student Housing",
        distance: "1.2 miles",
        price: 1100,
        type: "1 Bedroom",
      },
      {
        name: "Nursing Co-op",
        distance: "1.5 miles",
        price: 800,
        type: "Co-living",
      },
    ],
    mealPlans: [
      {
        name: "Basic Plan",
        meals: "10/week",
        price: 1800,
        features: ["Dining hall access", "Take-out options"],
      },
      {
        name: "Standard Plan",
        meals: "14/week",
        price: 2200,
        features: ["All dining halls", "Guest passes", "Flex dollars"],
      },
      {
        name: "Premium Plan",
        meals: "Unlimited",
        price: 2800,
        features: [
          "All dining options",
          "Guest passes",
          "$300 flex",
          "Late-night dining",
        ],
      },
    ],
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const baseTuition = calculatorValues.tuition;
    const housingCost = calculatorValues.housing === "on-campus" ? 4500 : 1200;
    const mealCost =
      calculatorValues.mealPlan === "standard"
        ? 2200
        : calculatorValues.mealPlan === "premium"
          ? 2800
          : 1800;
    const fees = 2600; // Estimated fees

    return (
      baseTuition +
      housingCost +
      mealCost +
      fees -
      calculatorValues.scholarships -
      calculatorValues.financialAid
    );
  };

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admissions & Student Life
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about joining our nursing program,
              costs, and campus living
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={containerVariants}
          >
            {[
              {
                id: "requirements",
                label: "Admission Requirements",
                icon: <FaClipboardCheck />,
              },
              {
                id: "tuition",
                label: "Tuition & Financial Aid",
                icon: <FaDollarSign />,
              },
              {
                id: "accommodation",
                label: "Housing & Dining",
                icon: <FaBed />,
              },
              {
                id: "calculator",
                label: "Cost Calculator",
                icon: <FaCalculator />,
              },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Admission Requirements Tab */}
            {activeTab === "requirements" && (
              <motion.div
                key="requirements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Application Deadlines */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
                  variants={itemVariants}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      Application Deadlines
                    </h2>
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {admissionRequirements.bsn.deadlines.map(
                      (deadline, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className={`p-4 rounded-xl backdrop-blur-sm ${
                            deadline.status === "upcoming"
                              ? "bg-white/20"
                              : deadline.status === "open"
                                ? "bg-green-500/30"
                                : "bg-blue-400/20"
                          }`}
                        >
                          <div className="font-semibold">{deadline.term}</div>
                          <div className="text-2xl font-bold mt-2">
                            {deadline.date}
                          </div>
                          <div className="text-sm mt-2 capitalize">
                            {deadline.status}
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>

                {/* Academic Requirements */}
                <motion.div
                  className="grid lg:grid-cols-2 gap-8"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Academic Requirements
                    </h3>
                    <div className="space-y-3">
                      {admissionRequirements.bsn.academic.map((req, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 5 }}
                          className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
                        >
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-4">
                            {req.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {req.requirement}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              req.status === "required"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Documentation Requirements */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Required Documentation
                    </h3>
                    <div className="space-y-3">
                      {admissionRequirements.bsn.documentation.map(
                        (doc, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
                          >
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg mr-4">
                              {doc.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {doc.requirement}
                              </div>
                            </div>
                            <FaCheckCircle className="text-green-500" />
                          </motion.div>
                        ),
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Additional Applicant Types */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                >
                  {/* Transfer Students */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Transfer Students
                    </h3>
                    <ul className="space-y-2 mb-4">
                      {admissionRequirements.transfer.requirements.map(
                        (req, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-700"
                          >
                            <FaArrowRight className="text-emerald-500 mr-2 text-sm" />
                            {req}
                          </li>
                        ),
                      )}
                    </ul>
                    <div className="text-sm text-gray-600">
                      <div className="font-semibold mb-2">Deadlines:</div>
                      {admissionRequirements.transfer.deadlines.map(
                        (d, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{d.term}</span>
                            <span className="font-medium">{d.date}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>

                  {/* International Students */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      International Students
                    </h3>
                    <ul className="space-y-2 mb-4">
                      {admissionRequirements.international.requirements.map(
                        (req, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-700"
                          >
                            <FaGlobe className="text-blue-500 mr-2 text-sm" />
                            {req}
                          </li>
                        ),
                      )}
                    </ul>
                    <div className="text-sm text-blue-600">
                      Contact our International Admissions Office for assistance
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Tuition & Financial Aid Tab */}
            {activeTab === "tuition" && (
              <motion.div
                key="tuition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Tuition Overview */}
                <motion.div
                  className="grid lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white col-span-2"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          BSN Program Tuition
                        </h2>
                        <p className="text-blue-100">
                          Per academic year (full-time)
                        </p>
                      </div>
                      <FaDollarSign className="text-3xl opacity-80" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          ${tuitionData.bsn.fullTime.toLocaleString()}
                        </div>
                        <div className="text-blue-200 text-sm mt-1">
                          Full-time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          ${tuitionData.bsn.partTime.toLocaleString()}
                        </div>
                        <div className="text-blue-200 text-sm mt-1">
                          Part-time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          ${tuitionData.bsn.perCredit}
                        </div>
                        <div className="text-blue-200 text-sm mt-1">
                          Per credit
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Additional Fees */}
                  <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Additional Fees
                    </h3>
                    <div className="space-y-3">
                      {tuitionData.bsn.fees.map((fee, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white rounded-xl shadow"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {fee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Per {fee.per}
                            </div>
                          </div>
                          <div className="font-bold text-gray-900">
                            ${fee.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Scholarships */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Scholarships & Grants
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {financialAid.scholarships.map((scholarship, index) => (
                      <motion.div
                        key={index}
                        whileHover="hover"
                        variants={cardVariants}
                        className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {scholarship.name}
                            </h4>
                            <div className="text-2xl font-bold text-blue-600 mt-2">
                              ${scholarship.amount.toLocaleString()}
                            </div>
                          </div>
                          <FaPercentage className="text-blue-400 text-xl" />
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Requirements: {scholarship.requirements}
                        </div>
                        <div className="text-xs text-gray-500">
                          Deadline: {scholarship.deadline}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Comparison Table */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Tuition Comparison
                  </h3>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700">
                            Institution
                          </th>
                          <th className="p-4 text-left font-semibold text-gray-700">
                            Annual Tuition
                          </th>
                          <th className="p-4 text-left font-semibold text-gray-700">
                            NCLEX Pass Rate
                          </th>
                          <th className="p-4 text-left font-semibold text-gray-700">
                            Employment Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tuitionData.comparison.map((school, index) => (
                          <tr
                            key={index}
                            className={`border-t border-gray-100 ${
                              school.highlight
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <td className="p-4 font-medium text-gray-900">
                              {school.highlight && (
                                <FaStar className="inline text-yellow-400 mr-2" />
                              )}
                              {school.school}
                            </td>
                            <td className="p-4">
                              <span
                                className={`font-bold ${
                                  school.highlight
                                    ? "text-blue-600"
                                    : "text-gray-700"
                                }`}
                              >
                                ${school.tuition.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-gray-700">
                                {school.nclex}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-gray-700">
                                {school.employment}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Accommodation Tab */}
            {activeTab === "accommodation" && (
              <motion.div
                key="accommodation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* On-Campus Housing */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      On-Campus Housing Options
                    </h2>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Priority for Nursing Students
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {accommodationOptions.onCampus.map((housing, index) => (
                      <motion.div
                        key={index}
                        whileHover="hover"
                        variants={cardVariants}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {housing.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {housing.type}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                housing.availability === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : housing.availability === "Limited"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {housing.availability}
                            </span>
                          </div>

                          <div className="mb-6">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              ${housing.price.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-sm">
                              Per {housing.per}
                            </div>
                          </div>

                          <div className="space-y-2 mb-6">
                            {housing.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center text-gray-600"
                              >
                                <FaCheckCircle className="text-green-500 mr-2 text-sm" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="flex space-x-2">
                              {housing.amenities.map((Icon, idx) => (
                                <div
                                  key={idx}
                                  className="p-2 bg-gray-100 rounded-lg text-gray-600"
                                >
                                  <Icon />
                                </div>
                              ))}
                            </div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Meal Plans */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Meal Plan Options
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {accommodationOptions.mealPlans.map((plan, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200"
                      >
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.name}
                        </h4>
                        <div className="text-3xl font-bold text-gray-900 mb-4">
                          ${plan.price.toLocaleString()}
                          <span className="text-sm text-gray-500 font-normal">
                            {" "}
                            / semester
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center text-gray-600 mb-2">
                            <FaUtensils className="mr-2" />
                            <span>{plan.meals} meals per week</span>
                          </div>
                          <div className="space-y-1">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="text-sm text-gray-600">
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className="w-full py-3 border border-blue-500 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          Select Plan
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Cost Calculator Tab */}
            {activeTab === "calculator" && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Calculator Controls */}
                  <motion.div className="lg:col-span-2" variants={itemVariants}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Cost Calculator
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      {/* Tuition */}
                      <div className="mb-6">
                        <label className="block font-medium text-gray-900 mb-3">
                          Tuition (Full-time BSN)
                        </label>
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">$</span>
                          <input
                            type="range"
                            min="15000"
                            max="25000"
                            step="1000"
                            value={calculatorValues.tuition}
                            onChange={(e) =>
                              setCalculatorValues({
                                ...calculatorValues,
                                tuition: parseInt(e.target.value),
                              })
                            }
                            className="flex-1"
                          />
                          <span className="ml-4 text-xl font-bold text-gray-900">
                            ${calculatorValues.tuition.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Housing */}
                      <div className="mb-6">
                        <label className="block font-medium text-gray-900 mb-3">
                          Housing Option
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              value: "on-campus",
                              label: "On-Campus",
                              price: 4500,
                            },
                            {
                              value: "off-campus",
                              label: "Off-Campus",
                              price: 1200,
                            },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                setCalculatorValues({
                                  ...calculatorValues,
                                  housing: option.value,
                                })
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                calculatorValues.housing === option.value
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600">
                                ${option.price}/semester
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Financial Aid */}
                      <div className="space-y-4">
                        <div>
                          <label className="block font-medium text-gray-900 mb-2">
                            Scholarships
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="1000"
                            value={calculatorValues.scholarships}
                            onChange={(e) =>
                              setCalculatorValues({
                                ...calculatorValues,
                                scholarships: parseInt(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>$0</span>
                            <span className="font-bold">
                              ${calculatorValues.scholarships.toLocaleString()}
                            </span>
                            <span>$10,000</span>
                          </div>
                        </div>

                        <div>
                          <label className="block font-medium text-gray-900 mb-2">
                            Financial Aid (Grants/Loans)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="10000"
                            step="1000"
                            value={calculatorValues.financialAid}
                            onChange={(e) =>
                              setCalculatorValues({
                                ...calculatorValues,
                                financialAid: parseInt(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>$0</span>
                            <span className="font-bold">
                              ${calculatorValues.financialAid.toLocaleString()}
                            </span>
                            <span>$10,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cost Breakdown */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white sticky top-6">
                      <h3 className="text-xl font-bold mb-6">
                        Estimated Annual Cost
                      </h3>

                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span>Tuition & Fees</span>
                          <span className="font-bold">
                            $
                            {(calculatorValues.tuition + 2600).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Housing</span>
                          <span className="font-bold">
                            $
                            {(calculatorValues.housing === "on-campus"
                              ? 4500
                              : 1200
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meals</span>
                          <span className="font-bold">$2,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Books & Supplies</span>
                          <span className="font-bold">$1,500</span>
                        </div>
                        <div className="pt-4 border-t border-white/20">
                          <div className="flex justify-between">
                            <span>Scholarships</span>
                            <span className="font-bold text-green-300">
                              -${calculatorValues.scholarships.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Financial Aid</span>
                            <span className="font-bold text-green-300">
                              -${calculatorValues.financialAid.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/20">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total Cost</span>
                          <span>${calculateTotalCost().toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-blue-200 mt-2">
                          Per academic year
                        </div>
                      </div>

                      <button className="w-full mt-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        Save Calculation
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
                <p className="text-emerald-100 mb-6">
                  Start your nursing journey today. Our admissions team is here
                  to help you through every step of the application process.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/academy/enroll">
                    <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                      Begin Application
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <FaPhone className="text-2xl mb-2" />
                  <div className="font-semibold">Admissions Office</div>
                  <div className="text-sm">(555) 123-4567</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <FaEnvelope className="text-2xl mb-2" />
                  <div className="font-semibold">Email</div>
                  <div className="text-sm">admissions@nursing.edu</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <FaClock className="text-2xl mb-2" />
                  <div className="font-semibold">Hours</div>
                  <div className="text-sm">Mon-Fri, 9AM-5PM</div>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <FaMapMarkerAlt className="text-2xl mb-2" />
                  <div className="font-semibold">Location</div>
                  <div className="text-sm">Health Sciences Bldg</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

// Add missing icon import
const FaGlobe = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

export default AdmissionsSection;
