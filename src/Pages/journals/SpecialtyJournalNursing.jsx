import React from "react";
import SpecialtyNursingJournalImg from "../../assets/journal/SpecialNurJourn.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const SpecialtyNursingJournal = () => {
  const articles = [
    {
      vol: "Vol 1",
      title:
        "THE IMPACT OF SIMULATION ON SIMULATED PATIENTS AMONG MEDICAL STUDENTS",
      link: "https://drive.google.com/file/d/1SXNt55FbXwl-LfHGny0PWHySR6DeWBAH/view?usp=sharing",
      year: "2026",
      authors: "Isaac Newton Omoregbe (BSc, MBBS, MWACP) 1, 3",
      abstract:
        "To supplement or replace real life experience with guided experiences, simulation-based education is a training or instructional strategy.",
    },
    {
      vol: "Vol 2",
      title: "ASSERTIVE NURSING PRACTICE",
      link: "https://drive.google.com/file/d/1yl53GiWN0KgSzezbqYXuCqSY8zxhFY3a/view?usp=drive_link",
      year: "2026",
      authors: "AJIO, D.K, MSc (Nursing), RN",
      abstract:
        'Operating in an environment that features prominently with "fastness" and "dominance" calls for assertiveness and effectiveness, which are ingredients needed for sustainability and efficiency.',
    },
    {
      vol: "Vol 3 NO. 3",
      title:
        "CAPACITY BUILDING FOR IMPLEMENTATION AND UTILIZATION OF NURSING RESEARCH AND EVIDENCE-BASED PRACTICE",
      link: "https://drive.google.com/file/d/1XNnTpm_tMuKhr02OpsCavrjRW50z1bZ3/view?usp=drive_link",
      year: "2026",
      authors: "DR. IDONGESIT I. AKPABIO",
      abstract:
        "The requirement for accountability in health care delivery has brought about an increasing ed for reliable and valid information as basis for decision making and practice.",
    },
    {
      vol: "Vol. 4 No. 1",
      title:
        "IMPROVEMENT OF CRITICAL THINKING SKILLS IN SOPHOMORE NURSING STUDENTS OF SOUTH- SOUTH - ZONE,",
      link: "https://drive.google.com/file/d/1BbeCNwrLiukkM-INqAibXJO97l4FiRSb/view?usp=sharing",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "Critical thinking skills are very important prerequisites in professional nursing practice.",
    },
    {
      vol: "Vol. 4 No. 2",
      title:
        "THE IMPACT OF BRAINSTORMING TRAINING ON THE CRITICAL THINKING SKILLS OF SOPHOMORE NURSING STUDENTS OF SOUTH- SOUTH - ZONE,",
      link: "https://drive.google.com/file/d/1JzMeq3NoiLMwDmhpxmY8nwsqgjQeo7tx/view?usp=sharing",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "Critical thinking skills are very important prerequisites in professional nursing practice.",
    },
    {
      vol: "Vol. 4 No. 3",
      title:
        "THE EFFECT OF SOCRATIC QUESTIONING ON THE CRITICAL THINKING SKILLS OF SOPHOMORE NURSING STUDENTS, NIGERIA",
      link: "https://drive.google.com/file/d/11m-GN96WzI76REucdo3Hdrs-xqJIUh9_/view?usp=sharing",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "Critical thinking skills are very important prerequisites in professional nursing practice.",
    },
    {
      vol: "Vol. 4 No. 4",
      title:
        "IMPACT OF COMBINE THERAPY OF SOUND AND VISION IN THE MANAGEMENT OF SYSTOLIC AND DIASTOLIC HYPERTENSION IN NOVENA UNIVERSITY COMMUNITY",
      link: "https://drive.google.com/file/d/1zxaNzxY5oPUkVVckw6x3-GtD5Dy7KrjI/view?usp=sharing",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "This study was aimed at determining the impact of the combine effect of the application of sound(music) and vision(video)",
    },
    {
      vol: "Vol. 4 No. 5",
      title:
        "A DESCRIPTIVE SURVEY OF THE FUNCTIONALITIES OF THE WARD HEALTH SYSTEM IN AMAI AND OBIARAKU WARDS IN UKWUANI LOCAL GOVERNMENT AREA.",
      link: "https://drive.google.com/file/d/1g924GacE8obSwFqlboN5DU7YbK7x1bqc/view?usp=drive_link",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "The Federal Government of Nigeria revitalized the National Primary Health Care DevelopmentAgency and introduced the ward health service system in the year 2000 in response to the World Health Organization",
    },
    {
      vol: "Vol. 5",
      title: "HEALTH EDUCATION: A KEY STRATEGY IN HEALTH PROMOTION",
      link: "https://drive.google.com/file/d/1g924GacE8obSwFqlboN5DU7YbK7x1bqc/view?usp=drive_link",
      year: "2026",
      authors: "ANSO, NICBASSEY MAURICE",
      abstract:
        "Health is a resource for life that enables people to live individually, socially and economically, productive lives.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with Nursing Education Image */}
        <header className="relative bg-indigo-800 text-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1581093450021-4a7360e9aab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Nursing Education"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          <div className="relative z-10 p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              INTERNATIONAL SPECIALTY JOURNAL OF NURSING EDUCATION RESEARCH
            </h1>
            <p className="mt-4 text-xl text-indigo-200">
              Shaping the Future of Nursing (ISJNER)
            </p>
          </div>
        </header>

        {/* Mission & Vision */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To be the leading international platform for disseminating
              cutting-edge research and innovative practices in nursing
              education, fostering excellence in teaching, learning, and
              scholarship.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To empower educators, researchers, and policymakers worldwide to
              transform nursing education, preparing future generations of
              nurses to meet the evolving needs of global healthcare.
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-indigo-500 pl-4 mb-6">
            Target Audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Nursing Educators: Faculty and instructors at all levels",
              "Nursing Researchers: Scholars investigating education practices",
              "Nursing Students: Learners exploring innovative methods",
              "Policymakers: Leaders shaping nursing education standards",
            ].map((audience, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-indigo-50 rounded-lg"
              >
                <span className="bg-indigo-500 text-white rounded-full p-1 mr-3 mt-1">
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
                <span className="text-gray-700">{audience}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Content Focus */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-indigo-500 pl-4 mb-6">
            Content Focus
          </h2>

          {/* Original Research */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-indigo-800 mb-3">
              Original Research
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Teaching & Learning: Effective strategies and outcomes",
                "Faculty Development: Professional growth for educators",
                "Technology Integration: Digital tools in nursing education",
                "Global Education: Cross-cultural teaching approaches",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-indigo-50 p-3 rounded-lg"
                >
                  <span className="bg-indigo-200 text-indigo-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Practice Guidelines */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-indigo-800 mb-3">
              Clinical Practice Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Curriculum Development: Creating effective programs",
                "Assessment Methods: Evaluating student learning",
                "Simulation Training: Enhancing clinical skills",
                "Interprofessional Education: Collaborative learning",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-indigo-50 p-3 rounded-lg"
                >
                  <span className="bg-indigo-200 text-indigo-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Focus Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Case Studies",
                content: "Real-world examples of innovative teaching practices",
                icon: "📚",
              },
              {
                title: "Expert Opinion",
                content: "Leading perspectives on nursing education trends",
                icon: "💡",
              },
              {
                title: "Emerging Technologies",
                content: "VR, AR, and AI applications in nursing education",
                icon: "🖥️",
              },
              {
                title: "Global Perspectives",
                content: "Cross-cultural research in nursing education",
                icon: "🌐",
              },
              {
                title: "Ethical Considerations",
                content:
                  "Addressing academic integrity and cultural sensitivity",
                icon: "⚖️",
              },
              {
                title: "Quality Improvement",
                content: "Enhancing nursing education standards",
                icon: "📈",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-indigo-100 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-indigo-700 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-indigo-500 pl-4 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Rigorous Peer Review: Double-blind expert evaluation",
              "Open Access: Global availability of research",
              "Multimedia Platform: Videos, podcasts, and more",
              "International Board: Global editorial oversight",
              "Professional Events: Conferences and workshops",
              "Awards Program: Recognizing excellence in the field",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 rounded-lg border border-indigo-100"
              >
                <span className="bg-indigo-500 text-white rounded-full p-1 mr-3 mt-1">
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
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
            Call for Papers
          </h3>
          <p className="text-gray-700 mb-4">
            We welcome submissions on these themes:
          </p>
          <ul className="space-y-3">
            {[
              "Innovative Teaching Strategies",
              "Technology-Enhanced Education",
              "Global Nursing Education",
              "Education Policy & Advocacy",
              "Ethical Considerations",
            ].map((theme, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-indigo-500 text-white rounded-full p-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                <span className="text-gray-700 font-medium">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Articles Section  */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 border-l-4 border-indigo-500 pl-4 mb-6">
            Published Articles
          </h2>
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-wrap items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {article.vol}
                  </span>
                  <span className="text-sm text-gray-500">{article.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Authors:</span>{" "}
                  {article.authors}
                </p>
                <p className="text-gray-700 text-sm">{article.abstract}</p>
                <div className="mt-3">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    Read Full Article
                    <MdKeyboardArrowRight className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-indigo-800 text-white rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Contribute to Nursing Education Research
          </h3>
          <p className="mb-6 text-indigo-100">
            Join our global community of nursing educators and researchers
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-white transition duration-200"
            >
              Browse Articles
              <MdKeyboardArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link to="/publish">
              <p className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white hover:bg-indigo-700 rounded-lg font-medium text-white transition duration-200">
                Publish Your Research
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyNursingJournal;
