import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SignUpVerify.module.scss";
import logo from "./assets/logo.png";
import mail from "./assets/mail.png"

function NewSignUpVerify() {
  return (
    <> 
      {/* <img src={logo} alt="heedLogo"  className={styles.logo}/> */}
      <main className={styles.signUpWrapper}>
        {/* <img src={logo} alt="heedLogo"  className={styles.logo}/> */}
        <div className={styles.signup}>
          <img src={logo} alt="heedLogo"  className={styles.logo}/>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Verify your Email</h1>
            <h3>A verification link has been sent to your email. Click to verify your account.</h3>
            {/* <form action=""> */}
            <a
              href="https://mail.google.com/"
              target="_blank"
              className={styles.successbtn}
              rel="noreferrer"
            >
              Open email{" "}
            </a>
            <p className="successful-p">
              Didn’t receive an email?{" "}
              <NavLink to={""}>Click to resend.</NavLink>
            </p>
            {/* </form> */}
          </div>
        </div>
        <div className={styles.second}>
          <img src={mail} alt="" />
        </div>
      </main>
      {/* <div className={styles.second}>
        <img src={mail} alt="" />
      </div> */}
    </>
  );
}

export default NewSignUpVerify;
