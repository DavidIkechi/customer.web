import React from "react";
import { Link } from "react-router-dom";
import styles from "./try_state_1.module.scss";

export default function Error() {
  return (
    <div className={styles.error}>
      Internal server error. Please click{" "}
      <Link to="/try" className={styles.link}>
        here
      </Link>{" "}
      to go back
    </div>
  );
}
