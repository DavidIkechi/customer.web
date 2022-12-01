import React from "react";
import styles from "./hero.module.scss";
import heroImage from "./assets/Group 1000000899.webp";
import curves from "./assets/Vector 13.webp";

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
            {isHomePageA === true ? (
              <>
                <a href="/dashboard" className={styles.ctaDemo}>
                  Request a Demo
                </a>
                <a href="/transcriptions" className={styles.ctaStarter}>
                  Get Started
                </a>
              </>
            ) : (
              <a href="/dashboard" className={styles.ctaDemo}>
                Request a Demo
              </a>
            )}
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
