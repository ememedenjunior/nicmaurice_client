import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const IntegratedHealth = () => {
  return (
   <>
   <Header />
   <div className="max-w-full mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Integrated Health Consultancy and Nursing Services</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p className="mt-2">Integrated Health Consultancy and Nursing Services is based on the Primary Health Care (PHC) concept. It incorporates all the components of PHC along with additional health services.</p>
        <p className="mt-2">Based on PHC principles, which emphasize community involvement and collaboration, this initiative aims to promote, protect, prevent, restore, and rehabilitate health.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Services Offered</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Health education on prevailing health problems and prevention methods.</li>
          <li>Promotion of food supply and proper nutrition.</li>
          <li>Adequate supply of safe water and basic hygiene.</li>
          <li>Maternal and child care services, including family planning.</li>
          <li>Immunization against major communicable diseases.</li>
          <li>Prevention and control of endemic and epidemic diseases.</li>
          <li>Appropriate treatment of common diseases and injuries.</li>
          <li>Provision of essential drugs and supply services.</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Research & Specialized Care</h2>
        <p className="mt-2">Integrated Health Consultancy and Nursing Services conducts research in traditional health care while providing specialized care in areas such as orthopedics, optics, pediatrics, geriatrics, and psychiatry.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Health System Personnel Management & Development</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Refresher courses</li>
          <li>Workshops and seminars</li>
          <li>Conferences and research forums</li>
          <li>Publication of research findings</li>
          <li>Symposia and educational enlightenment</li>
          <li>Efficient management of health resources</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Health Planning, Research & Information</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Comprehensive data gathering and analysis</li>
          <li>Planning and conducting research into healthcare services</li>
          <li>Providing epidemiological and operational research information</li>
          <li>Utilizing demographic data and health policy indicators</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Health Care Financing</h2>
        <p className="mt-2">We work with governments and NGOs to finance health services and assist individuals in planning healthcare in accordance with their financial situation.</p>
      </section>
    </div>
   <Footer />
   </>
  );
};

export default IntegratedHealth;
