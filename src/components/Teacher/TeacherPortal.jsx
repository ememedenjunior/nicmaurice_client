import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaArrowRight,
  FaCog,
  FaBook,
  FaClipboardList,
  FaBookOpen,
  FaChartBar,
  FaComments,
  FaTasks,
  FaChevronRight,
  FaClock,
  FaCalendarDay,
  FaDownload,
  FaVideo,
  FaFilePdf,
  FaTimes,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaLanguage,
  FaBellSlash,
  FaShieldAlt,
  FaQuestionCircle,
  FaInfoCircle,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
  FaFileSignature,
  FaRegCalendarAlt,
  FaExclamationTriangle,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaDesktop,
  FaStop,
  FaUsers,
  FaRecordVinyl,
  FaSpinner,
} from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [teacherData, setTeacherData] = useState(null);
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "en",
    privacyMode: false,
  });
  const [pulse, setPulse] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);

  // Live Class States
  const [showLiveClassModal, setShowLiveClassModal] = useState(false);
  const [selectedCourseForLive, setSelectedCourseForLive] = useState(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [stream, setStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [liveSessionId, setLiveSessionId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isStarting, setIsStarting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  
  // Refs
  const localVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionsRef = useRef(new Map());

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
    socketRef.current.on('teacher:student-joined', handleStudentJoined);
    socketRef.current.on('teacher:student-left', handleStudentLeft);
    
    // Chat Handlers
    socketRef.current.on('chat:new-message', handleNewChatMessage);
  };

  // WebRTC Handlers
  const handleWebRTCOffer = async (data) => {
    const { from, offer } = data;
    
    try {
      const pc = new RTCPeerConnection(configuration);
      peerConnectionsRef.current.set(from, pc);
      
      // Add local stream tracks
      if (stream) {
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });
      }
      
      pc.ontrack = (event) => {
        console.log('Track received from student:', event.streams[0]);
      };
      
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('webrtc:ice-candidate', {
            sessionId: liveSessionId,
            targetUserId: from,
            candidate: event.candidate
          });
        }
      };
      
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socketRef.current.emit('webrtc:answer', {
        sessionId: liveSessionId,
        targetUserId: from,
        answer
      });
    } catch (error) {
      console.error('Error handling WebRTC offer:', error);
    }
  };
  
  const handleWebRTCAnswer = async (data) => {
    const { from, answer } = data;
    const pc = peerConnectionsRef.current.get(from);
    
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };
  
  const handleICECandidate = async (data) => {
    const { from, candidate } = data;
    const pc = peerConnectionsRef.current.get(from);
    
    if (pc && candidate) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };
  
  // Session Handlers
  const handleStudentJoined = (data) => {
    console.log('Student joined:', data);
    setParticipantCount(data.totalStudents);
    showTemporaryNotification(`${data.studentName} joined the class`, "success");
  };
  
  const handleStudentLeft = (data) => {
    console.log('Student left:', data);
    setParticipantCount(data.totalStudents);
    showTemporaryNotification(`${data.studentName} left the class`, "info");
    
    // Close peer connection for this student
    const pc = peerConnectionsRef.current.get(data.studentId);
    if (pc) {
      pc.close();
      peerConnectionsRef.current.delete(data.studentId);
    }
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
  
  // Broadcast teacher status to all students
  const broadcastTeacherStatus = () => {
    if (liveSessionId && socketRef.current) {
      socketRef.current.emit('teacher:toggle-video', {
        sessionId: liveSessionId,
        enabled: isVideoEnabled
      });
      
      socketRef.current.emit('teacher:toggle-audio', {
        sessionId: liveSessionId,
        enabled: isAudioEnabled
      });
    }
  };
  
  // Start Live Class
  const startLiveClass = async (course) => {
    setIsStarting(true);
    setSelectedCourseForLive(course);
    
    try {
      // Initialize camera and microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log(mediaStream)
      
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      
      // Create live session on server
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://nicmauricebackend-production.up.railway.app/api/live/start",
        {
          courseId: course._id || course.id,
          courseCode: course.code,
          courseName: course.title || course.name,
          teacherName: `${teacherData?.firstName} ${teacherData?.lastName}`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setLiveSessionId(response.data.sessionId);
      setIsLiveActive(true);
      setShowLiveClassModal(true);
      setConnectionStatus("active");
      
      showTemporaryNotification("Live class started successfully!", "success");
      
    } catch (error) {
      console.error("Error starting live class:", error);
      showTemporaryNotification("Failed to start live class", "error");
      
      // Clean up stream if failed
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    } finally {
      setIsStarting(false);
    }
  };
  
  // Stop Live Class
  const stopLiveClass = async () => {
    try {
      // Stop all peer connections
      peerConnectionsRef.current.forEach((pc, studentId) => {
        pc.close();
      });
      peerConnectionsRef.current.clear();
      
      // Stop local streams
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        setScreenStream(null);
      }
      
      // Stop recording if active
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
      
      // End session on server
      const token = Cookies.get("token");
      await axios.post(
        "https://nicmauricebackend-production.up.railway.app/api/live/end",
        { sessionId: liveSessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Emit end session via socket
      if (socketRef.current) {
        socketRef.current.emit('teacher:end-session', {
          sessionId: liveSessionId
        });
      }
      
      setIsLiveActive(false);
      setShowLiveClassModal(false);
      setParticipantCount(0);
      setLiveSessionId(null);
      setChatMessages([]);
      setConnectionStatus("disconnected");
      
      showTemporaryNotification("Live class ended", "info");
      
    } catch (error) {
      console.error("Error stopping live class:", error);
      showTemporaryNotification("Error ending live class", "error");
    }
  };
  
  // Toggle Video
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
        broadcastTeacherStatus();
      }
    }
  };
  
  // Toggle Audio
  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
        broadcastTeacherStatus();
      }
    }
  };
  
  // Share Screen
  const shareScreen = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        
        setScreenStream(screenStream);
        setIsScreenSharing(true);
        
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = screenStream;
        }
        
        // Broadcast screen sharing status to students
        if (socketRef.current && liveSessionId) {
          socketRef.current.emit('teacher:screen-share', {
            sessionId: liveSessionId,
            sharing: true,
            streamId: screenStream.id
          });
        }
        
        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenSharing();
        };
      } else {
        stopScreenSharing();
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };
  
  // Stop Screen Sharing
  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
      
      // Broadcast screen sharing stopped to students
      if (socketRef.current && liveSessionId) {
        socketRef.current.emit('teacher:screen-share', {
          sessionId: liveSessionId,
          sharing: false,
          streamId: null
        });
      }
    }
  };
  
  // Start Recording
  const startRecording = () => {
    if (stream) {
      const chunks = [];
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `live-class-${liveSessionId}-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setRecordedChunks([]);
        showTemporaryNotification("Recording saved", "success");
      };
      
      recorder.start(1000);
      setMediaRecorder(recorder);
      setIsRecording(true);
      showTemporaryNotification("Recording started", "success");
    }
  };
  
  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };
  
  // Send Chat Message
  const sendChatMessage = () => {
    if (!newMessage.trim() || !liveSessionId) return;
    
    const messageData = {
      sessionId: liveSessionId,
      message: newMessage,
      isTeacher: true
    };
    
    if (socketRef.current) {
      socketRef.current.emit('chat:message', messageData);
    }
    
    // Add message locally
    const message = {
      id: Date.now(),
      sender: `${teacherData?.firstName} ${teacherData?.lastName}`,
      senderId: teacherData?.facultyId,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      isTeacher: true,
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
    
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };
  
  // Share File
  const shareFile = async (event) => {
    const file = event.target.files[0];
    if (!file || !liveSessionId) return;
    
    // Create file preview URL
    const fileUrl = URL.createObjectURL(file);
    
    const messageData = {
      sessionId: liveSessionId,
      message: `Shared file: ${file.name}`,
      fileUrl: fileUrl,
      fileName: file.name,
      isTeacher: true,
      type: "file"
    };
    
    if (socketRef.current) {
      socketRef.current.emit('chat:message', messageData);
    }
    
    // Add message locally
    const message = {
      id: Date.now(),
      sender: `${teacherData?.firstName} ${teacherData?.lastName}`,
      message: `Shared file: ${file.name}`,
      fileUrl: fileUrl,
      fileName: file.name,
      timestamp: new Date().toLocaleTimeString(),
      type: "file",
      isTeacher: true,
    };
    
    setChatMessages(prev => [...prev, message]);
    fileInputRef.current.value = "";
    
    showTemporaryNotification(`File shared: ${file.name}`, "success");
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

  const fetchCoursesFromServer = async () => {
    const token = Cookies.get("token");

    try {
      const response = await axios.get(
        "https://nicmauricebackend-production.up.railway.app/registrar/courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(response.message || "Failed to fetch courses");
      }

      setAvailableCourses(response.data.courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      showTemporaryNotification("Failed to load courses", "error");
    }
  };

  useEffect(() => {
    // Get teacher info from cookies
    const userData = Cookies.get("teacherData");

    if (userData) {
      try {
        setTeacherData(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing teacher data:", error);
      }
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("teacherDashboardSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }

    // Initialize Socket.IO connection
    initSocketConnection();

    fetchCoursesFromServer();
    
    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      peerConnectionsRef.current.forEach((pc) => pc.close());
    };
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("teacherDashboardSettings", JSON.stringify(settings));
  }, [settings]);

  // Broadcast status when video/audio changes
  useEffect(() => {
    broadcastTeacherStatus();
  }, [isVideoEnabled, isAudioEnabled, liveSessionId]);

  // Quick Actions Data with Detailed Content for Teachers
  const quickActionsData = {
    "my-courses": {
      title: "My Courses",
      icon: <FaBookOpen />,
      color: "from-blue-500 to-blue-600",
      description: "Manage your courses and teaching materials",
      content: {
        active: [
          {
            code: "NURS101",
            name: "Anatomy & Physiology",
            students: 45,
            schedule: "Mon/Wed 9:00 AM",
            room: "LH-301",
            progress: 75,
          },
          {
            code: "NURS201",
            name: "Pharmacology",
            students: 38,
            schedule: "Tue/Thu 11:00 AM",
            room: "LH-205",
            progress: 60,
          },
          {
            code: "NURS301",
            name: "Clinical Nursing",
            students: 32,
            schedule: "Fri 9:00 AM - 4:00 PM",
            room: "Clinical Lab",
            progress: 80,
          },
        ],
        pendingGrading: [
          { course: "NURS101", assignments: 24, dueDate: "Tomorrow" },
          { course: "NURS201", assignments: 18, dueDate: "Nov 15" },
          { course: "NURS301", assignments: 32, dueDate: "Nov 18" },
        ],
        stats: { totalStudents: 115, totalCourses: 3, totalMaterials: 156 },
      },
    },
    "student-assignments": {
      title: "Student Assignments",
      icon: <FaTasks />,
      color: "from-amber-500 to-amber-600",
      description: "Review and grade student submissions",
      content: {
        pending: [
          {
            title: "Cardiovascular Case Study",
            course: "NURS101",
            submissions: 42,
            due: "Tomorrow",
            pendingGrading: 28,
          },
          {
            title: "Pharmacology Drug Cards",
            course: "NURS201",
            submissions: 35,
            due: "Nov 12",
            pendingGrading: 35,
          },
          {
            title: "Clinical Skills Video",
            course: "NURS301",
            submissions: 30,
            due: "Nov 15",
            pendingGrading: 30,
          },
          {
            title: "Research Literature Review",
            course: "NURS401",
            submissions: 25,
            due: "Nov 20",
            pendingGrading: 25,
          },
        ],
        recentGrades: [
          { student: "Emma Watson", assignment: "Anatomy Quiz", grade: "A", date: "Today" },
          { student: "James Brown", assignment: "Drug Cards", grade: "B+", date: "Yesterday" },
          { student: "Sarah Lee", assignment: "Clinical Skills", grade: "A-", date: "2 days ago" },
        ],
      },
    },
    "grade-management": {
      title: "Grade Management",
      icon: <FaChartBar />,
      color: "from-emerald-500 to-emerald-600",
      description: "Manage and submit final grades",
      content: {
        pendingGrades: [
          { course: "NURS101", students: 45, pending: 12, deadline: "Dec 10" },
          { course: "NURS201", students: 38, pending: 8, deadline: "Dec 12" },
          { course: "NURS301", students: 32, pending: 15, deadline: "Dec 15" },
        ],
        submittedGrades: [
          { course: "NURS401", students: 25, submitted: 25, date: "Nov 5" },
        ],
        classAverages: [
          { course: "NURS101", average: "84.5%", highest: "98%", lowest: "62%" },
          { course: "NURS201", average: "79.2%", highest: "95%", lowest: "55%" },
          { course: "NURS301", average: "86.7%", highest: "97%", lowest: "68%" },
        ],
      },
    },
    "attendance": {
      title: "Attendance",
      icon: <FaClipboardCheck />,
      color: "from-purple-500 to-purple-600",
      description: "Track and manage student attendance",
      content: {
        today: [
          { course: "NURS101", present: 42, absent: 3, total: 45, rate: "93%" },
          { course: "NURS201", present: 35, absent: 3, total: 38, rate: "92%" },
          { course: "NURS301", present: 30, absent: 2, total: 32, rate: "94%" },
        ],
        weekly: { average: "92%", trend: "up", change: "+2%" },
        alerts: [
          { student: "Michael Chen", course: "NURS101", absences: 4, status: "Warning" },
          { student: "Lisa Park", course: "NURS201", absences: 3, status: "Notice" },
        ],
      },
    },
    "office-hours": {
      title: "Office Hours",
      icon: <FaRegCalendarAlt />,
      color: "from-indigo-500 to-indigo-600",
      description: "Manage your office hours and student appointments",
      content: {
        schedule: [
          { day: "Monday", time: "2:00 PM - 4:00 PM", location: "Room 405", booked: 3, total: 8 },
          { day: "Wednesday", time: "10:00 AM - 12:00 PM", location: "Online", booked: 5, total: 6 },
          { day: "Friday", time: "1:00 PM - 3:00 PM", location: "Room 405", booked: 2, total: 8 },
        ],
        upcoming: [
          { student: "David Kim", time: "Today 2:30 PM", type: "Grade Review" },
          { student: "Anna Torres", time: "Tomorrow 10:00 AM", type: "Research Discussion" },
          { student: "Ryan Murphy", time: "Nov 15 3:00 PM", type: "Clinical Questions" },
        ],
      },
    },
    "faculty-communications": {
      title: "Faculty Communications",
      icon: <FaComments />,
      color: "from-rose-500 to-rose-600",
      description: "Messages from administration and colleagues",
      content: {
        messages: [
          { from: "Dean's Office", subject: "Faculty Meeting", date: "Today", priority: "high" },
          { from: "Curriculum Committee", subject: "Course Review", date: "Yesterday", priority: "medium" },
          { from: "Clinical Coordinator", subject: "Rotation Schedule", date: "Nov 10", priority: "low" },
        ],
        announcements: [
          { title: "New Grading Policy", date: "Nov 8", read: false },
          { title: "Clinical Site Updates", date: "Nov 5", read: true },
        ],
      },
    },
  };

  const handleQuickActionClick = (actionId) => {
    setActiveQuickAction(actionId);
    setShowActionPanel(true);
  };

  const handleLogout = () => {
    // Clear all cookies
    Cookies.remove("token");
    Cookies.remove("teacherData");
    Cookies.remove("userRole");
    
    // Clear localStorage
    localStorage.removeItem("teacherDashboardSettings");
    
    // Redirect to teacher login page
    navigate("/academy/teacher/login");
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const dashboardFeatures = [
    {
      id: "my-courses",
      icon: <FaBookOpen />,
      title: "My Courses",
      desc: "Manage courses & materials",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "student-assignments",
      icon: <FaTasks />,
      title: "Assignments",
      desc: "Grade student submissions",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "grade-management",
      icon: <FaChartBar />,
      title: "Grade Management",
      desc: "Submit final grades",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "attendance",
      icon: <FaClipboardCheck />,
      title: "Attendance",
      desc: "Track student attendance",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "office-hours",
      icon: <FaRegCalendarAlt />,
      title: "Office Hours",
      desc: "Manage appointments",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "faculty-communications",
      icon: <FaComments />,
      title: "Communications",
      desc: "Faculty messages",
      color: "from-rose-500 to-rose-600",
    },
  ];

  // Animation variants
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

  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  // Pulsing notification effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentAction = activeQuickAction
    ? quickActionsData[activeQuickAction]
    : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"
    }`}>
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
                  className={`absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-20 ${
                    settings.darkMode ? "opacity-30" : ""
                  }`}
                />
                <FaChalkboardTeacher className={`text-4xl ${
                  settings.darkMode ? "text-blue-400" : "text-blue-600"
                } relative z-10`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  settings.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Faculty Dashboard
                </h1>
                <p className={settings.darkMode ? "text-gray-400" : "text-gray-600"}>
                  Welcome back to your teaching portal
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {/* Settings Button */}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors relative ${
                settings.darkMode 
                  ? "hover:bg-gray-700 text-gray-300 hover:text-white" 
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <FaCog className={`text-xl ${showSettings ? "rotate-90 transition-transform" : ""}`} />
              {showSettings && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Bell */}
            <button className={`p-2 rounded-lg transition-colors relative ${
              settings.darkMode 
                ? "hover:bg-gray-700 text-gray-300 hover:text-white" 
                : "hover:bg-gray-100 text-gray-600"
            }`}>
              <FaBell className={`text-xl ${pulse ? "animate-pulse text-yellow-500" : ""}`} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Teacher Profile with Logout Option */}
            <div className="relative group">
              <div className={`flex items-center space-x-3 cursor-pointer ${
                settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } p-2 rounded-lg transition-colors`}>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {teacherData?.firstName ? teacherData.firstName.charAt(0) : "DR"}
                </div>
                <div className="hidden lg:block">
                  <p className={`font-medium ${
                    settings.darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {teacherData?.firstName && teacherData?.lastName 
                      ? `${teacherData.title || "Dr."} ${teacherData.firstName} ${teacherData.lastName}`
                      : "Dr. Sarah Chen"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${
                      settings.darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {teacherData?.department || "Nursing Faculty"}
                    </p>
                    {teacherData?.facultyId && (
                      <>
                        <span className={settings.darkMode ? "text-gray-600" : "text-gray-300"}>•</span>
                        <p className={`text-sm font-mono ${
                          settings.darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          ID: {teacherData.facultyId}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Logout Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg flex items-center"
                >
                  <FaSignOutAlt className="mr-3" />
                  Logout
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
              className={`mb-6 p-6 rounded-2xl shadow-lg ${
                settings.darkMode 
                  ? "bg-gray-800 border border-gray-700" 
                  : "bg-white border border-gray-100"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${
                  settings.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Faculty Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-2 rounded-lg ${
                    settings.darkMode 
                      ? "hover:bg-gray-700 text-gray-400" 
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Dark Mode Toggle */}
                <div className={`p-4 rounded-xl ${
                  settings.darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {settings.darkMode ? <FaMoon className="text-blue-400 mr-3" /> : <FaSun className="text-yellow-500 mr-3" />}
                      <span className={`font-medium ${
                        settings.darkMode ? "text-white" : "text-gray-700"
                      }`}>
                        Dark Mode
                      </span>
                    </div>
                    <button
                      onClick={() => handleSettingChange("darkMode", !settings.darkMode)}
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
                </div>

                {/* Notifications Toggle */}
                <div className={`p-4 rounded-xl ${
                  settings.darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {settings.notifications ? <FaBell className="text-blue-400 mr-3" /> : <FaBellSlash className="text-gray-400 mr-3" />}
                      <span className={`font-medium ${
                        settings.darkMode ? "text-white" : "text-gray-700"
                      }`}>
                        Notifications
                      </span>
                    </div>
                    <button
                      onClick={() => handleSettingChange("notifications", !settings.notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Language Selector */}
                <div className={`p-4 rounded-xl ${
                  settings.darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}>
                  <div className="flex items-center">
                    <FaLanguage className={`mr-3 ${
                      settings.darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                    <span className={`font-medium ${
                      settings.darkMode ? "text-white" : "text-gray-700"
                    }`}>
                      Language
                    </span>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange("language", e.target.value)}
                    className={`mt-2 w-full p-2 rounded-lg ${
                      settings.darkMode 
                        ? "bg-gray-600 text-white border-gray-500" 
                        : "bg-white text-gray-700 border-gray-300"
                    } border`}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                {/* Privacy Mode Toggle */}
                <div className={`p-4 rounded-xl ${
                  settings.darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaShieldAlt className={`mr-3 ${
                        settings.privacyMode ? "text-green-500" : "text-gray-400"
                      }`} />
                      <span className={`font-medium ${
                        settings.darkMode ? "text-white" : "text-gray-700"
                      }`}>
                        Privacy Mode
                      </span>
                    </div>
                    <button
                      onClick={() => handleSettingChange("privacyMode", !settings.privacyMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacyMode ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.privacyMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Help & Support Links */}
              <div className={`mt-4 pt-4 border-t ${
                settings.darkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className="flex space-x-4">
                  <button className={`flex items-center text-sm ${
                    settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}>
                    <FaQuestionCircle className="mr-2" />
                    Faculty Help Center
                  </button>
                  <button className={`flex items-center text-sm ${
                    settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}>
                    <FaInfoCircle className="mr-2" />
                    About
                  </button>
                </div>
              </div>
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
                    <h2 className="text-2xl font-bold">Live Class: {selectedCourseForLive?.code} - {selectedCourseForLive?.title || selectedCourseForLive?.name}</h2>
                    <p className="text-white/80 text-sm">
                      {connectionStatus === "active" ? "Live Session in Progress" : "Starting session..."}
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
                      onClick={stopLiveClass}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FaStop />
                      <span>End Class</span>
                    </button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Video Area */}
                  <div className={`flex-1 ${showChat ? 'mr-80' : ''} relative bg-black`}>
                    {isScreenSharing ? (
                      <video
                        ref={screenVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-contain"
                      />
                    )}
                    
                    {/* Teacher Status Indicators */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {!isVideoEnabled && (
                        <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                          <FaVideoSlash className="mr-1" /> Camera Off
                        </div>
                      )}
                      {!isAudioEnabled && (
                        <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                          <FaMicrophoneSlash className="mr-1" /> Muted
                        </div>
                      )}
                      {isScreenSharing && (
                        <div className="bg-green-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                          <FaDesktop className="mr-1" /> Screen Sharing
                        </div>
                      )}
                      {isRecording && (
                        <div className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center animate-pulse">
                          <FaRecordVinyl className="mr-1" /> Recording
                        </div>
                      )}
                    </div>
                    
                    {/* Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={toggleVideo}
                          className={`p-3 rounded-full transition-colors ${
                            isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                          }`}
                          title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                        >
                          {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                        </button>
                        <button
                          onClick={toggleAudio}
                          className={`p-3 rounded-full transition-colors ${
                            isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                          }`}
                          title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
                        >
                          {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                        </button>
                        <button
                          onClick={shareScreen}
                          className={`p-3 rounded-full transition-colors ${
                            isScreenSharing ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                          title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
                        >
                          <FaDesktop />
                        </button>
                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`p-3 rounded-full transition-colors ${
                            isRecording ? 'bg-red-600 animate-pulse' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                          title={isRecording ? "Stop recording" : "Start recording"}
                        >
                          <FaRecordVinyl />
                        </button>
                        <button
                          onClick={() => setShowChat(!showChat)}
                          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                          title="Toggle chat"
                        >
                          <FaComments />
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
                            className={`flex flex-col ${
                              msg.isTeacher ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.isTeacher
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-200'
                              }`}
                            >
                              {!msg.isTeacher && (
                                <p className="text-xs text-gray-400 mb-1">{msg.sender}</p>
                              )}
                              {msg.type === 'file' ? (
                                <a
                                  href={msg.fileUrl}
                                  download={msg.fileName}
                                  className="text-blue-300 hover:text-blue-200 underline"
                                >
                                  📎 {msg.message}
                                </a>
                              ) : (
                                <p>{msg.message}</p>
                              )}
                              <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
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
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={shareFile}
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRef.current.click()}
                            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            title="Share file"
                          >
                            📎
                          </button>
                          <button
                            onClick={sendChatMessage}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            title="Send message"
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

        {/* Live Class Selection Modal */}
        <AnimatePresence>
          {showLiveClassModal && !isLiveActive && (
            <>
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 bg-black/50"
                onClick={() => !isStarting && setShowLiveClassModal(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl z-50 w-full max-w-md"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isStarting ? (
                      <FaSpinner className="text-blue-600 dark:text-blue-400 text-3xl animate-spin" />
                    ) : (
                      <FaVideo className="text-blue-600 dark:text-blue-400 text-3xl" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {isStarting ? "Starting Live Class..." : "Start Live Class"}
                  </h3>
                  {!isStarting && (
                    <>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        You are about to start a live class for:
                      </p>
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-6">
                        {selectedCourseForLive?.code} - {selectedCourseForLive?.title || selectedCourseForLive?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Your camera and microphone will be used to stream the class to students.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowLiveClassModal(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => startLiveClass(selectedCourseForLive)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Start Class
                        </button>
                      </div>
                    </>
                  )}
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
                    Are you sure you want to logout from your faculty dashboard?
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  bg: settings.darkMode ? "from-blue-600 to-blue-700" : "from-blue-500 to-blue-600",
                  icon: <FaUserGraduate />,
                  label: "Total Students",
                  value: "115",
                  trend: "↑ 8 new this semester",
                },
                {
                  bg: settings.darkMode ? "from-purple-600 to-purple-700" : "from-purple-500 to-purple-600",
                  icon: <FaBook />,
                  label: "Active Courses",
                  value: availableCourses.length.toString(),
                  trend: `${availableCourses.length} courses available`,
                },
                {
                  bg: settings.darkMode ? "from-amber-600 to-amber-700" : "from-amber-500 to-amber-600",
                  icon: <FaClipboardList />,
                  label: "Pending Grades",
                  value: "118",
                  trend: "Need grading",
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
                    <div className="text-3xl opacity-80">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl shadow-lg p-6 border ${
              settings.darkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-100"
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${
                  settings.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Faculty Quick Actions
                </h2>
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All <FaChevronRight className="ml-1" />
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboardFeatures.map((feature, index) => (
                  <motion.button
                    key={feature.id}
                    onClick={() => handleQuickActionClick(feature.id)}
                    className={`rounded-xl border transition-all group text-left ${
                      settings.darkMode
                        ? "bg-gray-700/50 border-gray-600 hover:shadow-xl hover:shadow-blue-900/20"
                        : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:shadow-xl"
                    }`}
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
                          <h3 className={`font-semibold ${
                            settings.darkMode 
                              ? "text-white group-hover:text-blue-400" 
                              : "text-gray-900 group-hover:text-blue-600"
                          } transition-colors`}>
                            {feature.title}
                          </h3>
                          <p className={`text-xs mt-1 ${
                            settings.darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-blue-500 text-sm">
                        <span>Manage</span>
                        <FaArrowRight className="ml-2 text-xs" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Course List with Live Class Button */}
            <div className={`rounded-2xl shadow-lg p-6 border ${
              settings.darkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-100"
            }`}>
              <h2 className={`text-xl font-bold mb-6 ${
                settings.darkMode ? "text-white" : "text-gray-900"
              }`}>
                My Active Courses
              </h2>
              <div className="space-y-6">
                {availableCourses.map((course, index) => (
                  <div
                    key={course._id || index}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${
                        settings.darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                      } rounded-lg flex items-center justify-center`}>
                        <FaBookOpen />
                      </div>
                      <div>
                        <div className={`font-bold ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {course.code}
                        </div>
                        <div className={`text-sm ${
                          settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {course.title || course.name}
                        </div>
                        <div className={`text-xs mt-1 ${
                          settings.darkMode ? "text-gray-500" : "text-gray-500"
                        }`}>
                          {course.enrolledCount || course.enrolled || 0} students • {course.capacity || 100} Capacity
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => startLiveClass(course)}
                        disabled={isStarting}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        {isStarting && selectedCourseForLive?._id === course._id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaVideo />
                        )}
                        <span>Start Live Class</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Pending Grading Alert */}
            <div className={`rounded-2xl shadow-lg p-6 border ${
              settings.darkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-100"
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold flex items-center ${
                  settings.darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <FaExclamationTriangle className="mr-2 text-amber-500" />
                  Pending Grading
                </h2>
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </span>
              </div>
              <div className="space-y-4">
                {quickActionsData["my-courses"].content.pendingGrading.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border-l-4 ${
                      settings.darkMode 
                        ? "border-amber-500 bg-gray-700/50" 
                        : "border-amber-500 bg-amber-50/50"
                    } rounded-r-lg`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {item.course}
                        </h3>
                        <p className={`text-sm ${
                          settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {item.assignments} assignments to grade
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        Due {item.dueDate}
                      </span>
                    </div>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Start Grading →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className={`rounded-2xl shadow-lg p-6 border ${
              settings.darkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-100"
            }`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center ${
                settings.darkMode ? "text-white" : "text-gray-900"
              }`}>
                <FaCalendarDay className="mr-2 text-purple-500" />
                Today's Schedule
              </h2>
              <div className="space-y-4">
                {[
                  {
                    time: "9:00 AM - 10:30 AM",
                    course: "NURS101 - Anatomy",
                    room: "LH-301",
                  },
                  {
                    time: "11:00 AM - 12:30 PM",
                    course: "NURS201 - Pharmacology",
                    room: "LH-205",
                  },
                  {
                    time: "2:00 PM - 4:00 PM",
                    course: "Office Hours",
                    room: "Room 405",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      settings.darkMode ? "bg-gray-700/50" : "bg-purple-50/50"
                    }`}
                  >
                    <div className={`p-2 ${
                      settings.darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"
                    } rounded-lg`}>
                      <FaClock />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        settings.darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {item.time}
                      </p>
                      <p className={`text-sm ${
                        settings.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {item.course}
                      </p>
                      <p className={`text-xs mt-1 ${
                        settings.darkMode ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {item.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Alerts */}
            <div className={`rounded-2xl p-6 border ${
              settings.darkMode
                ? "bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-800"
                : "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
            }`}>
              <h2 className={`text-xl font-bold mb-4 flex items-center ${
                settings.darkMode ? "text-white" : "text-gray-900"
              }`}>
                <FaExclamationTriangle className="mr-2 text-amber-600" />
                Student Alerts
              </h2>
              <div className="space-y-3">
                {[
                  {
                    student: "Michael Chen",
                    issue: "4 absences in NURS101",
                    severity: "high",
                  },
                  {
                    student: "Lisa Park",
                    issue: "Missing assignments",
                    severity: "medium",
                  },
                  {
                    student: "James Wilson",
                    issue: "Low performance",
                    severity: "low",
                  },
                ].map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      settings.darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-amber-50"
                    } transition-colors`}
                  >
                    <div>
                      <p className={`font-medium ${
                        settings.darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {alert.student}
                      </p>
                      <p className={`text-sm ${
                        settings.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {alert.issue}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : alert.severity === "medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Resources */}
            <div className={`rounded-2xl p-6 border ${
              settings.darkMode
                ? "bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-800"
                : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            }`}>
              <h2 className={`text-xl font-bold mb-4 ${
                settings.darkMode ? "text-white" : "text-gray-900"
              }`}>
                Faculty Resources
              </h2>
              <div className="space-y-3">
                {[
                  {
                    icon: <FaFilePdf />,
                    text: "Grading Guidelines",
                    color: "text-red-500",
                  },
                  {
                    icon: <FaVideo />,
                    text: "Teaching Resources",
                    color: "text-purple-500",
                  },
                  {
                    icon: <FaFileSignature />,
                    text: "Syllabus Template",
                    color: "text-green-500",
                  },
                ].map((resource, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors group ${
                      settings.darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`${resource.color} mr-3`}>
                        {resource.icon}
                      </span>
                      <span className={`font-medium ${
                        settings.darkMode ? "text-gray-300" : "text-gray-900"
                      }`}>
                        {resource.text}
                      </span>
                    </div>
                    <FaDownload className={`${
                      settings.darkMode 
                        ? "text-gray-600 group-hover:text-blue-400" 
                        : "text-gray-400 group-hover:text-blue-600"
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Support Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold mb-3">
                Faculty Support & Resources
              </h2>
              <p className="text-blue-100">
                Access teaching resources, attend faculty development sessions, and connect with colleagues.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Faculty Meeting
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                Teaching Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Detail Panel */}
      <AnimatePresence>
        {showActionPanel && currentAction && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40"
              onClick={() => setShowActionPanel(false)}
            />

            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-0 z-40 ${
                settings.darkMode ? "bg-black/70" : "bg-black"
              }`}
              onClick={() => setShowActionPanel(false)}
            />

            {/* Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed inset-y-0 right-0 w-full lg:w-1/3 z-50 shadow-2xl overflow-y-auto ${
                settings.darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="h-full flex flex-col">
                {/* Panel Header */}
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

                {/* Panel Content */}
                <div className={`flex-1 p-6 overflow-y-auto ${
                  settings.darkMode ? "text-gray-300" : ""
                }`}>
                  {activeQuickAction === "my-courses" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Active Courses
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.active.map((course, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-gray-50"
                              }`}
                            >
                              <div>
                                <div className={`font-medium ${
                                  settings.darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {course.code} - {course.name}
                                </div>
                                <div className={`text-sm ${
                                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                  {course.students} students • {course.schedule}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm font-medium ${
                                  settings.darkMode ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  {course.progress}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Pending Grading
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.pendingGrading.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <span className="text-gray-700 dark:text-gray-300">{item.course}</span>
                              <span className="font-medium text-amber-600">
                                {item.assignments} assignments
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuickAction === "student-assignments" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Pending Assignments
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.pending.map((assignment, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-amber-50"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className={`font-medium ${
                                    settings.darkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                    {assignment.title}
                                  </div>
                                  <div className={`text-sm ${
                                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>
                                    {assignment.course}
                                  </div>
                                </div>
                                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                                  {assignment.pendingGrading} to grade
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className={`${
                                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                  Due: {assignment.due}
                                </span>
                                <button className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 text-sm">
                                  Grade
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Recent Grades
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.recentGrades.map((grade, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <div>
                                <div className={`font-medium ${
                                  settings.darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {grade.student}
                                </div>
                                <div className={`text-xs ${
                                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                  {grade.assignment}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold ${
                                  grade.grade.startsWith('A') ? 'text-green-600' : 'text-blue-600'
                                }`}>
                                  {grade.grade}
                                </span>
                                <div className={`text-xs ${
                                  settings.darkMode ? "text-gray-500" : "text-gray-400"
                                }`}>
                                  {grade.date}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuickAction === "grade-management" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Pending Final Grades
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.pendingGrades.map((grade, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-emerald-50"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className={`font-medium ${
                                    settings.darkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                    {grade.course}
                                  </div>
                                  <div className={`text-sm ${
                                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>
                                    {grade.pending} of {grade.students} pending
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-amber-600">
                                  Due {grade.deadline}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Class Averages
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.classAverages.map((avg, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <span className="text-gray-700 dark:text-gray-300">{avg.course}</span>
                              <div className="text-right">
                                <span className="font-medium text-emerald-600 mr-2">{avg.average}</span>
                                <span className="text-xs text-gray-500">
                                  (H:{avg.highest} L:{avg.lowest})
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuickAction === "attendance" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Today's Attendance
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.today.map((att, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-purple-50"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className={`font-medium ${
                                    settings.darkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                    {att.course}
                                  </div>
                                  <div className={`text-sm ${
                                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>
                                    Present: {att.present} • Absent: {att.absent}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-sm font-medium ${
                                  parseInt(att.rate) >= 90 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {att.rate}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Attendance Alerts
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.alerts.map((alert, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <div>
                                <div className={`font-medium ${
                                  settings.darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {alert.student}
                                </div>
                                <div className={`text-xs ${
                                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                  {alert.course} • {alert.absences} absences
                                </div>
                              </div>
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                {alert.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuickAction === "office-hours" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Weekly Schedule
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.schedule.map((slot, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-indigo-50"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className={`font-medium ${
                                    settings.darkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                    {slot.day}
                                  </div>
                                  <div className={`text-sm ${
                                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>
                                    {slot.time} • {slot.location}
                                  </div>
                                </div>
                                <span className="text-sm">
                                  {slot.booked}/{slot.total} booked
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Upcoming Appointments
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.upcoming.map((apt, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <div>
                                <div className={`font-medium ${
                                  settings.darkMode ? "text-white" : "text-gray-900"
                                }`}>
                                  {apt.student}
                                </div>
                                <div className={`text-xs ${
                                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}>
                                  {apt.type}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm ${
                                  settings.darkMode ? "text-gray-300" : "text-gray-700"
                                }`}>
                                  {apt.time}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeQuickAction === "faculty-communications" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Recent Messages
                        </h3>
                        <div className="space-y-3">
                          {currentAction.content.messages.map((msg, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg ${
                                settings.darkMode ? "bg-gray-700" : "bg-rose-50"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className={`font-medium ${
                                    settings.darkMode ? "text-white" : "text-gray-900"
                                  }`}>
                                    {msg.from}
                                  </div>
                                  <div className={`text-sm ${
                                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>
                                    {msg.subject}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  msg.priority === 'high' 
                                    ? 'bg-red-100 text-red-800' 
                                    : msg.priority === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                }`}>
                                  {msg.priority}
                                </span>
                              </div>
                              <div className={`text-xs mt-2 ${
                                settings.darkMode ? "text-gray-500" : "text-gray-400"
                              }`}>
                                {msg.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          Announcements
                        </h3>
                        <div className="space-y-2">
                          {currentAction.content.announcements.map((ann, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                            >
                              <div className="flex items-center">
                                {!ann.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                )}
                                <span className={settings.darkMode ? "text-gray-300" : "text-gray-700"}>
                                  {ann.title}
                                </span>
                              </div>
                              <span className={`text-xs ${
                                settings.darkMode ? "text-gray-500" : "text-gray-400"
                              }`}>
                                {ann.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Panel Footer */}
                <div className={`p-6 border-t ${
                  settings.darkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Open Full View
                    </button>
                    <button
                      onClick={() => setShowActionPanel(false)}
                      className={`px-4 py-2 border rounded-lg font-medium ${
                        settings.darkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
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

export default TeacherDashboard;