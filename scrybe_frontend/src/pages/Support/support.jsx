import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavbarFree";
import Help from "./Help/index";
import Hero from "./Hero/index";
import HowItWorks from "./HowItWorks/index";
import Subscribe from "./Subscribe";
import WhoWeServe from "./WhoWeServe/index";
const Support = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Help />
      <HowItWorks />
      <WhoWeServe />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Support;
