import React from "react";
import {
  BsInstagram,
  BsLinkedin,
  BsMailbox,
  BsMailbox2,
  BsTwitter,
} from "react-icons/bs";
import { GrFacebookOption, GrMail } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import locate from "./assets/location-marker.png";
import email from "./assets/mail.png";
import call from "./assets/phone.png";
import styles from "./footer.module.scss";
function Footer() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.allWidth}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/djufngoed/image/upload/v1670429102/logo_fdsclm.webp"
                  alt=""
                  className={styles.logo}
                />
              </Link>
              <div>
                <p className={styles.provide}>
                  Providing businesses with intelligent, accurate, and precise
                  intent analysis to improve customer experience.
                </p>
              </div>
            </div>

            <div className={styles.joinContainer}>
              <div className={styles.socials}>
                <a
                  href="https://www.linkedin.com/company/heed-cx/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLinkedin />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100088581892757&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GrFacebookOption />
                </a>
                <a
                  href="https://twitter.com/heed_cx?s=21&t=_jBdeIQ-Ne4sjKDFx-giAQ"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitter />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerRight}>
            <ul>
              <h4> Explore</h4>
              <li>
                <NavLink to="/about-us" className={styles.links}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className={styles.links}>
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className={styles.links}>
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>

            <ul>
              <h4>Quick links</h4>
              <li>
                <NavLink to="/pricing" className={styles.links}>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={styles.links}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/help-support" className={styles.links}>
                  Support
                </NavLink>
              </li>
            </ul>
            <div className={styles.footer__right}>
              <h4>Contact</h4>
              <div className={styles.footer__right__contact}>
                <div className={styles.footer__right__logo}>
                  {/* <img src={email} alt="" /> */}
                  <GrMail />
                </div>
                <a href="mailto:info@heed.cx">info@heed.cx</a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.footer__bottom}>
          <p> &copy; Copyright 2022 | Heed</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
