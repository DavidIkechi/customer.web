import React from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/forget-pw-successful.png";
import styles from "./SignUpVerify.module.scss";

function SignUpVerify() {
  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Verify your Account</h1>
            <h3>We sent a link to your mail to verify your account</h3>
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

export default SignUpVerify;
