import React from "react";
import styles from "./Transcribe.module.scss";
import TranscriptionMain from "./Components/TranscriptionMain/TranscriptionMain";

function Transcribe() {
  return (
    <div className={styles.Transcribe}>
      <TranscriptionMain />
    </div>
  );
}

export default Transcribe;
