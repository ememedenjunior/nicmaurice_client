import React from "react";
import Health from "../../assets/institute/health.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MdKeyboardArrowRight } from "react-icons/md";

const HealthInstitute = () => {
  return (
    <>
      <Header />

      <div className="mt-[100px] ml-[30px] lg:ml-[100px] mb-[30px]">
        <div>
          <h1 className="text-[30px] font-bold underline">
            HEALTH RESEARCH INSTITUTE(HRI)
          </h1>
        </div>
        <div className="mt-[60px]">
          <img
            src={Health}
            alt="health institute"
            className="w-[600px] lg:w-[900px] h-[300px] lg:h-[400px]"
          />
        </div>
        <div className="w-[300px] lg:w-[1000px] mt-[25px] text-[17px] font-mono">
          <p className="text-gray-600 text-[20px] leading-[2px] mb-[20px] font-mono mt-[30px]">
            <i>Profile</i>
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Mission:</i>
            </span>{" "}
            To advance scientific knowledge and innovation in health, improving
            the lives of individuals and communities worldwide.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Vision</i>
            </span>{" "}
            To be a global leader in health research, driving breakthroughs that
            transform healthcare and enhance human well-being.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Values:</i>
            </span>{" "}
            Excellence: We strive for the highest standards in research,
            education, and service.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Integrity: </i>
            </span>{" "}
            We uphold ethical principles and conduct our work with transparency
            and accountability.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Collaboration: </i>
            </span>{" "}
            We foster partnerships and collaborations to achieve shared goals.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Impact: </i>
            </span>{" "}
            We are committed to translating our research into real-world
            applications that benefit society.
          </p>
          <h3 className="font-semibold text-[15px] mt-[15px]">
            <i>Key Areas of Focus:</i>
          </h3>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Cancer Research: </i>
            </span>{" "}
            We are dedicated to understanding the causes, prevention, diagnosis,
            and treatment of cancer.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Our researchers: </i>
            </span>{" "}
            are working on developing new therapies, improving early detection
            methods, and exploring personalized medicine approaches.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Infectious Disease: </i>
            </span>{" "}
            We are committed to combating infectious diseases through research
            on emerging pathogens, vaccine development, and antimicrobial
            resistance.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Our Work: </i>
            </span>{" "}
            aims to protect public health and prevent outbreaks.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Mental Health: </i>
            </span>{" "}
            We are focused on advancing research in mental health, including
            understanding the brain, developing new treatments for mental
            illnesses, and promoting mental well-being.
          </p>

          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> Our Goal: </i>
            </span>{" "}
            is to reduce the stigma associated with mental health and improve
            access to care.
          </p>

          <h3 className="font-semibold text-[15px] mt-[15px]">
            <i>Research Programs: </i>
          </h3>

          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> The Cancer Immunotherapy Program: </i>
            </span>{" "}
            This program focuses on developing novel immunotherapies to treat
            cancer by harnessing the power of the immune system.
          </p>
          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> The Global Health Initiative: </i>
            </span>{" "}
            This initiative supports research projects in low- and middle-income
            countries, addressing health challenges such as infectious diseases,
            maternal and child health, and nutrition.
          </p>

          <p className="mt-[15px]">
            {" "}
            <span className="font-semibold">
              <i> The Brain Research center: </i>
            </span>{" "}
            This center brings together researchers from various disciplines to
            study the brain and its functions, with the aim of developing new
            treatments for neurological disorders.
          </p>

          <h3 className="font-semibold text-[15px] mt-[15px]">
            <i>Partnerships: </i>
          </h3>

          <p className="mt-[15px]">
            We collaborate with leading universities, hospitals, and research
            institutions worldwide.
          </p>
          <p className="mt-[15px]">
            We have strong partnerships with government agencies, foundations,
            and industry partners.
          </p>

          <p className="mt-[15px]">
            We actively participate in international research consortia and
            networks.
          </p>

          <h3 className="font-semibold text-[15px] mt-[15px]">
            <i>Impact: </i>
          </h3>

          <p className="mt-[15px]">
            Our research has led to the development of new drugs and therapies
            that have improved patient outcomes.
          </p>
          <p className="mt-[15px]">
            We have published numerous groundbreaking research articles in top
            scientific journals.
          </p>

          <p className="mt-[15px]">
            We have secured patents for innovative technologies and discoveries.
          </p>
          <p className="mt-[15px]">
            Our research has informed public health policies and guidelines.
          </p>
        </div>
        <div className="mt-[40px] mb-[30px]">
          <button
            type="submit"
            className="w-[50%] lg:w-full sm:w-auto px-6 py-2 bg-gray-200 text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 flex"
          >
            For enquiries, Call us now{" "}
            <span className="mt-[5px]">
              <MdKeyboardArrowRight />
            </span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HealthInstitute;
