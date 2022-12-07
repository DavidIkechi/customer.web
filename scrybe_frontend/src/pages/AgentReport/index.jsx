import { React, useRef } from "react";
import styles from "./styles/AgentReport.module.scss";
import Content from "./Content";
// import { useAgentPerformanceData } from './hooks/index'

// onClick={() => modal.showModal()}
function AgentReport() {
  let modal = useRef();

  // const { recentAgentReport, agentAnalysis } = useAgentPerformanceData()
  // console.log(recentAgentReport);
  // console.log(agentAnalysis);

  return (
    <>
      <dialog className={styles.container} ref={(mode) => (modal = mode)}>
        <Content
        // recentAgentReport={recentAgentReport}
        // agentAnalysis={agentAnalysis}
        />
      </dialog>
    </>
  );
}
export default AgentReport;
