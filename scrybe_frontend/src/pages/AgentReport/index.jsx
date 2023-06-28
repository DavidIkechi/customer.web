import { React } from "react";
import styles from "./styles/AgentReport.module.scss";
import Content from "./Content";

function AgentReport({ setModal, agent_id, controll, rank, show }) {
  return (
    <>
      <div className={styles.container}>
        <Content
          setModal={setModal}
          controll={controll}
          agent_id={agent_id}
          show={show}
          rank={rank}
        />
      </div>
    </>
  );
}
export default AgentReport;
