import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../NewSetNewPassword/setPassword.module.scss";
import setPassword from "../NewSetNewPassword/assets/set__pswd.png";
import eyeOff from "../NewSetNewPassword/assets/eye__off.png";
import heedLogo from "../NewSetNewPassword/assets/heed__logo.png";
// import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const baseUrl = "https://api.heed.hng.tech";
  const submitCallback = () => {
    const query = new URLSearchParams(location.search);
    axios
      .patch(baseUrl + "/reset-password?token=" + query.get("token"), {
        password: password,
      })
      .then((res) => {
        if (res.status === 200) navigate("/pw-reset-successful");
      });
  };

  // Watch event for disable button
  const password = watch("password");

  const isValid = password;

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
                  <h1 className={styles.second__head}>Set new password</h1>
                </div>
                <div className={styles.second__subtext}>
                  <p className={styles.second__subhead}>
                    Please enter your new password
                  </p>
                </div>
              </div>
              <form
                className={styles.form__container}
                onSubmit={handleSubmit(submitCallback)}
              >
                <div className={styles.input__flex}>
                  <label htmlFor="email" className={styles.label__name}>
                    New password
                    <input
                      type="password"
                      name="password"
                      id="password"
                      // className={styles.email}
                      placeholder="Enter your new password"
                      className={`${errors.password && styles.errorInput} `}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <p className={styles.errorMsg}>
                      {errors.password?.message}
                    </p>
                  </label>
                  <span className={styles.eye__content}>
                    <img
                      src={eyeOff}
                      alt="Eye icon"
                      className={styles.eye__icon}
                    />
                  </span>
                </div>
                <input
                  type="submit"
                  value="Reset password"
                  className={`${isValid && styles.form__button}`}
                />
                {/* <div className={styles.form__action}>
                  <button
                    type="submit"
                    value="Reset password"
                    className={styles.form__button}
                  >
                    Reset password
                  </button>
                </div> */}
              </form>
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
              <img src={setPassword} alt="Set New Password icon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
