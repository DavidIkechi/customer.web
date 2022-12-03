import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/forget-pw.svg";
import styles from "./ForgetPassword.module.scss";
import heedLogo from "./assets/heed__logo.png";
import forgotIcon from "./assets/forgot__icon.png";
import { Link } from "react-router-dom";

function ForgetPassword() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  //  eslint-disable no-unused-vars
  // const [userInfo, setUserInfo] = useState();
  //  eslint-enable no-unused-vars
  // const onSubmit = (data) => {
  //   console.log(data);
  //   setUserInfo(data);
  // };

  // Watch event for disable button
  // const email = watch("email");

  // console.log("email", email);

  // const isValid = email;

  return (
    <>
      {/* <main className={styles.signUpWrapper}>
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
      </main> */}
      <section className={styles.first__section}>
        <div className={styles.sect__container}>
          <div className={styles.logo__container}>
            <div className={styles.heed__logo}>
              <img src={heedLogo} alt="heed logo" />
            </div>
            <div className={styles.logo__text}>
              <h3 className={styles.logo__head}>Heed</h3>
            </div>
          </div>
          <div className={styles.hero__icon}>
            <img src={forgotIcon} alt="forgot icon" />
          </div>
        </div>
      </section>
      <section className={styles.second__section}>
        <div className={styles.sect__container}>
          <div className={styles.second__top}>
            <div className={styles.second__heading}>
              <h1 className={styles.second__head}>Forgot password?</h1>
            </div>
            <div className={styles.second__subtext}>
              <p className={styles.second__subhead}>
                Enter registered email to reset password
              </p>
            </div>
          </div>
          <form className={styles.form__container}>
            <div className={styles.input__flex}>
              <label htmlFor="email" className={styles.label__name}>
                Email
                <input
                  type="text"
                  id="email"
                  className={styles.email}
                  placeholder="Enter your company email"
                />
              </label>
            </div>
            <div className={styles.form__action}>
              <button type="submit" className={styles.form__button}>
                Reset password
              </button>
            </div>
          </form>
          <div className={styles.link__container}>
            <p className={styles.link__text}>
              Already have an account?
              <span className={styles.link__content}>
                <Link className={styles.option__link}>Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
