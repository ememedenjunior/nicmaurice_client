// App.jsx
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Microscope,
  Heart,
  Award,
  Clock,
  Mail,
  Phone,
  User,
  Building2,
  CreditCard,
  CheckCircle,
  ArrowRight,
  FileText,
  BookOpen,
  Network,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Download,
  Menu,
  X,
  ChevronRight,
  Star,
  AlertCircle,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Landmark,
  Coffee,
  Ticket,
  Copy,
  CheckCircle2,
  Building,
} from "lucide-react";
import axios from "axios";

const Seminar = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    hospital: "",
    designation: "",
    nmcnLicense: "",
    category: "clinical",
    accommodation: "no",
    dietary: "",
    specialNeeds: "",
    registrationType: "student",
    experience: "",
    hearAbout: "",
    abstractSubmission: "no",
    workshopPreference: [],
  });

  const [registrationStep, setRegistrationStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [copyTimeout, setCopyTimeout] = useState(null);

  // Add this function for download functionality
  const downloadConceptNote = async () => {
    try {
      setDownloading(true);

      // Create the content
      const content = `
1ST NATIONAL NURSING PROCESS RESEARCH CONFERENCE
"FROM THEORY TO THE BEDSIDE: Transforming Nigerian Healthcare Through Implementation Science"

Date: June 15-17, 2026
Venue: Abuja Continental Hotel, Nigeria

CONCEPT NOTE

BACKGROUND:
The Nursing Process remains the gold standard for professional nursing practice, yet its 
implementation in Nigerian healthcare settings faces significant challenges. This conference 
aims to bridge the gap between theoretical knowledge and practical application through 
implementation science.

CONFERENCE OBJECTIVES:
1. Identify barriers to Nursing Process implementation in Nigerian hospitals
2. Present evidence-based strategies for overcoming local challenges
3. Build a national network of implementation champions
4. Develop actionable frameworks for sustainable practice change

TARGET AUDIENCE:
• Clinical Nurses
• Nurse Leaders & Managers
• Academic Researchers
• Policy Makers
• Nursing Students

KEY THEMES:
• Implementation Science Frameworks for African Context
• Nurse-Led Innovation and Clinical Champions
• Policy Integration and Curriculum Development
• Technology and Documentation in Nursing Process

EXPECTED OUTCOMES:
• National Implementation Science Network established
• Policy recommendations for NMCN
• Research collaboration opportunities
• Practice guidelines for Nursing Process implementation

REGISTRATION FEES:
• Students: ₦25,000

CONTACT:
Email: peakiqengine@gmail.com
Phone: +234 800 123 4567

"Better Science. Better Implementation. Better Outcomes for Nigeria."
      `;

      // Create and trigger download
      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Nursing_Conference_2026_Concept_Note.txt`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(field);

    if (copyTimeout) clearTimeout(copyTimeout);

    const timeout = setTimeout(() => {
      setCopySuccess("");
    }, 2000);

    setCopyTimeout(timeout);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "workshopPreference") {
        const updated = checked
          ? [...formData.workshopPreference, value]
          : formData.workshopPreference.filter((item) => item !== value);
        setFormData((prev) => ({ ...prev, [name]: updated }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://formspree.io/f/xykdzjjn", formData, {
      headers: {
        Accept: "application/json", // Formspree recommends JSON headers
      },
    });

    setShowPaymentModal(true);
  };

  const confirmRegistration = () => {
    setShowPaymentModal(false);
    setIsSubmitted(true);
  };

  const calculateFee = () => {
    const fees = {
      student: 25000,
    };
    return fees[formData.registrationType] || 0;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-30"></div>

          <div className="relative">
            {/* Success Animation */}
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-200">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Registration Confirmed! 🎉
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              Thank you for registering for the 1st National Nursing Process
              Research Conference. You're now part of transforming Nigerian
              healthcare!
            </p>

            {/* Registration Details Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2 text-emerald-600" />
                Registration Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Reference ID</p>
                  <p className="font-mono font-bold text-emerald-700">
                    NNC-
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Registration Type</p>
                  <p className="font-semibold capitalize">
                    {formData.registrationType}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Amount</p>
                  <p className="font-semibold">
                    ₦{calculateFee().toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Confirmation Sent To</p>
                  <p className="font-semibold truncate">{formData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-emerald-600" />
              <span className="font-bold text-slate-900 text-lg">
                NursingProcess<span className="text-emerald-600">2026</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-slate-700 hover:text-emerald-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-emerald-600 transition-colors"
              >
                About
              </a>
              <a
                href="#speakers"
                className="text-slate-700 hover:text-emerald-600 transition-colors"
              >
                Speakers
              </a>
              <a
                href="#schedule"
                className="text-slate-700 hover:text-emerald-600 transition-colors"
              >
                Schedule
              </a>
              <a
                href="#sponsors"
                className="text-slate-700 hover:text-emerald-600 transition-colors"
              >
                Sponsors
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("registration")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
              >
                Register Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#home"
                className="text-slate-700 hover:text-emerald-600 py-2"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-slate-700 hover:text-emerald-600 py-2"
              >
                About
              </a>
              <a
                href="#speakers"
                className="text-slate-700 hover:text-emerald-600 py-2"
              >
                Speakers
              </a>
              <a
                href="#schedule"
                className="text-slate-700 hover:text-emerald-600 py-2"
              >
                Schedule
              </a>
              <a
                href="#sponsors"
                className="text-slate-700 hover:text-emerald-600 py-2"
              >
                Sponsors
              </a>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-xl font-semibold w-full">
                Register Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-white/20 rounded-full"></div>
        </div>

        {/* Top Bar */}
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap justify-between items-center text-sm">
              <div className="flex items-center space-x-4 md:space-x-6">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-emerald-300" />
                  June 22-26, 2026
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-300" />
                  Watbridge Hotel, Uyo
                </span>
                <span className="hidden md:flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-emerald-300" />
                  9:00 AM - 17:00 PM Daily
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="hidden md:flex items-center">
                  <Users className="w-4 h-4 mr-2 text-emerald-300" />
                  500+ Delegates
                </span>
                <button
                  onClick={downloadConceptNote}
                  disabled={downloading}
                  className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full transition-colors text-sm flex items-center disabled:opacity-50"
                >
                  <Download className="w-3 h-3 mr-1" />
                  {downloading ? "..." : "Brochure"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="relative z-10">
              {/* Badge with Animation */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-8 animate-fade-in">
                <Award className="w-4 h-4 mr-2 text-yellow-300" />
                <Sparkles className="w-3 h-3 mr-1 text-yellow-300" />
                <span className="text-sm font-medium">
                  1st National Nursing Process Research Conference
                </span>
              </div>

              {/* Main Title with Animation */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 animate-slide-up">
                <span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  FROM THEORY TO THE BEDSIDE:
                </span>
                <br />
                Transforming Nigerian Healthcare Through Implementation Science
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-emerald-50 mb-8 max-w-lg animate-slide-up delay-100">
                The Call to Action: Moving beyond discussing the Nursing Process
                to mastering its implementation in our unique clinical
                environment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12 animate-slide-up delay-200">
                <button
                  onClick={() =>
                    document
                      .getElementById("registration")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={downloadConceptNote}
                  disabled={downloading}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download
                    className={`w-5 h-5 mr-2 ${downloading ? "animate-bounce" : ""}`}
                  />
                  {downloading ? "Downloading..." : "Download Concept Note"}
                </button>
              </div>

              {/* Stats with Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
                {[
                  {
                    value: "15+",
                    label: "Intl. Speakers",
                    icon: <Globe className="w-4 h-4" />,
                  },
                  {
                    value: "20+",
                    label: "CME Credits",
                    icon: <Award className="w-4 h-4" />,
                  },
                  {
                    value: "4",
                    label: "Tracks",
                    icon: <Target className="w-4 h-4" />,
                  },
                  {
                    value: "500+",
                    label: "Delegates",
                    icon: <Users className="w-4 h-4" />,
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start">
                      {stat.icon}
                      <span className="ml-2">{stat.value}</span>
                    </div>
                    <div className="text-xs text-emerald-200 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Conference Pillars */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-300" />
                Conference Pillars
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Microscope />,
                    title: "Science",
                    desc: "Evidence-based methodologies",
                    color: "emerald",
                  },
                  {
                    icon: <Target />,
                    title: "Strategy",
                    desc: "Overcoming Nigerian factors",
                    color: "teal",
                  },
                  {
                    icon: <TrendingUp />,
                    title: "Sustainability",
                    desc: "Long-term practice change",
                    color: "cyan",
                  },
                  {
                    icon: <Network />,
                    title: "Synergy",
                    desc: "National network building",
                    color: "blue",
                  },
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className={`bg-${pillar.color}-500/10 rounded-xl p-4 hover:bg-${pillar.color}-500/20 transition-all duration-300 transform hover:scale-105`}
                  >
                    <div
                      className={`w-10 h-10 bg-${pillar.color}-500/20 rounded-lg flex items-center justify-center mb-3 text-${pillar.color}-300`}
                    >
                      {pillar.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{pillar.title}</h4>
                    <p className="text-xs text-emerald-200">{pillar.desc}</p>
                  </div>
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-emerald-300" />
                  Conference starts in:
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { value: "87", label: "Days" },
                    { value: "12", label: "Hours" },
                    { value: "45", label: "Mins" },
                    { value: "30", label: "Secs" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-2">
                      <div className="text-xl font-bold">{item.value}</div>
                      <div className="text-xs text-emerald-200">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Statement */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm italic text-emerald-100">
                  "Better Science. Better Implementation. Better Outcomes for
                  Nigeria."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 fill-current text-slate-50"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              About The Conference
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-2">
              Bridging the Gap Between Theory and Practice
            </h2>
            <p className="text-xl text-slate-600">
              While the Nursing Process is the "Gold Standard" for professional
              practice, local barriers—from manpower shortages to resource
              constraints—often hinder its systematic uptake.
            </p>
          </div>

          {/* Key Highlights - Enhanced Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "The 'Gap' Analysis",
                description:
                  "Real-world data on Evidence-Based Practice in Nigerian Teaching, General, and Private Hospitals.",
                color: "emerald",
                stats: "85% implementation gap",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Implementation Frameworks",
                description:
                  "Adapting the Iowa Model and CFIR to the Nigerian socio-cultural context.",
                color: "teal",
                stats: "4 frameworks adapted",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Nurse-Led Innovation",
                description:
                  "Showcasing local 'Clinical Champions' who have reduced mortality through structured nursing care.",
                color: "cyan",
                stats: "12 success stories",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Policy & Advocacy",
                description:
                  "Special session with NMCN on integrating Implementation Science into national curriculum.",
                color: "blue",
                stats: "Policy change roadmap",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4 text-${item.color}-600 group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {item.description}
                </p>
                <div
                  className={`text-xs font-semibold text-${item.color}-600 bg-${item.color}-50 px-3 py-1 rounded-full inline-block`}
                >
                  {item.stats}
                </div>
              </div>
            ))}
          </div>

          {/* Target Audience - Enhanced */}
          <div className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Who Should Attend?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  role: "Clinical Nurses",
                  description:
                    "Learn to 'hardwire' the nursing process into daily shifts without burnout",
                  icon: <Stethoscope className="w-6 h-6" />,
                  count: "300+ expected",
                },
                {
                  role: "Nurse Leaders & Managers",
                  description:
                    "Overcome institutional resistance and manage scarce resources",
                  icon: <Award className="w-6 h-6" />,
                  count: "100+ leaders",
                },
                {
                  role: "Academic Researchers",
                  description:
                    "Share findings with those who can put them into immediate action",
                  icon: <GraduationCap className="w-6 h-6" />,
                  count: "50+ institutions",
                },
                {
                  role: "Policy Makers",
                  description:
                    "Understand data-driven impact of nursing care on national health indices",
                  icon: <Landmark className="w-6 h-6" />,
                  count: "20+ policymakers",
                },
              ].map((audience, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    {audience.icon}
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-lg">
                    {audience.role}
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    {audience.description}
                  </p>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {audience.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Meet Our Speakers
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-2">
              Distinguished Faculty
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Learn from leading experts in nursing science, implementation
              research, and healthcare policy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Hon. Nic Maurice",
                title: "Executive Founder, GIRII",
                topic: "Clinical Champions: Success Stories",
                image: "/api/placeholder/300/300",

                type: "Keynote",
              },
              {
                name: "Dr. Augustina Chika Isabu",
                title: "Department of Community Health Nursing",
                topic: "The Iowa Model in Nigerian Context",
                image: "/api/placeholder/300/300",
                type: "Plenary",
              },
              {
                name: "Dr. Akon Emmanunel Ndiok",
                title: "Associate Prof., Department of Nursing Science",
                topic: "Measuring Nursing Outcomes",
                image: "/api/placeholder/300/300",
                type: "Workshop",
              },
              {
                name: "Prof. Mildred John",
                title:
                  "Fmr. Dean, Faculty of Allied Health Science, Uni. of Calabar",
                topic: "Policy Framework for Implementation Science",
                image: "/api/placeholder/300/300",
                type: "Panel",
              },
            ].map((speaker, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
                  <div className="relative mb-4 inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold">
                      {speaker.name.charAt(0)}
                    </div>
                    <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                      {speaker.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-emerald-600 mb-2">
                    {speaker.title}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    "{speaker.topic}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Preview */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Conference Schedule
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-2">
              Three Days of Transformative Learning
            </h2>
            <p className="text-xl text-slate-600">
              Choose from 4 concurrent tracks tailored to your professional
              needs
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md">
              {["Day 1", "Day 2", "Day 3"].map((day, idx) => (
                <button
                  key={idx}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${idx === 0 ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Items */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                time: "08:00 - 09:00",
                title: "Registration & Welcome Coffee",
                type: "networking",
                icon: <Coffee className="w-4 h-4" />,
              },
              {
                time: "09:00 - 10:30",
                title:
                  "Opening Ceremony & Keynote: The State of Nursing in Nigeria",
                speaker: "Prof. Sarah Okonkwo",
                type: "plenary",
                icon: <Microscope className="w-4 h-4" />,
              },
              {
                time: "10:30 - 11:00",
                title: "Morning Break & Exhibition",
                type: "break",
                icon: <Coffee className="w-4 h-4" />,
              },
              {
                time: "11:00 - 12:30",
                title: "Concurrent Sessions: Implementation Frameworks",
                type: "session",
                icon: <BookOpen className="w-4 h-4" />,
              },
              {
                time: "12:30 - 13:30",
                title: "Networking Lunch",
                type: "networking",
                icon: <Users className="w-4 h-4" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 flex items-center hover:shadow-md transition-all"
              >
                <div className="w-24 text-sm font-semibold text-emerald-600">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  {item.speaker && (
                    <p className="text-sm text-slate-500">{item.speaker}</p>
                  )}
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  {item.icon}
                  <span className="ml-1 capitalize">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section - Enhanced */}
      <section id="registration" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Join Us
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-2">
              Register for the Conference
            </h2>
            <p className="text-xl text-slate-600">
              Join the movement that moves Nigerian nursing from a task-oriented
              tradition to a science-driven profession.
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
            {/* Progress Steps - Enhanced */}
            <div className="flex items-center justify-between mb-10">
              {[
                { step: 1, label: "Personal" },
                { step: 2, label: "Professional" },
                { step: 3, label: "Registration" },
              ].map((step) => (
                <div key={step.step} className="flex items-center flex-1">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg
                      ${
                        registrationStep >= step.step
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {registrationStep > step.step ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.step
                      )}
                    </div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600 whitespace-nowrap">
                      {step.label}
                    </span>
                  </div>
                  {step.step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded-full 
                      ${registrationStep > step.step ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-slate-200"}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information - Enhanced */}
              {registrationStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-emerald-600" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="Dr. / Nurse / Prof. John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="nurse@hospital.ng"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        NMCN License Number
                      </label>
                      <input
                        type="text"
                        name="nmcnLicense"
                        value={formData.nmcnLicense}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="NMCN/12345/2020"
                      />
                    </div>
                  </div>

                  {/* Optional: How did you hear about us? */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      How did you hear about this conference?
                    </label>
                    <select
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="email">Email Newsletter</option>
                      <option value="social">Social Media</option>
                      <option value="colleague">Colleague/Peer</option>
                      <option value="hospital">Hospital Announcement</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information - Enhanced */}
              {registrationStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-emerald-600" />
                    Professional Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Hospital/Institution{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="University College Hospital, Ibadan"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                      >
                        <option value="">Select Designation</option>
                        <option value="chief_nursing_officer">
                          Chief Nursing Officer
                        </option>
                        <option value="assistant_director">
                          Assistant Director of Nursing
                        </option>
                        <option value="principal_nursing_officer">
                          Principal Nursing Officer
                        </option>
                        <option value="senior_nursing_officer">
                          Senior Nursing Officer
                        </option>
                        <option value="nursing_officer_i">
                          Nursing Officer I
                        </option>
                        <option value="nursing_officer_ii">
                          Nursing Officer II
                        </option>
                        <option value="nurse_educator">Nurse Educator</option>
                        <option value="nursing_student">Nursing Student</option>
                        <option value="researcher">Researcher</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Years of Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                      >
                        <option value="">Select years</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="16-20">16-20 years</option>
                        <option value="20+">20+ years</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "clinical", label: "Clinical Nurse" },
                          { value: "leadership", label: "Nurse Leader" },
                          { value: "academic", label: "Academic" },
                          { value: "policy", label: "Policy Maker" },
                          { value: "student", label: "Nursing Student" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-white transition-all cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="category"
                              value={option.value}
                              checked={formData.category === option.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <span className="text-sm text-slate-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Abstract Submission Interest */}
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="abstractSubmission"
                        value="yes"
                        checked={formData.abstractSubmission === "yes"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            abstractSubmission: e.target.checked ? "yes" : "no",
                          }))
                        }
                        className="w-5 h-5 text-emerald-600 rounded"
                      />
                      <span className="text-sm text-slate-700">
                        I'm interested in submitting an abstract for oral/poster
                        presentation
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Registration & Accommodation - Enhanced */}
              {registrationStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                    Registration & Accommodation
                  </h3>

                  {/* Registration Type - Enhanced Cards */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-4">
                      Registration Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          type: "student",
                          name: "Student",
                          price: "₦25,000",
                          deadline: "Valid ID required",
                          savings: "Special rate",
                          popular: true,
                        },
                      ].map((regType) => (
                        <label
                          key={regType.type}
                          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300
                          ${
                            formData.registrationType === regType.type
                              ? "border-emerald-600 bg-emerald-50/50 shadow-lg shadow-emerald-100"
                              : "border-slate-200 hover:border-emerald-300"
                          }`}
                        >
                          {regType.popular && (
                            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                              Only Rate
                            </span>
                          )}
                          <input
                            type="radio"
                            name="registrationType"
                            value={regType.type}
                            checked={formData.registrationType === regType.type}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="font-bold text-slate-900 mb-1">
                              {regType.name}
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mb-1">
                              {regType.price}
                            </div>
                            <div className="text-xs text-slate-500 mb-2">
                              {regType.deadline}
                            </div>
                            {regType.savings && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                {regType.savings}
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Workshop Preferences */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-4">
                      Select Workshops You're Interested In
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Implementation Science 101",
                        "Data Collection in Clinical Settings",
                        "Writing for Publication",
                        "Leadership in Nursing",
                        "Quality Improvement Methods",
                        "Evidence-Based Practice Implementation",
                      ].map((workshop, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white transition-all cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="workshopPreference"
                            value={workshop}
                            checked={formData.workshopPreference.includes(
                              workshop,
                            )}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-emerald-600 rounded"
                          />
                          <span className="text-sm text-slate-700">
                            {workshop}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>


                  {/* Fee Summary */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Registration Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Registration Fee (Student)</span>
                        <span className="font-semibold">
                          ₦{calculateFee().toLocaleString()}
                        </span>
                      </div>
                      {formData.accommodation === "yes" && (
                        <div className="flex justify-between">
                          <span>Accommodation (3 nights)</span>
                          <span className="font-semibold">₦105,000</span>
                        </div>
                      )}
                      <div className="border-t border-emerald-200 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-emerald-700">
                          ₦
                          {(
                            calculateFee() +
                            (formData.accommodation === "yes" ? 105000 : 0)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information Note */}
                  <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Payment Instructions:</strong> After registration,
                      you will proceed to payment via bank transfer.
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation - Enhanced */}
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
                {registrationStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setRegistrationStep((prev) => prev - 1)}
                    className="px-6 py-3 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 transition-all font-semibold"
                  >
                    ← Previous
                  </button>
                )}

                {registrationStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setRegistrationStep((prev) => prev + 1)}
                    className="ml-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-200 transition-all transform hover:scale-105"
                  >
                    Proceed to Payment
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Our Partners
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-2">
              Sponsors & Supporters
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-12 bg-slate-200 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Conference Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-emerald-500" />
                <span className="font-bold text-white text-lg">
                  NursingProcess<span className="text-emerald-500">2026</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                1st National Nursing Process Research Conference on Application
                of Implementation Science
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>conference@nnc.org.ng</span>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>+234 800 123 4567</div>
                    <div className="text-xs text-slate-500">
                      +234 800 123 4568 (WhatsApp)
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Abuja Continental Hotel, <br />
                    Plot 123, Zone 4, Abuja, Nigeria
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500" />
                    Call for Abstracts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500" />
                    Speaker Profiles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500" />
                    Sponsorship Opportunities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500" />
                    Travel & Accommodation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-emerald-500" />
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Organizers */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">
                Organized by
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Nursing and Midwifery Council of Nigeria
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  National Association of Nigerian Nurses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Implementation Science Network
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Federal Ministry of Health
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
              <p>
                © 2026 National Nursing Process Conference. All rights reserved.
              </p>
            </div>
            <p className="mt-4 text-center text-sm text-emerald-600/70 italic">
              "Better Science. Better Implementation. Better Outcomes for
              Nigeria."
            </p>
          </div>
        </div>
      </footer>

      {/* Payment Modal - Improved with Account Details */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full relative animate-slide-up overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-white mb-1">
                Complete Your Registration
              </h3>
              <p className="text-emerald-100 text-sm">
                Make a bank transfer using the details below
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Amount Summary Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-600">
                    Registration Fee:
                  </span>
                  <span className="font-bold text-emerald-700">
                    ₦{calculateFee().toLocaleString()}
                  </span>
                </div>
                {formData.accommodation === "yes" && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-600">
                      Accommodation (3 nights):
                    </span>
                    <span className="font-bold text-emerald-700">₦105,000</span>
                  </div>
                )}
                <div className="border-t border-emerald-200 pt-3 mt-1 flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Total Amount:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-emerald-600">
                      ₦
                      {(
                        calculateFee() +
                        (formData.accommodation === "yes" ? 105000 : 0)
                      ).toLocaleString()}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          (
                            calculateFee() +
                            (formData.accommodation === "yes" ? 105000 : 0)
                          ).toString(),
                          "amount",
                        )
                      }
                      className="p-1.5 hover:bg-emerald-100 rounded-lg transition-colors"
                      title="Copy amount"
                    >
                      {copySuccess === "amount" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bank Details Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Landmark className="w-5 h-5 mr-2 text-blue-600" />
                  Bank Transfer Details
                </h4>

                <div className="space-y-4">
                  {/* Bank Name */}
                  <div className="flex items-center justify-between py-2 border-b border-blue-100">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm text-slate-600">Bank:</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-slate-800 mr-2">
                        First Bank of Nigeria
                      </span>
                      <button
                        onClick={() =>
                          handleCopy("First Bank of Nigeria", "bank")
                        }
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Copy bank name"
                      >
                        {copySuccess === "bank" ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Name */}
                  <div className="flex items-center justify-between py-2 border-b border-blue-100">
                    <span className="text-sm text-slate-600">
                      Account Name:
                    </span>
                    <div className="flex items-center">
                      <span className="font-semibold text-slate-800 mr-2">
                        Nic Maurice 
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            "National Nursing Conference 2026",
                            "accountName",
                          )
                        }
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Copy account name"
                      >
                        {copySuccess === "accountName" ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="flex items-center justify-between py-2 border-b border-blue-100">
                    <span className="text-sm text-slate-600">
                      Account Number:
                    </span>
                    <div className="flex items-center">
                      <span className="font-mono font-bold text-lg text-slate-800 mr-2">
                        2035451970
                      </span>
                      <button
                        onClick={() =>
                          handleCopy("2034567890", "accountNumber")
                        }
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Copy account number"
                      >
                        {copySuccess === "accountNumber" ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-amber-800 mb-2 text-sm">
                      Payment Instructions:
                    </h5>
                    <ol className="space-y-2 text-sm text-amber-700 list-decimal list-inside">
                      <li>Make a transfer to the account details above</li>
                      <li>
                        Use your{" "}
                        <span className="font-semibold">Full Name</span> as the
                        transfer reference
                      </li>
                      <li>Save your transaction receipt/alert</li>
                      <li>
                        Click "I've Made the Transfer" below to upload receipt
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    // Add logic to show receipt upload modal if needed
                  }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  I've Made the Transfer
                </button>

                <button
                  onClick={confirmRegistration}
                  className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all text-sm"
                >
                  Complete Registration Later (Invoice will be sent)
                </button>
              </div>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Your payment is secured with bank-level encryption</span>
              </div>

              {/* Copy Success Toast */}
              {copySuccess && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS to your global styles or in a style tag */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default Seminar;
