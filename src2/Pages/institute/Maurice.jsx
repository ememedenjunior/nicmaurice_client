import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Maurice = () => {
  return (
   <>
   <Header />
   <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-blue-900 text-white text-center p-4 text-2xl font-bold">
        NIC Maurice Company Nigeria (NMCN)
      </header>

      <section className="bg-white p-6 shadow-lg rounded-lg my-6">
        <h2 className="text-xl font-semibold text-blue-800">Background</h2>
        <p className="mt-2 text-gray-700">
          Incorporated on 10th July 1992 as Nic Maurice Company Nigeria, CAC No. 85158, 
          Continuous Professional Nursing Development Programmes commenced with the 
          creation of the Integrated Health Consultancy and Nursing Services (INTHECONS) Unit.
        </p>
      </section>

      <section className="bg-white p-6 shadow-lg rounded-lg my-6">
        <h2 className="text-xl font-semibold text-blue-800">Objectives</h2>
        <ul className="mt-2 text-gray-700 list-disc pl-5">
          <li>Promote and support research capabilities.</li>
          <li>Provide consultancy services in health and social sciences.</li>
          <li>Educate high caliber students and professionals.</li>
          <li>Strengthen national and international research in Nursing.</li>
        </ul>
      </section>

      <section className="bg-white p-6 shadow-lg rounded-lg my-6">
        <h2 className="text-xl font-semibold text-blue-800">Vision & Mission</h2>
        <p className="mt-2 text-gray-700">
          Evolving, advancing, and sustaining a transformed Health policy and clinical nursing 
          practices through knowledge generation, synthesis, and dissemination.
        </p>
      </section>

      <section className="bg-white p-6 shadow-lg rounded-lg my-6">
        <h2 className="text-xl font-semibold text-blue-800">Board</h2>
        <p className="mt-2 text-gray-700 font-bold">Mr. Anso, Nicbassey Maurice</p>
        <p className="text-gray-700">Chairman / CEO</p>
      </section>

      <section className="bg-white p-6 shadow-lg rounded-lg my-6">
        <h2 className="text-xl font-semibold text-blue-800">Partners & Affiliations</h2>
        <ul className="mt-2 text-gray-700 list-disc pl-5">
          <li>Royal College of Nursing, London</li>
          <li>Commonwealth Nurses Federation</li>
          <li>Nigerian Nurses Association of USA Inc</li>
          <li>University of Nigeria Teaching Hospital</li>
        </ul>
      </section>

    </div>
   <Footer />
   </>
  );
};

export default Maurice;
