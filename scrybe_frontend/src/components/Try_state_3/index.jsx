import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import styles from "./try_state_3.module.css";
import RecordingLogo from "../../assets/Recording-logo.png";
import TranscribeLogo from "../../assets/file-transcribing.png";

export default function TryThird() {
  return (
    <div>
      <div className={styles.recordingDrag}>
        <div className={styles.recordingContent}>
          <div className={styles.recordingImageContainer}>
            <img src={RecordingLogo} alt="some" />
          </div>
          <h4>Recording 1 name.mp3</h4>
          <div className={styles.Or}>
            <div />
            <p>OR</p>
            <div />
          </div>
          <input type="file" />

          <p className={styles.Upload}>
            Select another file from your computer
          </p>
          <button type="button">Transcribe</button>
        </div>
      </div>

      <div className={styles.transcribeSection}>
        <div className={styles.transcribe1}>
          <img src={TranscribeLogo} alt="some" />
          <p>12%</p>
        </div>
        <div className={styles.transcribe2}>
          <h4>Transcribing...</h4>
          <input type="range" />
        </div>
      </div>

      <div className={styles.wait}>
        <p>
          Transcription may take up to 3 minutes. Kindly wait or{" "}
          <Link to="/" className={styles.signUp}>
            Sign Up
          </Link>{" "}
          to use the job ID feature.
        </p>
      </div>
    </div>
  );
}
