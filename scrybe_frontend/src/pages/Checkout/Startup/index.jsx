import React from "react";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import styles from "./checkout.module.scss";

function Checkout() {
  return (
    <div className={styles.checkout}>
      <div className={styles.header}>
        <h1 className={styles.heroH1}>
          Become a{" "}
          <span className={styles.heroAccent}>
            Heedr <wbr />
          </span>
        </h1>
      </div>
      <div className={styles.checkoutDetails}>

      </div>
    </div>
  );
}

export default Checkout;
