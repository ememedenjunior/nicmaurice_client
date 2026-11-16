import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from 'react';

const NSUNProfilePage = () => {
  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Nurse Scientists Union of Nigeria (NSUN)
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Introduction</h2>
          <p className="text-gray-700">
            The <strong>Nurse Scientists Union of Nigeria (NSUN)</strong> is a professional organization dedicated to promoting
            nursing research, education, and practice within Nigeria and advancing the role of nurse scientists in the healthcare system.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Mission Statement</h2>
          <p className="text-gray-700">
            To enhance the quality of nursing care through research, innovation, and collaboration, while advocating for the recognition and integration of nurse scientists in health policy and practice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Vision</h2>
          <p className="text-gray-700">
            A leading voice in healthcare that fosters excellence in nursing science, contributing to evidence-based practice and improved patient outcomes in Nigeria.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Goals and Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Promote Nursing Research: Encourage and support research initiatives that address health challenges in Nigeria.</li>
            <li>Advocate for Policies: Influence health policies that recognize the vital role of nurse scientists in the healthcare system.</li>
            <li>Enhance Education: Provide resources and training opportunities for nurses to develop research skills and knowledge.</li>
            <li>Foster Collaboration: Create partnerships with academic institutions, healthcare organizations, and international nursing bodies.</li>
            <li>Support Professional Development: Offer networking, mentorship, and career advancement opportunities for nurse scientists.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Membership</h2>
          <p className="text-gray-700">
            NSUN is open to registered nurses who are engaged in research, education, and policy development. Membership benefits include access to research funding opportunities, professional development workshops, and participation in conferences and seminars.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Key Activities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Organizing annual conferences and seminars focused on nursing research and practice.</li>
            <li>Publishing a journal to disseminate research findings and innovations in nursing.</li>
            <li>Conducting workshops and training sessions to enhance research capabilities among nurses.</li>
            <li>Collaborating with healthcare stakeholders to promote evidence-based practices.</li>
          </ul>
        </section>

        <section>
          <p className="text-gray-700">
            This profile serves to outline the purpose, vision, and activities of the Nurse Scientists Union of Nigeria, aiming to advocate for the advancement of nursing practice through scientific research and collaboration.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NSUNProfilePage;
