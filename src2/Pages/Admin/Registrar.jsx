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
import api, { clearSession, errorMessage } from "../../utils/api";

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

  const [lecturers, setLecturers] = useState([]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000,
    );
  };

  const fetchRegistrarDashboard = async () => {
    setLoading(true);
    try {
      const [dash, lect] = await Promise.all([
        api.get("/registrar"),
        api.get("/registrar/lecturers"),
      ]);
      setStudents(dash.data.data.students);
      setCourses(dash.data.data.courses);
      setRegistrations(dash.data.data.enrollments);
      setLecturers(lect.data.lecturers || []);
    } catch (err) {
      console.error("Error fetching registrar data:", err);
      showNotification(errorMessage(err, "Failed to load registrar data"), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const registrarCookie = Cookies.get("data");
    if (registrarCookie) {
      try {
        setRegistrarData(JSON.parse(registrarCookie));
      } catch (error) {
        console.error("Error parsing registrar data:", error);
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

  useEffect(() => {
    localStorage.setItem("registrarSettings", JSON.stringify(settings));
  }, [settings]);

  const handleLogout = () => {
    clearSession();
    navigate("/academy/admin/login");
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    showNotification(`Setting updated: ${key}`, "success");
  };

  // Runs a saving request, refreshes the lists and reports the outcome
  const save = async (request, successMessage, onDone) => {
    setLoading(true);
    try {
      const res = await request();
      if (onDone) onDone(res);
      await fetchRegistrarDashboard();
      showNotification(successMessage, "success");
      return res;
    } catch (error) {
      console.error("Registrar request failed:", error);
      showNotification(errorMessage(error, "Something went wrong"), "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ---- Students ----
  const handleAddStudent = async () => {
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
    const res = await save(
      () => api.post("/registrar/student", studentForm),
      "Student added",
      () => {
        setShowStudentModal(false);
        resetStudentForm();
      },
    );
    if (res && res.data.emailSent === false) {
      window.alert(
        `The login email could not be sent. Give the student this temporary password:\n\n${res.data.tempPassword}`,
      );
    }
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

  const handleUpdateStudent = () =>
    save(
      () => api.put(`/registrar/student/${editingItem._id || editingItem.id}`, studentForm),
      "Student updated",
      () => {
        setEditingItem(null);
        setShowStudentModal(false);
        resetStudentForm();
      },
    );

  const handleDeleteStudent = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this student and all their registrations? This cannot be undone.",
      )
    ) {
      return;
    }
    save(() => api.delete(`/registrar/student/${id}`), "Student deleted");
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

  // ---- Courses ----
  const courseFormValid = () => {
    if (
      !courseForm.code ||
      !courseForm.name ||
      !courseForm.department ||
      !courseForm.lecturer
    ) {
      showNotification("Code, name, department and lecturer are required", "error");
      return false;
    }
    return true;
  };

  const handleAddCourse = () => {
    if (!courseFormValid()) return;
    return save(
      () => api.post("/registrar/course", courseForm),
      "Course added successfully",
      () => {
        setShowCourseModal(false);
        resetCourseForm();
      },
    );
  };

  const handleEditCourse = (course) => {
    setEditingItem(course);
    setCourseForm({
      code: course.code,
      name: course.name,
      department: course.department,
      level: course.level,
      credits: course.credits,
      lecturer: course.lecturerId || "",
      capacity: course.capacity,
      semester: course.semester,
      id: course._id || course.id,
    });
    setShowCourseModal(true);
  };

  const handleUpdateCourse = () => {
    const courseId = editingItem?._id || editingItem?.id || courseForm?.id;
    if (!courseId) {
      showNotification("No course selected for update", "error");
      return;
    }
    if (!courseFormValid()) return;
    const { id, ...updateData } = courseForm; // eslint-disable-line no-unused-vars
    return save(
      () => api.put(`/registrar/course/${courseId}`, updateData),
      "Course updated successfully",
      () => {
        setEditingItem(null);
        setShowCourseModal(false);
        resetCourseForm();
      },
    );
  };

  const handleDeleteCourse = (courseId) => {
    const idToDelete = courseId?._id || courseId?.id || courseId;
    if (!idToDelete) {
      showNotification("No course ID provided for deletion", "error");
      return;
    }
    if (
      !window.confirm(
        "Delete this course? Students' registrations for it will be removed too. This cannot be undone.",
      )
    ) {
      return;
    }
    save(() => api.delete(`/registrar/course/${idToDelete}`), "Course deleted successfully");
  };

  const resetCourseForm = () => {
    setCourseForm({
      code: "",
      name: "",
      department: "",
      level: "100",
      credits: 3,
      lecturer: "",
      capacity: 100,
      semester: "First",
    });
  };

  // ---- Registrations ----
  const handleApproveRegistration = (registrationId) =>
    save(
      () => api.put(`/registrar/registration/${registrationId}/status`, { status: "approved" }),
      "Registration approved",
    );

  const handleRejectRegistration = (registrationId) =>
    save(
      () => api.put(`/registrar/registration/${registrationId}/status`, { status: "rejected" }),
      "Registration rejected",
    );

  const handleAddRegistration = () => {
    setRegistrationForm({ studentId: "", courseCode: "" });
    setShowRegistrationModal(true);
  };

  const handleSubmitRegistration = () => {
    const course = courses.find((c) => c.code === registrationForm.courseCode);
    if (!registrationForm.studentId || !course) {
      showNotification("Select a student and a course", "error");
      return;
    }
    const alreadyRegistered = registrations.some(
      (r) =>
        r.studentId === registrationForm.studentId &&
        r.courseCode === course.code &&
        r.status !== "rejected",
    );
    if (alreadyRegistered) {
      showNotification("Student already registered for this course", "error");
      return;
    }
    return save(
      () =>
        api.post("/registrar/registration", {
          studentId: registrationForm.studentId,
          courseId: course._id || course.id,
        }),
      "Registration created",
      () => setShowRegistrationModal(false),
    );
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
                        <td className="px-6 py-4">{reg.semester}</td>
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
                          credits: parseInt(e.target.value) || 0,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    />
                    <select
                      value={courseForm.lecturer}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          lecturer: e.target.value,
                        })
                      }
                      className="p-2 border rounded-lg dark:bg-gray-700"
                    >
                      <option value="">Select Lecturer *</option>
                      {lecturers.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={courseForm.capacity}
                      onChange={(e) =>
                        setCourseForm({
                          ...courseForm,
                          capacity: parseInt(e.target.value) || 0,
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