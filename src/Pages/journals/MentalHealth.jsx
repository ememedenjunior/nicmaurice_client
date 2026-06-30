import React from "react";
import Header from "../../components/Header";
import MentalLand from "../../assets/journal/mental.jpg";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const MentalHealthJournal = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-indigo-900 text-white rounded-xl shadow-lg mb-8 p-8">
          <h1 className="text-3xl md:text-4xl font-bold border-b-2 border-blue-400 pb-4">
            INTERNATIONAL SPECIALTY JOURNAL OF MENTAL HEALTH AND PSYCHIATRY
          </h1>
          <p className="mt-4 text-xl text-blue-200">
            Advancing Mental Well-being and Recovery
          </p>
        </header>

        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={MentalLand}
            alt="Research in Psychiatry"
            className="sm:h-80 object-cover ml-[400px]"
          />
        </div>

        {/* Mission & Vision */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-red-600 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To be the leading international platform for disseminating
              cutting-edge research and innovative practices in mental health
              and psychiatry, promoting mental well-being, recovery, and social
              inclusion.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-red-600 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To empower mental health professionals, researchers, and
              policymakers worldwide with evidence-based insights, practical
              tools, and innovative approaches to address mental health
              challenges, improve mental well-being, and create a more just and
              equitable society.
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-blue-500 pl-4 mb-6">
            Target Audience
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                •
              </span>
              <span>
                <strong className="text-gray-800">
                  Mental Health Professionals:
                </strong>{" "}
                Psychiatrists, psychologists, nurses, social workers,
                counselors, and other mental health professionals.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                •
              </span>
              <span>
                <strong className="text-gray-800">Researchers:</strong>{" "}
                Researchers investigating best practices in mental health,
                mental illness, and mental health services.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                •
              </span>
              <span>
                <strong className="text-gray-800">
                  Patients and Families:
                </strong>{" "}
                Individuals with mental health conditions and their families
                seeking information, support, and resources.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                •
              </span>
              <span>
                <strong className="text-gray-800">
                  Policymakers and Healthcare Administrators:
                </strong>{" "}
                Individuals involved in shaping mental health policy and
                improving mental health services.
              </span>
            </li>
          </ul>
        </section>

        {/* Content Focus */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-blue-500 pl-4 mb-6">
            Content Focus
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Original Research
              </h3>
              <p className="text-gray-700 mb-3">
                Emphasizing rigorous research methodologies and impactful
                findings in mental health and psychiatry, including:
              </p>
              <ul className="space-y-2 pl-5">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-800">Mental Illness:</strong>{" "}
                    Studies examining the causes, symptoms, and treatments of
                    mental illnesses
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-800">
                      Mental Well-being:
                    </strong>{" "}
                    Research exploring factors that contribute to mental
                    well-being
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-800">
                      Mental Health Services:
                    </strong>{" "}
                    Studies investigating the effectiveness of mental health
                    interventions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-800">
                      Global Mental Health:
                    </strong>{" "}
                    Research addressing mental health disparities and global
                    initiatives
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Clinical Practice Guidelines
              </h3>
              <p className="text-gray-700 mb-3">
                Providing evidence-based recommendations for best practices in
                mental health and psychiatry, including:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-5">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>Diagnosis and Assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>Treatment and Interventions</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>Recovery-Oriented Care</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span>Community Mental Health</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Case Studies</h3>
                <p className="text-gray-700">
                  Presenting real-world examples of mental health interventions,
                  highlighting innovative approaches.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Expert Opinion</h3>
                <p className="text-gray-700">
                  Featuring insights from leading experts on emerging trends and
                  ethical considerations.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Technology</h3>
                <p className="text-gray-700">
                  Exploring advancements in technology and interventions
                  impacting mental health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-blue-500 pl-4 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Rigorous Peer Review: Double-blind peer review process by experts",
              "Open Access: Making research accessible to a wider audience",
              "Online Platform: User-friendly platform with advanced search",
              "International Editorial Board: Renowned experts from diverse backgrounds",
              "Conferences and Workshops: Fostering collaboration and development",
              "Awards and Recognition: Recognizing outstanding contributions",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 rounded-lg"
              >
                <span className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call for Papers */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
            Call for Papers
          </h3>
          <p className="text-gray-700 mb-4">
            We welcome submissions from authors worldwide. We encourage
            submissions that address the following themes:
          </p>
          <ul className="space-y-2">
            {[
              "Mental Well-being and Recovery",
              "Technology-Enabled Mental Health Care",
              "Global Mental Health Challenges and Solutions",
              "Mental Health Policy and Advocacy",
              "Ethical Considerations in Mental Health Care",
            ].map((theme, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full p-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-indigo-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Submit Your Research?
          </h3>
          <p className="mb-6 text-blue-100">
            Visit our submission portal or contact us for more information about
            our publication process.
          </p>
          <Link to="/publish">
            <p className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white transition duration-200">
              Publish your research
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </Link>
          <Link to="/articles">
            <p className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white transition duration-200 ml-[15px]">
              Browse Articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentalHealthJournal;
