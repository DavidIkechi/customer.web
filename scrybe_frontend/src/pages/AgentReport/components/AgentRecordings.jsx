import React from "react";
import styles from "../styles/AgentRecordings.module.scss";
import Table from "./Table";

function AgentRecordings() {
  return (
    <div className={styles.recordings}>
      <p className={styles.title}>Agent's recordings</p>
      <div className={styles.tableContainer}>
        <Table />
      </div>
    </div>
  );
}

export default AgentRecordings;
