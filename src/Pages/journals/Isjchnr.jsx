import React from "react";
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const ISJCHNR = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with Community Health Image */}
      <header className="relative bg-teal-700 text-white rounded-xl shadow-lg mb-8 overflow-hidden">
        
        <div className="relative z-10 p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            INTERNATIONAL SPECIALTY JOURNAL OF COMMUNITY HEALTH NURSING RESEARCH
          </h1>
          <p className="mt-4 text-xl text-teal-100">Advancing Health Equity and Well-being</p>
        </div>
      </header>

      {/* Mission & Vision */}
      <div className="bg-teal-50 rounded-xl p-6 mb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-teal-800 mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To be the leading international platform for disseminating cutting-edge research and innovative practices in community health nursing, promoting health equity, well-being, and social justice.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-teal-800 mb-2">Our Vision</h3>
          <p className="text-gray-700">
            To empower community health nurses worldwide with evidence-based insights, practical tools, and innovative approaches to address health disparities and improve population health.
          </p>
        </div>
      </div>

      {/* Target Audience */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">Target Audience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Community Health Nurses: Practitioners serving diverse populations",
            "Public Health Professionals: Experts in population health strategies",
            "Researchers: Academics studying community health interventions",
            "Policymakers: Leaders shaping healthcare policy and administration"
          ].map((audience, index) => (
            <div key={index} className="flex items-start p-3 bg-teal-50 rounded-lg">
              <span className="bg-teal-500 text-white rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700">{audience}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Content Focus */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">Content Focus</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Health Disparities",
              content: "Research addressing inequities in healthcare access and outcomes",
              icon: "⚖️"
            },
            {
              title: "Health Promotion",
              content: "Disease prevention and wellness promotion strategies",
              icon: "💪"
            },
            {
              title: "Community Interventions",
              content: "Evidence-based programs for population health improvement",
              icon: "🏘️"
            },
            {
              title: "Global Health",
              content: "Cross-cultural research and international health initiatives",
              icon: "🌍"
            },
            {
              title: "Clinical Guidelines",
              content: "Best practices for community health nursing care",
              icon: "📋"
            },
            {
              title: "Technology Integration",
              content: "Digital health tools for community nursing practice",
              icon: "💻"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-teal-100 p-4 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-teal-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Rigorous Peer Review: Double-blind expert review process",
            "Open Access: Freely available global research",
            "Multimedia Platform: Articles with video and interactive content",
            "Global Editorial Board: International expert oversight",
            "Professional Events: Conferences and workshops",
            "Practice Impact: Research that transforms community care"
          ].map((feature, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg border border-teal-100">
              <span className="bg-teal-500 text-white rounded-full p-1 mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call for Papers */}
      <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
        <h3 className="text-2xl font-semibold text-teal-900 mb-4">Call for Papers</h3>
        <p className="text-gray-700 mb-4">We welcome submissions from researchers worldwide on these themes:</p>
        <ul className="space-y-3">
          {[
            "Health Equity and Social Determinants",
            "Community-Based Participatory Research",
            "Innovative Care Delivery Models",
            "Technology in Community Health",
            "Global Health Nursing Initiatives",
            "Policy Impact on Community Health"
          ].map((theme, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-teal-500 text-white rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-gray-700 font-medium">{theme}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-teal-700 text-white rounded-xl p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Contribute to Community Health Research</h3>
        <p className="mb-6 text-teal-100">Join our global network of community health nursing professionals</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#submit" className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-800 rounded-lg font-medium text-white transition duration-200">
            Submit Your Research
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white hover:bg-teal-800 rounded-lg font-medium text-white transition duration-200">
            Contact Editorial Team
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ISJCHNR;