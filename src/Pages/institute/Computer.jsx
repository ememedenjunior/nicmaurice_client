import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ICVSPage = () => {
  const computerPrograms = [
    {
      title: "Software Development",
      description:
        "Students gain expertise in programming languages, software design, and development methodologies, preparing them for careers as software engineers, web developers, and mobile app developers.",
    },
    {
      title: "Cybersecurity",
      description:
        "The institute offers specialized training in cybersecurity principles, network security, ethical hacking, and incident response, equipping students to protect organizations from cyber threats.",
    },
    {
      title: "Data Analytics",
      description:
        "Students learn to analyze large datasets, extract meaningful insights, and use data-driven decision-making, preparing them for careers in data science, business intelligence, and research.",
    },
    {
      title: "Artificial Intelligence",
      description:
        "The institute explores the exciting world of AI, covering topics like machine learning, deep learning, and natural language processing, preparing students for careers in AI development and research.",
    },
  ];

  const vocationalPrograms = [
    {
      title: "Automotive Technology",
      description:
        "Students gain hands-on experience in automotive repair, maintenance, and diagnostics, preparing them for careers as mechanics, technicians, and service advisors.",
    },
    {
      title: "Welding Technology",
      description:
        "The institute provides comprehensive training in welding techniques, safety procedures, and industry standards, preparing students for careers in construction, manufacturing, and fabrication.",
    },
    {
      title: "Construction Technology",
      description:
        "Students learn about building codes, construction materials, and project management, preparing them for careers in construction management, carpentry, and plumbing.",
    },
    {
      title: "Other Trades",
      description:
        "The institute offers training in electrical technology, HVAC, and plumbing, providing students with the skills to enter a wide range of industries.",
    },
  ];

  const coreCourses = [
    "Programming Fundamentals (C++, Java, Python)",
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Software Engineering Principles",
    "Database Management Systems",
    "Web Development (HTML, CSS, JavaScript)",
    "Mobile App Development (Android, iOS)",
  ];

  const specializationTracks = [
    {
      name: "Web Development",
      details:
        "Advanced JavaScript frameworks (React, Angular, Vue.js), backend development (Node.js, PHP), web security, user experience design.",
    },
    {
      name: "Mobile App Development",
      details:
        "Advanced Android and iOS development, cross-platform development (React Native, Flutter), mobile game development.",
    },
    {
      name: "Data Science",
      details:
        "Machine learning, deep learning, data visualization, statistical analysis, big data technologies.",
    },
    {
      name: "Cybersecurity",
      details:
        "Network security, ethical hacking, penetration testing, incident response, cryptography.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-900 text-white py-8 shadow-md">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              INSTITUTE OF COMPUTER AND VOCATIONAL STUDIES (ICVS)
            </h1>
            <p className="text-xl opacity-90">
              Nic Maurice Colleges of Health Management Science and Technology
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Vision Section */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-4">
              A Detailed Profile: A Vision for the Future
            </h1>

            <p className="mb-4 text-gray-700">
              The Institute of Computer and Vocational Studies (ICVS) at Nic
              Maurice Colleges is a bold step forward, reflecting the
              institution's commitment to preparing students for the dynamic and
              ever-evolving job market. This new institute is designed to be a
              hub of innovation, providing students with the skills and
              knowledge they need to thrive in the 21st century.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                A Multifaceted Approach
              </h2>
              <p className="text-gray-700">
                The ICVS offers a comprehensive range of programs, catering to
                diverse interests and career aspirations. The institute's
                curriculum is carefully crafted to provide a blend of
                theoretical knowledge and practical skills, ensuring graduates
                are well-prepared for the demands of the workplace.
              </p>
            </div>
          </section>

          {/* Computer Science Programs */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-6">
              Computer Science & Technology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {computerPrograms.map((program, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Vocational Programs */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-6">
              Vocational Trades
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vocationalPrograms.map((program, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Commitment to Excellence */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4">
              A Commitment to Excellence
            </h2>

            <ul className="space-y-3 list-disc pl-5 text-gray-700">
              <li>
                <strong>Industry-Driven Curriculum:</strong> Programs are
                developed in close collaboration with industry partners,
                ensuring the curriculum is relevant to current and future job
                market demands.
              </li>
              <li>
                <strong>Hands-on Learning:</strong> The institute emphasizes
                practical experience through state-of-the-art labs, workshops,
                and real-world projects.
              </li>
              <li>
                <strong>Experienced Instructors:</strong> The ICVS boasts a team
                of highly qualified and experienced instructors with extensive
                industry experience.
              </li>
              <li>
                <strong>Career Support:</strong> Comprehensive career support
                services including counseling, job placement assistance, and
                networking opportunities.
              </li>
            </ul>

            <p className="mt-4 text-gray-700">
              The ICVS at Nic Maurice Colleges is a beacon of innovation,
              providing students with the skills and knowledge they need to
              succeed in a rapidly changing world.
            </p>
          </section>

          {/* Expanded Courses */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-6">
              Expanded Sub-Program Courses and Content
            </h1>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              I. Computer Studies
            </h2>
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              A. Software Development
            </h3>

            <h4 className="font-medium text-gray-700 mb-2">Core Courses:</h4>
            <ul className="space-y-2 list-disc pl-5 mb-6 text-gray-700">
              {coreCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>

            <h4 className="font-medium text-gray-700 mb-2">
              Specialization Tracks:
            </h4>
            <div className="space-y-4">
              {specializationTracks.map((track, index) => (
                <div key={index} className="pl-4">
                  <p className="font-semibold text-blue-800">{track.name}:</p>
                  <p className="text-gray-600 pl-4">{track.details}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ICVSPage;
