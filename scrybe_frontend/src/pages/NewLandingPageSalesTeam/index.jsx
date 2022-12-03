import React from "react";
import Hero from "./Hero/index";
import Help from "./Help/index";
import HowItWorks from "./HowItWorks/index";
import WhoWeServe from "./WhoWeServe/index";
import Subscribe from "./Subscribe";
import Footer from "../../components/footer/index";
import Navbar from "../../components/navBar_free/index";
const NewLandingPageSalesTeam = () => {
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

export default NewLandingPageSalesTeam;
