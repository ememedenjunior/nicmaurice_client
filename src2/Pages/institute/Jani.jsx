import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const JANI = () => {
  return (
    <>
    <Header />
    <div className="bg-gray-100 min-h-screen py-4 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          THE JOINT ACTION NURSING INITIATIVES (JANI)
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          A COLLABORATIVE FORCE FOR NURSING EXCELLENCE
        </h2>
        <p className="mt-4 text-gray-600">
          The Joint Action Nursing Initiatives (JANI) stands as a testament to
          the power of collaboration within the nursing profession. This
          dynamic coalition, comprised of diverse nursing groups, unions, and
          renowned specialists, embodies a shared commitment to advancing
          nursing practice, advocating for nurses' rights, and ensuring the
          highest quality of patient care.
        </p>

        <h3 className="text-xl font-bold mt-6 text-gray-800">Origins and Evolution</h3>
        <p className="text-gray-600 mt-2">
          JANI's genesis can be traced back to the early 2000s, addressing key
          nursing challenges such as inadequate staffing, burnout, and lack of
          professional recognition. Through its collaborative approach, JANI
          has expanded its efforts in policy advocacy, best practices, research
          support, and interprofessional collaboration.
        </p>

        <h3 className="text-xl font-bold mt-6 text-gray-800">Key Initiatives</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>The Global Nursing Workforce Initiative</li>
          <li>The Patient Safety Initiative</li>
          <li>The Nursing Leadership Initiative</li>
          <li>The Nursing Research and Innovation Initiative</li>
          <li>The Health Equity Initiative</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 text-gray-800">Impact and Achievements</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Improved Nurse Staffing Ratios</li>
          <li>Enhanced Nurse Compensation and Benefits</li>
          <li>Advancements in Nursing Research and Innovation</li>
          <li>Development and Implementation of Best Practices</li>
          <li>Advocacy for Policy Changes Supporting Nurses</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 text-gray-800">Future Aspirations</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Expanding Membership</li>
          <li>Strengthening Advocacy Efforts</li>
          <li>Promoting Nursing Research and Innovation</li>
          <li>Fostering Interprofessional Collaboration</li>
          <li>Addressing Health Disparities</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 text-gray-800">Conclusion</h3>
        <p className="text-gray-600 mt-2">
          The Joint Action Nursing Initiatives (JANI) serves as a powerful
          force for change within the nursing profession. With its commitment
          to collaboration, advocacy, and excellence, JANI continues to shape
          the future of nursing and healthcare worldwide.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default JANI;
