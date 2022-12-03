import React from "react";
import styles from "./Help.module.scss";
import UsefulInsights from "../Assets/UsefulInsights.png";
import Productivity from "../Assets/Productivity.png";
import Customer from "../Assets/customer.png";
const Help = () => {
  return (
    <div className={styles.HelpContainer}>
      <div className={styles.HelpHeadingWithBox}>
        <h2 className={styles.HelpSectionHeading}>
          The value we provide to our customers
        </h2>
        <div className={styles.HelpBox}>
          <div className={styles.HelpIconWithText}>
            <img src={UsefulInsights} alt="useful insights" />

            <h3>Useful Insights</h3>
          </div>
          <p className={styles.paragraph}>
            Gain useful, unbiased information about how your customers feel
            about your brand.
          </p>
        </div>
      </div>
      <div className={styles.HelpBoxesOnly}>
        <div className={styles.HelpBox1}>
          <div className={styles.HelpIconWithText}>
            <img src={Productivity} alt="Productivity" />
            <h3>Productivity</h3>
          </div>
          <p className={styles.paragraph}>
            Boost the effectiveness of operations in your support department.
          </p>
        </div>
        <div className={styles.HelpBox2}>
          <div className={styles.HelpIconWithText}>
            <img src={Customer} alt="customer" />
            <h3>Customer Experience</h3>
          </div>
          <p className={styles.paragraph}>
            Help improve the customers’ experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
