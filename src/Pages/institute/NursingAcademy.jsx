import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NursingAcademy = () => {
  return (
   <>
   <Header />
   <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-blue-800 text-center">Nursing Academy of Nigeria (NAN)</h1>
        <p className="text-gray-600 text-center mt-2">Advancing excellence in nursing education, research, and practice.</p>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Mission</h2>
          <p className="text-gray-700 mt-2">To advance the science and art of nursing in Nigeria, promoting excellence in education, research, and practice.</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Vision</h2>
          <p className="text-gray-700 mt-2">To be a premier organization for nursing education, research, and practice in Nigeria, fostering a culture of innovation, collaboration, and excellence.</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Promote excellence in nursing education and research</li>
            <li>Develop and implement evidence-based nursing practice guidelines</li>
            <li>Advocate for policies and programs that benefit nursing education and practice</li>
            <li>Foster collaboration with other healthcare organizations and stakeholders</li>
            <li>Recognize and celebrate excellence in nursing education, research, and practice</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Membership</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Nursing educators, researchers, and practitioners from various institutions</li>
            <li>Minimum of 5 years of experience in nursing education, research, or practice</li>
            <li>Demonstrated expertise and contributions to the field of nursing</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Governance</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Executive Council, chaired by a President with regional representatives</li>
            <li>Council members serve a 2-year term, renewable for a maximum of 2 terms</li>
            <li>Secretariat headed by an Executive Secretary for daily operations</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Activities</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Conferences, workshops, and seminars on nursing education and research</li>
            <li>Development of evidence-based nursing practice guidelines</li>
            <li>Advocacy and policy development</li>
            <li>Collaboration with healthcare organizations and stakeholders</li>
            <li>Awards and recognition programs for excellence in nursing</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-blue-700">Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Excellence:</strong> Promoting the highest standards in nursing education and research</li>
            <li><strong>Expertise:</strong> Leveraging knowledge and experience to advance nursing</li>
            <li><strong>Collaboration:</strong> Partnering with healthcare organizations for unified progress</li>
            <li><strong>Leadership:</strong> Inspiring and mentoring the next generation of nurses</li>
          </ul>
        </div>
      </div>
    </div>
   <Footer />
   </>
  );
};

export default NursingAcademy;
