import { React, useRef } from "react";
import AgentDetails from "./components/AgentDetails";
import Charts from "./components/ChartContainer";
import styles from "./styles/AgentReport.module.scss";
import close from "./assets/icon.svg";

// onClick={() => modal.showModal()}
function AgentReport() {
  let modal = useRef();

  return (
    <>
      <dialog className={styles.container} ref={(mode) => (modal = mode)}>
        <div className={styles.mainWrapper}>
          <div className={styles.header}>
            <h1>Agent Report</h1>
            <img src={close} onClick={() => modal.close()} alt="close" />
          </div>
          <div className={styles.topDetailsDiv}>
            <Charts />
            <AgentDetails />
          </div>
        </div>
      </dialog>
    </>
  );
}
export default AgentReport;
