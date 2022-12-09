import { React } from "react";
import styles from "./NewSignup.module.scss";
import { Link } from "react-router-dom";
import { createAccount } from "../hooks";

import logo from "../assets/logo.png";
import google from "../assets/google.png";
import visible from "../assets/visible.png";
import hidden from "../assets/hidden.png";

const NewSignup = () => {
  const createAccountHook = createAccount();

  return (
    <div className={styles.signinContainer}>
      <div className={styles.bgcontainer}>
        <div className={styles.text}>
          <p>...Speak, we listen</p>
          <p>Unlock insight and meaningful data from team call records.</p>
        </div>
      </div>

      <div className={styles.inputsection}>
        <img src={logo} alt="heedLogo" />

        <div className={styles.greeting}>
          <h1>Create an accout</h1>
          <p>Lets get you started</p>
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

        <form
          className={styles.formContainer}
          onSubmit={createAccountHook.handleSubmit}
        >
          <div className={styles.forms}>
            <label htmlFor="text">First name</label>
            <input
              className={
                !createAccountHook.nameStateTest
                  ? `${styles.field}  ${styles.errfield}`
                  : ` ${styles.field} `
              }
              type="text"
              placeholder="Enter your first name"
              onChange={createAccountHook.handleFirstname}
              value={createAccountHook.first_name}
              // required
            />
            {!createAccountHook.nameStateTest ? (
              <p className={styles.err}>first name must be 2-16 characters</p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.forms}>
            <label htmlFor="text">Last name</label>
            <input
              className={
                !createAccountHook.lastStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type="text"
              placeholder="Enter your full name"
              onChange={createAccountHook.handleLastname}
              value={createAccountHook.last_name}
              // required
            />
            {!createAccountHook.lastStateTest ? (
              <p className={styles.err}>last name must be 2-16 characters</p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.forms}>
            <label htmlFor="email">Email</label>
            <input
              className={
                !createAccountHook.emailStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type="email"
              placeholder="Enter your company email"
              onChange={createAccountHook.handleEmail}
              value={createAccountHook.email}
              // required
            />
            {!createAccountHook.emailStateTest ? (
              <p className={styles.err}>Please enter a valid email address</p>
            ) : (
              ""
            )}
          </div>

          <div className={`${styles.forms} ${styles.pass}`}>
            <label htmlFor="password">Password</label>
            <input
              className={
                !createAccountHook.passStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type={createAccountHook.visibility ? "text" : "password"}
              placeholder="Password at least 8 characters"
              onChange={createAccountHook.handlePassword}
              value={createAccountHook.password}
              // required
            />
            <img
              src={createAccountHook.visibility ? visible : hidden}
              onClick={createAccountHook.handleToggle}
              alt="hidden"
            />
            {!createAccountHook.passStateTest ? (
              <p className={styles.err}>
                Password must be atleast 8 characters
              </p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" />
            <p>
              I have read and agree to
              <Link to="/terms" className={styles.links}>
                {" "}
                Terms of Service{" "}
              </Link>
              and
              <Link to="/privacy" className={styles.links}>
                {" "}
                Privacy Policy{" "}
              </Link>
            </p>
          </div>

          <button
            disabled={createAccountHook.btn}
            className={
              createAccountHook.btn
                ? `${styles.buttondis}`
                : `${styles.buttonVld}`
            }
          >
            Sign In
          </button>
        </form>

        <div className={styles.linkbottom}>
          <p>Already have an account ?</p>

          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default NewSignup;
