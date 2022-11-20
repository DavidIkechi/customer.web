import React from "react";
import Content from "../../components/terms and condition/Content";
import styles from "./termsOfService.module.scss";

function TermsOfService() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Terms And Condition</h1>
      <Content />
    </div>
  );
}
export default TermsOfService;
