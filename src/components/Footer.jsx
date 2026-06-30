import React from "react";
import { BiPhone, BiEnvelope, BiMap } from "react-icons/bi";

function Card2Row({
  title,
  text,
  icon,
  iconContainerClassName = "",
  hasBottomBorder,
}) {
  return (
    <div
      className={`flex ${
        hasBottomBorder ? "pb-3 border-b border-[#E3E3E3]" : ""
      }`}
    >
      <div
        className={`flex h-10 w-6 items-center justify-center rounded-lg shadow-md ${iconContainerClassName}`}
      >
        {icon}
      </div>
      <div className="text-left ml-2.5">
        <p className="text-xs text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{text}</p>
      </div>
    </div>
  );
}

function CardRow() {
  return (
    <div className="mt-[-350px] lg:mt-0 flex flex-col gap-3 p-7 rounded-2xl bg-white">
      <Card2Row
        title="Phone"
        text="+234 802 311 3691, +234 815 114 4603, +234 906 552 6881"
        iconContainerClassName="bg-[#fcf4ff]"
        icon={<BiPhone size="1.2rem" className="text-[#D566FF]" />}
        hasBottomBorder
      />
      <Card2Row
        title="Email"
        text="nicmauricecollege@gmail.com"
        iconContainerClassName="bg-[#fefaf0]"
        icon={<BiEnvelope size="1.2rem" className="text-[#DDA10C]" />}
        hasBottomBorder
      />
      <Card2Row
        title="Address"
        text="#1 Farm Road, Mbawa Avenue, Amamong, Okobo, Akwa Ibom State, Nigeria."
        iconContainerClassName="bg-[#fff4f4]"
        icon={<BiMap size="1.2rem" className="text-[#FF6080]" />}
      />

      <Card2Row
        title="Rc Number"
        text="1449965"
        iconContainerClassName="bg-[#fff4f4]"
        icon={<BiMap size="1.2rem" className="text-[teal]" />}
      />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center flex-col lg:justify-around lg:flex-row md:grid-cols-3 gap-[400px]">
          {/* Company Info */}
          <div>
            <h3 className="text-[25px] font-semibold mb-4 text-blue-600">
              NicMaurice Colleges
            </h3>
            <p className="text-gray-400 mt-[-18px]">
              Empowering the new generation of scholars across the globe
            </p>
            <div className="mt-7">
              <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
              <p className="text-gray-400 mt-[-18px]">
                Follow us on social media or subscribe to <br /> our newsletter
                to stay updated on our latest services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.04c-5.52 0-9.96 4.48-9.96 10s4.44 10 9.96 10 9.96-4.48 9.96-10-4.44-10-9.96-10zm4.56 10.02h-2.25v7.5h-3v-7.5h-1.5v-2.25h1.5v-1.71c0-1.35.81-2.55 2.5-2.55h1.88v2.19h-1.12c-.9 0-1.08.43-1.08 1.06v1.41h2.25l-.36 2.25z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.04c-5.52 0-9.96 4.48-9.96 10s4.44 10 9.96 10 9.96-4.48 9.96-10-4.44-10-9.96-10zm3.8 15.42v-5.12l-3.48 2.06-3.48-2.06v5.12h-2.4v-8.4h2.4l3.48 2.06 3.48-2.06h2.4v8.4h-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.04c-5.52 0-9.96 4.48-9.96 10s4.44 10 9.96 10 9.96-4.48 9.96-10-4.44-10-9.96-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-9c-2.22 0-4 1.78-4 4s1.78 4 4 4 4-1.78 4-4-1.78-4-4-4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <CardRow />
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2025 NicMaurice College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
