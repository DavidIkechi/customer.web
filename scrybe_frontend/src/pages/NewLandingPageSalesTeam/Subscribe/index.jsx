import React from "react";
import styles from "./subscribe.module.scss";

const Subscribe = () => {
  return (
    <div className={styles.subscribe}>
      <h4 className={styles.subscribeHeading}>
        Let Us Keep You Updated Always
      </h4>
      <p className={styles.subscribeparagraph}>
        Subscribe to our newsletter to stay updated and notified about our new
        product and services
      </p>
      <div className={styles.inputs}>
        <input type={"email"} placeholder={"Enter Your Email Address"} />
        <button>Subscribe Now</button>
      </div>
    </div>
  );
};

export default Subscribe;
