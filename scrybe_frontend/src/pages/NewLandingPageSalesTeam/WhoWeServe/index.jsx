import React from "react";
import styles from "./WhoWeServe.module.scss";
// import payoneer from "../Assets/payoneer.png";
// import paystack from "../Assets/paystack.png";
// import cowrywise from "../Assets/cowrywise.png";
// import flutterwave from "../Assets/flutterwave.png";

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
        <img
          src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/flutterwave_bq8pdy.webp"
          alt="fluterwave"
        />
        <img
          src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/paystack_t98kpq.webp"
          alt="paystack"
        />
        <img
          src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/cowrywise_omx8bu.webp"
          alt="cowrywise"
        />
        <img
          src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670584268/payoneer_gnzcuy.webp"
          alt="payoneer"
        />
      </div>
    </div>
  );
};

export default WhoWeServe;
