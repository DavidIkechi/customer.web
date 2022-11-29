import AsideCard from "../AsideCard";
import styles from "./VerdictCard.module.scss";
import downloadIcon from "../../icons/download.svg";
import dropdownIcon from "../../icons/dropdown.svg";
import shareIcon from "../../icons/share.svg";
import PropTypes from "prop-types";

function VerdictCard({ sentimentData }) {
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
            {(sentimentData.positivity_score * 100).toFixed(2)}%
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
            {(sentimentData.negativity_score * 100).toFixed(2)}%
          </div>
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
    </AsideCard>
  );
}

VerdictCard.propTypes = {
  sentimentData: PropTypes.object.isRequired,
};

export default VerdictCard;
