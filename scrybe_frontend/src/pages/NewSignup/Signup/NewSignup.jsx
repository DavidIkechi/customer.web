import { React, useState, useCallback, useEffect } from "react";
import styles from "./NewSignup.module.scss";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import google from "../assets/google.png";
import visible from "../assets/visible.png";
import hidden from "../assets/hidden.png";

const NewSignup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);
  const [nameStateTest, setNameStateTest] = useState(false);
  const [lastStateTest, setLastStateTest] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [btn, setBtn] = useState(true);

  const navigate = useNavigate();
  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/),
    firstNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    lastNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
    tester(e, firstNameTest, setNameStateTest);
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
    tester(e, lastNameTest, setLastStateTest);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    tester(e, emailTest, setEmailStateTest);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    tester(e, passwordTest, setPassStateTest);
  };

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/complete-signup");

    // const data = {
    //     full_name: first_name,
    //     password: password,
    //     email: email,
    // }
  };

  const validate = useCallback(
    (e) => {
      if (
        first_name.length > 1 &&
        last_name.length > 1 &&
        password.length > 1 &&
        email.length > 1 &&
        emailStateTest &&
        passStateTest &&
        nameStateTest &&
        lastStateTest
      ) {
        return false;
      } else {
        return true;
      }
    },
    [
      email.length,
      emailStateTest,
      first_name.length,
      lastStateTest,
      last_name.length,
      nameStateTest,
      passStateTest,
      password.length,
    ]
  );

  useEffect(() => {
    const isValid = validate();
    setBtn(isValid);
  }, [validate]);

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
              placeholder="Enter your full name"
              onChange={handleFirstname}
              value={first_name}
              // required
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
              // required
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
              // required
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
              // required
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
