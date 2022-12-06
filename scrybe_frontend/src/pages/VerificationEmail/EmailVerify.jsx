import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import mail from "./assets/mail.svg";
import styles from "./Email.module.scss";

const EmailVerify = () => {
  const query = new URLSearchParams(useLocation);
  const token = query.get("token");
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await axios.get("/verification", { token });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
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
