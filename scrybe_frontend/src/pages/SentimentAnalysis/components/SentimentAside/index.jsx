import PropTypes from "prop-types";
import styles from "./SentimentAside.module.scss";
import arrowIcon from "../../assets/icons/arrow_back.svg";
import OverAllSentimentCard from "../OverallSentimentCard";
import VerdictCard from "../VerdictCard";

function SentimentAside({ isMobileAsideOpen, closeFunction, sentimentData }) {
  const positiveTags = [
    "brave",
    "good",
    "happy",
    "great",
    "Nice",
    "happy",
    "thanks",
    "good",
    "excited",
    "brave",
    "easy",
    "lovely",
    "excited",
  ];

  const negativeTags = [
    "fear",
    "bad",
    "sad",
    "lost",
    "confused",
    "sad",
    "rude",
    "fear",
    "rude",
    "difficult",
    "ugly",
    "bad",
    "criticism",
  ];
  return (
    <aside
      className={`${styles.aside__container} ${
        isMobileAsideOpen ? styles.open__aside : ""
      }`}
    >
      <div className={`${styles.back}`}>
        <div className={styles.back__content} onClick={closeFunction}>
          <img src={arrowIcon} alt="back arrow" />
          <div className={styles.back__text}>Overall Sentiment</div>
        </div>
      </div>
      <OverAllSentimentCard sentimentData={sentimentData} />
      <VerdictCard sentimentData={sentimentData} />

      <div className={`${styles.tags} ${styles.inner__container}`}>
        <div className={styles.title}>Positive phrase tags</div>
        <ul className={styles.tag__items}>
          {positiveTags.map((tag) => {
            return (
              <li key={String(Math.random()) + String(new Date().getTime())}>
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${styles.tags} ${styles.inner__container}`}>
        <div className={styles.title}>Negative phrase tags</div>
        <ul className={styles.tag__items}>
          {negativeTags.map((tag) => {
            return (
              <li key={String(Math.random()) + String(new Date().getTime())}>
                {tag}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

SentimentAside.propTypes = {
  isMobileAsideOpen: PropTypes.bool.isRequired,
  closeFunction: PropTypes.func.isRequired,
  sentimentData: PropTypes.object.isRequired,
};

export default SentimentAside;
