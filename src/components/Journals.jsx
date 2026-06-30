import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Nursing from "../assets/journal/nursing.jpg";
import Multidisciplinary from "../assets/journal/multidisciplinary.jpg";
import Professional from "../assets/journal/professional.jpg";
import Community from "../assets/journal/community.jpg";

const Journals = ({ head }) => {
  const journals = [
    {
      id: 1,
      image: Community,
      alt: "International Research Journal of Public and Community Health",
      path: "/journal/irjpch",
      title: "International Research Journal of Public and Community Health",
      description: "Our journal stands at a pivotal moment in the evolution of public and community health research.",
      imageHeight: "h-[150px]",
      imageWidth: "w-auto"
    },
    {
      id: 2,
      image: Nursing,
      alt: "International Journal of Advanced Nursing Research",
      path: "/journal/ijanr",
      title: "International Journal of Advanced Nursing Research",
      description: "A call to revolutionize the journal, to transform it into a platform that truly reflects the global landscape of nursing, its challenges.",
      imageHeight: "h-[130px]",
      imageWidth: "w-[400px]"
    },
    {
      id: 3,
      image: Professional,
      alt: "International Professional Nursing Journal",
      path: "/journal/ipnj",
      title: "International Professional Nursing Journal",
      description: "IPNJ has been a beacon of nursing knowledge and innovation for over two decades, serving as a vital resource for nurses worldwide.",
      imageHeight: "h-[140px]",
      imageWidth: "w-auto"
    },
    {
      id: 4,
      image: Multidisciplinary,
      alt: "International Research Journal of Multidisciplinary and Public Health",
      path: "/journal/irjmpch",
      title: "International Research Journal of Multidisciplinary and Public Health",
      description: "Representing diverse disciplines and expertise, you are the pillars of our journal's success. we acknowledge the vast scope ...",
      imageHeight: "h-[130px]",
      imageWidth: "w-auto"
    }
  ];

  const getCardMarginClasses = (index) => {
    const margins = [
      "lg:ml-[-40px]",
      "lg:ml-[6px]",
      "lg:ml-[35px]",
      "lg:ml-[70px]"
    ];
    return `ml-[10px] ${margins[index] || ""}`;
  };

  const SectionHeader = () => (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center">
        <div className="bg-blue-600 border rounded-lg h-[7px] w-[100px] mt-[17px] mr-[7px]" aria-hidden="true"></div>
        <h2 className="text-4xl font-bold text-gray-800 font-mono">
          Our Exclusive Journals
        </h2>
        <div className="bg-blue-600 border rounded-lg h-[7px] w-[100px] mt-[17px] ml-[7px]" aria-hidden="true"></div>
      </div>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Gain access to all exclusive and premium journals from scholars
        around the globe in a single repository
      </p>
    </div>
  );

  const ReadMoreButton = ({ to, children }) => (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 w-[90%] sm:w-auto group"
    >
      <span>{children}</span>
      <MdKeyboardArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
    </Link>
  );

  const ViewAllButton = () => (
    <div className="mt-[40px] lg:ml-[470px] ml-[10px]">
      <Link
        to="/journal"
        className="inline-flex items-center justify-center px-5 lg:px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 w-[95%] lg:w-[41%] group"
      >
        <span>Get more Premium journals here</span>
        <MdKeyboardArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        {!head && <SectionHeader />}

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[80px]">
          {journals.map((journal, index) => (
            <div
              key={journal.id}
              className={`bg-white p-6 rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 transform hover:scale-105 transition duration-300 w-[300px] ${getCardMarginClasses(
                index
              )}`}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={journal.image}
                  alt={journal.alt}
                  className={`${journal.imageHeight} ${journal.imageWidth} object-contain`}
                  loading="lazy"
                />
              </div>

              <p className="text-gray-600 text-left text-[15px] leading-relaxed">
                {journal.description}
              </p>

              <div className="mt-[20px]">
                <ReadMoreButton to={journal.path}>
                  Read More..
                </ReadMoreButton>
              </div>
            </div>
          ))}
        </div>

        {/* Real-Time Tracking Section */}
        {!head && <ViewAllButton />}
      </div>
    </section>
  );
};

export default Journals;