import React from "react";
import Content from "./Content";
import styles from "./style.module.scss";

function TermsOfService() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Terms Of Service</h1>
      <Content />
    </div>
  );
}
export default TermsOfService;
