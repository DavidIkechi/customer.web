import PropTypes from "prop-types";
import SkeletonLoader from "../SkeletonLoader";
import styles from "./AnalysisCard.module.scss";

function AnalysisCard({ sentimentData }) {
  return (
    <div className={styles.card}>
      <div className={styles.time}>
        {sentimentData.time
          ? parseInt(sentimentData.time / 60)
              .toString()
              .padStart(2, "0") +
            ":" +
            Math.round(sentimentData.time % 60)
              .toString()
              .padEnd(2, "0")
          : "00:00"}
      </div>
      <div className={styles.content}>
        {sentimentData.transcript ? (
          <div className={styles.content__text}>{sentimentData.transcript}</div>
        ) : (
          // loading skeleton
          <SkeletonLoader type="text" numberOfLines={5} />
        )}
        <div className={styles.content__analysis}>
          <div className={styles.content__analysis__top}>
            <div className={styles.title}>Analysis</div>
            <div className={styles.title__line} />
          </div>
          <div className={styles.content__analysis__metrics}>
            {sentimentData.positivity_score ||
            sentimentData.negativity_score ||
            sentimentData.neutrality_score ? (
              <>
                <div className={`${styles.metric} ${styles.positive}`}>
                  Positive - {(sentimentData.positivity_score * 100).toFixed(2)}
                  %
                </div>
                <div className={`${styles.metric} ${styles.neutral}`}>
                  Neutral - {(sentimentData.neutrality_score * 100).toFixed(2)}%
                </div>
                <div className={`${styles.metric} ${styles.negative}`}>
                  Negative - {(sentimentData.negativity_score * 100).toFixed(2)}
                  %
                </div>
              </>
            ) : (
              //loading skeleton
              <>
                <div
                  className={`${styles.metric} ${styles.positive} ${styles.skeleton__generic}`}
                ></div>
                <div
                  className={`${styles.metric} ${styles.neutral} ${styles.skeleton__generic}`}
                ></div>
                <div
                  className={`${styles.metric} ${styles.negative} ${styles.skeleton__generic}`}
                ></div>
              </>
            )}
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
