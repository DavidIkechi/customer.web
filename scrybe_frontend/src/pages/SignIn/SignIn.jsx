import React from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignIn.module.scss";
import AuthApi from "../../App";
import Cookies from "js-cookie";

function Signin() {
  const Auth = React.useContext(AuthApi);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    const data = {
      username: name,
      password: password,
    };
    const news = async () => {
      let res = await axios
        .post("http://scrybe.hng.tech:5000/login", data)
        .then((response) => {
          console.log(response);
          // Cookies.set("token", response.data.access_token);
          return response;
        })
        .catch((error) => {
          console.log(error.message);
        });
      return res;
    };
    let x = await news();
    if (x) {
      window.location.reload();
    }
  };

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Welcome back, Scryber!</h1>
            <h3>Please enter your details</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your company email"
                className={`${styles.errorInput}} `}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.email?.message}</p> */}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password at least 8 characters"
                className={`${styles.errorInput} `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.password?.message}</p> */}
              <div className={`${styles.accept} ${styles.remember}`}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" name="" id="" />
                  <span className={styles.rememberSpan}>Remember me</span>
                </div>
                <NavLink
                  to={"/forget-password"}
                  className={styles.rememberForget}
                >
                  Forgot password?
                </NavLink>
              </div>
              <input
                type="submit"
                value="Sign in"
                className={`${styles.submitValid}`}
              />
              <p>
                Don’t have an account? <NavLink to={"/"}>Sign up</NavLink>
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

export default Signin;
