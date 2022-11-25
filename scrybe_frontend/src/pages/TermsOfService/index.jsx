import React from "react";
import Content from "./Content";
import styles from "./style.module.scss";

function TermsOfService() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Terms Of Service</h1>
      <Content />
    </div>
  );
}
export default TermsOfService;
