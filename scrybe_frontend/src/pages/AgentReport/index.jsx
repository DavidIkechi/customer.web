import React from "react";
import AgentDetails from "./components/AgentDetails";
import AgentRecordings from "./components/AgentRecordings";
import Charts from "./components/ChartContainer";
import styles from "./styles/AgentReport.module.scss";

import Sidebar from "../../components/NewDesignSideBar/index";
import TopNav from "../../components/TopNav/index";

function AgentReport() {
  return (
    <>
      <TopNav />
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.topDetailsDiv}>
            <Charts />
            <AgentDetails />
          </div>
          <AgentRecordings />
        </div>
      </div>
    </>
  );
}
export default AgentReport;
