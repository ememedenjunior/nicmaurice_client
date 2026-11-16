import { MdKeyboardArrowRight } from "react-icons/md";
import Commonwealth from "../assets/Commonwealth.jpg";
import Cone from "../assets/CONE.jpg";
import NAN from "../assets/institute/nan.jpeg";
import NSU from "../assets/institute/NSU.jpg";
import { Link } from "react-router-dom";

const InstituteCol = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[-30px]">
          <div className="bg-white p-6 rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[-40px]">
            <div className="flex justify-center mb-4">
              <img
                src={Commonwealth}
                alt="commonwealth"
                className="h-[150px]"
              />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              Click on the read more button to get more information.
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/commonwealth">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* International journal of multidisciplinary researches and innovation */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[15px] w-[300px]">
            <div className="flex justify-center mb-4">
              <img
                src={Cone}
                alt="Counsel of nursing elders"
                className="h-[130px]"
              />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              This is more than a journal, it is a platform for global dialogue
              on Multidiciplinary Researches ...
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/cne">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[35px] w-[300px]">
            <div className="flex justify-center mb-4">
              <img
                src={NAN}
                alt="Nursing Academy of Nigeria"
                className="h-[130px]"
              />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              Click on the read more button to get more information.
            </p>

            <div className="mt-[45px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/nan">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[70px] w-[300px]">
            <div className="flex justify-center mb-4">
              <img
                src={NSU}
                alt="innovation journal"
                className="h-[130px]"
              />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              Click on the read more button to get more information.
            </p>

            <div className="mt-[45px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/nsu">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstituteCol;
