// Login.jsx
import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  AlertCircle,
  Loader,
  Building,
} from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/academy/admin/admission");
    }
  }, [token, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.adminId) {
      newErrors.adminId = "Admin ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await axios.post("https://nicmauricebackend-production.up.railway.app/admin/login", {
        adminId: formData.adminId,
        password: formData.password,
      });

      const data = response;

      if (data.status === 200) {
        // ✅ Store token in cookie
        Cookies.set("token", data.data.token, {
          expires: 7, // days
          secure: false, // only https (set false if testing on http localhost)
          sameSite: "Strict",
        });

        // store user info
        Cookies.set("data", JSON.stringify(data.data.admin), {
          expires: 7,
        });

        setLoginError(data.message);

        // Redirect
        if (data.data.admin.role === "AdmissionOfficer") {
          navigate("/academy/admin/admission");
        } else if (data.data.admin.role === "RegistrarOfficer") {
          navigate("/academy/admin/registrar");
        } else {
          navigate("/academy/admin/hr");
        }
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message || "Login failed");
      } else {
        setLoginError("Server not reachable");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Branding & Info */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-white mb-8">
                <Building className="w-8 h-8" />
                <span className="text-xl font-bold">University Admissions</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Welcome Back,
                  <br />
                  <span className="text-blue-200">Admissions Officer</span>
                </h1>

                <p className="text-blue-100 text-lg">
                  Access the admissions dashboard to review applications, manage
                  candidates, and make informed decisions.
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 mt-12">
              {[
                "Review student applications",
                "Manage admission decisions",
                "Track application status",
                "Generate reports",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-white"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-blue-200 text-sm mt-8">
              <Shield className="w-4 h-4" />
              <span>Secure, encrypted access</span>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Please enter your credentials to access the admissions
                  dashboard
                </p>
              </div>

              {/* Error Alert */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{loginError}</p>
                </div>
              )}

              {/* Login Form */}
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Admin Id
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="adminId"
                      name="adminId"
                      type="text"
                      value={formData.adminId}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        errors.adminId ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors`}
                      placeholder="ADM252975"
                    />
                  </div>
                  {errors.adminId && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.adminId}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-10 py-3 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-600">
                  Having trouble signing in?{" "}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Contact support
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
