import React from "react";
import styles from "./Error.module.scss";
import error from "./assets/error.svg";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.contentCont}>
      <img src={error} alt="error" />
      <div className={styles.msgCont}>
        <p>Ooops! We can't find that page</p>
        <p className={styles.msg}>
          Sorry, the page you’re looking for might have been removed, had its
          name changed or is temporarily unavailable.
        </p>
        <div>
          <Link onClick={() => navigate(-1)} className={styles.fill}>
            Go back
          </Link>

          <Link to="/" className={styles.trans}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
