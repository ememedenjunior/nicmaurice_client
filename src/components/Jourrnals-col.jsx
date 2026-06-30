import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import Innovation from "../assets/journal/innovations.jpg";
import Wellspring from "../assets/journal/wellspring.jpg";
import SpecialtyCommunityJournalImg from "../assets/journal/PCH.jpg";
import SpecialtyNursingJournalImg from "../assets/journal/SpecialNurJourn.jpg";

const JournalsCol = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const journals = [
    {
      id: 1,
      image: Wellspring,
      alt: "Wellspring Journal - International Journal of Wellspring and Public Health Research",
      path: "/journal/wjwihpr",
      title: "Wellspring Journal",
      description: "Click on the read more button to get more information.",
      fullDescription: "Exploring innovative approaches to public health and well-being through interdisciplinary research and community engagement.",
      imageHeight: "h-[150px]",
      buttonMargin: "mt-[20px]",
      category: "Public Health"
    },
    {
      id: 2,
      image: Innovation,
      alt: "International Journal of Multidisciplinary Research and Innovation",
      path: "/journal/ijmri",
      title: "International Journal of Multidisciplinary Research and Innovation",
      description: "This is more than a journal, it is a platform for global dialogue on Multidisciplinary Researches ...",
      fullDescription: "A platform for global dialogue on multidisciplinary researches, fostering collaboration across diverse fields of study.",
      imageHeight: "h-[130px]",
      buttonMargin: "mt-[20px]",
      category: "Multidisciplinary"
    },
    {
      id: 3,
      image: SpecialtyCommunityJournalImg,
      alt: "International Specialty Journal of Public and Community Health Nursing Research",
      path: "/journal/isjpchnr",
      title: "International Specialty Journal of Public and Community Health Nursing Research",
      description: "Click on the read more button to get more information.",
      fullDescription: "Advancing community health nursing through evidence-based research and practical applications in public health settings.",
      imageHeight: "h-[130px]",
      buttonMargin: "mt-[45px]",
      category: "Community Health"
    },
    {
      id: 4,
      image: SpecialtyNursingJournalImg,
      alt: "International Specialty Journal of Nursing Education and Research",
      path: "/journal/isjner",
      title: "International Specialty Journal of Nursing Education and Research",
      description: "Click on the read more button to get more information.",
      fullDescription: "Shaping the future of nursing education through innovative teaching methods and cutting-edge research.",
      imageHeight: "h-[130px]",
      buttonMargin: "mt-[45px]",
      category: "Nursing Education"
    }
  ];

  const getCardMarginClasses = (index) => {
    const margins = [
      "lg:ml-[-40px]",
      "lg:ml-[15px]",
      "lg:ml-[35px]",
      "lg:ml-[65px]"
    ];
    return `ml-[10px] ${margins[index] || ""}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Public Health": "bg-green-100 text-green-800",
      "Multidisciplinary": "bg-purple-100 text-purple-800",
      "Community Health": "bg-blue-100 text-blue-800",
      "Nursing Education": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const ReadMoreButton = ({ to, children }) => (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 w-[90%] sm:w-auto group"
    >
      <span>{children}</span>
      <MdKeyboardArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
    </Link>
  );

  const JournalCard = ({ journal, index }) => (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 transform hover:scale-105 transition duration-300 w-[300px] ${getCardMarginClasses(
        index
      )}`}
      onMouseEnter={() => setHoveredId(journal.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="flex justify-center mb-4 relative">
        {journal.category && (
          <span className={`absolute top-0 right-0 text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(journal.category)}`}>
            {journal.category}
          </span>
        )}
        <img
          src={journal.image}
          alt={journal.alt}
          className={`${journal.imageHeight} object-contain`}
          loading="lazy"
        />
      </div>

      <p className="text-gray-600 text-left text-[15px] leading-relaxed">
        {hoveredId === journal.id && journal.fullDescription 
          ? journal.fullDescription 
          : journal.description}
      </p>

      <div className={journal.buttonMargin}>
        <ReadMoreButton to={journal.path}>
          Read More..
        </ReadMoreButton>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-30">
          {journals.map((journal, index) => (
            <JournalCard 
              key={journal.id} 
              journal={journal} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalsCol;