import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaStethoscope,
  FaUserNurse,
  FaHeartbeat,
  FaBookMedical,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaCalendarCheck,
  FaShieldAlt,
  FaVideo,
  FaChartLine,
  FaUsers,
  FaClock,
  FaAward,
  FaCheckCircle,
} from "react-icons/fa";
import { Header } from "../components/Academy/Header";
import Footer from "../components/Academy/Footer";
import { Link } from "react-router-dom";

export const AcademyPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nursingPrograms = [
    {
      title: "Nursing Fundamentals",
      duration: "6 Months",
      level: "Beginner",
      icon: <FaStethoscope className="h-6 w-6" />,
      features: ["Basic Patient Care", "Vital Signs", "Medical Terminology"],
    },
    {
      title: "Critical Care Nursing",
      duration: "8 Months",
      level: "Intermediate",
      icon: <FaHeartbeat className="h-6 w-6" />,
      features: ["Emergency Response", "ICU Protocols", "Life Support Systems"],
    },
    {
      title: "Advanced Practice Nursing",
      duration: "12 Months",
      level: "Advanced",
      icon: <FaUserNurse className="h-6 w-6" />,
      features: ["Clinical Diagnosis", "Treatment Planning", "Case Management"],
    },

    {
      title: "Pediatric Nursing",
      duration: "7 Months",
      level: "Specialized",
      icon: <FaHandsHelping className="h-6 w-6" />,
      features: ["Child Development", "Pediatric Meds", "Family-Centered Care"],
    },
  ];

  const features = [
    {
      icon: <FaBookMedical className="h-8 w-8" />,
      title: "Evidence-Based Curriculum",
      description:
        "Curriculum based on latest medical research and nursing best practices",
      color: "text-blue-600",
    },
    {
      icon: <FaChalkboardTeacher className="h-8 w-8" />,
      title: "Expert Faculty",
      description:
        "Learn from experienced nursing professionals and medical educators",
      color: "text-purple-600",
    },
    {
      icon: <FaCalendarCheck className="h-8 w-8" />,
      title: "Flexible Learning",
      description:
        "Self-paced courses with live sessions and clinical simulations",
      color: "text-pink-600",
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "Certification Ready",
      description: "Prepare for NCLEX and other nursing certification exams",
      color: "text-green-600",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson, RN, PhD",
      role: "Chief Nursing Officer",
      content:
        "The clinical simulations and evidence-based approach gave our nurses confidence in real-world scenarios. Highly recommended for professional development.",
      rating: 5,
      hospital: "St. Mary's Medical Center",
    },
    {
      name: "Michael Chen, BSN, RN",
      role: "Recent Graduate",
      content:
        "The flexible schedule allowed me to work while studying. The NCLEX prep materials were invaluable for passing my exam on the first try.",
      rating: 5,
      hospital: "Memorial Hospital",
    },
    {
      name: "Maria Rodriguez, MSN, FNP",
      role: "Family Nurse Practitioner",
      content:
        "Advanced practice courses provided the depth I needed for my FNP certification. The mentorship program was exceptional.",
      rating: 5,
      hospital: "Community Health Clinic",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}

      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-90">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <FaAward className="mr-2" />
                CCNE Accredited Nursing Programs
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Shape the Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                  Healthcare
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-700 max-w-xl leading-relaxed">
                Prepare for a rewarding career in nursing with our comprehensive
                programs, expert faculty, and state-of-the-art clinical
                simulations. Join the next generation of healthcare leaders.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/academy/enroll">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <FaGraduationCap />
                    Start Your Journey
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FaVideo />
                  Campus Tour
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">NCLEX Pass Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Nursing Alumni</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Clinical Partners</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Academic Support</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <FaUserNurse className="h-8 w-8 text-blue-600 mb-2" />
                      <div className="font-semibold">Clinical Rotations</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <FaChartLine className="h-8 w-8 text-green-600 mb-2" />
                      <div className="font-semibold">Career Placement</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <FaUsers className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="font-semibold">Peer Learning</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <FaClock className="h-8 w-8 text-orange-600 mb-2" />
                      <div className="font-semibold">Flexible Schedule</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nursing Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nursing Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive nursing programs designed to meet
              your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nursingPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-b from-white to-blue-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                    {program.icon}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      program.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : program.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {program.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {program.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaClock className="mr-2" />
                  <span className="text-sm">{program.duration}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <FaCheckCircle
                        className="text-green-500 mr-2 flex-shrink-0"
                        size={14}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-2.5 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Nursing Academy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience nursing education that prepares you for real-world
              challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.color.replace("text", "bg")} bg-opacity-10`}
                >
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our nursing graduates and healthcare partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100"
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 italic text-lg mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-blue-100 pt-6">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600 font-medium mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.hospital}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Start Your Nursing Journey Today
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of successful nurses who launched their careers
              with Nicmaurice Nursing Academy
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center ">
              <Link to="/academy/enroll">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <FaGraduationCap />
                  Apply for Admission
                </motion.button>
              </Link>

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                Schedule a Consultation
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
