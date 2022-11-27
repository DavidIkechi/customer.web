import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignIn.module.scss";
import { useNavigate } from "react-router";
import { fetchToken } from "../../Auth";

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  /* eslint-disable no-unused-vars */
  const [userInfo, setUserInfo] = useState();
  /* eslint-enable no-unused-vars */

  const onSubmit = (data) => {
    // data.preventDefault();

    console.log(data);
    setUserInfo(data);
    console.log(errors);

    // axios
    //   .post("http://scrybe.hng.tech/api/login", data)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // Watch event for disable button
  // const username = watch("username");
  // const password = watch("password");

  // const isValid = username && password;
  let isValid;


  const navigate = useNavigate();
  const [username, setMyUsername] = useState("");
  const [password, setMyPassword] = useState("");

    const login = () => {
      if ((username == "") & (password == "")) {
        return;
      } else {
        axios
        .post("http://scrybe.hng.tech/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/account");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
      }
    };

  return (
    <>
    {fetchToken() ? (
          <p>you are logged in</p>
        ) : (
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Welcome back, Scryber!</h1>
            <h3>Please enter your details</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username">Email</label>
              <input
                type="email"
                id="username"
                placeholder="Enter your company email"
                className={`${errors.email && styles.errorInput}} `}
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                    message: "Please enter a correct company email address",
                  },
                })}
                onChange={(e) => setMyUsername(e.target.value)}
              />
              <p className={styles.errorMsg}>{errors.email?.message}</p>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password at least 8 characters"
                className={`${errors.password && styles.errorInput} `}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password you input is different from your current password",
                  },
                })}
                onChange={(e) => setMyPassword(e.target.value)}
              />
              <p className={styles.errorMsg}>{errors.password?.message}</p>
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
                // disabled={!isValid}
                value="Sign in"
                className={`${isValid && styles.submitValid}`}
                onClick={login}
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
        )}
    </>
  );
}

export default Signin;
