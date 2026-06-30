import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeartbeat,
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaChartLine,
  FaHandsHelping,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaShieldAlt,
  FaLightbulb,
  FaHandHoldingHeart,
  FaBrain,
  FaFlask,
} from "react-icons/fa";
import Footer from "./Footer";
import { Header } from "./Header";

const AboutUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    studentType: "prospective",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeValue, setActiveValue] = useState("mission");

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

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  // Our Values
  const ourValues = [
    {
      id: "mission",
      title: "Our Mission",
      description:
        "To globally educate and empower the next generation of nursing leaders through innovative education, compassionate care, and evidence-based practice.",
      icon: <FaHeartbeat />,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "vision",
      title: "Our Vision",
      description:
        "To be an international recognized center of excellence in nursing education, clinical practices, research, and community health leadership.",
      icon: <FaLightbulb />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "excellence",
      title: "Excellence",
      description:
        "Commitment to the highest standards in education, clinical practice, and student success through continuous improvement.",
      icon: <FaAward />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "compassion",
      title: "Compassion",
      description:
        "Cultivating empathy and cultural competence to provide holistic, patient-centered care in diverse communities globally.",
      icon: <FaHandHoldingHeart />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "innovation",
      title: "Innovation",
      description:
        "Embracing cutting-edge technology and research to advance nursing science and improve healthcare outcomes.",
      icon: <FaBrain />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "community",
      title: "Community",
      description:
        "Building partnerships and serving local and global communities through outreach and health promotion.",
      icon: <FaUsers />,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  // Statistics
  const statistics = [
    {
      value: "25+",
      label: "Years of Excellence",
      icon: <FaChartLine />,
      color: "bg-blue-500",
    },
    {
      value: "5,000+",
      label: "Nurses Graduated",
      icon: <FaGraduationCap />,
      color: "bg-purple-500",
    },
    {
      value: "94%",
      label: "NCLEX Pass Rate",
      icon: <FaShieldAlt />,
      color: "bg-green-500",
    },
    {
      value: "96%",
      label: "Employment Rate",
      icon: <FaUsers />,
      color: "bg-amber-500",
    },
    {
      value: "50+",
      label: "Clinical Partners",
      icon: <FaHandsHelping />,
      color: "bg-red-500",
    },
    {
      value: "N2.5M+",
      label: "Research Funding",
      icon: <FaFlask />,
      color: "bg-indigo-500",
    },
  ];

  // Leadership Team
  const leadershipTeam = [
    {
      name: "Prof. Mildred John",
      title: "Fmr. Dean, Faculty of Allied Health Science, Uni. of Calabar",
      expertise: "Nursing Education & Leadership",
      education: "RN, PhD",
      experience: "35 years",
      quote:
        "We don't just teach nursing; we cultivate healers, leaders, and innovators.",
      imageColor: "bg-blue-100",
    },
    {
      name: "Dr. Augustina Chikaodili Isabu",
      title: "Department of Community Health Nursing",
      expertise: "Community Health Nursing",
      education: "PhD Community Health Science, PhD Public Health Education",
      experience: "30+ years",
      quote:
        "Hands-on experience transforms theoretical knowledge into clinical excellence.",
      imageColor: "bg-purple-100",
    },
    {
      name: "Dr. Akon Emmanunel Ndiok",
      title: "Lecturer, Department of Nursing Science",
      expertise: "Medical Surgical Nursing/Cancer and Terminal Diseases Palliative Care",
      education: "RN, PhD",
      experience: "20+ years",
      quote:
        "Research is the bridge between current practice and future possibilities.",
      imageColor: "bg-green-100",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "BSN Graduate, Class of 2023",
      current: "ICU Nurse, City General Hospital",
      quote:
        "The simulation labs and clinical rotations prepared me perfectly for real-world nursing challenges.",
      rating: 5,
    },
    {
      name: "David Wilson",
      role: "MSN Student",
      current: "Nurse Practitioner Track",
      quote:
        "The faculty mentorship and research opportunities have been life-changing for my career.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Alumni, Class of 2018",
      current: "Nurse Manager, Children's Hospital",
      quote:
        "The leadership skills I gained continue to guide my nursing practice every day.",
      rating: 5,
    },
  ];

  // Contact Information
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: [
        "123 Health Sciences Drive",
        "Medical District, City, State 12345",
      ],
      color: "text-blue-600",
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["Admissions: (555) 123-4567", "General: (555) 987-6543"],
      color: "text-green-600",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: [
        "Admissions: admissions@nursing.edu",
        "General: info@nursing.edu",
      ],
      color: "text-purple-600",
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      details: [
        "Monday-Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
      ],
      color: "text-amber-600",
    },
  ];

  // Social Media
  const socialMedia = [
    { icon: <FaFacebook />, name: "Facebook", color: "bg-blue-600", link: "#" },
    { icon: <FaTwitter />, name: "Twitter", color: "bg-sky-500", link: "#" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "bg-blue-700", link: "#" },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      color: "bg-pink-600",
      link: "#",
    },
    { icon: <FaYoutube />, name: "YouTube", color: "bg-red-600", link: "#" },
  ];

  // Form Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        studentType: "prospective",
      });
    }, 3000);
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
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              className="max-w-4xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm mb-6"
              >
                <FaHeartbeat className="text-4xl" />
              </motion.div>

              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Excellence in Nursing Education Since 1999
              </h1>

              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                For over three decades, we have been shaping the future of
                healthcare by educating compassionate, skilled nurses who make a
                difference in communities worldwide.
              </p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  Meet Our Faculty
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Campus Tour
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                whileHover="hover"
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100"
              >
                <div
                  className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Our Values */}
          <motion.div className="mb-16" variants={containerVariants}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The guiding principles that shape our educational philosophy and
                community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ourValues.map((value) => (
                <motion.div
                  key={value.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setActiveValue(value.id)}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all ${
                    activeValue === value.id
                      ? `border-blue-500 shadow-xl`
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`bg-gradient-to-r ${value.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mb-4`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div className="mb-16" variants={containerVariants}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced educators and healthcare leaders dedicated to
                student success
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {leadershipTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  whileHover="hover"
                  variants={cardVariants}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div
                        className={`${leader.imageColor} w-20 h-20 rounded-full flex items-center justify-center text-2xl text-gray-700 font-bold`}
                      >
                        {leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {leader.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {leader.title}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {leader.experience} experience
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <FaGraduationCap className="mr-2" />
                        {leader.education}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Expertise:</span>{" "}
                        {leader.expertise}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <FaQuoteLeft className="text-blue-400 mb-2" />
                      <p className="text-gray-700 italic">{leader.quote}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8"
            variants={containerVariants}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Student & Alumni Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from those who have experienced our nursing program
                firsthand
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>

                  <div className="mb-6">
                    <FaQuoteLeft className="text-blue-400 text-2xl mb-4" />
                    <p className="text-gray-700 italic">{testimonial.quote}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-blue-600 text-sm font-medium mt-1">
                      {testimonial.current}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            variants={containerVariants}
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className={`p-3 bg-blue-50 rounded-lg ${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              {/* <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-3">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${social.color} w-12 h-12 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-shadow`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div> */}

              {/* Map/Image Placeholder */}
              <motion.div
                className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 h-64 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <FaMapMarkerAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
                  <p className="font-medium text-gray-900">
                    Health Sciences Campus
                  </p>
                  <p className="text-gray-600 text-sm">
                    Medical District, City
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h3>
                <p className="text-gray-600 mb-6">
                  Have questions? We're here to help. Fill out the form below
                  and we'll get back to you within 24 hours.
                </p>

                <AnimatePresence>
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Thank you for reaching out. Our admissions team will
                        contact you within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            I am a *
                          </label>
                          <select
                            name="studentType"
                            value={formData.studentType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          >
                            <option value="prospective">
                              Prospective Student
                            </option>
                            <option value="current">Current Student</option>
                            <option value="alumni">Alumni</option>
                            <option value="parent">Parent/Guardian</option>
                            <option value="employer">Employer/Partner</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="admissions">Admissions Inquiry</option>
                          <option value="academics">Academic Programs</option>
                          <option value="clinical">Clinical Placements</option>
                          <option value="facilities">Campus Facilities</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="6"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Send Message</span>
                        <FaPaperPlane />
                      </motion.button>

                      <p className="text-gray-500 text-sm text-center">
                        By submitting this form, you agree to our privacy policy
                        and consent to be contacted.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Accreditation & Partnerships */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Accreditation</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-blue-400" />
                    <span>
                      Commission on Collegiate Nursing Education (CCNE)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-blue-400" />
                    <span>State Board of Nursing Accreditation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-blue-400" />
                    <span>Higher Learning Commission</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Global Partnerships</h3>
                <div className="flex items-center space-x-4">
                  <FaGlobeAmericas className="text-3xl text-blue-400" />
                  <div>
                    <p className="mb-2">
                      International exchange programs with:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        India
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        Canada
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        Australia
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        Japan
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        Kenya
                      </span>
                    </div>
                  </div>
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

export default AboutUsSection;
