import React from "react";
import styles from "./WhoWeServe.module.scss";
import payoneer from "../Assets/payoneer.png";
import paystack from "../Assets/paystack.png";
import cowrywise from "../Assets/cowrywise.png";
import flutterwave from "../Assets/flutterwave.png";

const WhoWeServe = () => {
  return (
    <div className={styles.WhoWEServe}>
      <p className={styles.heading}>Who We Serve?</p>
      <div
        classname={styles.images}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <img src={flutterwave} alt="fluterwave" />
        <img src={paystack} alt="paystack" />
        <img src={cowrywise} alt="cowrywise" />
        <img src={payoneer} alt="payoneer" />
      </div>
    </div>
  );
};

export default WhoWeServe;
