/* eslint-disable */
import React from "react";
import styles from "./SentimentAnalysis.module.scss";
import arrowIcon from "./icons/arrow_back.svg";
import blueArrowIcon from "./icons/blue_arrow.svg";
import pieChart from "./icons/pie_chart.svg";
import downloadIcon from "./icons/download.svg";
import dropdownIcon from "./icons/dropdown.svg";
import shareIcon from "./icons/share.svg";
import AnalysisCard from "./components/AnalysisCard";
import AudioCard from "./components/AudioCard";
import SentimentAside from "./components/SentimentAside";

function SentimentAnalysis() {
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

  const openSentimentTab = () => {};

  return (
    <div className={styles.page__container}>
      <div className={styles.audio__mobile}>
        <AudioCard />
      </div>
      <div className={styles.sentiment__tab__opener}>
        Overall sentiment
        <div className={styles.arrow__container} onClick={openSentimentTab}>
          <img src={blueArrowIcon} alt="arrow icon" />
        </div>
        {<SentimentAside />}
      </div>
      <main className={styles.main__container}>
        <span className={styles.main__container__top}>
          <div className={styles.main__container__top__arrow__icon__container}>
            <img
              className={
                styles.main__container__top__arrow__icon__container__image
              }
              src={arrowIcon}
              alt="arrow icon"
            />
          </div>
          <div className={styles.main__container__top__title}>
            Sentiment analysis
          </div>
        </span>
        <div className={styles.analysis__cards}>
          <AnalysisCard />
          <AnalysisCard />
          <AnalysisCard />
          <AnalysisCard />
          <AnalysisCard />
          <AnalysisCard />
          <AnalysisCard />
        </div>
      </main>
      <aside className={styles.aside__container}>
        <AudioCard />
        <div
          className={`${styles.overall__sentiment} ${styles.inner__container}`}
        >
          <div className={styles.title}>Overall sentiment</div>
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
              <div className={`${styles.item__icon} ${styles.neutral}`} />{" "}
              Neutral
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
    </div>
  );
}

export default SentimentAnalysis;
