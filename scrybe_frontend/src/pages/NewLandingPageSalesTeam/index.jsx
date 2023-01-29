import React from "react";
import { Helmet } from "react-helmet-async";
import Help from "./Help/index";
import Hero from "./Hero/index";
import HowItWorks from "./HowItWorks/index";
import Subscribe from "./Subscribe";
import WhoWeServe from "./WhoWeServe/index";
const NewLandingPageSalesTeam = () => {
  return (
    <div>
      <Helmet>
        <title>Sales Team</title>
        <meta
          name="description"
          content="Sales, get insight on our sales team, A happier customer equals an improved customer retention and an increase in revenue. At Heed, we partner with you for the optimum satisfaction of your customers and assist you in evaluating the effectiveness of your sales team."
        />
        <meta
          name="keywords"
          content="Sales, sales team, sales team, sales representatives, sales staff, sales force, account managers, sales support, sales assistance, sales department, business development, sales management "
        />
      </Helmet>
      <Hero />
      <Help />
      <HowItWorks />
      <WhoWeServe />
      <Subscribe />
    </div>
  );
};

export default NewLandingPageSalesTeam;
