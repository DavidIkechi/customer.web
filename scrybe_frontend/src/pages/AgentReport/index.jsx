import { React } from "react";
import styles from "./styles/AgentReport.module.scss";
import Content from "./Content";
// import { useAgentPerformanceData } from './hooks/index'

// onClick={() => modal.showModal()}
function AgentReport({ setModal, agent_id, controll, rank, show }) {
  // const { recentAgentReport, agentAnalysis } = useAgentPerformanceData()
  // console.log(recentAgentReport);
  // console.log(agentAnalysis);
  return (
    <>
      <div className={styles.container}>
        <Content
          setModal={setModal}
          controll={controll}
          agent_id={agent_id}
          show={show}
          rank={rank}
          // recentAgentReport={recentAgentReport}
          // agentAnalysis={agentAnalysis}
        />
      </div>
    </>
  );
}
export default AgentReport;
