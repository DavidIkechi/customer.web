import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import styles from "./try_state_3.module.scss";
// import RecordingLogo from "../../assets/Recording-logo.png";
// import TranscribeLogo from "../../assets/file-transcribing.png";

export default function TryThird() {
  return (
    <div className={styles.transcribeProcessingContainer}>
      <div className={styles.transcribeProcess}>
        <div>
          <h3>Please wait while your Transcription is processing</h3>

          <div className={styles.progress}>
            <div className={styles.color}></div>
          </div>
          <h4>Processing...</h4>
        </div>
      </div>

      <div className={styles.wait}>
        <p>
          Transcription may take up to 3 minutes. Kindly wait or{" "}
          <Link to="/signin" className={styles.signUp}>
            Sign Up
          </Link>
          to use the job ID feature.
        </p>
      </div>
    </div>
  );
}
