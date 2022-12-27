import React from "react";
import styles from "../CheckMail/checkMail.module.scss";
import checkMail from "../CheckMail/assets/check__mail.png";
import heedLogo from "../CheckMail/assets/heed__logo.png";
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
                  <h1 className={styles.second__head}>Check your Email</h1>
                </div>
                <div className={styles.second__subtext}>
                  <p className={styles.second__subhead}>
                    A password reset link has been sent to your email along with
                    reset instructions.
                  </p>
                </div>
              </div>
              <div className={styles.link__container}>
                <p className={styles.link__text}>
                  Didn't receive an email?
                  <span className={styles.link__content}>
                    <Link className={styles.option__link}>click to resend</Link>
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
              <img src={checkMail} alt="checkmail icon" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default index;
