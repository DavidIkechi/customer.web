import React from "react";
import styles from "./Error.module.scss";
import error from "./assets/error.svg";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    // <div className={styles.errorCont}>
    <div className={styles.contentCont}>
      <img src={error} alt="error" />
      <div className={styles.msgCont}>
        <p>Ooops! We can't find that page</p>
        <div>
          <Link onClick={() => navigate(-1)} className={styles.fill}>
            Go back
          </Link>

          <Link to="/" className={styles.trans}>
            Take me home
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Error;
