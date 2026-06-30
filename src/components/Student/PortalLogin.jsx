import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaGraduationCap,
  FaArrowRight,
  FaKey,
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
  FaUserNurse,
  FaHospital,
  FaStethoscope
} from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    studentId: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
   const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    // Clear general login error when user makes changes
    if (loginError) {
      setLoginError("");
    }
  };

  useEffect(() => {
      if (token) {
        navigate("/academy/admin/admission");
      }
    }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId) {
      newErrors.studentId = "Student ID is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await axios.post("https://nicmauricebackend-production.up.railway.app/student/login", {
        studentId: formData.studentId,
        password: formData.password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Store token in cookie
        Cookies.set("token", data.token, {
          expires: rememberMe ? 7 : 1, // 7 days if remember me, 1 day if not
          sameSite: "Strict",
        });

        // Store student info
        Cookies.set("data", JSON.stringify(data.student), {
          expires: rememberMe ? 7 : 1,
        });

        // Redirect to student dashboard
        navigate("/academy/portal");
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message || "Invalid student ID or password");
      } else if (error.request) {
        setLoginError("Unable to connect to server. Please check your internet connection.");
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const benefits = [
    {
      icon: <FaStethoscope className="text-blue-600" />,
      title: "Clinical Resources",
      description: "Access nursing procedures, drug guides, and clinical tools"
    },
    {
      icon: <FaHospital className="text-purple-600" />,
      title: "Clinical Schedules",
      description: "View and manage your clinical rotations and shifts"
    },
    {
      icon: <FaUserNurse className="text-green-600" />,
      title: "Faculty Support",
      description: "Direct communication with nursing instructors and mentors"
    },
    {
      icon: <FaShieldAlt className="text-red-600" />,
      title: "Secure Platform",
      description: "HIPAA-compliant environment for all your academic needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16"
        >
          <Link to="/academy" className="flex items-center space-x-3 group mb-6 sm:mb-0">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Nicmaurice Nursing
              </div>
              <div className="text-sm text-gray-500">Student Portal Access</div>
            </div>
          </Link>
          <Link 
            to="/academy/enroll" 
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium text-sm shadow-md hover:shadow-lg transition-all"
          >
            Apply for Admission
            <FaArrowRight className="inline ml-2" />
          </Link>
        </motion.header>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Login Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100"
            >
              {/* Welcome Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-lg">
                  Sign in with your Student ID to continue your nursing education journey
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Student ID Field */}
                <div>
                  <label className="block text-gray-700 mb-2.5 font-semibold">
                    Student ID
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
                        errors.studentId 
                          ? "border-red-400" 
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                      placeholder="Enter your student ID (e.g., 2024001234)"
                      disabled={isLoading}
                    />
                    {errors.studentId && (
                      <p className="text-red-500 text-sm mt-2 font-medium">
                        {errors.studentId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 mb-2.5 font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
                        errors.password ? "border-red-400" : "border-gray-300 hover:border-blue-400"
                      }`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1.5 hover:bg-gray-100 rounded-lg"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={isLoading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2 font-medium">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message Display */}
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                  >
                    <p className="text-red-700 text-sm flex items-center">
                      <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                      {loginError}
                    </p>
                  </motion.div>
                )}

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:border-blue-600 checked:bg-blue-600 transition-colors cursor-pointer peer"
                        disabled={isLoading}
                      />
                      <FaCheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 font-medium">
                      Remember this device
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center transition-colors"
                    disabled={isLoading}
                  >
                    <FaKey className="mr-2" />
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-lg">
                      <FaSignInAlt className="mr-3" />
                      Access Student Portal
                    </span>
                  )}
                </button>
              </form>

              {/* Student ID Format Help */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Your Student ID is the 10-digit number on your admission letter
                </p>
              </div>

              {/* Security Notice */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200"
              >
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-blue-600 mt-0.5 mr-4 text-lg flex-shrink-0" />
                  <div>
                    <p className="text-blue-900 font-semibold mb-1">Security Notice</p>
                    <p className="text-blue-800 text-sm">
                      This portal is for authorized Nicmaurice Nursing Academy students only. 
                      Never share your login credentials with anyone.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Benefits Section - Keep the same as original */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                    <FaGraduationCap className="text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Nursing Student Portal</h2>
                    <p className="text-blue-100 opacity-90">Your academic hub for success</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-300 mr-3 text-lg" />
                    <span className="text-blue-100">Access course materials 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-300 mr-3 text-lg" />
                    <span className="text-blue-100">Submit clinical assignments securely</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-300 mr-3 text-lg" />
                    <span className="text-blue-100">Track academic progress in real-time</span>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Everything You Need
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="flex items-start">
                        <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors mr-4">
                          <div className="text-xl">
                            {benefit.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  Platform at a Glance
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-700">2,500+</div>
                    <div className="text-sm text-gray-600 mt-1">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-700">95%</div>
                    <div className="text-sm text-gray-600 mt-1">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-700">24/7</div>
                    <div className="text-sm text-gray-600 mt-1">Support</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <p className="text-gray-600 mb-5 text-lg">
                  Don't have a student ID yet?
                </p>
                <Link to="/academy/enroll">
                  <button className="inline-flex items-center px-7 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Apply for Nursing Program
                    <FaArrowRight className="ml-3" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;