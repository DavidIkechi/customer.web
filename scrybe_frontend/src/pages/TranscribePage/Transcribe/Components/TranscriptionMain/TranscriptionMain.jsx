import React from "react";
import styles from "./TranscriptionMain.module.scss";
import TranscriptionsList from "./TranscriptionsList/TranscriptionsList";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";

function TranscriptionMain() {
  return (
    <div className={styles.TranscriptionMain}>
      <TranscriptionsList />
      <TranscriptionRightBar />
    </div>
  );
}

export default TranscriptionMain;
