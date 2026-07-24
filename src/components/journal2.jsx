import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Global from "../assets/journal/grjmp.jpg";

const JournalsCol3 = () => {
  const journals = [
    {
      id: 1,
      image: Global,
      alt: "Global Research Journal on Midwifery Practice",
      path: "/journal/grjmp",
      title: "Global Research Journal on Midwifery Practice",
      description:
        "Our journal stands at a pivotal moment in the evolution of midwifery practice research.",
      imageHeight: "h-[150px]",
      imageWidth: "w-auto",
    },
  ];
  const getCardMarginClasses = (index) => {
    const margins = [
      "lg:ml-[-40px]",
      "lg:ml-[15px]",
      "lg:ml-[35px]",
      "lg:ml-[65px]",
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
                index,
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

export default JournalsCol3;
