import React from "react";
import styles from "./AnalysisCard.module.scss";

export default function AnalysisCard() {
  return (
    <div className={styles.card}>
      <div className={styles.time}>00:00</div>
      <div className={styles.content}>
        <div className={styles.content__text}>
          The meeting was a success. We discussed at length about the
          intricacies of how the software will run. Text analytics software can
          be difficult to use, expensive, and time-consuming. Sentiment analysis
          is a much more difficult task and takes a lot of time to build up a
          training dataset.
        </div>
        <div className={styles.content__analysis}>
          <div className={styles.content__analysis__top}>
            <div className={styles.title}>Analysis</div>
            <div className={styles.title__line} />
          </div>
          <div className={styles.content__analysis__metrics}>
            <div className={`${styles.metric} ${styles.positive}`}>
              Positive - 60%
            </div>
            <div className={`${styles.metric} ${styles.neutral}`}>
              Neutral - 30%
            </div>
            <div className={`${styles.metric} ${styles.negative}`}>
              Negative - 10%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
