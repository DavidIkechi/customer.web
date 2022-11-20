import React from "react";
import styles from "./client.module.scss";
import hng from "./assets/hng.webp";
import hotelng from "./assets/hotelsng.webp";
import payoneer from "./assets/payoneer.webp";
import zuri from "./assets/zuri.webp";

function OurClient() {
  return (
    <div className={`container ${styles.container}`}>
      <h2 className={styles.title}>Our Clients</h2>
      <div className={styles.logos}>
        <div className={styles.display}>
          <img src={hng} alt="HNG" srcSet="" />
        </div>
        <div className={styles.display}>
          <img src={zuri} alt="Zuri" srcSet="" />
        </div>
        <div className={styles.display}>
          <img src={payoneer} alt="" srcSet="" />
        </div>
        <div className={styles.display}>
          <img src={hotelng} alt="" srcSet="" />
        </div>
      </div>
    </div>
  );
}

export default OurClient;
