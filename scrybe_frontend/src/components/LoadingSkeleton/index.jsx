import React from "react";
import styles from "./loading.module.scss";

const IsLoadingSkeleton = () => {
  return (
    <div className={styles["roe"]}>
      <div className={styles["col s12 m12"]}>
        <div className={styles["cardtop"]}>
          {/* <div className={styles["topcard"]}>
            <div className={styles["top"]}>
              <div className={styles["name"]}></div>
              <div className={styles["time"]}></div>
            </div>
          </div> */}
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["longest"]}></div>
          <div className={styles["longer"]}></div>
          <div className={styles["long"]}></div>
          <div className={styles["short"]}></div>
          {/* <div className={styles["image"]}></div> */}
        </div>
      </div>
    </div>
  );
};

export default IsLoadingSkeleton;
