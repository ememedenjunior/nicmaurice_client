// import Agric from "../assets/institute/agric.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import Health from "../assets/institute/health.jpg";
import Nursing from "../assets/institute/nursing.jpg";
import League from "../assets/institute/LEAGUE.jpg";
import Research from "../assets/institute/research.jpg";
import Agriculture from "../assets/institute/Agric.jpg";
import { Link } from "react-router-dom";

const Unions = () => {
  return (
    <section className="bg-gray-100 mt-[60px] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex  item-center justify-center">
            {/* <div className="bg-blue-600 border rounded-lg h-[7px] w-[100px] mt-[17px] mr-[7px]"></div> */}
            <h2 className="text-2xl font-bold text-blue-600 font-mono">
              Our Institutes | Foundations | Unions | Leagues | Councils |
              Communities
            </h2>
            {/* <div className="bg-blue-600 border rounded-lg h-[7px] w-[100px] mt-[17px] ml-[7px]"></div> */}
          </div>
          <p className="mt-4 text-gray-900">
            Articulated a culture of care for both caregivers and their clients,
            achieving outstanding results <br /> and building greater
            confidence, creativity and resourcefulness.
          </p>
        </div>{" "}
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-[80px] w-[1100px]">
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-[300px] h-[300px]">
            <div className="flex justify-center mb-4">
              <img src={Health} alt="health" />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              To advance scientific knowledge and innovation in health,
              improving the lives of individuals ...
            </p>

            <div className="mt-[14px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/health">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* Warehousing */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-[300px] h-[300px] ml-[10px] lg:ml-[50px]">
            <div className="flex justify-center mb-4">
              <img src={Research} alt="health" className="h-[100px]" />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              This is a collaborative platform for nursing research and
              education, established as a non-profit organization ...
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/research">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-[300px] h-[300px] ml-[10px] lg:ml-[95px]">
            <div className="flex justify-center mb-4">
              <img src={Nursing} alt="health" />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              This foundation to further enhance the organization and contribute
              to the global advancement of nursing ...
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/inf">Read More..</Link>
                <span className="mt-[5px]">
                  <MdKeyboardArrowRight />
                </span>
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 w-[300px] h-[300px] ml-[10px] lg:ml-[140px]">
            <div className="flex justify-center mb-4">
              <img src={Agriculture} alt="institute of agriculture" />
            </div>

            <p className="text-gray-600 text-left text-[15px]">
              A a non-profit organization dedicated to promoting best practices
              in group farming and agricultural enterprises...
            </p>

            <div className="mt-[20px]">
              <button
                type="submit"
                className="w-[90%] sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
              >
                <Link to="/agriculture">Read More..</Link>
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

export default Unions;
