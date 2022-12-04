import React from "react";
import styles from "./Hero.module.scss";
import { NavLink } from "react-router-dom";
import HeroImage from "../Assets/Support-Img.svg";

const Hero = () => {
  return (
    <div className={styles.HeroContainer} id={styles.Img_container}>
      <div className={styles.HeroTexts}>
        <h1 className={styles.PageHeading}>
          Analyse Customer Support Team Call Records To Monitor Agent
          Performance
        </h1>
        <p className={styles.PageParagraph}>
          Heed automatically transcribes and analyzes customer care calls that
          have been recorded to determine the sentiment of your customers. In
          order to increase operational effectiveness in your contact center, we
          assist you in evaluating the effectiveness and helpfulness of your
          customer support personnel.
        </p>
      </div>

      <div className={styles.CTAs}>
        <NavLink to="/" className={styles.ctaDemo}>
          Login
        </NavLink>
        <NavLink to="/" className={styles.ctaStarter}>
          Try for Free
        </NavLink>
      </div>

      <div className={styles.HeroImageContainer}>
        <img src={HeroImage} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
