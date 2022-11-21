// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import styles from "./try_state_1.module.css";
import RecordingLogo from "../../assets/Recording-logo.png";

export default function TryState1() {
  return (
    <div>
      <div className={styles.recordingDrag}>
        <div className={styles.recordingContent}>
          <div className={styles.recordingImageContainer}>
            <img src={RecordingLogo} alt="some" />
          </div>
          <h4>Drag and drop agent audio call recordings</h4>
          <div className={styles.Or}>
            <div />
            <p>OR</p>
            <div />
          </div>
          <input type="file" />

          <p className={styles.Upload}>Browse from your computer</p>
          <button type="button">Transcribe</button>
        </div>
      </div>

      <div className={styles.tryNote}>
        <p>Please note;</p>
        <ul>
          <li>
            You may upload, transcribe and analyse only one recording at a time.
          </li>
          <li>File must not be larger than 5mb.</li>
          <li>
            Transcription may take up to 3 minutes, kindly wait or sign up to
            use the job ID feature.
          </li>
          <li>
            Downloading sentiment anlysis is currently only available on the
            webapp.
          </li>
          <li>
            Tracking sentiment anlysis records is currently only available on
            the webapp.
          </li>
        </ul>
      </div>
    </div>
  );
}
