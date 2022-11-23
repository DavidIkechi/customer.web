import React from "react";
import styles from "./hero.module.scss";
import heroImage from "./assets/Group 1000000899.webp";
import curves from "./assets/Vector 13.webp";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heroH1}>
            World class Transcription and{" "}
            <span className={styles.heroAccent}>
              Sentiment Analysis <wbr />
            </span>
            for yor Business
          </h1>
          <div className={styles.heroImageB}>
            <img src={heroImage} alt="" srcSet="" />
          </div>
          <p className={styles.heroText}>
            We help businesses unlock insights and extract meaningful data from
            your customer support conversations{" "}
          </p>
          <div className={styles.CTAs}>
            <a href="/dashboard" className={styles.ctaDemo}>
              Request a Demo
            </a>
            <a href="/transcriptions" className={styles.ctaStarter}>
              Get Started
            </a>
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
