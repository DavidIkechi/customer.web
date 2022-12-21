import React from "react";
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
            {/* <form action=""> */}
            <div className={styles.successbtn}>Click to resend</div>
            {/* <p className="successful-p">
              Didn’t receive an email?{" "}
              <NavLink to={""}>Click to resend.</NavLink>
            </p> */}
            {/* </form> */}
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
