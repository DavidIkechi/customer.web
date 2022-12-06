import React from "react";
import styles from "../PasswordResetSuccessful/resetSuccessful.module.scss";
import resetSuccess from "../PasswordResetSuccessful/assets/resetSuccess.png";
import heedLogo from "../PasswordResetSuccessful/assets/heed__logo.png";
import { Link } from "react-router-dom";

const index = () => {
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
                  <h1 className={styles.second__head}>Password reset</h1>
                </div>
                <div className={styles.second__subtext}>
                  <p className={styles.second__subhead}>
                    Your password has been successfully set. click below to
                    login.
                  </p>
                </div>
              </div>
              <form className={styles.form__container}>
                <div className={styles.form__action}>
                  <Link>
                    <button
                      type="submit"
                      value="Reset password"
                      className={styles.form__button}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
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
              <img src={resetSuccess} alt="Password Reset Successful icon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default index;
