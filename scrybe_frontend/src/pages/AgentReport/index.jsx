import { React, useRef } from "react";
import styles from "./styles/AgentReport.module.scss";
import Content from "./Content";

// onClick={() => modal.showModal()}
function AgentReport() {
  let modal = useRef();
  // let handleDate;

  return (
    <>
      <dialog className={styles.container} ref={(mode) => (modal = mode)}>
        <Content />
      </dialog>
    </>
  );
}
export default AgentReport;
