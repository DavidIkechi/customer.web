import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowIcon from "./assets/icons/arrow_back.svg";
import blueArrowIcon from "./assets/icons/blue_arrow.svg";
import AnalysisCard from "./components/AnalysisCard";
import AudioCard from "./components/AudioCard";
import OverAllSentimentCard from "./components/OverallSentimentCard";
import PhraseTagCard from "./components/PhraseTagCard";
import SentimentAside from "./components/SentimentAside";
import VerdictCard from "./components/VerdictCard";
import styles from "./SentimentAnalysis.module.scss";
import { useEffect } from "react";
import { dispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { GetTransciption } from "../../redux/features/transcriptions/service";
import IsLoadingSkeleton from "../../components/LoadingSkeleton";

function SentimentAnalysis() {
  const { transcription } = useSelector((state) => state.transcription);
  const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    dispatch(GetTransciption(params.AudioId));
  }, []);

  useEffect(() => {
    if (transcription !== {}) {
      setLoading(false);
    }
  }, [transcription]);

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
    <div className={styles.page__container}>
      {loading ? (
        <IsLoadingSkeleton />
      ) : (
        <>
          <div className={styles.audio__mobile}>
            <AudioCard sentimentData={transcription} />
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
              sentimentData={transcription}
            />
          </div>
          <main className={styles.main__container}>
            <span className={styles.main__container__top}>
              <div
                className={styles.main__container__top__arrow__icon__container}
              >
                <Link to={`/transcriptions/${params.AudioId}`}>
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
              <AnalysisCard sentimentData={transcription} />;
            </div>
          </main>
          <aside className={styles.aside__container}>
            <AudioCard sentimentData={transcription} />
            <OverAllSentimentCard sentimentData={transcription} />
            <VerdictCard sentimentData={transcription} />
            <PhraseTagCard
              tags={
                transcription.positiveTags
                  ? transcription.positiveTags
                  : positiveTags
              }
              title={"Positive phrase tags"}
              sentimentData={transcription}
            />
            <PhraseTagCard
              tags={
                transcription.negativeTags
                  ? transcription.negativeTags
                  : negativeTags
              }
              title={"Negative phrase tags"}
              sentimentData={transcription}
            />
          </aside>
        </>
      )}
    </div>
  );
}

export default SentimentAnalysis;
