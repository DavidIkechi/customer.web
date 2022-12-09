import React from "react";
import styles from "./Help.module.scss";
// import UsefulInsights from "../Assets/UsefulInsights.png";
// import Productivity from "../Assets/Productivity.png";
// import Customer from "../Assets/customer.png";
const Help = () => {
  return (
    <div className={styles.HelpContainer}>
      <div className={styles.HelpHeadingWithBox}>
        <h2 className={styles.HelpSectionHeading}>
          How Heed can help you save money
        </h2>
        <div className={styles.HelpBox}>
          <div className={styles.HelpIconWithText}>
            <img
              src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/UsefulInsights_k5syju.webp"
              alt="useful insights"
            />

            <h3>Useful Insights</h3>
          </div>
          <p className={styles.paragraph}>Understand customer's pain point</p>
        </div>
      </div>
      <div className={styles.HelpBoxesOnly}>
        <div className={styles.HelpBox1}>
          <div className={styles.HelpIconWithText}>
            <img
              src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/Productivity_hhmayh.webp"
              alt="Productivity"
            />
            <h3>Productivity</h3>
          </div>
          <p className={styles.paragraph}>Customer Experience</p>
        </div>
        <div className={styles.HelpBox2}>
          <div className={styles.HelpIconWithText}>
            <img
              src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/customer_f1u8k0.webp"
              alt="customer"
            />
            <h3>Customer Experience</h3>
          </div>
          <p className={styles.paragraph}>Improved crises management</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
