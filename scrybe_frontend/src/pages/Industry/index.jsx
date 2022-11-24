import React from "react";

import styles from "./industry.module.scss";
import IndustryCard from "./components/IndustryCard";

function Industry() {
  return (
    <div className={styles.industry}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <img src="" alt="" />
        </div>
        <div className={styles.banner}>
          <h1>Industry</h1>
          <p>
            Industry-related news and insights for enterprises building features
            and products with state-of-the-art AI models.
          </p>
        </div>
        <IndustryCard />
      </div>
    </div>
  );
}

export default Industry;
