import React from "react";
import styles from "./TranscriptionRightBar.module.scss";
import AudioControl from "./Components/AudioControl";
import SentimentAnalysis from "./Components/SentimentAnalysis";
import RecordingList from "./Components/RecordingList";

function TranscriptionRightBar() {
  return (
    <div className={styles.TranscriptionRightBar}>
      <AudioControl />
      <SentimentAnalysis />
      <RecordingList />
    </div>
  );
}

export default TranscriptionRightBar;
