import React from "react";
import Wellspring from "../../assets/journal/wellspring.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const WellspringJournal = () => {
  const articles = [
    {
      vol: "Vol 1",
      title:
        "THE IMPACT OF SIMULATION ON SIMULATED PATIENTS AMONG MEDICAL STUDENTS",
      link: "https://drive.google.com/file/d/1LnjBwDbLTaQQTSuzNMLLVoiDnQ_oJNFY/view?usp=sharing",
      year: "2026",
      authors: "Isaac Newton Omoregbe (BSc, MBBS, MWACP) 1, 3",
      abstract:
        "To supplement or replace real life experience with guided experiences, simulation-based education is a training or instructional strategy.",
    },
    {
      vol: "Vol 2",
      title: "SUBSTANCE ABUSE AMONG SENIOR SECONDARY SCHOOL ADOLESCENTS IN OSOGBO METROPOLIS, OSUN STATE",
      link: "https://drive.google.com/file/d/1l2Oc06RSlp-giri7ZYGnA7cAtat64F-4/view?usp=sharing",
      year: "2026",
      authors: "OLUKOREDE PATRICIA ADISA RN, MSc,",
      abstract:
        'This study examined the socio-psychological correlates of ubstance abuse among the senior secondary school adolescents in Osogbo metropolis, Osun State, Nigeria.',
    },
    {
      vol: "Vol 3",
      title:
        "RELATIONSHIP BETWEEN BODY MASS INDEX, WAIST-HIP RATIO, AND CARRYING ANGLE AMONG HEALTHY FEMALE POPULATION IN A TERTIARY INSTITUTION",
      link: "https://drive.google.com/file/d/1jPVJO0TU-xOylst8M-31IgDLg-94c-v4/view?usp=sharing",
      year: "2026",
      authors: "Enemuo Emeka Hyacinth a, Edeh Rita Uchenna",
      abstract:
        "Overweight among female adolescent is a pressing issue globally.",
    },
    {
      vol: "Vol. 4",
      title:
        "PERCEPTION OF THE ROLE OF TRADITIONAL HEALERS IN PRIMARY HEALTH CARE",
      link: "https://drive.google.com/file/d/1eRihq0zDGII-hcNLfCJSexjkr26uGpKF/view?usp=sharing",
      year: "2026",
      authors: "O. A. OGUNYEWO MSc [N], MSc [Med Soc], RN,",
      abstract:
        "The aim of this study was to examine the contributions of traditional healers towards the activities of Primary Health Care.",
    },

    {
      vol: "Vol. 5",
      title: "INFECTION PREVENTION AND CONTROL PRACTICES AMONG PUBLIC AND PRIVATE HEALTHCARE WORKERS IN PORT HARCOURT LOCAL GOVERNMENT AREA,",
      link: "https://drive.google.com/file/d/1g924GacE8obSwFqlboN5DU7YbK7x1bqc/view?usp=drive_link",
      year: "2026",
      authors: "Chimaobi Benjamin Odo1, Bethel Chibuike Nwaogu2",
      abstract:
        "Strict adherence to IPC protocol is essential to patient safety and quality of care. In Nigeria, prevalence of HAIs remain as high as 14 to 49%.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Journal Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-800">
            THE WELLSPRING JOURNAL OF HOLISTIC INTEGRATIVE HEALTH CARE RESEARCH
          </h1>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mb-12">
          <img
            src={Wellspring}
            alt="Holistic Integrative Health Care"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Healthcare Approaches */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-teal-700 mb-6">Healthcare Approaches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Allopathic Medicine",
                items: [
                  "General Practice",
                  "Internal Medicine",
                  "Surgery",
                  "Pediatrics",
                  "Obstetrics and Gynecology",
                  "Psychiatry",
                  "Dermatology",
                  "Cardiology",
                  "Oncology",
                  "Radiology"
                ]
              },
              {
                title: "Complementary Medicine",
                items: [
                  "Acupuncture",
                  "Chiropractic care",
                  "Massage therapy",
                  "Meditation and mindfulness",
                  "Yoga",
                  "Tai chi",
                  "Qigong",
                  "Herbal medicine",
                  "Aromatherapy",
                  "Reflexology"
                ]
              },
              {
                title: "Alternative Medicine",
                items: [
                  "Homeopathy",
                  "Naturopathy",
                  "Ayurveda",
                  "Traditional Chinese Medicine (TCM)",
                  "Unani medicine",
                  "Anthropomorphic medicine",
                  "Osteopathy",
                  "Chiropractic radiology"
                ]
              },
              {
                title: "Integrative Medicine",
                description: "Combines Conventional Western medicine with evidence-based complementary therapies. Focuses on holistic approach, patient-centered care, and prevention."
              }
            ].map((approach, index) => (
              <div key={index} className="bg-teal-50 p-6 rounded-lg border border-teal-100">
                <h3 className="font-semibold text-teal-700 mb-3">{approach.title}</h3>
                {approach.items ? (
                  <ul className="space-y-2">
                    {approach.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-teal-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{approach.description}</p>
                )}
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-6">
            Note: Some practices may overlap between categories, and some may be controversial or not widely accepted. 
            This list aims to provide a comprehensive overview, but it is not exhaustive.
          </p>
        </div>

        {/* Journal Profile */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-teal-700 mb-6">Journal Profile</h2>

          {/* Mission */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To bridge the gap between conventional and complementary healthcare by publishing rigorous, peer-reviewed research that explores the efficacy, safety, and mechanisms of action of wholistic integrative health care approaches. We aim to provide a platform for evidence-based knowledge that empowers both practitioners and individuals to make informed decisions about their health and well-being.
            </p>
          </div>

          {/* Scope */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Scope</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Wellspring welcomes original research articles, reviews, case studies, commentaries, and perspectives that address a wide range of topics within the realm of wholistic integrative health care, including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Traditional Medicine Systems",
                  content: "Ayurveda, Traditional Chinese Medicine, Traditional Korean Medicine, Traditional Japanese Medicine, Traditional African Medicine, and other indigenous healing practices."
                },
                {
                  title: "Mind-Body Therapies",
                  content: "Yoga, Meditation, Mindfulness, Hypnotherapy, Tai Chi, Qigong, and other practices that integrate the mind and body."
                },
                {
                  title: "Natural Therapies",
                  content: "Herbal Medicine, Homeopathy, Aromatherapy, Naturopathy, and other therapies that utilize natural substances and practices."
                },
                {
                  title: "Lifestyle Interventions",
                  content: "Nutrition, Exercise, Stress Management, Sleep Hygiene, and other lifestyle factors that contribute to overall health and well-being."
                },
                {
                  title: "Integrative Oncology & Cardiology",
                  content: "Research exploring the role of complementary and alternative therapies in managing chronic conditions alongside conventional treatments."
                },
                {
                  title: "Health Disparities",
                  content: "Research examining the impact of social factors on health outcomes and the role of integrative health care in addressing health disparities."
                }
              ].map((topic, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-teal-100 text-teal-700 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-700">{topic.title}</h4>
                    <p className="text-gray-700">{topic.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Target Audience</h3>
            <p className="text-gray-700 leading-relaxed">
              The Wellspring is intended for researchers, clinicians, educators, policymakers, healthcare professionals, and consumers interested in the latest scientific evidence on wholistic integrative health care. We aim to reach a diverse audience, including those working in conventional medicine, complementary and alternative medicine, and public health.
            </p>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-semibold text-teal-700 mb-4">Values</h3>
            <div className="space-y-6">
              {[
                {
                  title: "Rigorous Research",
                  content: "We prioritize high-quality research that adheres to ethical and methodological standards, ensuring the reliability and validity of published findings."
                },
                {
                  title: "Open Access",
                  content: "We believe in making knowledge freely available to all, promoting the dissemination of research findings and fostering collaboration within the field."
                },
                {
                  title: "Interdisciplinary Collaboration",
                  content: "We encourage collaboration between researchers from diverse fields to foster a holistic understanding of health and well-being."
                },
                {
                  title: "Patient-Centered Care",
                  content: "We emphasize the importance of patient-centered care, recognizing the individual needs and preferences of patients in their health journey."
                },
                {
                  title: "Diversity and Inclusion",
                  content: "We are committed to promoting diversity and inclusion within the field of wholistic integrative health care, ensuring that research reflects the experiences and perspectives of all individuals."
                }
              ].map((value, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-6">
                  <h4 className="font-semibold text-teal-700 mb-2">{value.title}</h4>
                  <p className="text-gray-700">{value.content}</p>
                </div>
              ))}
            </div>
          </div>
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

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            to="/articles" 
            className="inline-flex items-center px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-lg transition duration-200"
          >
            Explore Published Articles
            <MdKeyboardArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WellspringJournal;