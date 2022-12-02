import React from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/forget-pw-successful.png";
import styles from "./Successful.module.scss";

function Successful() {
  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Check your Email</h1>
            <h3>We sent a password link to hi@imrvon.com</h3>
            <form action="">
              <input type="submit" value="Open email" className="success-btn" />
              <p className="successful-p">
                Didn’t receive an email?{" "}
                <NavLink to={""}>Click to resend.</NavLink>
              </p>
            </form>
          </div>
          <div className={styles.second}>
            <img src={footerImg} alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Successful;
