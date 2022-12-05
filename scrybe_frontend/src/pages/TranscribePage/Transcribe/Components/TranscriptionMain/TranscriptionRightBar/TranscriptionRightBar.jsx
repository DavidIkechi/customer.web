import React from "react";
import styles from "./TranscriptionRightBar.module.scss";
import AudioControl from "./Components/AudioControl";
import SentimentAnalysis from "./Components/SentimentAnalysis";
import RecordingList from "./Components/RecordingList";

function TranscriptionRightBar({
  audioElem,
  setIsPlaying,
  isPlaying,
  audioDuration,
  currentTime,
  audioFileSize,
  recentRecordings,
}) {
  return (
    <div className={styles.TranscriptionRightBar}>
      <AudioControl
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioDuration={audioDuration}
        currentTime={currentTime}
        audioFileSize={audioFileSize}
      />
      <SentimentAnalysis />
      <RecordingList recentRecordings={recentRecordings} />
    </div>
  );
}

export default TranscriptionRightBar;
