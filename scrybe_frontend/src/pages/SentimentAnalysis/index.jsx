import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SentimentAnalysis.module.scss";
import arrowIcon from "./icons/arrow_back.svg";
import blueArrowIcon from "./icons/blue_arrow.svg";
import AnalysisCard from "./components/AnalysisCard";
import AudioCard from "./components/AudioCard";
import SentimentAside from "./components/SentimentAside";
import OverAllSentimentCard from "./components/OverallSentimentCard";
import VerdictCard from "./components/VerdictCard";
import PhraseTagCard from "./components/PhraseTagCard";
import SideBar from "../../components/SideBar";
import { useMockAuthAndReadSentiment } from "./hooks";
import { useEffect } from "react";

function SentimentAnalysis() {
  const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false);
  const sentimentData = useMockAuthAndReadSentiment(1);

  useEffect(() => {
    console.log(sentimentData);
  }, [sentimentData]);

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

  const openSentimentTab = () => {
    setIsMobileAsideOpen(true);
  };

  const closeSentimentTab = () => {
    setIsMobileAsideOpen(false);
  };

  return (
    <SideBar>
      <div className={styles.page__container}>
        <div className={styles.audio__mobile}>
          <AudioCard />
        </div>
        <div className={styles.sentiment__tab__opener}>
          <div className={styles.opener__content} onClick={openSentimentTab}>
            Overall sentiment
            <div className={styles.arrow__container}>
              <img src={blueArrowIcon} alt="arrow icon" />
            </div>
          </div>
          <SentimentAside
            isMobileAsideOpen={isMobileAsideOpen}
            closeFunction={closeSentimentTab}
            sentimentData={sentimentData}
          />
        </div>
        <main className={styles.main__container}>
          <span className={styles.main__container__top}>
            <div
              className={styles.main__container__top__arrow__icon__container}
            >
              <Link to="/transcriptions">
                <img
                  className={
                    styles.main__container__top__arrow__icon__container__image
                  }
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </Link>
            </div>
            <div className={styles.main__container__top__title}>
              Sentiment analysis
            </div>
          </span>
          <div className={styles.analysis__cards}>
            <AnalysisCard sentimentData={sentimentData} />
            <AnalysisCard sentimentData={sentimentData} />
            <AnalysisCard sentimentData={sentimentData} />
            <AnalysisCard sentimentData={sentimentData} />
            <AnalysisCard sentimentData={sentimentData} />
          </div>
        </main>
        <aside className={styles.aside__container}>
          <AudioCard />
          <OverAllSentimentCard sentimentData={sentimentData} />
          <VerdictCard />
          <PhraseTagCard tags={positiveTags} title={"Positive phrase tags"} />
          <PhraseTagCard tags={negativeTags} title={"Negative phrase tags"} />
        </aside>
      </div>
    </SideBar>
  );
}

export default SentimentAnalysis;
