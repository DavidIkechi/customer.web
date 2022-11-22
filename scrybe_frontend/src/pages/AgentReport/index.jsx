import React from "react";
import AgentDetails from "../../components/AgentReport/AgentDetails";
import AgentRecordings from "../../components/AgentReport/AgentRecordings";
import Charts from "../../components/AgentReport/Chart";
import styles from "./styles/AgentReport.module.scss";

function AgentReport() {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.topDetailsDiv}>
          <Charts />
          <AgentDetails />
        </div>
        <AgentRecordings />
      </div>
    </div>
  );
}
export default AgentReport;
