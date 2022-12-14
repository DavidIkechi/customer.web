import React from "react";
import styles from "./styles/AgentReport.module.scss";
import close from "./assets/icon.svg";
import Charts from "./components/ChartContainer";
import AgentDetails from "./components/AgentDetails";
import { useState, useEffect } from "react";
import { useAgentReport } from "./hooks";
import { useAgentAnalysis } from "./hooks";

const Content = (props) => {
  const agentReportData = useAgentReport(props);
  const agentAnalysisData = useAgentAnalysis(props);
  const [selectData, setSelectData] = useState([]);
  const [selectReport, setSelectReport] = useState([]);

  useEffect(() => {
    setSelectReport(agentAnalysisData?.week);
    setSelectData(agentReportData?.week);
  }, [agentAnalysisData, agentReportData]);

  const handleDate = (e) => {
    setSelectReport(agentAnalysisData[e.target.value]);
    setSelectData(agentReportData[e.target.value]);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1>Agent Report</h1>
        <img src={close} alt="close" onClick={() => props?.setModal(false)} />
      </div>

      <div className={styles.idcont}>
        <div className={styles.agentId}>
          <p className={styles.secondp}>
            Agent ID: &nbsp; &nbsp; {props?.show}
          </p>

          <p className={styles.secondp}>Rank: &nbsp; &nbsp; {props?.rank}</p>
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
        <Charts selectReport={selectReport} />
        <AgentDetails selectData={selectData} />
      </div>
    </div>
  );
};

export default Content;
