import React from "react";
import styles from "./Hero.module.scss";
import { NavLink } from "react-router-dom";
// import HeroImage from "../Assets/heroImage.png";

const Hero = () => {
  return (
    <div className={styles.HeroContainer} id={styles.Img_container}>
      <div className={styles.HeroTexts}>
        <h1 className={styles.PageHeading}>
          Analyze sales team call record to understand customer feedback and
          boost sales
        </h1>
        <p className={styles.PageParagraph}>
          A happier customer equals an improved customer retention and an
          increase in revenue. At Heed, we partner with you for the optimum
          satisfaction of your customers and assist you in evaluating the
          effectiveness of your sales team.
        </p>
      </div>

      <div className={styles.CTAs}>
        <NavLink to="/create-account" className={styles.ctaStarter}>
          Get Started
        </NavLink>
      </div>

      <div className={styles.HeroImageContainer}>
        <img
          src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584269/heroImage_dvxi3m.webp"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default Hero;
