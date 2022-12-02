import React from "react";
import styles from "./HowItWorks.module.scss";
import mockup from "../Assets/mockup.png";

const HowItWorks = () => {
  return (
    <div className={styles.HowItWorks}>
      <div className={styles.HowItWorksImage}>
        <h3>How it works</h3>
        <img src={mockup} alt="mockup" />
      </div>
      <div className={styles.HowItWorksText}>
        <div className={styles.bullets}>
          <h5 className={styles.bulletsHeading}>01</h5>
          <h5 className={styles.bulletsHeading}>Upload File</h5>
        </div>
        <div className={styles.bulletsBody}>
          <div className={styles.bulletsContentLine}></div>
          <p className={styles.bulletscontent}>
            Upload the audio file you want to analyze (in mp3 format)
          </p>
        </div>

        <div className={styles.bullets}>
          <h5 className={styles.bulletsHeading}>02</h5>
          <h5 className={styles.bulletsHeading}>Sentiment Analysis</h5>
        </div>

        <div className={styles.bulletsBody}>
          <div className={styles.bulletsContentLine}></div>
          <p className={styles.bulletscontent}>
            Heed will analyze the conversation to produce: a readable and
            searchable text file a Sentiment Analysis report Heed automatically
            transcribes and analyzes your file within minutes. We will also
            notify you via mail when your report is ready.
          </p>
        </div>

        <div className={styles.bullets}>
          <h5 className={styles.bulletsHeading}>03</h5>
          <h5 className={styles.bulletsHeading}>
            Anaysis insights and take action
          </h5>
        </div>

        <div className={styles.bulletsBody}>
          <div className={styles.bulletsContentLine}></div>
          <p className={styles.bulletscontent}>
            Get an overview of your agents’ performance - Measure the quality of
            their interactions and see which agents consistently get positive
            sentiment results and those which need improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
