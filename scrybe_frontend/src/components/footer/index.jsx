import React from "react";
import styles from "./footer.module.scss";
import locate from "./assets/carbon_location.png";
import email from ".//assets/clarity_email-line.png";
import call from ".//assets/fluent_call-connecting-20-regular.png";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.png";
import ig from "./assets/instagram.png";
import fb from "./assets/facebook.png";
import twitter from "./assets/twitter.png";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={"hh"}>
        <div className={styles.footer__content}>
          <div className={styles.footer__left}>
            <img src={logo} alt="" srcset="" />
            <p style={{ marginTop: "1.3rem" }}>Join Our Community</p>
            <div className={styles.socials}>
              <a href="www.hng.tech">
                <img src={ig} alt="" srcset="" />
              </a>
              <a href="www.hng.tech">
                <img src={fb} alt="" srcset="" />
              </a>
              <a href="www.hng.tech">
                <img src={twitter} alt="" srcset="" />
              </a>
            </div>
          </div>
          <div className={styles.footer__middle}>
            <ul>
              <h4> Explore</h4>
              <li>
                <NavLink to="/solutions">Why Scrybe</NavLink>
              </li>
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/services">Our Services</NavLink>
              </li>
              <li>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
            </ul>

            <ul>
              <h4>Quick links</h4>
              <li>
                <NavLink to="/pricing">Billing and pricing</NavLink>
              </li>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              <li>
                <NavLink to="/careers">Career</NavLink>
              </li>
              <li>
                <NavLink to="/faq">Faq</NavLink>
              </li>
              <li>
                <NavLink to="/reviews">Reviews</NavLink>
              </li>
            </ul>
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
        </div>
        <div className={styles.footer__bottom}>
          <p> &#169; Copyright 2022 | Scrybe</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
