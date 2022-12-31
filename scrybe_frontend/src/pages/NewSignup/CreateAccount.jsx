import { React } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "./hooks";
import styles from "./NewSignup.module.scss";

import google from "./assets/google.png";
import hidden from "./assets/hidden.png";
import logo from "./assets/logo.png";
import visible from "./assets/visible.png";

const CreateAccount = () => {
  const {
    nameStateTest,
    handleSubmit,
    handleFirstname,
    first_name,
    lastStateTest,
    handleLastname,
    last_name,
    emailStateTest,
    handleEmail,
    email,
    passStateTest,
    visibility,
    handlePassword,
    btn,
    password,
    handleToggle,
  } = createAccount();

  return (
    <div className={styles.signinContainer}>
      <div className={styles.inputsection}>
        <Link to="/">
          <img src={logo} alt="heedLogo" />
        </Link>

        <div className={styles.greeting}>
          <h1>Create an accout</h1>
          <p>Lets get you started</p>
        </div>

        <div className={styles.googlego}>
          <img src={google} alt="google" />
          Sign in With google
        </div>

        <div className={styles.line}>
          <div className={styles.dash}></div>
          <p>or</p>
          <div className={styles.dash}></div>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.forms}>
            <label htmlFor="text">First name</label>
            <input
              className={
                !nameStateTest
                  ? `${styles.field}  ${styles.errfield}`
                  : ` ${styles.field} `
              }
              type="text"
              placeholder="Enter your first name"
              onChange={handleFirstname}
              value={first_name}
            />
            {!nameStateTest ? (
              <p className={styles.err}>first name must be 2-16 characters</p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.forms}>
            <label htmlFor="text">Last name</label>
            <input
              className={
                !lastStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type="text"
              placeholder="Enter your full name"
              onChange={handleLastname}
              value={last_name}
            />
            {!lastStateTest ? (
              <p className={styles.err}>last name must be 2-16 characters</p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.forms}>
            <label htmlFor="email">Email</label>
            <input
              className={
                !emailStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type="email"
              placeholder="Enter your company email"
              onChange={handleEmail}
              value={email}
            />
            {!emailStateTest ? (
              <p className={styles.err}>Please enter a valid email address</p>
            ) : (
              ""
            )}
          </div>

          <div className={`${styles.forms} ${styles.pass}`}>
            <label htmlFor="password">Password</label>
            <input
              className={
                !passStateTest
                  ? `${styles.field} ${styles.errfield}`
                  : `${styles.field}`
              }
              type={visibility ? "text" : "password"}
              placeholder="Password at least 8 characters"
              onChange={handlePassword}
              value={password}
            />
            <img
              src={visibility ? visible : hidden}
              onClick={handleToggle}
              alt="hidden"
            />
            {!passStateTest ? (
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
            disabled={btn}
            className={btn ? `${styles.buttondis}` : `${styles.buttonVld}`}
          >
            Create account
          </button>
        </form>

        <div className={styles.linkbottom}>
          <p>Already have an account ?</p>

          <Link to="/login">Sign in</Link>
        </div>
      </div>
      <div className={styles.bgcontainer}>
        <div className={styles.text}>
          <p>...Speak, we listen</p>
          <p>Unlock insight and meaningful data from team call records.</p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
