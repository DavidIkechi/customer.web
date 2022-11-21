import PropTypes from "prop-types";

import styles from "./SentimentAside.module.scss";
import pieChart from "../../icons/pie_chart.svg";
import downloadIcon from "../../icons/download.svg";
import dropdownIcon from "../../icons/dropdown.svg";
import shareIcon from "../../icons/share.svg";
import arrowIcon from "../../icons/arrow_back.svg";

function SentimentAside({ isMobileAsideOpen, closeFunction }) {
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
      <div
        className={`${styles.overall__sentiment} ${styles.inner__container}`}
      >
        <div className={styles.sentiment__chart}>
          <img src={pieChart} alt="pie chart" />
        </div>
        <ul className={styles.sentiment__chart__legend}>
          <li className={styles.chart__legend__item}>
            <div className={`${styles.item__icon} ${styles.positive}`} />{" "}
            Positive
            <div className={styles.score}>15%</div>
          </li>
          <li className={styles.chart__legend__item}>
            <div className={`${styles.item__icon} ${styles.neutral}`} /> Neutral
            <div className={styles.score}>15%</div>
          </li>
          <li className={styles.chart__legend__item}>
            <div className={`${styles.item__icon} ${styles.negative}`} />{" "}
            Negative
            <div className={styles.score}>15%</div>
          </li>
        </ul>
      </div>
      <div className={`${styles.verdict} ${styles.inner__container}`}>
        <div className={styles.verdict__item}>
          <div className={styles.verdict__title}>Agent Friendliness</div>
          <div className={styles.verdict__bar}>
            <div className={styles.inner__bar} style={{ width: `${90}%` }} />
            <div className={styles.bar__text}>90%</div>
          </div>
        </div>
        <div className={styles.verdict__item}>
          <div className={styles.verdict__title}>Agent Friendliness</div>
          <div className={styles.verdict__bar}>
            <div className={styles.inner__bar} style={{ width: `${85}%` }} />
            <div className={styles.bar__text}>85%</div>
          </div>
        </div>
        <div className={styles.verdict__item}>
          <div className={styles.verdict__title}>Verdict: </div>
          <div className={styles.final__verdict}>Customer is Satisfied</div>
        </div>
        <div className={styles.verdict__download}>
          <button type="button" className={styles.download__button}>
            <img src={downloadIcon} alt="download icon" />
            Download
            <div className={styles.dropdown__container}>
              <img src={dropdownIcon} alt="drop down" />
            </div>
          </button>
          <button type="button" className={styles.share__button}>
            <img src={shareIcon} alt="share icon" />
          </button>
        </div>
      </div>
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
};

export default SentimentAside;
