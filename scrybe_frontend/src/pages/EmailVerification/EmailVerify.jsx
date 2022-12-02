import React from "react";
import styles from "./Email.module.scss";
import mail from "./assets/mail.svg";
import { Link } from "react-router-dom";

const EmailVerify = () => {
  return (
    <div className={styles.verify}>
      <div className={styles.popup}>
        <img src={mail} alt="mail" />
        <p className={styles.status}>Verified!</p>
        <p className={styles.msg}>
          Hello there, your account has been successfully verified
        </p>
        <Link to="/signin">Login</Link>
      </div>
    </div>
  );
};

export default EmailVerify;
