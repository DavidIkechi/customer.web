import AsideCard from "../AsideCard";
import styles from "./VerdictCard.module.scss";
import downloadIcon from "../../icons/download.svg";
import shareIcon from "../../icons/share.svg";
import PropTypes from "prop-types";
import { useRef } from "react";

function VerdictCard({ sentimentData }) {
  const downloadAnchorRef = useRef(null);

  const handleDownload = () => {
    const dataString =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sentimentData));
    if (downloadAnchorRef.current) {
      downloadAnchorRef.current.setAttribute("href", dataString);
      downloadAnchorRef.current.setAttribute(
        "download",
        "sentiment_analysis_data.json"
      );
      downloadAnchorRef.current.click();
    }
  };

  return (
    <AsideCard classtype={`${styles.verdict}`}>
      <div className={styles.verdict__item}>
        <div className={styles.verdict__title}>Agent Friendliness</div>
        <div className={styles.verdict__bar}>
          <div
            className={styles.inner__bar}
            style={{
              width: `${(sentimentData.positivity_score * 100).toFixed(0)}%`,
            }}
          />
          <div className={styles.bar__text}>
            {sentimentData.positivity_score
              ? (sentimentData.positivity_score * 100).toFixed(2) + "%"
              : ""}
          </div>
        </div>
      </div>
      <div className={styles.verdict__item}>
        <div className={styles.verdict__title}>Agent Unfriendliness</div>
        <div className={styles.verdict__bar}>
          <div
            className={styles.inner__bar}
            style={{
              width: `${(sentimentData.negativity_score * 100).toFixed(0)}%`,
            }}
          />
          <div className={styles.bar__text}>
            {sentimentData.negativity_score
              ? (sentimentData.negativity_score * 100).toFixed(2) + "%"
              : ""}
          </div>
        </div>
      </div>
      <div className={styles.verdict__item}>
        <div className={styles.verdict__title}>Verdict: </div>
        <div className={styles.final__verdict}>Customer is Satisfied</div>
      </div>
      <div className={styles.verdict__download}>
        <button
          type="button"
          className={styles.download__button}
          onClick={handleDownload}
        >
          <img src={downloadIcon} alt="download icon" />
          Download
          <a ref={downloadAnchorRef} hidden />
        </button>
        <button type="button" className={styles.share__button}>
          <img src={shareIcon} alt="share icon" />
        </button>
      </div>
    </AsideCard>
  );
}

VerdictCard.propTypes = {
  sentimentData: PropTypes.object.isRequired,
};

export default VerdictCard;
