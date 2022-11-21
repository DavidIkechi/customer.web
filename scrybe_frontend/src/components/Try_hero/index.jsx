// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import { Link } from "react-router-dom";
import Background from "../../assets/Try-background.png";
import TryPic from "../../assets/Try-hero.png";
import styles from "./try_hero.module.css";

export default function tryHero() {
  return (
    <section className={styles.trySection}>
      <div className={styles.HeroSection}>
        <div className={styles.Hero1}>
          <h3>Try for Free</h3>
          <p>
            Experience a touch of Scrybe without committing to our
            subscriptions. Try our other features when you sign up with us.
          </p>
          <Link to="/" className={styles.HeroButton}>
            Sign Up Now
          </Link>
        </div>
        <div className={styles.Hero2}>
          <img src={TryPic} alt="some" />
        </div>
        <img className={styles.backgroundImage} src={Background} alt="some" />
      </div>

      <div className={styles.downHero}>
        <hr />
        <p>
          Scrybe offers unauthenticated users trials to run sentimental analysis
          on .mp3 customer/agent records without the need to sign up. However,
          to access more enjoyable features to easily track the customer support
          performance of your company, you are required to Sign Up/Sign In with
          your correct company email.
        </p>
      </div>
    </section>
  );
}
