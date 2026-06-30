import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaSpinner,
  FaTimesCircle as FaClose,
  FaGraduationCap,
} from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const RegistrarDashboard = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState("overview");
  const [registrarData, setRegistrarData] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "en",
    academicYear: "2024/2025",
    currentSemester: "First",
  });

  // Data states
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Form states
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    department: "",
    level: "100",
  });

  const [courseForm, setCourseForm] = useState({
    code: "",
    name: "",
    department: "",
    level: "100",
    credits: 3,
    lecturer: "",
    capacity: 100,
    semester: "First",
  });

  const [registrationForm, setRegistrationForm] = useState({
    studentId: "",
    courseCode: "",
  });

  const [departments] = useState(["Nursing"]);
  const [levels] = useState(["100", "200", "300", "400", "500"]);

  useEffect(() => {
    // Get HR info from cookies
    const registrarData = Cookies.get("data");

    if (registrarData) {
      try {
        setRegistrarData(JSON.parse(registrarData));
      } catch (error) {
        console.error("Error parsing HR data:", error);
      }
    }

    const savedSettings = localStorage.getItem("registrarSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }

    fetchRegistrarDashboard();
  }, []);

  const fetchRegistrarDashboard = async () => {
    const token = Cookies.get("token");

    setLoading(true);
    try {
      const res = await axios.get("nicmauricebackend-production.up.railway.app/registrar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.data.students);
      setCourses(res.data.data.courses);
      setRegistrations(res.data.data.enrollments);
    } catch (err) {
      console.error("Error fetching registrar data:", err);
      showNotification("Failed to load registrar data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("registrarSettings", JSON.stringify(settings));
  }, [settings]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000,
    );
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("data");
    navigate("/academy/admin/login");
  };
  
  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    showNotification(`Setting updated: ${key}`, "success");
  };

  // Student CRUD operations
  const handleAddStudent = () => {
    if (
      !studentForm.firstName ||
      !studentForm.lastName ||
      !studentForm.email ||
      !studentForm.studentId
    ) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    if (students.some((s) => s.studentId === studentForm.studentId)) {
      showNotification("Student ID already exists", "error");
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...studentForm,
      status: "active",
      enrollmentDate: new Date().toISOString().split("T")[0],
    };
    setStudents([...students, newStudent]);
    setShowStudentModal(false);
    resetStudentForm();
    showNotification("Student added successfully", "success");
  };

  const handleEditStudent = (student) => {
    setEditingItem(student);
    setStudentForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      level: student.level,
    });
    setShowStudentModal(true);
  };

  const handleUpdateStudent = () => {
    setStudents(
      students.map((s) =>
        s.id === editingItem.id ? { ...s, ...studentForm } : s,
      ),
    );
    setEditingItem(null);
    setShowStudentModal(false);
    resetStudentForm();
    showNotification("Student updated successfully", "success");
  };

  const handleDeleteStudent = (studentId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone.",
      )
    ) {
      const student = students.find((s) => s.id === studentId);
      if (student) {
        setRegistrations(
          registrations.filter((r) => r.studentId !== student.studentId),
        );
      }
      setStudents(students.filter((s) => s.id !== studentId));
      showNotification("Student deleted successfully", "success");
    }
  };

  const resetStudentForm = () => {
    setStudentForm({
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      department: "",
      level: "100",
    });
  };

  // Course CRUD operations
  const handleAddCourse = async () => {
    const token = Cookies.get("token");

    try {
      // Validate fields
      if (!courseForm.code || !courseForm.name || !courseForm.department) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      // Optional loading state
      setLoading(true);

      // Send request to backend
      const response = await axios.post(
        "nicmauricebackend-production.up.railway.app/registrar/course",
        courseForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Close modal
      setShowCourseModal(false);

      // Reset form
      resetCourseForm();

      // Refresh the course list
      await fetchRegistrarDashboard();

      // Success notification
      showNotification("Course added successfully", "success");
    } catch (error) {
      console.error("Add Course Error:", error);
      showNotification(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditingItem(course);
    // Get the correct ID (handle both _id and id)
    const courseId = course._id || course.id;
    setCourseForm({
      code: course.code,
      name: course.name,
      department: course.department,
      level: course.level,
      credits: course.credits,
      lecturer: course.lecturer,
      capacity: course.capacity,
      semester: course.semester,
      id: courseId, // Store the ID in the form
    });
    setShowCourseModal(true);
  };

  const handleUpdateCourse = async () => {
    const token = Cookies.get("token");

    try {
      // Get course ID from editingItem or from courseForm
      const courseId = editingItem?._id || editingItem?.id || courseForm?.id;

      if (!courseId) {
        showNotification("No course selected for update", "error");
        return;
      }

      if (!courseForm.code || !courseForm.name || !courseForm.department) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      setLoading(true);

      // Prepare the update data without the id field
      const updateData = {
        code: courseForm.code,
        name: courseForm.name,
        department: courseForm.department,
        level: courseForm.level,
        credits: courseForm.credits,
        lecturer: courseForm.lecturer,
        capacity: courseForm.capacity,
        semester: courseForm.semester,
      };

      const response = await axios.put(
        `nicmauricebackend-production.up.railway.appregistrar/course/${courseId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingItem(null);
      setShowCourseModal(false);
      resetCourseForm();

      // Refresh the course list instead of reloading the page
      await fetchRegistrarDashboard();

      showNotification("Course updated successfully", "success");
    } catch (error) {
      console.error("Update Course Error:", error);
      showNotification(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const token = Cookies.get("token");

    // Ensure courseId is provided - handle both _id and id
    const idToDelete = courseId?._id || courseId?.id || courseId;

    if (!idToDelete) {
      showNotification("No course ID provided for deletion", "error");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      
      const response = await axios.delete(
        `nicmauricebackend-production.up.railway.app/registrar/course/${idToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showNotification("Course deleted successfully", "success");
      
      // Refresh the course list instead of reloading the page
      await fetchRegistrarDashboard();
      
    } catch (error) {
      console.error("Delete Course Error:", error);
      showNotification(error.response?.data?.message || "Failed to delete course", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      code: "",
      name: "",
      department: "",
      level: "100",
      credits: 0,
      lecturer: "",
      capacity: 100,
      semester: "First",
    });
  };

  // Registration operations
  const handleApproveRegistration = (registrationId) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === registrationId ? { ...r, status: "approved" } : r,
      ),
    );
    showNotification("Registration approved", "success");
  };

  const handleRejectRegistration = (registrationId) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === registrationId ? { ...r, status: "rejected" } : r,
      ),
    );
    showNotification("Registration rejected", "success");
  };

  const handleAddRegistration = () => {
    setRegistrationForm({ studentId: "", courseCode: "" });
    setShowRegistrationModal(true);
  };

  const handleSubmitRegistration = () => {
    const student = students.find(
      (s) => s.studentId === registrationForm.studentId,
    );
    const course = courses.find((c) => c.code === registrationForm.courseCode);

    if (!student || !course) {
      showNotification("Invalid student or course", "error");
      return;
    }

    // Check if already registered
    const alreadyRegistered = registrations.some(
      (r) =>
        r.studentId === registrationForm.studentId &&
        r.courseCode === registrationForm.courseCode,
    );

    if (alreadyRegistered) {
      showNotification("Student already registered for this course", "error");
      return;
    }

    if (course.enrolled >= course.capacity) {
      showNotification("Course is full", "error");
      return;
    }

    const newRegistration = {
      id: Date.now(),
      studentId: registrationForm.studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      courseCode: registrationForm.courseCode,
      courseName: course.name,
      semester: `${settings.academicYear} ${settings.currentSemester}`,
      registrationDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setRegistrations([...registrations, newRegistration]);
    setCourses(
      courses.map((c) =>
        c.id === course.id ? { ...c, enrolled: c.enrolled + 1 } : c,
      ),
    );
    setShowRegistrationModal(false);
    showNotification("Registration submitted successfully", "success");
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "text-green-600 bg-green-100",
      inactive: "text-red-600 bg-red-100",
      pending: "text-yellow-600 bg-yellow-100",
      approved: "text-green-600 bg-green-100",
      rejected: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesLevel =
      selectedLevel === "all" || student.level === selectedLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || course.department === selectedDepartment;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const statsCards = [
    {
      title: "Total Students",
      value: students.length,
      icon: <FaUsers className="text-3xl" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Courses",
      value: courses.length,
      icon: <FaBook className="text-3xl" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Registrations",
      value: registrations.filter((r) => r.status === "pending").length,
      icon: <FaClipboardList className="text-3xl" />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Total Registrations",
      value: registrations.length,
      icon: <FaGraduationCap className="text-3xl" />,
      color: "from-green-500 to-green-600",
    },
  ];

  const modules = [
    { id: "overview", name: "Overview", icon: <FaTachometerAlt /> },
    { id: "students", name: "Student Management", icon: <FaUsers /> },
    { id: "courses", name: "Course Management", icon: <FaBook /> },
    { id: "registrations", name: "Registrations", icon: <FaClipboardList /> },
  ];

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="text-4xl animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        settings.darkMode
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-linear-to-br from-blue-50/30 via-white to-purple-50/30"
      }`}
    >
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaUniversity className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Registrar's Office
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaCog className="text-gray-600 dark:text-gray-400 text-xl" />
              </button>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="text-gray-600 dark:text-gray-400 text-xl" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {registrarData?.fullName
                    ? registrarData.fullName.charAt(0)
                    : "RA"}
                </div>
                <div className="hidden lg:block">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {registrarData?.fullName
                      ? `${registrarData.fullName}`
                      : "Registrar Admin"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {registrarData?.role ?? "registrar"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mt-4"
          >
            <div
              className={`p-6 rounded-2xl shadow-lg ${
                settings.darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-bold mb-4">Dashboard Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {settings.darkMode ? (
                      <FaMoon className="mr-3" />
                    ) : (
                      <FaSun className="mr-3" />
                    )}
                    <span>Dark Mode</span>
                  </div>
                  <button
                    onClick={() =>
                      handleSettingChange("darkMode", !settings.darkMode)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.darkMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <label className="block text-sm mb-2">Academic Year</label>
                  <select
                    value={settings.academicYear}
                    onChange={(e) =>
                      handleSettingChange("academicYear", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  >
                    <option>2023/2024</option>
                    <option>2024/2025</option>
                    <option>2025/2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Current Semester</label>
                  <select
                    value={settings.currentSemester}
                    onChange={(e) =>
                      handleSettingChange("currentSemester", e.target.value)
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  >
                    <option>First</option>
                    <option>Second</option>
                    <option>Summer</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-wrap gap-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeModule === module.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {module.icon}
              <span>{module.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeModule === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <p className="text-white/70 text-sm mt-1">
                        {stat.change}
                      </p>
                    </div>
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`rounded-2xl shadow-lg p-6 ${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">Recent Registrations</h2>
                <div className="space-y-3">
                  {registrations.slice(0, 5).map((reg) => (
                    <div
                      key={reg.id}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div>
                        <p className="font-medium">{reg.student}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {reg.code} - {reg.name}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}
                      >
                        {reg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-2xl shadow-lg p-6 ${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">Popular Courses</h2>
                <div className="space-y-3">
                  {courses.slice(0, 5).map((course) => (
                    <div
                      key={course.id || course._id}
                      className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          {course.code} - {course.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {course.enrolled}/{course.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(course.enrolled / course.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === "students" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  resetStudentForm();
                  setShowStudentModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaUserPlus />
                <span>Add New Student</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level} Level
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`rounded-2xl shadow-lg overflow-hidden ${
                settings.darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={`${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  >
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Student ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.studentId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.level}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowStudentModal(true);
                              }}
                              className="p-1 text-green-600 hover:text-green-800"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeModule === "courses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  resetCourseForm();
                  setShowCourseModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level} Level
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id || course.id}
                  className={`rounded-2xl shadow-lg p-6 ${
                    settings.darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{course.code}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {course.name}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Department:</span>{" "}
                      {course.department}
                    </p>
                    <p>
                      <span className="font-medium">Level:</span> {course.level}{" "}
                      Level
                    </p>
                    <p>
                      <span className="font-medium">Credits:</span>{" "}
                      {course.credits || course.units}
                    </p>
                    <p>
                      <span className="font-medium">Lecturer:</span>{" "}
                      {course.lecturer}
                    </p>
                    <p>
                      <span className="font-medium">Enrollment:</span>{" "}
                      {course.enrolled}/{course.capacity}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(course.enrolled / course.capacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id || course.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === "registrations" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Course Registrations</h2>
              <button
                onClick={handleAddRegistration}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus />
                <span>New Registration</span>
              </button>
            </div>

            <div
              className={`rounded-2xl shadow-lg overflow-hidden ${
                settings.darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={`${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                  >
                    <tr>
                      <th className="px-6 py-3 text-left">Student</th>
                      <th className="px-6 py-3 text-left">Course</th>
                      <th className="px-6 py-3 text-left">Semester</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4">{reg.student}</td>
                        <td className="px-6 py-4">
                          {reg.name} - {reg.code}
                        </td>
                        <td className="px-6 py-4">{reg.live}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {reg.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleApproveRegistration(reg.id)
                                  }
                                  className="p-1 text-green-600 hover:text-green-800"
                                  title="Approve"
                                >
                                  <FaCheckCircle />
                                </button>
                                <button
                                  onClick={() =>
                                    handleRejectRegistration(reg.id)
                                  }
                                  className="p-1 text-red-600 hover:text-red-800"
                                  title="Reject"
                                >
                                  <FaTimesCircle />
                                </button>
                              </>
                            )}
                            <button
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="View"
                            >
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Modal */}
      <AnimatePresence>
        {showStudentModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowStudentModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {editingItem ? "Edit Student" : "Add New Student"}
                  </h2>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaClose />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={studentForm.firstName}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          firstName: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={studentForm.lastName}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          lastName: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Student ID *"
                      value={studentForm.studentId}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          studentId: e.target.value.toUpperCase(),
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={studentForm.email}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          email: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <select
                      value={studentForm.department}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          department: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="">Select Department *</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <select
                      value={studentForm.level}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          level: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level} Level
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowStudentModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        editingItem ? handleUpdateStudent : handleAddStudent
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingItem ? "Update" : "Add"} Student
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Course Modal */}
      <AnimatePresence>
        {showCourseModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCourseModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 w-full max-w-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {editingItem ? "Edit Course" : "Add New Course"}
                  </h2>
                  <button
                    onClick={() => setShowCourseModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaClose />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Course Code * (e.g., CSC101)"
                      value={courseForm.code}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Course Name *"
                      value={courseForm.name}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, name: e.target.value })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <select
                      value={courseForm.department}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          department: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="">Select Department *</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <select
                      value={courseForm.level}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, level: e.target.value })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level} Level
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Credits"
                      value={courseForm.credits}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          credits: parseInt(e.target.value),
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Lecturer Name"
                      value={courseForm.lecturer}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          lecturer: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={courseForm.capacity}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <select
                      value={courseForm.semester}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          semester: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="First">First Semester</option>
                      <option value="Second">Second Semester</option>
                      <option value="Summer">Summer Semester</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowCourseModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        editingItem ? handleUpdateCourse : handleAddCourse
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingItem ? "Update" : "Add"} Course
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistrationModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowRegistrationModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">New Registration</h2>
                  <button
                    onClick={() => setShowRegistrationModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaClose />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Student ID
                    </label>
                    <select
                      value={registrationForm.studentId}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          studentId: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="">Select Student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.studentId}>
                          {student.studentId} - {student.firstName}{" "}
                          {student.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Course Code
                    </label>
                    <select
                      value={registrationForm.courseCode}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          courseCode: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course._id || course.id} value={course.code}>
                          {course.code} - {course.name} ({course.enrolled}/
                          {course.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowRegistrationModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitRegistration}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit Registration
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl z-50 w-full max-w-md"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSignOutAlt className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout?
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrarDashboard;