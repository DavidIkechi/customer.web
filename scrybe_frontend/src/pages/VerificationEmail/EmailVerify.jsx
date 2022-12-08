import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import mail from "./assets/mail.svg";
import styles from "./Email.module.scss";

const EmailVerify = () => {
  const [message, setMessage] = useState("");
  const query = new URLSearchParams(useLocation);
  // const token = query.get("token");
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = async () => {
    try {
      // let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZW5wcmVAZ21haWwuY29tIn0.LSsSIjvkCHI5tfg2Hj3Q3Ov2MwFrNFdn6W9jC2UXo4Q";
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
        <Link to="/signin">Login</Link>
      </div>
    </div>
  );
};

export default EmailVerify;
