import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CONE = () => {
  return (
   <>
   <Header />
   <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="bg-green-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Council of Nursing Elders (CONE)</h1>
        <p className="mt-4 text-lg">Promoting Excellence, Integrity, and Evidence-Based Practice</p>
      </header>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Mission</h2>
        <p className="mb-6">To provide leadership, guidance, and mentorship to the nursing profession in Nigeria, promoting excellence, integrity, and evidence-based practice.</p>

        <h2 className="text-2xl font-bold mb-4">Vision</h2>
        <p>To be a respected and influential voice in shaping the future of nursing in Nigeria, fostering a culture of excellence, innovation, and collaboration.</p>
      </section>

      {/* Objectives */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Objectives</h2>
          <ul className="list-disc pl-6">
            <li>Provide mentorship and guidance to young nurses and nursing students</li>
            <li>Promote evidence-based practice and research in nursing</li>
            <li>Advocate for policies and programs that benefit the nursing profession and healthcare in Nigeria</li>
            <li>Foster collaboration and partnership with other healthcare organizations and stakeholders</li>
            <li>Recognize and celebrate excellence in nursing practice and leadership</li>
          </ul>
        </div>
      </section>

      {/* Membership */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Membership</h2>
        <ul className="list-disc pl-6">
          <li>Retired and experienced nurses who have made significant contributions to the profession</li>
          <li>Minimum of 10 years of experience in nursing practice, education, or research</li>
          <li>Demonstrated leadership and mentorship skills</li>
        </ul>
      </section>

      {/* Governance */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Governance</h2>
          <ul className="list-disc pl-6">
            <li>Executive Council, chaired by a President, with representatives from various regions and specialties</li>
            <li>Council members serve a 2-year term, renewable for a maximum of 2 terms</li>
            <li>Secretariat headed by an Executive Secretary, responsible for day-to-day operations</li>
          </ul>
        </div>
      </section>

      {/* Activities */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Activities</h2>
        <ul className="list-disc pl-6">
          <li>Mentorship programs for young nurses and students</li>
          <li>Conferences, workshops, and seminars on evidence-based practice and leadership</li>
          <li>Advocacy and policy development</li>
          <li>Collaboration with other healthcare organizations and stakeholders</li>
          <li>Awards and recognition programs for excellence in nursing</li>
        </ul>
      </section>

      {/* Characteristics */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Characteristics</h2>
          <ul className="list-disc pl-6">
            <li><strong>Expertise:</strong> CONE members are experienced and knowledgeable in their field, providing valuable insights and guidance.</li>
            <li><strong>Leadership:</strong> CONE provides a platform for nurse leaders to mentor and inspire the next generation.</li>
            <li><strong>Innovation:</strong> CONE promotes evidence-based practice and research, driving innovation in nursing.</li>
            <li><strong>Collaboration:</strong> CONE fosters partnerships with other healthcare organizations, promoting a unified voice for nursing.</li>
          </ul>
        </div>
      </section>
    </div>
   <Footer />
   </>
  );
};

export default CONE;
