// HRDashboard.jsx
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
 
  Users,
  AlertCircle,
  LogOut,
  User,
  Shield,
  Sparkles,
  RefreshCw,
  Briefcase,
  Calendar,
  DollarSign,
  Star,
  FileText,
  PlusCircle,
  Edit,
  Trash2,
  MoreVertical,
  Download,
  Upload,
  PieChart,
  BarChart3,
  UserPlus,
  UserMinus,
  Heart,
  Medal,
  Gift,
  Clock3,
} from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hrInfo, setHrInfo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showTerminationModal, setShowTerminationModal] = useState(false);
  const [terminationReason, setTerminationReason] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get HR info from cookies
    const hrData = Cookies.get("data");

    if (hrData) {
      try {
        setHrInfo(JSON.parse(hrData));
      } catch (error) {
        console.error("Error parsing HR data:", error);
      }
    }

    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = Cookies.get("token");

    setIsLoading(true);
    try {
      const res = await axios.get("nicmauricebackend-production.up.railway.app/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setErrors("Failed to load employee data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchEmployees();
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("data");
    navigate("/academy/admin/login");
  };

  const handleEmployeeStatusChange = async (employeeId, newStatus, reason = "") => {
    const token = Cookies.get("token");

    try {
      const res = await axios.put(
        `nicmauricebackend-production.up.railway.app/hr/employees/${employeeId}/status`,
        { status: newStatus, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setSuccessMessage(`Employee status updated to ${newStatus}`);
        setSelectedEmployee(null);
        setShowTerminationModal(false);
        setTerminationReason("");
        fetchEmployees();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      setErrors(err.response?.data?.message || "Failed to update employee status");
      
      // Clear error after 3 seconds
      setTimeout(() => setErrors(""), 3000);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.post(
        "nicmauricebackend-production.up.railway.app/staff/",
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setSuccessMessage("Employee added successfully");
        setShowAddEmployee(false);
        fetchEmployees();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      setErrors(err.response?.data?.message || "Failed to add employee");
      
      // Clear error after 3 seconds
      setTimeout(() => setErrors(""), 3000);
    }
  };

  const handleUpdateEmployee = async (employeeId, employeeData) => {
    const token = Cookies.get("token");

    try {
      const res = await axios.put(
        `nicmauricebackend-production.up.railway.app/staff/${employeeId}`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setSuccessMessage("Employee information updated");
        setShowEditEmployee(false);
        setSelectedEmployee(null);
        fetchEmployees();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      setErrors(err.response?.data?.message || "Failed to update employee");
      
      // Clear error after 3 seconds
      setTimeout(() => setErrors(""), 3000);
    }
  };

  const tabs = [
    {
      id: "all",
      label: "All Staff",
      icon: Users,
      count: employees.length,
      color: "blue",
    },
    {
      id: "teaching",
      label: "Teaching Staff",
      icon: GraduationCap,
      count: employees.filter((e) => e.employeeType === "teaching").length,
      color: "purple",
    },
    {
      id: "non-teaching",
      label: "Non-Teaching Staff",
      icon: Briefcase,
      count: employees.filter((e) => e.employeeType === "non-teaching").length,
      color: "green",
    },
    {
      id: "active",
      label: "Active",
      icon: CheckCircle,
      count: employees.filter((e) => e.status === "active").length,
      color: "green",
    },
    {
      id: "on-leave",
      label: "On Leave",
      icon: Clock,
      count: employees.filter((e) => e.status === "on-leave").length,
      color: "yellow",
    },
    {
      id: "terminated",
      label: "Terminated",
      icon: XCircle,
      count: employees.filter((e) => e.status === "terminated").length,
      color: "red",
    },
  ];

  const departments = [
    "All Departments",
    "Nursing",
    "Medicine",
    "Administration",
    "Facilities",
    "IT",
    "HR",
    "Finance",
    "Student Affairs",
    "Clinical Services",
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "terminated":
        return "bg-red-100 text-red-800 border-red-200";
      case "probation":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "on-leave":
        return <Clock className="w-4 h-4" />;
      case "terminated":
        return <XCircle className="w-4 h-4" />;
      case "probation":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEmployeeTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "teaching":
        return <GraduationCap className="w-4 h-4" />;
      case "non-teaching":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const filteredEmployees = employees
    .filter((emp) => {
      if (activeTab === "all") return true;
      if (activeTab === "teaching") return emp.employeeType === "teaching";
      if (activeTab === "non-teaching") return emp.employeeType === "non-teaching";
      if (activeTab === "active") return emp.status === "active";
      if (activeTab === "on-leave") return emp.status === "on-leave";
      if (activeTab === "terminated") return emp.status === "terminated";
      return true;
    })
    .filter(
      (emp) =>
        emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (emp) =>
        filterDepartment === "all" || emp.department === filterDepartment
    )
    .filter(
      (emp) =>
        filterStatus === "all" || emp.status?.toLowerCase() === filterStatus.toLowerCase()
    );

  const stats = {
    total: employees.length,
    teaching: employees.filter((e) => e.employeeType === "teaching").length,
    nonTeaching: employees.filter((e) => e.employeeType === "non-teaching").length,
    active: employees.filter((e) => e.status === "active").length,
    onLeave: employees.filter((e) => e.status === "on-leave").length,
    terminated: employees.filter((e) => e.status === "terminated").length,
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

      {/* Header with HR Info */}
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HR Management System
                </h1>
                <p className="text-xs text-gray-500">Staff & Faculty Dashboard</p>
              </div>
            </motion.div>

            {/* HR Info & Actions */}
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
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">
                    Teaching: {stats.teaching}
                  </span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-purple-50 rounded-lg"
                >
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-700">
                    Non-Teaching: {stats.nonTeaching}
                  </span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg"
                >
                  <UserCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Active: {stats.active}
                  </span>
                </motion.div>
              </motion.div>

              {/* HR Profile */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {hrInfo?.fullName || "HR Administrator"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      ID: {hrInfo?.id || "HR001"}
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full">
                      HR Manager
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddEmployee(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">
                    Add Staff
                  </span>
                </motion.button>
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
            className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-6"
          >
            {[
              {
                label: "Total Staff",
                value: stats.total,
                icon: Users,
                color: "blue",
              },
              {
                label: "Teaching",
                value: stats.teaching,
                icon: GraduationCap,
                color: "purple",
              },
              {
                label: "Non-Teaching",
                value: stats.nonTeaching,
                icon: Briefcase,
                color: "green",
              },
              {
                label: "Active",
                value: stats.active,
                icon: CheckCircle,
                color: "green",
              },
              {
                label: "On Leave",
                value: stats.onLeave,
                icon: Clock,
                color: "yellow",
              },
              {
                label: "Terminated",
                value: stats.terminated,
                icon: XCircle,
                color: "red",
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
                  Welcome back, {hrInfo?.name?.split(" ")[0] || "HR Manager"}!
                </h2>
                <p className="text-blue-100 text-sm">
                  You have {stats.active} active staff members and {stats.onLeave} on leave.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

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
          className="border-b border-gray-200 overflow-x-auto"
        >
          <nav className="flex space-x-8 min-w-max">
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
              placeholder="Search by name, email, ID, or department..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.slice(1).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="probation">Probation</option>
                <option value="terminated">Terminated</option>
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

        {/* Employees Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
        >
          {/* Employees List */}
          <div
            className={`${selectedEmployee ? "lg:col-span-1" : "lg:col-span-3"} space-y-4`}
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
              ) : filteredEmployees.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border p-8 text-center"
                >
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No employees found</p>
                  <button
                    onClick={() => setShowAddEmployee(true)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your first employee
                  </button>
                </motion.div>
              ) : (
                filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl border p-5 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                      selectedEmployee?._id === employee._id
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:border-blue-200"
                    }`}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex-shrink-0"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-semibold text-lg">
                              {employee.firstName?.charAt(0) || "E"}
                            </span>
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: {employee.employeeId || employee._id?.slice(-6)}
                          </p>
                          <div className="flex flex-wrap items-center mt-2 space-x-2">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}
                            >
                              {getStatusIcon(employee.status)}
                              <span className="ml-1 capitalize">
                                {employee.status || "Active"}
                              </span>
                            </motion.span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                              {getEmployeeTypeIcon(employee.employeeType)}
                              <span className="ml-1 capitalize">
                                {employee.employeeType === "teaching" ? "Teaching" : "Non-Teaching"}
                              </span>
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
                        <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="truncate">
                          {employee.department || "Not assigned"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        <span className="truncate">
                          {employee.position || "Staff"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Employee Details Panel */}
          <AnimatePresence>
            {selectedEmployee && (
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
                    Employee Details
                  </motion.h2>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowEditEmployee(true);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEmployee(null)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Employee Basic Info */}
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
                      {selectedEmployee.firstName?.charAt(0) || "E"}
                    </span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedEmployee.status)}`}>
                        {getStatusIcon(selectedEmployee.status)}
                        <span className="ml-1 capitalize">
                          {selectedEmployee.status || "Active"}
                        </span>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        {getEmployeeTypeIcon(selectedEmployee.employeeType)}
                        <span className="ml-1 capitalize">
                          {selectedEmployee.employeeType === "teaching" ? "Teaching Staff" : "Non-Teaching Staff"}
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">
                          {selectedEmployee.email}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm">
                          {selectedEmployee.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Employment Details */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="py-6 border-b border-gray-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                    Employment Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.department || "Not assigned"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Position</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.position || "Staff"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Hire Date</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.hireDate 
                          ? new Date(selectedEmployee.hireDate).toLocaleDateString()
                          : "Not set"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Employee Type</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">
                        {selectedEmployee.employeeType || "Not specified"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Qualifications (for teaching staff) */}
                {selectedEmployee.employeeType === "teaching" && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="py-6 border-b border-gray-200"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                      Qualifications & Expertise
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Highest Degree</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {selectedEmployee.highestDegree || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {selectedEmployee.specialization || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Courses Taught</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.coursesTaught?.map((course, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {course}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-400">No courses assigned</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Emergency Contact */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="py-6 border-b border-gray-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Contact Name</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.emergencyContact?.name || "Not provided"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Relationship</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.emergencyContact?.relationship || "Not provided"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedEmployee.emergencyContact?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* HR Actions */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-6"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    HR Actions
                  </h4>
                  
                  {/* Status Change Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEmployeeStatusChange(selectedEmployee._id, "active")}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                      disabled={selectedEmployee.status === "active"}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Set Active
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEmployeeStatusChange(selectedEmployee._id, "on-leave")}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                      disabled={selectedEmployee.status === "on-leave"}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Place on Leave
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowTerminationModal(true)}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                      disabled={selectedEmployee.status === "terminated"}
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Terminate
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowEditEmployee(true);
                      }}
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {showAddEmployee && (
          <AddEmployeeModal
            onClose={() => setShowAddEmployee(false)}
            onAdd={handleAddEmployee}
          />
        )}
      </AnimatePresence>

      {/* Edit Employee Modal */}
      <AnimatePresence>
        {showEditEmployee && selectedEmployee && (
          <EditEmployeeModal
            employee={selectedEmployee}
            onClose={() => {
              setShowEditEmployee(false);
              setSelectedEmployee(null);
            }}
            onUpdate={handleUpdateEmployee}
          />
        )}
      </AnimatePresence>

      {/* Termination Modal */}
      <AnimatePresence>
        {showTerminationModal && selectedEmployee && (
          <TerminationModal
            employee={selectedEmployee}
            onClose={() => {
              setShowTerminationModal(false);
              setTerminationReason("");
            }}
            onConfirm={(reason) => handleEmployeeStatusChange(selectedEmployee._id, "terminated", reason)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Add Employee Modal Component
const AddEmployeeModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    employeeType: "teaching",
    department: "",
    position: "",
    hireDate: "",
    status: "active",
    highestDegree: "",
    specialization: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Add New Employee
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Type *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.employeeType}
                  onChange={(e) => setFormData({ ...formData, employeeType: e.target.value })}
                >
                  <option value="teaching">Teaching Staff</option>
                  <option value="non-teaching">Non-Teaching Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Administration">Administration</option>
                  <option value="Facilities">Facilities</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Student Affairs">Student Affairs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hire Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                />
              </div>
            </div>

            {formData.employeeType === "teaching" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Degree
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.highestDegree}
                      onChange={(e) => setFormData({ ...formData, highestDegree: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Contact Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, name: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, relationship: e.target.value },
                    })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { ...formData.emergencyContact, phone: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Edit Employee Modal Component
const EditEmployeeModal = ({ employee, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(employee);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employee._id, formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Edit Employee
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Same form fields as AddEmployeeModal but populated with employee data */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Type *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.employeeType}
                  onChange={(e) => setFormData({ ...formData, employeeType: e.target.value })}
                >
                  <option value="teaching">Teaching Staff</option>
                  <option value="non-teaching">Non-Teaching Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Administration">Administration</option>
                  <option value="Facilities">Facilities</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Student Affairs">Student Affairs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="probation">Probation</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>

            {formData.employeeType === "teaching" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Degree
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.highestDegree}
                      onChange={(e) => setFormData({ ...formData, highestDegree: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Contact Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { 
                        ...formData.emergencyContact, 
                        name: e.target.value 
                      },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact?.relationship || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { 
                        ...formData.emergencyContact, 
                        relationship: e.target.value 
                      },
                    })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.emergencyContact?.phone || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: { 
                        ...formData.emergencyContact, 
                        phone: e.target.value 
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Termination Modal Component
const TerminationModal = ({ employee, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <UserMinus className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
            Terminate Employee
          </h2>
          
          <p className="text-sm text-center text-gray-600 mb-6">
            Are you sure you want to terminate{" "}
            <span className="font-semibold">
              {employee.firstName} {employee.lastName}
            </span>
            ?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Termination Date
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Termination *
              </label>
              <textarea
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Please provide the reason for termination..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800"
              >
                Confirm Termination
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HRDashboard;