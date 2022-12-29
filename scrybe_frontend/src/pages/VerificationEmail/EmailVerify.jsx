import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import mail from "./assets/mail.svg";
import styles from "./Email.module.scss";

const EmailVerify = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`verification?token=${token}`);
      console.log(response.data.data);
      setMessage(response.data.data);
    } catch (err) {
      console.log(err.response.data.detail);
      setMessage(err.response.data.detail);
    }
  };
  return (
    <div className={styles.verify}>
      <div className={styles.popup}>
        <img src={mail} alt="mail" />
        <p className={styles.status}>Verified!</p>
        <p className={styles.msg}>{message}</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default EmailVerify;
