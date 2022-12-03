import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/forget-pw.svg";
import styles from "./ForgetPassword.module.scss";

function ForgetPassword() {
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
    console.log(data);
    setUserInfo(data);
  };

  // Watch event for disable button
  const email = watch("email");

  console.log("email", email);

  const isValid = email;

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Forgot password</h1>
            <h3>No worries we will send your reset details</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your company email"
                className={`${errors.email && styles.errorInput} `}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                    message: "Please enter a correct company email address",
                  },
                })}
              />
              <p className={styles.errorMsg}>{errors.email?.message}</p>
              <input
                type="submit"
                disabled={!isValid}
                value="Reset password"
                className={`${isValid && styles.submitValid}`}
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

export default ForgetPassword;
