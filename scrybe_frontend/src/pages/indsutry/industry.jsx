import React from "react";

import styles from "../../styles/Industry/industry.module.css";
import IndustryCard from "../../components/Industry/industryCard";

function Industry() {
  return (
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
  );
}

export default Industry;
