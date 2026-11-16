import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const ISJCHNR = () => {
  const articles = [
    {
      vol: "Vol 1",
      title:
        "A CASE STUDY OF SUDDEN OCCURENCES OF HEALTH CONCERN TO THE PUBLIC HEALTH NURSE IN THE COMMUNITY.",
      link: "https://drive.google.com/file/d/1deiO3tTaX83W9lZPPB2Xt7kmSMC24eaj/view?usp=sharing",
      year: "2026",
      authors:
        "Rose Ebieroba Ezonbodor-Akwagbe, RNM, RPHN, BSN, MED, PhD, FWACN, RSPH (U.K)",
      abstract:
        "Literature has shown that accidents claim more lives of children between ages one and fifteen than the six leading pediatrics disorders combined and 91% of all injuries to children under five occurred at home.",
    },
    {
      vol: "Vol 2",
      title:
        "PREVALENCE, TYPES AND PREDICTORS OF SEXUAL ABUSE AMONG IN-SCHOOL ADOLESCENTS IN AKWA IBOM STATE, NIGERIA: AN URBAN-RURAL QUANTITATIVE SURVEY",
      link: "https://drive.google.com/file/d/1F4mO6EKEsFmFpIhOiJ4vvhLV-MRea_oQ/view?usp=sharing",
      year: "2024",
      authors: "Akpan A. M.",
      abstract:
        "Background:Sexual abuse among adolescents is a serious public health problem.",
    },
    {
      vol: "Vol 3",
      title:
        "PERCEPTION OF THE ROLE OF TRADITIONAL HEALERS IN PRIMARY HEALTH CARE",
      link: "https://drive.google.com/file/d/1dzIzXv4-_3ljZHomMrxc_BvNiTFTr8ek/view?usp=sharing",
      year: "2024",
      authors: "O. A. OGUNYEWO, MSC [N], MSC [Med Soc], RN",
      abstract:
        "AIM: The aim of this study was to examine the contributions of traditional healers towards the activities of Primary Health Care.",
    },
    {
      vol: "Vol 4",
      title:
        "HOSPITAL NOISE AND OVERCROWDING: DETERMINING FACTORS ON PATIENTS' RECOVERY RATE",
      link: "https://drive.google.com/file/d/1dzIzXv4-_3ljZHomMrxc_BvNiTFTr8ek/view?usp=sharing",
      year: "2024",
      authors: "O. A. OGUNYEWO, MSC [N], MSC [Med Soc], RN",
      abstract:
        "AIM: The aim of this study was to examine the contributions of traditional healers towards the activities of Primary Health Care.",
    },
    {
      vol: "Vol 5",
      title:
        "THE CHALLENGES OF CONDUCTING EXPERIMENTAL RESEARCH INVOLVING HUMAN PARTICIPANTS IN A DEVELOPING SETTING LIKE NIGERIA",
      link: "https://drive.google.com/file/d/10gLnRUsQkJ_2oVPwIbB4jnflN52_SKQG/view?usp=sharing",
      year: "2026",
      authors: "Adeyinka Ganiyat Ishola. RN., M.Sc (Nursing/Bioethics)",
      abstract:
        "Research can be defined as systematic investigation, including research development, testing and evaluation that is designed to develop or contribute to generalizable knowledge.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with Community Health Image */}
        <header className="relative bg-teal-700 text-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Community Health Nursing"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          <div className="relative z-10 p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              INTERNATIONAL SPECIALTY JOURNAL OF PUBLIC AND COMMUNITY HEALTH NURSING
              RESEARCH
            </h1>
            <p className="mt-4 text-xl text-teal-100">
              Advancing Health Equity and Well-being
            </p>
          </div>
        </header>

        {/* Mission & Vision */}
        <div className="bg-teal-50 rounded-xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-teal-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To be the leading international platform for disseminating
              cutting-edge research and innovative practices in community health
              nursing, promoting health equity, well-being, and social justice.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-teal-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To empower community health nurses worldwide with evidence-based
              insights, practical tools, and innovative approaches to address
              health disparities, improve population health, and create
              healthier communities.
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">
            Target Audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Community Health Nurses: Practitioners in diverse settings",
              "Public Health Professionals: Epidemiologists and educators",
              "Researchers: Scholars investigating community health",
              "Policymakers: Leaders shaping healthcare systems",
            ].map((audience, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-teal-50 rounded-lg"
              >
                <span className="bg-teal-500 text-white rounded-full p-1 mr-3 mt-1">
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
          <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">
            Content Focus
          </h2>

          {/* Original Research */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Original Research
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Health Disparities: Social determinants and equity interventions",
                "Health Promotion: Disease prevention strategies",
                "Community Interventions: Addressing local health challenges",
                "Global Health: Cross-cultural research and solutions",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-teal-50 p-3 rounded-lg"
                >
                  <span className="bg-teal-200 text-teal-800 rounded-full p-1 mr-2">
                    •
                  </span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Practice Guidelines */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Clinical Practice Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Health Assessment: Screening and evaluation methods",
                "Case Management: Best practices for complex needs",
                "Health Education: Effective community education programs",
                "Community Partnerships: Building collaborative networks",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-teal-50 p-3 rounded-lg"
                >
                  <span className="bg-teal-200 text-teal-800 rounded-full p-1 mr-2">
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
                content: "Real-world examples of community interventions",
                icon: "📋",
              },
              {
                title: "Expert Opinion",
                content: "Leading perspectives on emerging trends",
                icon: "💡",
              },
              {
                title: "Technology",
                content: "Telehealth, mobile health, and data analytics",
                icon: "📱",
              },
              {
                title: "Global Perspectives",
                content: "Cultural sensitivity and international standards",
                icon: "🌍",
              },
              {
                title: "Patient Safety",
                content: "Quality improvement in community settings",
                icon: "🛡️",
              },
              {
                title: "Ethics",
                content: "Privacy, confidentiality, and social justice",
                icon: "⚖️",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-teal-100 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-teal-700 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-700 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Rigorous Peer Review: Double-blind expert evaluation",
              "Open Access: Global knowledge dissemination",
              "Multimedia Platform: Videos, podcasts, and forums",
              "International Board: Diverse expert oversight",
              "Professional Events: Conferences and workshops",
              "Awards Program: Recognizing excellence in the field",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 rounded-lg border border-teal-100"
              >
                <span className="bg-teal-500 text-white rounded-full p-1 mr-3 mt-1">
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
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-2xl font-semibold text-teal-900 mb-4">
            Call for Papers
          </h3>
          <p className="text-gray-700 mb-4">
            We welcome submissions on these themes:
          </p>
          <ul className="space-y-3">
            {[
              "Health Equity and Social Justice",
              "Community-Based Interventions",
              "Technology-Enabled Community Health",
              "Global Health and Nursing",
              "Ethical Considerations",
            ].map((theme, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full p-1 mr-3">
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

        {/* Submission & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Submission Guidelines
            </h3>
            <p className="text-gray-700 mb-4">
              Detailed submission guidelines including formatting requirements,
              word limits, and ethical considerations.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-200">
              View Guidelines
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Contact Information
            </h3>
            <p className="text-gray-700 mb-4">
              Reach our editorial office for inquiries and submissions.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition duration-200">
              Contact Us
            </button>
          </div>
        </div>

        {/* Articles Section - Now using the articles data */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 border-l-4 border-teal-500 pl-4 mb-6">
            Latest Articles
          </h2>
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="flex items-center gap-2 text-sm text-teal-600 mb-1">
                  <span className="font-semibold">{article.vol}</span>
                  <span>•</span>
                  <span>{article.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Authors:</span> {article.authors}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  {article.abstract.substring(0, 150)}...
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  Read Full Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-teal-700 text-white rounded-xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Community Health Nursing Network
          </h3>
          <p className="mb-6 text-teal-100">
            Contribute to advancing health equity and community well-being
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/publish"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium text-white transition duration-200"
            >
              Publish Your Article
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
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white hover:bg-teal-800 rounded-lg font-medium text-white transition duration-200"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ISJCHNR;