import React from "react";
import { Helmet } from "react-helmet-async";
import Help from "./Help/index";
import Hero from "./Hero/index";
import HowItWorks from "./HowItWorks/index";
import Subscribe from "./Subscribe";
import WhoWeServe from "./WhoWeServe/index";
const Support = () => {
  return (
    <div>
      <Helmet>
        <title>Support Team</title>
        <meta
          name="description"
          content="Support, get insight on our support team, Heed automatically transcribes and analyzes customer care calls that have been recorded to determine the sentiment of your customers. In order to increase operational effectiveness in your contact center, we assist you in evaluating the effectiveness and helpfulness of your customer support personnel."
        />
        <meta
          name="keywords"
          content="Support, support team, support team,
    customer service,
    technical support,
    help desk,
    customer support,
    online support,
    live support,
    24/7 support,
    customer assistance,
    support services,
    support staff,
    customer service team, technical support team
          
          "
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

export default Support;
