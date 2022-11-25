import React from "react";
import styles from "./TranscriptionMain.module.scss";
// import TranscriptionsList from "./TranscriptionsList/TranscriptionsList";
import Dummy from "./TranscriptionsList/test";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";

function TranscriptionMain() {
  return (
    <div className={styles.TranscriptionMain}>
      <Dummy />
      <TranscriptionRightBar />
    </div>
  );
}

export default TranscriptionMain;
