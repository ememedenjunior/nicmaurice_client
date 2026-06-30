import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaCalendar,
  FaMapMarkerAlt,
  FaFileMedical,
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaUpload,
  FaQuestionCircle,
  FaGraduationCap as FaGradCap,
} from "react-icons/fa";
import axios from "axios";

const ApplicationSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Educational Background
    highestQualification: "",
    institutionAttended: "",
    graduationYear: "",
    gpa: "",
    major: "",
    certifications: "",

    // Professional Experience
    hasExperience: "no",
    yearsExperience: "",
    currentPosition: "",
    currentEmployer: "",
    clinicalSpecialty: "",
    licenses: "",

    // Program Selection
    programAppliedFor: "",
    intakeYear: "",
    studyFormat: "online",
    financialAid: "no",

    // Documents
    resume: null,
    transcripts: null,
    recommendationLetters: null,
    personalStatement: "",

    // Additional Information
    howHeard: "",
    questions: "",
    agreeTerms: false,
  });

  const programs = [
    {
      id: "bsn",
      name: "Bachelor of Science in Nursing (BSN)",
      duration: "4 years",
    },
    {
      id: "msn",
      name: "Master of Science in Nursing (MSN)",
      duration: "2 years",
    },
    { id: "fnp", name: "Family Nurse Practitioner (FNP)", duration: "3 years" },
    { id: "ccrn", name: "Critical Care Nursing (CCRN)", duration: "1 year" },
    { id: "pediatric", name: "Pediatric Nursing", duration: "1 year" },
    { id: "rn-bsn", name: "RN to BSN Bridge Program", duration: "2 years" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = (stepNum) => {
    switch (stepNum) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phoneNumber
        );
      case 2:
        return formData.highestQualification && formData.institutionAttended;
      case 3:
        return formData.programAppliedFor;

      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(5)) return;

    try {
      // Send formData to backend
      const response = await axios.post(
        "https://nicmauricebackend-production.up.railway.app/applicant/apply",
        formData,
      );

      if (response.status === 204  || response.status === 201) {
        alert(
          "Application submitted successfully! We'll contact you within 3 business days.",
        );
      }
    } catch (error) {
      // Handle errors
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: <FaUser /> },
    { number: 2, title: "Education", icon: <FaGraduationCap /> },
    { number: 3, title: "Program", icon: <FaUniversity /> },
    { number: 4, title: "Documents", icon: <FaFileMedical /> },
    { number: 5, title: "Review", icon: <FaCheckCircle /> },
  ];

  // Using the same header from Login page
  const NicmauriceHeader = () => (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16">
      <Link
        to="/academy"
        className="flex items-center space-x-3 group mb-6 sm:mb-0"
      >
        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
          <FaGraduationCap className="text-white text-2xl" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Nicmaurice Nursing
          </div>
          <div className="text-sm text-gray-500">Application Portal</div>
        </div>
      </Link>
      <Link
        to="/academy/login"
        className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium text-sm shadow-md hover:shadow-lg transition-all"
      >
        Student Login
        <FaArrowRight className="inline ml-2" />
      </Link>
    </header>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Using the same header from Login page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NicmauriceHeader />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Apply to Our Nursing Program
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Start your journey to becoming a healthcare professional.
                Complete your application in just 10-15 minutes.
              </p>
            </motion.div>
          </div>

          {/* Progress Steps - Improved Design */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-center items-center mb-10 space-y-6 sm:space-y-0">
              {steps.map((stepItem) => (
                <div key={stepItem.number} className="flex items-center">
                  <div
                    className={`flex flex-col items-center ${stepItem.number <= step ? "text-blue-600" : "text-gray-400"}`}
                  >
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all duration-300 ${
                        stepItem.number < step
                          ? "bg-green-100 border-green-500 text-green-600 shadow-md"
                          : stepItem.number === step
                            ? "bg-blue-100 border-blue-600 text-blue-600 shadow-lg"
                            : "bg-white border-gray-300 hover:border-blue-400"
                      } mb-3`}
                    >
                      {stepItem.number < step ? (
                        <FaCheckCircle className="text-lg" />
                      ) : (
                        React.cloneElement(stepItem.icon, {
                          className: "text-lg",
                        })
                      )}
                    </div>
                    <span className="text-sm font-semibold">
                      {stepItem.title}
                    </span>
                  </div>
                  {stepItem.number < 5 && (
                    <div
                      className={`h-1 w-12 sm:w-20 mx-4 transition-all duration-300 ${
                        stepItem.number < step ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Application Form - Enhanced Styling */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <FaUser className="mr-3 text-blue-600 text-2xl" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        label: "First Name *",
                        name: "firstName",
                        type: "text",
                        icon: null,
                      },
                      {
                        label: "Last Name *",
                        name: "lastName",
                        type: "text",
                        icon: null,
                      },
                      {
                        label: "Email Address *",
                        name: "email",
                        type: "email",
                        icon: <FaEnvelope />,
                      },
                      {
                        label: "Phone Number *",
                        name: "phoneNumber",
                        type: "tel",
                        icon: <FaPhone />,
                      },
                      {
                        label: "Date of Birth",
                        name: "dateOfBirth",
                        type: "date",
                        icon: <FaCalendar />,
                      },
                      {
                        label: "Gender",
                        name: "gender",
                        type: "select",
                        icon: null,
                        options: [
                          "",
                          "Male",
                          "Female",
                          "Other",
                          "Prefer not to say",
                        ],
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                          >
                            {field.options.map((option) => (
                              <option
                                key={option}
                                value={option.toLowerCase().replace(/ /g, "-")}
                              >
                                {option || "Select Gender"}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="relative">
                            {field.icon && (
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                {field.icon}
                              </div>
                            )}
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              className={`w-full ${field.icon ? "pl-12" : "pl-4"} pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all`}
                              required={field.label.includes("*")}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <label className="block text-gray-700 mb-2.5 font-semibold">
                      Address
                    </label>
                    <div className="relative mb-4">
                      <div className="absolute left-4 top-4">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State/Province"
                        className="px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP/Postal Code"
                        className="px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Educational Background - Enhanced */}
              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <FaGraduationCap className="mr-3 text-blue-600 text-2xl" />
                    Educational Background
                  </h3>
                  <div className="space-y-7">
                    <div>
                      <label className="block text-gray-700 mb-2.5 font-semibold">
                        Highest Degree Earned *
                      </label>
                      <select
                        name="highestQualification"
                        value={formData.highestQualification}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        required
                      >
                        <option value="">Select Degree</option>
                        <option value="high-school">High School Diploma</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctoral">Doctoral Degree</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          Institution Name *
                        </label>
                        <input
                          type="text"
                          name="institutionAttended"
                          value={formData.institutionAttended}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          Graduation Year
                        </label>
                        <input
                          type="number"
                          min="1950"
                          max="2024"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          GPA (on 4.0 scale)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          Major/Field of Study
                        </label>
                        <input
                          type="text"
                          name="major"
                          value={formData.major}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2.5 font-semibold">
                        Professional Certifications
                      </label>
                      <textarea
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleChange}
                        placeholder="List any relevant certifications (e.g., CNA, LPN, etc.)"
                        className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all h-36"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Program Selection - Enhanced */}
              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <FaUniversity className="mr-3 text-blue-600 text-2xl" />
                    Program Selection
                  </h3>
                  <div className="space-y-7">
                    <div>
                      <label className="block text-gray-700 mb-4 font-semibold text-lg">
                        Select Your Program of Interest *
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {programs.map((program) => (
                          <label
                            key={program.id}
                            className={`flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group ${
                              formData.programAppliedFor === program.id
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-300 hover:border-blue-400 hover:bg-blue-25"
                            }`}
                          >
                            <input
                              type="radio"
                              name="programAppliedFor"
                              value={program.id}
                              checked={
                                formData.programAppliedFor === program.id
                              }
                              onChange={handleChange}
                              className="mt-1.5 mr-4 w-5 h-5"
                              required
                            />
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {program.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-2">
                                Duration: {program.duration}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          Desired Start Term
                        </label>
                        <select
                          name="intakeYear"
                          value={formData.intakeYear}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        >
                          <option value="">Select Term</option>
                          <option value="2026">2026</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2.5 font-semibold">
                          Preferred Study Format
                        </label>
                        <select
                          name="studyFormat"
                          value={formData.studyFormat}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        >
                          <option value="online">Online</option>
                          <option value="on-campus">On-Campus</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-3 font-semibold">
                        Are you interested in financial aid?
                      </label>
                      <div className="flex space-x-8">
                        {["yes", "no", "maybe"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="financialAid"
                              value={option}
                              checked={formData.financialAid === option}
                              onChange={handleChange}
                              className="w-5 h-5 mr-3"
                            />
                            <span className="font-medium capitalize">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Documents Upload - Enhanced */}
              {step === 4 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <FaFileMedical className="mr-3 text-blue-600 text-2xl" />
                    Documents & Personal Statement
                  </h3>
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          label: "Resume/CV",
                          name: "resume",
                          accept: ".pdf,.doc,.docx",
                        },
                        {
                          label: "Unofficial Transcripts",
                          name: "transcripts",
                          accept: ".pdf,.jpg,.png",
                        },
                      ].map((fileField) => (
                        <div key={fileField.name}>
                          <label className="block text-gray-700 mb-3 font-semibold">
                            {fileField.label}
                          </label>
                          <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-300 group">
                            <FaUpload className="mx-auto text-gray-400 mb-3 text-2xl group-hover:text-blue-500 transition-colors" />
                            <p className="text-sm text-gray-600 mb-3">
                              Drag & drop or click to upload
                            </p>
                            <input
                              type="file"
                              name={fileField.name}
                              onChange={handleChange}
                              accept={fileField.accept}
                              className="hidden"
                              id={`${fileField.name}-upload`}
                            />
                            <label
                              htmlFor={`${fileField.name}-upload`}
                              className="cursor-pointer px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors inline-block"
                            >
                              Choose file
                            </label>
                            {formData[fileField.name] && (
                              <p className="text-sm text-green-600 mt-3 font-medium">
                                ✓ {formData[fileField.name].name}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-3 font-semibold">
                        Personal Statement *
                      </label>
                      <p className="text-gray-600 mb-5 text-sm">
                        Please tell us why you want to pursue nursing and why
                        you chose our program (minimum 200 characters)
                      </p>
                      <textarea
                        name="personalStatement"
                        value={formData.personalStatement}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 transition-all h-48"
                        placeholder="Your personal statement here..."
                        required
                      />
                      <div className="text-right mt-3">
                        <span
                          className={`text-sm font-medium ${formData.personalStatement.length >= 200 ? "text-green-600" : "text-red-500"}`}
                        >
                          {formData.personalStatement.length} characters
                          {formData.personalStatement.length < 200 && (
                            <span className="ml-2">(Minimum 200 required)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit - Enhanced */}
              {step === 5 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <FaCheckCircle className="mr-3 text-green-600 text-2xl" />
                    Review Your Application
                  </h3>

                  <div className="space-y-7">
                    {[
                      {
                        title: "Personal Information",
                        fields: [
                          {
                            label: "Name",
                            value: `${formData.firstName} ${formData.lastName}`,
                          },
                          { label: "Email", value: formData.email },
                          { label: "Phone", value: formData.phone },
                          {
                            label: "Location",
                            value: `${formData.city}, ${formData.state}`,
                          },
                        ],
                      },
                      {
                        title: "Education",
                        fields: [
                          {
                            label: "Highest Degree",
                            value: formData.highestQualification,
                          },
                          {
                            label: "Institution",
                            value: formData.institutionAttended,
                          },
                          ...(formData.gpa
                            ? [{ label: "GPA", value: formData.gpa }]
                            : []),
                        ],
                      },
                      {
                        title: "Program Selection",
                        fields: [
                          {
                            label: "Selected Program",
                            value: programs.find(
                              (p) => p.id === formData.programAppliedFor,
                            )?.name,
                          },
                          {
                            label: "Study Format",
                            value: formData.studyFormat,
                          },
                        ],
                      },
                    ].map((section, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                      >
                        <h4 className="font-bold text-lg text-gray-900 mb-5">
                          {section.title}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-5">
                          {section.fields.map((field, fIdx) => (
                            <div key={fIdx}>
                              <span className="text-gray-600 text-sm font-medium">
                                {field.label}:
                              </span>
                              <p className="font-semibold text-gray-900 mt-1">
                                {field.value || "Not provided"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                      <label className="flex items-start cursor-pointer">
                        <div className="relative mr-4 mt-1">
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="w-6 h-6 appearance-none border-2 border-gray-300 rounded checked:border-blue-600 checked:bg-blue-600 transition-colors cursor-pointer peer"
                            required
                          />
                          <FaCheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          I certify that all information provided is accurate
                          and complete. I understand that any misrepresentation
                          may result in denial of admission or dismissal from
                          the program. I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 font-medium underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700 font-medium underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons - Enhanced */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-7 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-300 hover:border-gray-400"
                  >
                    ← Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(step)}
                    className="px-9 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold flex items-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <FaArrowRight className="ml-3" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.agreeTerms}
                    className="px-9 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Application Tips - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-200"
          >
            <div className="flex items-start mb-6">
              <FaQuestionCircle className="text-blue-600 text-2xl mr-4 mt-1 flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                Application Tips
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Be Specific",
                  desc: "Tailor your personal statement to our nursing program specifically.",
                },
                {
                  title: "2. Highlight Experience",
                  desc: "Include any healthcare or volunteer experience you have.",
                },
                {
                  title: "3. Submit Early",
                  desc: "Applications are reviewed on a rolling basis. Apply early!",
                },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="font-bold text-blue-600 text-lg mb-3">
                    {tip.title}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSection;
