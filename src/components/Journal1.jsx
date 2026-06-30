import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ClinicalNursing from "../assets/journal/ijacn.jpg";
import MentalLand from "../assets/journal/mental.jpg";
import Maternal from "../assets/journal/maternal.jpg";
import Medical from "../assets/journal/medical.jpg";
import SpecialtyNursingJournalImg from "../assets/journal/SpecialNurJourn.jpg";

const JournalsCol2 = () => {
  const journals = [
    {
      id: 1,
      image: ClinicalNursing,
      alt: "International Journal of Advanced Clinical Nursing",
      path: "/journal/ijacn",
      title: "International Journal of Advanced Clinical Nursing",
      description: "Click on the read more button to get more information.",
      marginTop: "mt-[20px]",
      imageHeight: "h-[150px]"
    },
    {
      id: 2,
      image: MentalLand,
      alt: "International Specialty Journal of Mental Health and Psychiatric Nursing Research",
      path: "/journal/isjmpnr",
      title: "International Specialty Journal of Mental Health and Psychiatric Nursing Research",
      description: "Click on the read more button to get more information.",
      marginTop: "mt-[20px]",
      imageHeight: "h-[130px]"
    },
    {
      id: 3,
      image: Maternal,
      alt: "Maternal & Child Health Nursing Research",
      path: "/journal/mchnr",
      title: "Maternal & Child Health Nursing Research",
      description: "Click on the read more button to get more information.",
      marginTop: "mt-[45px]",
      imageHeight: "h-[130px]"
    },
    {
      id: 4,
      image: Medical,
      alt: "Medical Surgical Nursing Research",
      path: "/journal/msnr",
      title: "Medical Surgical Nursing Research",
      description: "Click on the read more button to get more information.",
      marginTop: "mt-[45px]",
      imageHeight: "h-[130px]"
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

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-30">
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
                  className={journal.imageHeight}
                  loading="lazy"
                />
              </div>

              <p className="text-gray-600 text-left text-[15px]">
                {journal.description}
              </p>

              <div className={journal.marginTop}>
                <Link
                  to={journal.path}
                  className="inline-flex items-center px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 w-[90%] sm:w-auto"
                >
                  Read More..
                  <MdKeyboardArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalsCol2;