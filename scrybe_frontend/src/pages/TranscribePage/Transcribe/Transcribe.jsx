import React from "react";
import styles from "./Transcribe.module.scss";
import TranscriptionHeader from "./Components/TranscriptionHeader/TranscriptionHeader";
import TranscriptionMain from "./Components/TranscriptionMain/TranscriptionMain";

function Transcribe() {
  return (
    <div className={styles.Transcribe}>
      <TranscriptionHeader />
      <TranscriptionMain />
    </div>
  );
}

export default Transcribe;
