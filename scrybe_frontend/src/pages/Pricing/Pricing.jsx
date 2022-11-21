import React from "react";
import styles from "./pricing.module.css";
import heroImage from "./assets/heroimage.svg";

function Pricing() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.heroH1}>
              Plans for every stage of your customer{" "}
              <span className={styles.heroAccent}>
                success team <wbr />
              </span>
            </h1>
            <p className={styles.heroText}>
              We help businesses unlock insights and extract meaningful data
              from your customer support conversations{" "}
            </p>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImage} alt="" srcSet="" />
          </div>
        </div>
      </section>
      <section className={styles.CTA}>
        <h2 className={styles.aboutUs__title}>
          Choose a plan that fits your needs
        </h2>
        <div className={styles.CTAs}>
          <a href="/dashboard" className={styles.ctaDemo}>
            Monthly
          </a>
          <a href="/transcriptions" className={styles.ctaStarter}>
            Yearly
          </a>
        </div>
      </section>
    </>
  );
}

export default Pricing;
