import { MdKeyboardArrowRight } from "react-icons/md";
import League from "../assets/institute/LEAGUE.jpg";
import IntegratedHealth from "../assets/IntergratedHealth.jpg"
import Maurice from "../assets/maurice.jpg";
import Jani from "../assets/institute/Jani.jpeg";
import { Link } from "react-router-dom";

const InstituteCol2 = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[-30px]">
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-[300px] h-[320px] ml-[10px] lg:ml-[-30px]">
            <div className="flex justify-center mb-4">
              <img src={League} alt="health" className="h-[120px]" />
            </div>

            <p className="text-gray-600 text-left mt-[17px] text-[15px]">
              a platform designed to foster collaboration and growth among our
              dedicated team of editors ...
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/nml">Read More..</Link>
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
                src={IntegratedHealth}
                alt="Integrated Health Consultancy and nursing services"
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
                <Link to="/ihcns">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[35px] w-[300px]">
            <div className="flex justify-center mb-4">
              <img
                src={Maurice}
                alt="Nic Maurice company"
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
                <Link to="/nmc">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ml-[10px] lg:ml-[70px] w-[300px]">
            <div className="flex justify-center mb-4">
              <img
                src={Jani}
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
                <Link to="/jani">Read More..</Link>
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

export default InstituteCol2;
