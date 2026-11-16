import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstituteCol from "../components/Institute";
import InstituteCol2 from "../components/Institute1";
import InstituteCol3 from "../components/Institute3";

const Institute = () => {
  return (
    <>
      <Header />
      <h1 className="text-[40px] ml-[30px] lg:ml-[300px] font-bold lg:mt-[18px] mb-[-70px] lg:mb-[-30px]">
        International Bodies
      </h1>
     <div className="mt-[60px]">
     <InstituteCol />
     <InstituteCol2 />
     <InstituteCol3 />
     </div>
      <Footer />
    </>
  );
};

export default Institute;
