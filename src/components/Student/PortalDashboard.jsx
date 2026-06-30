import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaArrowRight,
  FaCog,
  FaBook,
  FaChartLine,
  FaClipboardList,
  FaBookOpen,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaChartBar,
  FaTasks,
  FaUserFriends,
  FaVideo,
  FaGraduationCap,
  FaTimes,
  FaCheckCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaLanguage,
  FaBellSlash,
  FaShieldAlt,
  FaPlusCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaRegClock,
  FaChalkboardTeacher,
  FaUsers,
  FaPlayCircle,
  FaPauseCircle,
  FaExpand,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaComments,
  FaCalendarDay
} from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";

const PortalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [studentData, setStudentData] = useState(null);
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "en",
    privacyMode: false,
  });
  const [pulse, setPulse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // WebRTC Live Class States
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [remoteStream, setRemoteStream] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [teacherVideoEnabled, setTeacherVideoEnabled] = useState(true);
  const [teacherAudioEnabled, setTeacherAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // Video player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  
  // Refs
  const remoteVideoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // Course registration states
  const [availableCourses, setAvailableCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [cartTotal, setCartTotal] = useState(0);

  // WebRTC Configuration
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
    ]
  };

  // Initialize Socket.IO connection
  const initSocketConnection = () => {
    const token = Cookies.get("token");
    
    socketRef.current = io("https://nicmauricebackend-production.up.railway.app", {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to live class server');
      setConnectionStatus("connected");
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from live class server');
      setConnectionStatus("disconnected");
    });

    // WebRTC Signaling Handlers
    socketRef.current.on('webrtc:offer', handleWebRTCOffer);
    socketRef.current.on('webrtc:answer', handleWebRTCAnswer);
    socketRef.current.on('webrtc:ice-candidate', handleICECandidate);
    
    // Session Handlers
    socketRef.current.on('session:started', handleSessionStarted);
    socketRef.current.on('session:ended', handleSessionEnded);
    socketRef.current.on('session:participants-updated', handleParticipantsUpdated);
    
    // Teacher Status Handlers
    socketRef.current.on('teacher:video-status', handleTeacherVideoStatus);
    socketRef.current.on('teacher:audio-status', handleTeacherAudioStatus);
    socketRef.current.on('teacher:screen-share-status', handleScreenShareStatus);
    
    // Chat Handlers
    socketRef.current.on('chat:new-message', handleNewChatMessage);
    socketRef.current.on('session:chat-history', handleChatHistory);
  };

  // WebRTC Handlers
  const handleWebRTCOffer = async (data) => {
    const { from, offer } = data;
    
    try {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      
      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;
      
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('webrtc:ice-candidate', {
            sessionId: selectedCourse?.sessionId,
            targetUserId: from,
            candidate: event.candidate
          });
        }
      };
      
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socketRef.current.emit('webrtc:answer', {
        sessionId: selectedCourse?.sessionId,
        targetUserId: from,
        answer
      });
      
      setConnectionStatus("connected");
    } catch (error) {
      console.error('Error handling WebRTC offer:', error);
      setConnectionStatus("error");
    }
  };
  
  const handleWebRTCAnswer = async (data) => {
    const { answer } = data;
    
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        setConnectionStatus("connected");
      }
    } catch (error) {
      console.error('Error handling WebRTC answer:', error);
      setConnectionStatus("error");
    }
  };
  
  const handleICECandidate = async (data) => {
    const { candidate } = data;
    
    try {
      if (peerConnectionRef.current && candidate) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };
  
  // Session Handlers
  const handleSessionStarted = (data) => {
    console.log('Session started:', data);
    showTemporaryNotification(`Live session has started for ${data.courseCode}`, "success");
  };
  
  const handleSessionEnded = (data) => {
    console.log('Session ended:', data);
    setIsLiveActive(false);
    setShowLiveClassModal(false);
    showTemporaryNotification("The live session has ended", "info");
    
    // Clean up peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setRemoteStream(null);
  };
  
  const handleParticipantsUpdated = (data) => {
    setParticipantCount(data.count);
  };
  
  // Teacher Status Handlers
  const handleTeacherVideoStatus = (data) => {
    setTeacherVideoEnabled(data.enabled);
  };
  
  const handleTeacherAudioStatus = (data) => {
    setTeacherAudioEnabled(data.enabled);
  };
  
  const handleScreenShareStatus = (data) => {
    setIsScreenSharing(data.sharing);
  };
  
  // Chat Handlers
  const handleNewChatMessage = (message) => {
    setChatMessages(prev => [...prev, message]);
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };
  
  const handleChatHistory = (history) => {
    setChatMessages(history);
  };
  
  // Join Live Class
  const joinLiveClass = async (course) => {
    try {
      setIsConnecting(true);
      setSelectedCourse(course);
      
      // Check if course has active session
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://nicmauricebackend-production.up.railway.app/api/live/course/${course._id || course.id}/active`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.isLive) {
        course.sessionId = response.data.sessionId;
        setSelectedCourse(course);
        
        // Join the session via Socket.IO
        socketRef.current.emit('student:join-session', {
          sessionId: response.data.sessionId,
          studentId: studentData?.studentId,
          studentName: `${studentData?.firstName} ${studentData?.lastName}`
        });
        
        setShowLiveClassModal(true);
        setIsLiveActive(true);
        setConnectionStatus("connecting");
      } else {
        showTemporaryNotification("No active live session for this course", "error");
      }
    } catch (error) {
      console.error('Error joining live class:', error);
      showTemporaryNotification("Failed to join live session", "error");
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Leave Live Class
  const leaveLiveClass = () => {
    if (socketRef.current && selectedCourse?.sessionId) {
      socketRef.current.emit('student:leave-session', {
        sessionId: selectedCourse.sessionId
      });
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    setRemoteStream(null);
    setIsLiveActive(false);
    setShowLiveClassModal(false);
    setChatMessages([]);
    setParticipantCount(0);
    setConnectionStatus("disconnected");
  };
  
  // Send Chat Message
  const sendChatMessage = () => {
    if (!newMessage.trim() || !selectedCourse?.sessionId) return;
    
    const messageData = {
      sessionId: selectedCourse.sessionId,
      message: newMessage,
      isTeacher: false
    };
    
    socketRef.current.emit('chat:message', messageData);
    setNewMessage("");
  };
  
  // Video Controls
  const togglePlayPause = () => {
    if (remoteVideoRef.current) {
      if (isPlaying) {
        remoteVideoRef.current.pause();
      } else {
        remoteVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };
  
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    setControlsTimeout(timeout);
  };
  
  // Fetch courses from server
  const fetchCoursesFromServer = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://nicmauricebackend-production.up.railway.app/registrar/courses",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.statusText !== "OK") {
        throw new Error(response.message || "Failed to fetch courses");
      }

      setAvailableCourses(response.data.courses);
    } catch (err) {
      setError("Failed to load courses. Please try again.");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Check live status for enrolled courses
  const checkCourseLiveStatus = async (course) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://nicmauricebackend-production.up.railway.app/api/live/course/${course._id || course.id}/active`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.isLive) {
        joinLiveClass(course);
      } else {
        showTemporaryNotification("No active live session for this course", "info");
      }
    } catch (error) {
      console.error('Error checking live status:', error);
      showTemporaryNotification("Failed to check live status", "error");
    }
  };
  
  // Temporary notification
  const [tempNotification, setTempNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showTemporaryNotification = (message, type = "success") => {
    setTempNotification({ show: true, message, type });
    setTimeout(
      () => setTempNotification({ show: false, message: "", type: "" }),
      3000,
    );
  };

  useEffect(() => {
    // Get student info from cookies
    const userData = Cookies.get("data");
    if (userData) {
      try {
        setStudentData(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing student data:", error);
      }
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("dashboardSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }

    // Initialize Socket.IO connection
    initSocketConnection();

    const fetchEnrolledCourses = async () => {
      const token = Cookies.get("token");
      const userData = Cookies.get("data");
      const parsedUserData = userData ? JSON.parse(userData) : null;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://nicmauricebackend-production.up.railway.app/registrar/student/${parsedUserData?.studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.statusText !== "OK") {
          throw new Error(response.message || "Failed to fetch enrolled courses");
        }

        setRegisteredCourses(response.data.enrollments);
      } catch (error) {
        console.error("Fetch Enrollments Error:", error);
        setError("Unable to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
    
    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
  }, [settings]);

  // Fetch courses when modal opens
  useEffect(() => {
    if (showRegisterModal && registrationStep === 1) {
      fetchCoursesFromServer();
    }
  }, [showRegisterModal, registrationStep]);

  // Pulsing notification effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update cart total when selected courses change
  useEffect(() => {
    const total = selectedCourses.reduce(
      (sum, course) => sum + (course.units || course.credits || 0) * 500,
      0,
    );
    setCartTotal(total);
  }, [selectedCourses]);

  // Quick Actions Data
  const quickActionsData = {
    "course-materials": {
      title: "Course Materials",
      icon: <FaBookOpen />,
      color: "from-blue-500 to-blue-600",
      description: "Access lectures, notes, and learning resources",
      content: {
        recent: [
          {
            name: "Cardiovascular System Lecture",
            type: "PDF",
            size: "4.2 MB",
            date: "Nov 10, 2024",
            downloaded: true,
          },
          {
            name: "Respiratory System Video",
            type: "Video",
            size: "125 MB",
            date: "Nov 8, 2024",
            duration: "45:22",
          },
          {
            name: "Muscular System Slides",
            type: "PPT",
            size: "8.7 MB",
            date: "Nov 5, 2024",
            downloaded: true,
          },
        ],
        courses: [
          {
            code: "NURS301",
            name: "Clinical Nursing",
            materials: 24,
            updated: "Today",
          },
          {
            code: "NURS302",
            name: "Pharmacology",
            materials: 18,
            updated: "2 days ago",
          },
        ],
        stats: { total: 42, downloaded: 32, size: "4.2 GB" },
      },
    },
    "class-schedule": {
      title: "Class Schedule",
      icon: <FaCalendarCheck />,
      color: "from-purple-500 to-purple-600",
      description: "View timetable and upcoming classes",
      content: {
        today: [
          {
            time: "9:00 AM",
            course: "Clinical Nursing",
            type: "Lecture",
            room: "LH-301",
          },
          {
            time: "11:00 AM",
            course: "Pharmacology",
            type: "Lab",
            room: "LAB-205",
          },
        ],
        upcoming: [
          {
            day: "Tomorrow",
            event: "Midterm Exam",
            course: "Pathophysiology",
            time: "9:00 AM",
          },
          {
            day: "Nov 18",
            event: "Clinical Rotation",
            course: "Pediatric Nursing",
            time: "7:00 AM",
          },
        ],
      },
    },
    "tuition-fees": {
      title: "Tuition & Fees",
      icon: <FaMoneyBillWave />,
      color: "from-rose-500 to-rose-600",
      description: "View balance and make payments",
      content: {
        balance: "$12,450.00",
        dueDate: "Dec 15, 2024",
        breakdown: [
          { item: "Tuition", amount: "$10,000.00" },
          { item: "Lab Fees", amount: "$1,200.00" },
          { item: "Technology Fee", amount: "$250.00" },
        ],
      },
    },
    "grades-progress": {
      title: "Grades & Progress",
      icon: <FaChartBar />,
      color: "from-emerald-500 to-emerald-600",
      description: "Track your academic performance",
      content: {
        overall: { gpa: "3.78", average: "92.4%", trend: "up" },
        courses: [
          { name: "Clinical Nursing", grade: "A", score: 94.2, progress: 90 },
          { name: "Pharmacology", grade: "B+", score: 85.7, progress: 72 },
        ],
      },
    },
    assignments: {
      title: "Assignments",
      icon: <FaTasks />,
      color: "from-amber-500 to-amber-600",
      description: "Submit and track assignments",
      content: {
        pending: [
          {
            title: "Clinical Case Study",
            course: "NURS301",
            due: "Tomorrow",
            points: 100,
          },
          {
            title: "Pharmacology Drug Cards",
            course: "NURS302",
            due: "Nov 12",
            points: 50,
          },
        ],
        submitted: [
          {
            title: "Clinical Skills Video",
            course: "NURS301",
            submitted: "Nov 9",
            grade: "142/150",
          },
        ],
      },
    },
    "student-community": {
      title: "Student Community",
      icon: <FaUserFriends />,
      color: "from-indigo-500 to-indigo-600",
      description: "Connect with classmates",
      content: {
        activeGroups: [
          {
            name: "Clinical Practice Study Group",
            members: 18,
            lastActive: "2 hours ago",
          },
          {
            name: "Pharmacology Discussion",
            members: 12,
            lastActive: "Yesterday",
          },
        ],
        recentDiscussions: [
          {
            topic: "Clinical Rotation Tips",
            replies: 42,
            lastPost: "2 hours ago",
          },
          {
            topic: "Pharmacology Study Guide",
            replies: 28,
            lastPost: "1 day ago",
          },
        ],
      },
    },
  };

  const handleQuickActionClick = (actionId) => {
    setActiveQuickAction(actionId);
    setShowActionPanel(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("data");
    localStorage.removeItem("dashboardSettings");
    navigate("/academy/login");
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Course registration functions
  const handleRegisterCourses = () => {
    setSelectedCourses([]);
    setRegistrationStep(1);
    setSearchTerm("");
    setFilterDepartment("all");
    setFilterLevel("all");
    setShowRegisterModal(true);
  };

  const handleToggleCourseSelection = (course) => {
    if (selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      if (selectedCourses.length < 6) {
        setSelectedCourses([...selectedCourses, course]);
      }
    }
  };

  const handleConfirmRegistration = async () => {
    const token = Cookies.get("token");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://nicmauricebackend-production.up.railway.app/registrar/course/enroll",
        { courseId: selectedCourses[0]._id, studentId: studentData.studentId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status !== 200) {
        throw new Error(response.message || "Enrollment failed");
      }

      setRegistrationStep(3);
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegistrationStep(1);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Enrollment Error:", error);
      showTemporaryNotification("Enrollment failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search and filters
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      (course.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.title || course.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (course.lecturer || course.instructor || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || course.department === filterDepartment;
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const dashboardFeatures = [
    {
      id: "course-materials",
      icon: <FaBookOpen />,
      title: "Course Materials",
      desc: "Access lectures, notes & resources",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "class-schedule",
      icon: <FaCalendarCheck />,
      title: "Class Schedule",
      desc: "View your timetable & events",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "tuition-fees",
      icon: <FaMoneyBillWave />,
      title: "Tuition & Fees",
      desc: "View balance & make payments",
      color: "from-rose-500 to-rose-600",
    },
    {
      id: "grades-progress",
      icon: <FaChartBar />,
      title: "Grades & Progress",
      desc: "Track your academic performance",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "assignments",
      icon: <FaTasks />,
      title: "Assignments",
      desc: "Submit & track assignments",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "student-community",
      icon: <FaUserFriends />,
      title: "Student Community",
      desc: "Connect with classmates",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const currentAction = activeQuickAction
    ? quickActionsData[activeQuickAction]
    : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        settings.darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"
      }`}
    >
      {/* Temporary Notification */}
      <AnimatePresence>
        {tempNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              tempNotification.type === "success"
                ? "bg-green-500 text-white"
                : tempNotification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {tempNotification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Class Modal */}
      <AnimatePresence>
        {showLiveClassModal && isLiveActive && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/90"
              onClick={leaveLiveClass}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex flex-col bg-gray-900"
            >
              {/* Live Class Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Live Class: {selectedCourse?.code} - {selectedCourse?.title || selectedCourse?.name}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {connectionStatus === "connecting" && "Connecting to live session..."}
                    {connectionStatus === "connected" && "Connected to live session"}
                    {connectionStatus === "error" && "Connection error"}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm">LIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers />
                    <span>{participantCount} participants</span>
                  </div>
                  <button
                    onClick={leaveLiveClass}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Leave Session
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Video Area */}
                <div className={`flex-1 ${showChat ? 'mr-80' : ''} relative bg-black`}>
                  {connectionStatus === "connecting" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaSpinner className="text-4xl text-white animate-spin" />
                      <p className="text-white ml-3">Connecting to live session...</p>
                    </div>
                  )}
                  
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setShowControls(true)}
                  />
                  
                  {/* Teacher Status Indicators */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {!teacherVideoEnabled && (
                      <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                        <FaVideoSlash className="mr-1" /> Video Off
                      </div>
                    )}
                    {!teacherAudioEnabled && (
                      <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                        <FaMicrophoneSlash className="mr-1" /> Muted
                      </div>
                    )}
                    {isScreenSharing && (
                      <div className="bg-green-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                        <FaDesktop className="mr-1" /> Screen Sharing
                      </div>
                    )}
                  </div>
                  
                  {/* Video Controls */}
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={togglePlayPause}
                        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        {isPlaying ? <FaPauseCircle className="text-2xl" /> : <FaPlayCircle className="text-2xl" />}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <button
                        onClick={() => setShowChat(!showChat)}
                        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <FaComments />
                      </button>
                      
                      <button
                        onClick={handleFullscreen}
                        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <FaExpand />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                {showChat && (
                  <div className="w-80 bg-gray-800 flex flex-col border-l border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <h3 className="text-white font-bold">Class Chat</h3>
                      <p className="text-gray-400 text-sm">Live discussion</p>
                    </div>
                    
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3"
                    >
                      {chatMessages.map((msg, index) => (
                        <div
                          key={msg.id || index}
                          className={`flex flex-col ${msg.isTeacher ? 'items-start' : 'items-end'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.isTeacher
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-gray-200'
                            }`}
                          >
                            <p className="text-xs text-gray-300 mb-1">{msg.sender}</p>
                            <p>{msg.message}</p>
                            <p className="text-xs mt-1 opacity-75">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-gray-700">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                          placeholder="Ask a question..."
                          className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={sendChatMessage}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          <FaSend />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6">
        {/* Top Navigation */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-20 ${settings.darkMode ? "opacity-30" : ""}`}
                />
                <FaGraduationCap
                  className={`text-4xl ${settings.darkMode ? "text-blue-400" : "text-blue-600"} relative z-10`}
                />
              </div>
              <div>
                <h1
                  className={`text-3xl font-bold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Student Dashboard
                </h1>
                <p
                  className={
                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Welcome back to your nursing education portal
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors relative ${settings.darkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <FaCog
                className={`text-xl ${showSettings ? "rotate-90 transition-transform" : ""}`}
              />
              {showSettings && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>

            <button
              className={`p-2 rounded-lg transition-colors relative ${settings.darkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : "hover:bg-gray-100 text-gray-600"}`}
            >
              <FaBell
                className={`text-xl ${pulse ? "animate-pulse text-yellow-500" : ""}`}
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative group">
              <div
                className={`flex items-center space-x-3 cursor-pointer ${settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} p-2 rounded-lg transition-colors`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {studentData?.firstName
                    ? studentData.firstName.charAt(0)
                    : "JS"}
                </div>
                <div className="hidden lg:block">
                  <p
                    className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {studentData?.firstName && studentData?.lastName
                      ? `${studentData.firstName} ${studentData.lastName}`
                      : "John Smith"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {studentData?.program || "BSN Student"}
                    </p>
                    {studentData?.studentId && (
                      <>
                        <span
                          className={
                            settings.darkMode
                              ? "text-gray-600"
                              : "text-gray-300"
                          }
                        >
                          •
                        </span>
                        <p
                          className={`text-sm font-mono ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          ID: {studentData.studentId}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg flex items-center"
                >
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-6 rounded-2xl shadow-lg ${settings.darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-bold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Dashboard Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-2 rounded-lg ${settings.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`p-4 rounded-xl ${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {settings.darkMode ? (
                        <FaMoon className="text-blue-400 mr-3" />
                      ) : (
                        <FaSun className="text-yellow-500 mr-3" />
                      )}
                      <span
                        className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-700"}`}
                      >
                        Dark Mode
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange("darkMode", !settings.darkMode)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.darkMode ? "bg-blue-600" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.darkMode ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl ${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {settings.notifications ? (
                        <FaBell className="text-blue-400 mr-3" />
                      ) : (
                        <FaBellSlash className="text-gray-400 mr-3" />
                      )}
                      <span
                        className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-700"}`}
                      >
                        Notifications
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "notifications",
                          !settings.notifications,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications ? "bg-blue-600" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl ${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center">
                    <FaLanguage
                      className={`mr-3 ${settings.darkMode ? "text-blue-400" : "text-blue-600"}`}
                    />
                    <span
                      className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-700"}`}
                    >
                      Language
                    </span>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                    className={`mt-2 w-full p-2 rounded-lg ${settings.darkMode ? "bg-gray-600 text-white border-gray-500" : "bg-white text-gray-700 border-gray-300"} border`}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div
                  className={`p-4 rounded-xl ${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaShieldAlt
                        className={`mr-3 ${settings.privacyMode ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span
                        className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-700"}`}
                      >
                        Privacy Mode
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleSettingChange(
                          "privacyMode",
                          !settings.privacyMode,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.privacyMode ? "bg-green-600" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.privacyMode ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <>
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 bg-black/50"
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
                    Are you sure you want to logout from your student dashboard?
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                    >
                      Yes, Logout
                    </button>
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Course Registration Modal */}
        <AnimatePresence>
          {showRegisterModal && (
            <>
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowRegisterModal(false)}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {registrationStep === 1 && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            Course Registration
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Select courses for the {new Date().getFullYear()}{" "}
                            academic year
                          </p>
                        </div>
                        <button
                          onClick={() => setShowRegisterModal(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <FaTimes className="text-gray-500 text-xl" />
                        </button>
                      </div>

                      {/* Search and Filters */}
                      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search by course code, name, or instructor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <select
                          value={filterDepartment}
                          onChange={(e) => setFilterDepartment(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Departments</option>
                          <option value="Nursing">Nursing</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Pharmacy">Pharmacy</option>
                        </select>
                        <select
                          value={filterLevel}
                          onChange={(e) => setFilterLevel(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Levels</option>
                          <option value="100">100 Level</option>
                          <option value="200">200 Level</option>
                          <option value="300">300 Level</option>
                          <option value="400">400 Level</option>
                          <option value="500">500 Level</option>
                        </select>
                      </div>

                      {/* Course Selection Summary Bar */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center space-x-6">
                            <div>
                              <span className="text-sm text-gray-600">
                                Selected Courses:
                              </span>
                              <span className="ml-2 font-bold text-blue-600 text-lg">
                                {selectedCourses.length}/6
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">
                                Total Credits:
                              </span>
                              <span className="ml-2 font-bold text-blue-600 text-lg">
                                {selectedCourses.reduce(
                                  (sum, c) => sum + (c.units || c.credits || 0),
                                  0,
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">
                                Estimated Tuition:
                              </span>
                              <span className="ml-2 font-bold text-green-600 text-lg">
                                ${cartTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {selectedCourses.length > 0 && (
                            <motion.button
                              onClick={() => setRegistrationStep(2)}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Review & Confirm ({selectedCourses.length})
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Loading State */}
                      {loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
                          <p className="text-gray-600">
                            Fetching available courses from server...
                          </p>
                        </div>
                      )}

                      {/* Error State */}
                      {error && !loading && (
                        <div className="flex flex-col items-center justify-center py-12">
                          <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
                          <p className="text-red-600 mb-4">{error}</p>
                          <button
                            onClick={fetchCoursesFromServer}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Try Again
                          </button>
                        </div>
                      )}

                      {/* Course List */}
                      {!loading && !error && (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                          {filteredCourses.length === 0 && (
                            <div className="text-center py-12">
                              <FaBook className="text-4xl text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600">
                                No courses found matching your criteria.
                              </p>
                            </div>
                          )}
                          {filteredCourses.map((course) => {
                            const isSelected = selectedCourses.find(
                              (c) => c.id === course.id,
                            );
                            const isFull =
                              (course.enrolled || 0) >= (course.capacity || 0);
                            return (
                              <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`border rounded-lg p-4 transition-all ${
                                  isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                                } ${isFull ? "opacity-60" : ""}`}
                              >
                                <div className="flex flex-col lg:flex-row justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2 mb-2">
                                      <h3 className="font-bold text-gray-900 text-lg">
                                        {course.code}
                                      </h3>
                                      <span className="text-gray-400">•</span>
                                      <span className="text-gray-700">
                                        {course.title || course.name}
                                      </span>
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          (course.units || course.credits) === 4
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                      >
                                        {course.units || course.credits} Credits
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                      <div className="flex items-center text-gray-600">
                                        <FaChalkboardTeacher className="mr-2 text-gray-400" />
                                        <span>
                                          {course.lecturer || course.instructor}
                                        </span>
                                      </div>
                                      <div className="flex items-center text-gray-600">
                                        <FaRegClock className="mr-2 text-gray-400" />
                                        <span>{course.schedule}</span>
                                      </div>
                                      <div className="flex items-center text-gray-600">
                                        <FaUsers className="mr-2 text-gray-400" />
                                        <span>
                                          Seats:{" "}
                                          {(course.capacity || 0) -
                                            (course.enrolled || 0)}{" "}
                                          / {course.capacity || 0} available
                                        </span>
                                      </div>
                                      <div className="flex items-center text-gray-600">
                                        <FaCalendarCheck className="mr-2 text-gray-400" />
                                        <span>{course.semester}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end justify-between gap-2">
                                    <button
                                      onClick={() =>
                                        !isFull &&
                                        handleToggleCourseSelection(course)
                                      }
                                      disabled={isFull}
                                      className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                                        isSelected
                                          ? "bg-red-500 text-white hover:bg-red-600"
                                          : isFull
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                      }`}
                                    >
                                      {isSelected
                                        ? "Remove"
                                        : isFull
                                          ? "Full"
                                          : "Select Course"}
                                    </button>
                                    
                                    {isFull && (
                                      <p className="text-xs text-red-500 mt-2">
                                        Waitlist Available
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {registrationStep === 2 && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            Confirm Registration
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Review your course selection before submitting
                          </p>
                        </div>
                        <button
                          onClick={() => setRegistrationStep(1)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <FaTimes className="text-gray-500 text-xl" />
                        </button>
                      </div>

                      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
                        {selectedCourses.map((course) => (
                          <div
                            key={course.id}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-bold text-gray-900">
                                    {course.code}
                                  </h3>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-gray-700">
                                    {course.title || course.name}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-gray-600">
                                    <span className="font-medium">
                                      Credits:
                                    </span>{" "}
                                    {course.units || course.credits}
                                  </div>
                                  <div className="text-gray-600">
                                    <span className="font-medium">
                                      Instructor:
                                    </span>{" "}
                                    {course.lecturer || course.instructor}
                                  </div>
                                  <div className="text-gray-600 col-span-2">
                                    <span className="font-medium">
                                      Schedule:
                                    </span>{" "}
                                    {course.schedule}
                                  </div>
                                  <div className="text-gray-600">
                                    <span className="font-medium">Room:</span>{" "}
                                    {course.room || "TBD"}
                                  </div>
                                </div>
                              </div>
                              <FaCheckCircle className="text-green-500 text-xl" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="font-bold text-gray-900 mb-3">
                          Registration Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Courses:
                            </span>
                            <span className="font-medium">
                              {selectedCourses.length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Credits:
                            </span>
                            <span className="font-medium">
                              {selectedCourses.reduce(
                                (sum, c) => sum + (c.units || c.credits || 0),
                                0,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tuition Fee:</span>
                            <span className="font-medium">
                              ${cartTotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Lab & Technology Fee:
                            </span>
                            <span className="font-medium">$450.00</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-yellow-300">
                            <span className="font-bold text-gray-900">
                              Total Due:
                            </span>
                            <span className="font-bold text-green-600">
                              ${(cartTotal + 450).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Note:</span> By
                          confirming this registration, you agree to the
                          academic policies and financial obligations of the
                          university. Registration fees will be added to your
                          student account.
                        </p>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          onClick={() => setRegistrationStep(1)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirmRegistration}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                        >
                          {loading ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaCheckCircle />
                          )}
                          Confirm Registration
                        </button>
                      </div>
                    </div>
                  )}

                  {registrationStep === 3 && (
                    <div className="p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaCheckCircle className="text-green-600 text-4xl" />
                        </div>
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Registration Successful!
                      </h2>
                      <p className="text-gray-600 mb-2">
                        You have successfully registered for{" "}
                        {selectedCourses.length} course(s).
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  bg: settings.darkMode
                    ? "from-blue-600 to-blue-700"
                    : "from-blue-500 to-blue-600",
                  icon: <FaChartLine />,
                  label: "Average Grade",
                  value: "92.4%",
                  trend: "↑ 2.1%",
                },
                {
                  bg: settings.darkMode
                    ? "from-purple-600 to-purple-700"
                    : "from-purple-500 to-purple-600",
                  icon: <FaBook />,
                  label: "Active Courses",
                  value: registeredCourses.length.toString(),
                  trend: `${registeredCourses.length} courses enrolled`,
                },
                {
                  bg: settings.darkMode
                    ? "from-emerald-600 to-emerald-700"
                    : "from-emerald-500 to-emerald-600",
                  icon: <FaClipboardList />,
                  label: "Pending Tasks",
                  value: "3",
                  trend: "Due within 7 days",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 text-white shadow-lg`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-4xl font-bold mt-2">{stat.value}</p>
                      <p className="text-white/70 text-sm mt-1">{stat.trend}</p>
                    </div>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div
              className={`rounded-2xl shadow-lg p-6 border ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-bold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Quick Actions
                </h2>
                <motion.button
                  onClick={handleRegisterCourses}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlusCircle className="text-lg" />
                  <span>Register Courses</span>
                </motion.button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboardFeatures.map((feature) => (
                  <motion.button
                    key={feature.id}
                    onClick={() => handleQuickActionClick(feature.id)}
                    className={`rounded-xl border transition-all group text-left ${settings.darkMode ? "bg-gray-700/50 border-gray-600 hover:shadow-xl hover:shadow-blue-900/20" : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-xl"}`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white mr-3`}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <h3
                            className={`font-semibold ${settings.darkMode ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"} transition-colors`}
                          >
                            {feature.title}
                          </h3>
                          <p
                            className={`text-xs mt-1 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-blue-500 text-sm">
                        <span>Quick View</span>
                        <FaArrowRight className="ml-2 text-xs" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Courses Progress */}
            <div
              className={`rounded-2xl shadow-lg p-6 border ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${settings.darkMode ? "text-white" : "text-gray-900"}`}
              >
                Currently Enrolled Courses
              </h2>
              <div className="space-y-6">
                {registeredCourses.map((course, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 ${settings.darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"} rounded-lg flex items-center justify-center`}
                      >
                        <FaBookOpen />
                      </div>
                      <div>
                        <div
                          className={`font-bold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {course.code}
                        </div>
                        <div
                          className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {course.name}
                        </div>
                        <div
                          className={`text-xs mt-1 ${settings.darkMode ? "text-gray-500" : "text-gray-500"}`}
                        >
                          Instructor: {course.lecturer}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {course.grade === "In Progress" ? "75%" : course.grade}
                      </div>
                      <div
                        className={`w-32 h-2 ${settings.darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden mt-2`}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      {/* Live Status Button for Enrolled Courses */}
                      <button
                        onClick={() => checkCourseLiveStatus(course)}
                        disabled={isConnecting}
                        className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
                      >
                        {isConnecting ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaVideo />
                        )}
                        Join Live
                      </button>
                    </div>
                  </div>
                ))}
                {registeredCourses.length === 0 && (
                  <div className="text-center py-8">
                    <FaBook className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No courses registered yet.</p>
                    <button
                      onClick={handleRegisterCourses}
                      className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Register for courses →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div
              className={`rounded-2xl shadow-lg p-6 border ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-bold flex items-center ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                >
                  <FaCalendarDay className="mr-2 text-red-500" /> Upcoming
                  Deadlines
                </h2>
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Calendar
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Midterm Exam",
                    course: "Pathophysiology",
                    date: "Nov 15, 2024",
                    time: "9:00 AM",
                    type: "exam",
                  },
                  {
                    title: "Clinical Rotation",
                    course: "Pediatric Nursing",
                    date: "Nov 18-22, 2024",
                    time: "7:00 AM",
                    type: "clinical",
                  },
                  {
                    title: "Research Paper Due",
                    course: "Nursing Research",
                    date: "Nov 25, 2024",
                    time: "11:59 PM",
                    type: "assignment",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 ${settings.darkMode ? "border-blue-500 bg-gray-700/50" : "border-blue-500 bg-blue-50/50"} rounded-r-lg`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {event.title}
                        </h3>
                        <p
                          className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {event.course}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${event.type === "exam" ? "bg-red-100 text-red-800" : event.type === "clinical" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <div
                      className={`flex items-center text-sm mt-2 ${settings.darkMode ? "text-gray-500" : "text-gray-500"}`}
                    >
                      <FaRegClock className="mr-2" /> {event.date} • {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={`rounded-2xl shadow-lg p-6 border ${settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            >
              <h2
                className={`text-xl font-bold mb-6 ${settings.darkMode ? "text-white" : "text-gray-900"}`}
              >
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    time: "10 min ago",
                    action: "Submitted Anatomy Lab Report",
                    course: "Anatomy & Physiology",
                    icon: <FaClipboardList />,
                  },
                  {
                    time: "2 hours ago",
                    action: "Joined Clinical Discussion",
                    course: "Clinical Nursing",
                    icon: <FaComments />,
                  },
                  {
                    time: "Yesterday",
                    action: "Completed Pharmacology Quiz",
                    course: "Pharmacology",
                    icon: <FaTasks />,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <div
                      className={`p-2 ${settings.darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-50 text-blue-600"} rounded-lg`}
                    >
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {activity.action}
                      </p>
                      <p
                        className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {activity.course}
                      </p>
                      <p
                        className={`text-xs mt-1 ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold mb-3">
                Need Academic Support?
              </h2>
              <p className="text-blue-100">
                Our nursing faculty and support staff are here to help you
                succeed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Schedule Appointment
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                Join Study Group
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Detail Panel */}
      <AnimatePresence>
        {showActionPanel && currentAction && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setShowActionPanel(false)}
            />
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-y-0 right-0 w-full lg:w-1/3 z-50 shadow-2xl overflow-y-auto ${settings.darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="h-full flex flex-col">
                <div
                  className={`p-6 bg-gradient-to-r ${currentAction.color} text-white`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className="p-3 bg-white/20 rounded-xl mr-4">
                          {currentAction.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">
                            {currentAction.title}
                          </h2>
                          <p className="text-white/90 mt-1">
                            {currentAction.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowActionPanel(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>
                <div
                  className={`flex-1 p-6 overflow-y-auto ${settings.darkMode ? "text-gray-300" : ""}`}
                >
                  {activeQuickAction === "course-materials" && (
                    <div className="space-y-6">
                      <div>
                        <h3
                          className={`text-lg font-bold mb-3 ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          Recent Materials
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.recent.map(
                            (material, index) => (
                              <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-lg ${settings.darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`p-2 rounded-lg mr-3 ${settings.darkMode ? "bg-gray-600" : "bg-white"}`}
                                  >
                                    {material.type === "PDF" ? (
                                      <FaFilePdf className="text-red-500" />
                                    ) : material.type === "Video" ? (
                                      <FaVideo className="text-purple-500" />
                                    ) : (
                                      <FaFilePdf className="text-blue-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div
                                      className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {material.name}
                                    </div>
                                    <div
                                      className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      {material.type} • {material.size}
                                    </div>
                                  </div>
                                </div>
                                {material.downloaded && (
                                  <FaCheckCircle className="text-green-500" />
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`p-6 border-t ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Open Full View
                    </button>
                    <button
                      onClick={() => setShowActionPanel(false)}
                      className={`px-4 py-2 border rounded-lg font-medium ${settings.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalDashboard;