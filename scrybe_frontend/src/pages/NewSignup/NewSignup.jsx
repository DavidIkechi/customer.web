import { React, useState } from "react";
import styles from "./NewSignup.module.scss";
import { Link } from "react-router-dom";
import ApiService from "../../helpers/axioshelp/apis";

import logo from "./assets/logo.png";
import google from "./assets/google.png";
import visible from "./assets/visible.png";
import hidden from "./assets/hidden.png";

const NewSignup = () => {
  const [full_name, setFulltName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFullname = (e) => {
    setFulltName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // console.log(email);
  // console.log(full_name);
  // console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = {
    //     full_name: first_name,
    //     password: password,
    //     email: email,
    // }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.bgcontainer}>
        <div className={styles.text}>
          <p>...Speak, we listen</p>
          <p>
            Unlock insights and extract meaningful data from your customer
            support conversations
          </p>
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
            <label htmlFor="text">Full name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={handleFullname}
              value={full_name}
            />
            <p className={styles.err}></p>
          </div>

          <div className={styles.forms}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your company email"
              onChange={handleEmail}
              value={email}
            />
            <p className={styles.err}></p>
          </div>

          <div className={`${styles.forms} ${styles.pass}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password at least 8 characters"
              onChange={handlePassword}
              value={password}
            />
            <img src={hidden} alt="hidden" />
            <p className={styles.err}></p>
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

          <button>Sign In</button>
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
