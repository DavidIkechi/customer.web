import React from "react";
import styles from "./styles/AgentReport.module.scss";
import close from "./assets/icon.svg";
import Charts from "./components/ChartContainer";
import AgentDetails from "./components/AgentDetails";
import { useState, useEffect } from "react";
import { useAgentReport } from "./hooks";
import { useAgentDetails } from "./hooks";

const Content = () => {
  const agentReport = useAgentReport();
  const agentDetail = useAgentDetails();
  const [selectReport, setSelectReport] = useState([]);

  useEffect(() => {
    setSelectReport(agentDetail.week);
  }, [agentDetail]);

  const handleDate = (e) => {
    setSelectReport(agentDetail[e.target.value]);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1>Agent Report</h1>
        <img src={close} alt="close" />
      </div>

      <div className={styles.idcont}>
        <>
          {agentReport.map((detail) => {
            return (
              <div className={styles.agentId}>
                <p className={styles.secondp}>
                  Agent ID: &nbsp; &nbsp; {detail.agent_id}
                </p>

                <p className={styles.secondp}>
                  Rank: &nbsp; &nbsp; {detail.rank}
                </p>
              </div>
            );
          })}
        </>

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
        <AgentDetails />
      </div>
    </div>
  );
};

export default Content;
