import PropTypes from "prop-types";
import styles from "./AnalysisCard.module.scss";

function AnalysisCard({ sentimentData }) {
  return (
    <div className={styles.card}>
      <div className={styles.time}>
        {parseInt(sentimentData.time / 60)
          .toString()
          .padStart(2, "0") +
          ":" +
          Math.round(sentimentData.time % 60)
            .toString()
            .padEnd(2, "0")}
      </div>
      <div className={styles.content}>
        <div className={styles.content__text}>{sentimentData.transcript}</div>
        <div className={styles.content__analysis}>
          <div className={styles.content__analysis__top}>
            <div className={styles.title}>Analysis</div>
            <div className={styles.title__line} />
          </div>
          <div className={styles.content__analysis__metrics}>
            <div className={`${styles.metric} ${styles.positive}`}>
              Positive - {(sentimentData.positivity_score * 100).toFixed(2)}%
            </div>
            <div className={`${styles.metric} ${styles.neutral}`}>
              Neutral - {(sentimentData.neutrality_score * 100).toFixed(2)}%
            </div>
            <div className={`${styles.metric} ${styles.negative}`}>
              Negative - {(sentimentData.negativity_score * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AnalysisCard.propTypes = {
  sentimentData: PropTypes.object.isRequired,
};

export default AnalysisCard;
