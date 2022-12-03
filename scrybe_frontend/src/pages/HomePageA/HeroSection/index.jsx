import React from "react";
import styles from "./hero.module.scss";
import heroImage from "./assets/Group 1000000899.webp";
import curves from "./assets/Vector 13.webp";
import { NavLink } from "react-router-dom";

function Hero(isHomePageA) {
  isHomePageA = true;
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heroH1}>
            Analyze and extract data from your customer support interactions to
            drive higher customer satisfaction.
          </h1>
          <div className={styles.heroImageB}>
            <img src={heroImage} alt="" srcSet="" />
          </div>
          <p className={styles.heroText}>
            We help businesses unlock insights and extract meaningful data from
            your customer support conversations{" "}
          </p>
          <div className={styles.CTAs}>
            <NavLink to="/demos" className={styles.ctaDemo}>
              Request a Demo
            </NavLink>
            <NavLink to="/signin" className={styles.ctaStarter}>
              Get Started
            </NavLink>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="" srcSet="" />
        </div>
      </div>
      <img src={curves} alt="" srcset="" className={styles.curves} />
    </section>
  );
}
export default Hero;
