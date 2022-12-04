import React from "react";
import AgentDetails from "./components/AgentDetails";
import AgentRecordings from "./components/AgentRecordings";
import Charts from "./components/ChartContainer";
import styles from "./styles/AgentReport.module.scss";

import NewDesignSidebar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";

function AgentReport() {
  return (
    <>
      <TopNav />
      <NewDesignSidebar>
        <div className={styles.container}>
          <div className={styles.mainWrapper}>
            <div className={styles.topDetailsDiv}>
              <Charts />
              <AgentDetails />
            </div>
            <AgentRecordings />
          </div>
        </div>
      </NewDesignSidebar>
    </>
  );
}
export default AgentReport;
