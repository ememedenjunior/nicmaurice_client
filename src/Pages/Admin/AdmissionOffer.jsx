// AdmissionsDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  AlertCircle,
  LogOut,
  User,
  Building,
  Award,
  BookOpen,
  Shield,
  TrendingUp,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdmissionsDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [officerInfo, setOfficerInfo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get officer info from cookies
    const adminData = Cookies.get("data");

    if (adminData) {
      try {
        setOfficerInfo(JSON.parse(adminData));
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }

    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    const token = Cookies.get("token");

    setIsLoading(true);
    try {
      const res = await axios.get("https://nicmauricebackend-production.up.railway.app/applicant/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data.data || []);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchApplicants();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("data");
    navigate("/academy/admin/login");
  };

  const handleAdmissionConfirmation = async () => {
    const token = Cookies.get("token");

    try {
      const res = await axios.get(
        `https://nicmauricebackend-production.up.railway.app/applicant/confirm-admission/${selectedApplication._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setSelectedApplication(null);
        window.location.reload();
      } else {
        setSelectedApplication(null);
      }
    } catch (err) {
      setErrors(err.response.data.message);
      window.location.reload();
    }
  };

  const handleAdmissionReview = async () => {
    const token = Cookies.get("token");

    try {
      const res = await axios.get(
        `https://nicmauricebackend-production.up.railway.app/applicant/review-admission/${selectedApplication._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setSelectedApplication(null);
        window.location.reload();
      } else {
        setSelectedApplication(null);
      }
    } catch (err) {
      window.location.reload();
      setErrors(err.response.data.message); 
    }
  };

  const handleAdmissionRejection = async () => {
    const token = Cookies.get("token");

    try {
      const res = await axios.put(
        `nicmauricebackend-production.up.railway.app/applicant/reject-admission/${selectedApplication._id}`,
        { reason },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setSelectedApplication(null);
        window.location.reload();
      } else {
        setSelectedApplication(null);
        window.location.reload();
      }
    } catch (err) {
      setErrors(err.response.data.message);
      window.location.reload();
    }
  };
  const tabs = [
    {
      id: "all",
      label: "All Applications",
      icon: Users,
      count: applications.length,
      color: "blue",
    },
    {
      id: "pending",
      label: "Pending Review",
      icon: Clock,
      count: applications.filter(
        (a) =>
          a.applicationStatus === "Pending" ||
          a.applicationStatus === "Under Review",
      ).length,
      color: "yellow",
    },
    {
      id: "accepted",
      label: "Accepted",
      icon: CheckCircle,
      count: applications.filter((a) => a.applicationStatus === "Accepted")
        .length,
      color: "green",
    },
    {
      id: "rejected",
      label: "Rejected",
      icon: XCircle,
      count: applications.filter((a) => a.applicationStatus === "Rejected")
        .length,
      color: "red",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "under review":
      case "reviewing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "under review":
      case "reviewing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const filteredApplications = applications
    .filter((app) => {
      if (activeTab === "all") return true;
      if (activeTab === "pending")
        return (
          app.applicationStatus === "Pending" ||
          app.applicationStatus === "Under Review" ||
          app.applicationStatus === "reviewing"
        );
      return app.applicationStatus?.toLowerCase() === activeTab;
    })
    .filter(
      (app) =>
        app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app._id?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(
      (app) =>
        filterStatus === "all" ||
        app.applicationStatus?.toLowerCase() === filterStatus.toLowerCase(),
    );

  const stats = {
    total: applications.length,
    accepted: applications.filter(
      (a) => a.applicationStatus?.toLowerCase() === "accepted",
    ).length,
    rejected: applications.filter(
      (a) => a.applicationStatus?.toLowerCase() === "rejected",
    ).length,
    pending: applications.filter(
      (a) =>
        a.applicationStatus === "Pending" ||
        a.applicationStatus === "Under Review" ||
        a.applicationStatus === "reviewing",
    ).length,
  };

  // Animation variants
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
      },
    },
  };

  const statCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Header with Officer Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  University Admissions
                </h1>
                <p className="text-xs text-gray-500">Admissions Dashboard</p>
              </div>
            </motion.div>

            {/* Officer Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Quick Stats */}
              <motion.div
                className="hidden md:flex items-center space-x-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg"
                >
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">
                    Today: {stats.pending} pending
                  </span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg"
                >
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    {stats.accepted} accepted
                  </span>
                </motion.div>
              </motion.div>

              {/* Officer Profile */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {officerInfo?.fullName || "Admissions Officer"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      ID: {officerInfo?.id || "ADM001"}
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full">
                      {officerInfo?.role || "Officer"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 rounded-lg hover:bg-blue-50 transition-colors relative"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </motion.button>

                {/* Logout Button */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">
                      Logout
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>

                  {/* Logout Confirmation */}
                  <AnimatePresence>
                    {showLogoutConfirm && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                      >
                        <div className="p-4">
                          <p className="text-sm text-gray-700 mb-3">
                            Are you sure you want to logout?
                          </p>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleLogout}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium rounded-lg transition-colors shadow-md"
                            >
                              Yes, Logout
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setShowLogoutConfirm(false)}
                              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards with Animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6"
          >
            {[
              {
                label: "Total Applications",
                value: stats.total,
                icon: Users,
                color: "blue",
              },
              {
                label: "Accepted",
                value: stats.accepted,
                icon: CheckCircle,
                color: "green",
              },
              {
                label: "Rejected",
                value: stats.rejected,
                icon: XCircle,
                color: "red",
              },
              {
                label: "Pending Review",
                value: stats.pending,
                icon: Clock,
                color: "yellow",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statCardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-3 bg-${stat.color}-100 rounded-xl`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </motion.div>
                </div>
                <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(stat.value / (stats.total || 1)) * 100}%`,
                    }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`bg-${stat.color}-600 h-1.5 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 py-6 relative"
      >
        {/* Welcome Banner */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome back, {officerInfo?.name?.split(" ")[0] || "Officer"}!
                </h2>
                <p className="text-blue-100 text-sm">
                  You have {stats.pending} applications pending review. Let's
                  get started!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Alert */}
        {errors && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errors}</p>
          </div>
        )}

        {/* Tabs with Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="border-b border-gray-200"
        >
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm relative ${
                  activeTab === tab.id
                    ? `border-${tab.color}-600 text-${tab.color}-600`
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
                <motion.span
                  key={tab.count}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-100 text-${tab.color}-600`
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </motion.span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-600`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or application ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 bg-white/80 backdrop-blur-sm shadow-sm"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
        >
          {/* Applications List */}
          <div
            className={`${selectedApplication ? "lg:col-span-1" : "lg:col-span-3"} space-y-4`}
          >
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-12"
                >
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                filteredApplications.map((application, index) => (
                  <motion.div
                    key={application._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl border p-5 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                      selectedApplication?._id === application._id
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:border-blue-200"
                    }`}
                    onClick={() => setSelectedApplication(application)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex-shrink-0"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-semibold text-lg">
                              {application.firstName?.charAt(0) || "A"}
                            </span>
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {application.firstName} {application.lastName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: {application._id?.slice(-6)}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.applicationStatus)}`}
                            >
                              {getStatusIcon(application.applicationStatus)}
                              <span className="ml-1 capitalize">
                                {application.applicationStatus || "Pending"}
                              </span>
                            </motion.span>
                            <span className="text-xs text-gray-400">
                              {new Date(
                                application.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <GraduationCap className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="truncate">
                          {application.programAppliedFor || "Not specified"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        <span className="truncate">
                          {application.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Application Details Panel */}
          <AnimatePresence>
            {selectedApplication && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Application Details
                  </motion.h2>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Applicant Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start space-x-5 pb-6 border-b border-gray-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-2xl font-semibold">
                      {selectedApplication.firstName?.charAt(0) || "A"}
                    </span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedApplication.firstName}{" "}
                      {selectedApplication.lastName}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">
                          {selectedApplication.email}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">
                          {selectedApplication.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Academic Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="py-6 border-b border-gray-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    Academic Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Program</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedApplication.programAppliedFor ||
                          "Not specified"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Term</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedApplication.intakeYear || "2024"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">GPA</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedApplication.gpa || "3.65"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Previous School</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedApplication.institutionAttended ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decision Actions */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    Admission Decision
                  </h4>
                  {/* Decision Notes */}
                  <div className="mt-4">
                    <textarea
                      placeholder="Add decision notes or comments..."
                      onChange={handleReasonChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAdmissionConfirmation}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      disabled={
                        selectedApplication.applicationStatus === "Accepted"
                      }
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAdmissionRejection}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      disabled={
                        selectedApplication.applicationStatus === "Rejected"
                      }
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Reject
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAdmissionReview}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      disabled={
                        selectedApplication.applicationStatus === "Under Review"
                      }
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Reviewing
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdmissionsDashboard;
