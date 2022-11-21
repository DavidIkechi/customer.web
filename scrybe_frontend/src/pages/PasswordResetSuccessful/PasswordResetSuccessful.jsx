import React from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/reset-pw.png";
import styles from "./PasswordResetSuccessful.module.scss";

function PasswordResetSuccessful() {
  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Password reset</h1>
            <h3>
              Your password has been successfully set.
              <br />
              Click below to login.
            </h3>
            <form action="">
              <NavLink to={"/signin"}>
                <input
                  type="submit"
                  value="Continue"
                  className={styles.successBtn}
                />
              </NavLink>
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

export default PasswordResetSuccessful;
