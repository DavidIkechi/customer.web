import React from "react";
import styles from "./styles/AgentReport.module.scss";
import close from "./assets/icon.svg";
import Charts from "./components/ChartContainer";
import AgentDetails from "./components/AgentDetails";
import { useState, useEffect } from "react";
import { useAgentReport } from "./hooks";
import { useAgentAnalysis } from "./hooks";

// { recentAgentReport, agentAnalysis}
const Content = () => {
  const agentReportData = useAgentReport();
  const agentAnalysisData = useAgentAnalysis();
  const [selectReport, setSelectReport] = useState([]);

  useEffect(() => {
    setSelectReport(agentAnalysisData.week);
  }, [agentAnalysisData]);

  const handleDate = (e) => {
    setSelectReport(agentAnalysisData[e.target.value]);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1>Agent Report</h1>
        <img src={close} alt="close" />
      </div>

      <div className={styles.idcont}>
        <div className={styles.agentId}>
          <p className={styles.secondp}>
            Agent ID: &nbsp; &nbsp; {agentReportData?.str_agent_id}
          </p>

          <p className={styles.secondp}>
            Rank: &nbsp; &nbsp; {agentReportData?.rank}
          </p>
        </div>

        <div className={styles.select}>
          <p>View by</p>
          <select className={styles.dropdown} onChange={handleDate}>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>
      </div>
      <div className={styles.topDetailsDiv}>
        <Charts
          // agentAnalysis={agentAnalysis}
          selectReport={selectReport}
        />
        <AgentDetails
        // recentAgentReport={recentAgentReport}
        />
      </div>
    </div>
  );
};

export default Content;
