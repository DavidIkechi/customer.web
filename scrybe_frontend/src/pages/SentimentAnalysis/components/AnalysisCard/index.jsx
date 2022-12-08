import PropTypes from "prop-types";
import SkeletonLoader from "../SkeletonLoader";
import styles from "./AnalysisCard.module.scss";

function AnalysisCard({ sentimentData }) {
  let totalList = [];
  const transcriptElements = [];
  if (sentimentData.transcript) {
    let mostNegative = JSON.parse(sentimentData.most_negative_sentences);
    let mostPositive = JSON.parse(sentimentData.most_postive_sentences); //there's a typo in the data key coming from the backend
    mostNegative = mostNegative.map((item) => {
      item.start = sentimentData.transcript.indexOf(item.sentence);
      item.end = item.start + item.sentence.length;
      item.type = "neg";
      return item;
    });
    mostPositive = mostPositive.map((item) => {
      item.start = sentimentData.transcript.indexOf(item.sentence);
      item.end = item.start + item.sentence.length;
      item.type = "pos";
      return item;
    });
    let textCountNeg = 0;
    let textCountPos = 0;
    while (
      textCountNeg < mostNegative.length &&
      textCountPos < mostPositive.length
    ) {
      if (
        mostNegative[textCountNeg]?.start < mostPositive[textCountPos]?.start
      ) {
        totalList.push(mostNegative[textCountNeg]);
        textCountNeg++;
      } else {
        totalList.push(mostPositive[textCountNeg]);
        textCountPos++;
      }
    }
    totalList = totalList
      .concat(mostNegative.slice(textCountNeg))
      .concat(mostPositive.slice(textCountPos));

    let textCount = 0;
    transcriptElements.push(
      <span className={styles.analysis__text} key={Math.random()}>
        {sentimentData.transcript.slice(textCount, totalList[0]?.start)}
      </span>
    );
    totalList.forEach((item, index) => {
      transcriptElements.push(
        <span
          className={`${styles.analysis__text} ${
            item.type === "neg"
              ? styles.analysis__text__negative
              : item.type === "pos"
              ? styles.analysis__text__positive
              : ""
          }`}
          key={index + Math.random()}
        >
          {sentimentData.transcript.slice(item.start, item.end)}
        </span>
      );
      if (totalList[index + 1]) {
        transcriptElements.push(
          <span className={styles.analysis__text} key={index + Math.random()}>
            {sentimentData.transcript.slice(
              item.end,
              totalList[index + 1]?.start
            )}
          </span>
        );
      } else {
        transcriptElements.push(
          <span className={styles.analysis__text} key={index + Math.random()}>
            {sentimentData.transcript.slice(item.end)}
          </span>
        );
      }
    });
  }
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
          <div className={styles.content__text}>{transcriptElements}</div>
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
