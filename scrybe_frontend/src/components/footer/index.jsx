import React from "react";
import styles from "./footer.module.scss";
import social from "./assets/brand logo.png";
import locate from "./assets/carbon_location.png";
import email from ".//assets/clarity_email-line.png";
import call from ".//assets/fluent_call-connecting-20-regular.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__left}>
          <img src={social} alt="" srcset="" />
        </div>
        <div className={styles.footer__middle}>
          <ul>
            <h4>Explore</h4>
            <li>Home</li>
            <li>Why Scrybe</li>
            <li>About Us</li>
            <li>Blog</li>
            <li>Our Services</li>
            <li>Privacy Policy</li>
            <li>How it works</li>
          </ul>
          <ul>
            <h4>Quick links</h4>
            <li>Authentication</li>
            <li>Billing and pricing</li>
            <li>Accounts</li>
            <li>Events</li>
            <li>Career</li>
            <li>Faq</li>
            <li>Partnership</li>
          </ul>
        </div>
        <div className={styles.footer__right}>
          <h4>Contact Us</h4>
          <div className={styles.footer__right__contact}>
            <div className={styles.footer__right__logo}>
              <img src={call} alt="" />
            </div>
            <p>+2348790900976</p>
          </div>
          <div className={styles.footer__right__contact}>
            <div className={styles.footer__right__logo}>
              <img src={email} alt="" />
            </div>
            <p>info@scrybe.co.za</p>
          </div>
          <div className={styles.footer__right__contact}>
            <div className={styles.footer__right__logo}>
              <img src={locate} alt="" />
            </div>
            <p>54 jones close Abuja</p>
          </div>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <p> &#169; Copyright 2022 | Scrybe</p>
      </div>
    </div>
  );
}

export default Footer;
