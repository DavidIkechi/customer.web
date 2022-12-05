import React from "react";
import styles from "./styles/AgentReport.module.scss";
import close from "./assets/icon.svg";
import Charts from "./components/ChartContainer";
import AgentDetails from "./components/AgentDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import { agentData } from "./components/Data";
import { useAgentReport } from "./hooks";

const Content = () => {
  const agentReport = useAgentReport();

  // chart data

  const [agentDets, setAgentDets] = useState({});
  const [data_id, setData_id] = useState("5");

  useEffect(() => {
    const data =
      "grant_type=&username=rambeybello%40gmail.com&password=aaaaaaaa&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(
          `https://api.heed.hng.tech/total-agent-analysis?agent_id=${data_id}`,
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data);
          setAgentDets(res.data);
        });
    });
  }, []);

  // console.log(agentDets);
  // chart data

  const [selectReport, setSelectReport] = useState([]);

  const handleDate = (e) => {
    setSelectReport(agentData[e.target.value]);
    // setSelectReport(agentDets[e.target.value]);
  };

  useEffect(() => {
    setSelectReport(agentData.week);
    // setSelectReport(agentDets.week);
    // console.log(selectReport);
  }, []);

  return (
    // <div className={styles.container}>
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
    // </div>
  );
};

export default Content;
