// FormComponent.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublishArticle = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    file: null,
  });
  const [sent, setSentMail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("file", formData.file);

    const response = await fetch("https://backend-project-play-production.up.railway.app/submit-form", {
      method: "POST",
      body: formDataToSend,
    });

    console.log(response);

    if (response.ok) {
      setSentMail(true);
      alert("Form submitted successfully!");
    } else {
      alert("Failed to submit form.");
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-[25px] font-bold mt-[40px] text-center">
        Article Submission
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md border border-gray-200 space-y-4 mt-[20px] mb-[140px]"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <textarea
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Document
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".doc, .docx"
            required
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />
        </div>

        <div className="mt-[30px]">
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
              sent
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            } transition duration-200`}
          >
            {sent ? "Submitted" : "Submit"}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PublishArticle;
