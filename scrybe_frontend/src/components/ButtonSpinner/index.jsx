// import React from "react";
// import styles from "./spinner.module.scss";

// const Spinner = () => (
//   <div className={styles.spinner}>
//     <div className={styles.spinner__dot}></div>
//     <div className={styles.spinner__dot}></div>
//     <div className={styles.spinner__dot}></div>
//   </div>
// );

// export default Spinner;
import React from "react";
import styles from "./spinner.module.scss";

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinner__ring}></div>
  </div>
);

export default Spinner;
