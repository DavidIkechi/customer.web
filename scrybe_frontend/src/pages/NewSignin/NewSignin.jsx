import React from "react";
import { Link } from "react-router-dom";
import styles from "./NewSignin.module.scss";

import logo from "./assets/logo.png";
import google from "./assets/google.png";

const NewSignin = () => {
  return (
    <div className={styles.signinContainer}>
      <div className={styles.bgcontainer}>
        <p>...Speak, we listen</p>
      </div>

      <div className={styles.inputsection}>
        <img src={logo} alt="heedLogo" />

        <div className={styles.greeting}>
          <h1>Welcome back Heeder</h1>
          <p>Please enter your details</p>
        </div>

        <a href="#" className={styles.googlego}>
          <img src={google} alt="google" />
          Sign in With google
        </a>

        <div className={styles.line}>
          <div className={styles.dash}></div>
          <p>or</p>
          <div className={styles.dash}></div>
        </div>

        <form className={styles.formContainer}>
          <div className={styles.forms}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your company email" />
          </div>

          <div className={styles.forms}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password at least 8 characters"
            />
          </div>

          <div className={styles.checkbox}>
            <div>
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <p>Forgot Password</p>
          </div>

          <button>Sign In</button>
        </form>

        <div className={styles.linkbottom}>
          <p>Don't have an account yet?</p>

          <Link to="/create-account">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default NewSignin;
