import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/error.png";
import styles from "./paymentFailed.module.scss";

const PaymentFailed = () => {
  return (
    <div className={styles.paymentFailed}>
      <div className={styles.paymentErrorCard}>
        <img src={error} alt="error" />
        <h1>Payment Failed</h1>
        <div className={styles.actionBtns}>
          <Link to="/pricing" className={`${styles.btn} ${styles.retry}`}>
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
