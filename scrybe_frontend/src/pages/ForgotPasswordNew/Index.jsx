import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../ForgotPasswordNew/forgotPassword.module.scss";
import forgotPassword from "../ForgotPasswordNew/assets/forgot__pswd.png";
import heedLogo from "../ForgotPasswordNew/assets/heed__logo.png";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const baseUrl = "https://api.heed.hng.tech";
  const submitCallback = () => {
    axios
      .post(baseUrl + "/forgot-password", {
        email: email,
      })
      .then((res) => {
        /* TODO:
          - When CheckEmail page is implemented, this page should redirect there instead of SetNewPassword
        */
        navigate(`/set-new-password?token=${res.data}`);
      });
  };

  const email = watch("email");

  const isValid = email;

  return (
    <div>
      <div className={styles.overall__container}>
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
            <div className={styles.bottom__content}>
              <div className={styles.second__top}>
                <div className={styles.second__heading}>
                  <h1 className={styles.second__head}>Forgot password?</h1>
                </div>
                <div className={styles.second__subtext}>
                  <p className={styles.second__subhead}>
                    Enter registered email to reset your password
                  </p>
                </div>
              </div>
              <form
                className={styles.form__container}
                onSubmit={handleSubmit(submitCallback)}
              >
                <label htmlFor="email" className={styles.label__name}>
                  Email
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your company email"
                    value={email}
                    className={`${errors.email && styles.emailInput} `}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                        message: "Please enter a correct company email address",
                      },
                    })}
                  />
                </label>
                <p className={styles.errorMsg}>{errors.email?.message}</p>
                <input
                  type="submit"
                  disabled={!isValid}
                  value="Reset password"
                  className={`${isValid && styles.form__button}`}
                />
                {/* <button
									type="submit"
									disabled={!isValid}
									value="Reset password"
									className={`${isValid && styles.form__button}`}
								>
									Reset password
								</button> */}
              </form>
              <div className={styles.link__container}>
                <p className={styles.link__text}>
                  Don't have an account?
                  <span className={styles.link__content}>
                    <Link className={styles.option__link}>Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.second__section}>
          <div className={styles.sect__container}>
            <div className={`${styles.logo__container} ${styles.mobile__view}`}>
              <div className={styles.heed__logo}>
                <img src={heedLogo} alt="heed logo" />
              </div>
              <div className={styles.logo__text}>
                <h3 className={styles.logo__head}>Heed</h3>
              </div>
            </div>
            <div className={styles.check__icon}>
              <img src={forgotPassword} alt="Forgot Password icon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
