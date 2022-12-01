import React from "react";
import styles from "./Email.module.scss";

const EmailVerify = () => {
  return (
    <div className={styles.verify}>
      <div className={styles.popup}>
        <img src="" alt="" />
        <p className={styles.status}>Verified</p>
        <p className={styles.msg}>
          Hello Rambey, your account has been successfully verified
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
