import styles from "./OverallSentiment.module.scss";
import AsideCard from "../AsideCard";
import DoughnutChart from "../DoughnutChart";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OverAllSentimentCard(props) {
  const { sentimentData } = props;
  const [sentimentDataFormatted, setSentimentDataFormatted] = useState({});
  useEffect(() => {
    setSentimentDataFormatted({
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          label: "Sentiment Score",
          data: [
            (sentimentData.positivity_score * 100).toFixed(2),
            (sentimentData.neutrality_score * 100).toFixed(2),
            (sentimentData.negativity_score * 100).toFixed(2),
          ],
          backgroundColor: ["#76C86F", "#FFCE54", "#FF7589"],
        },
      ],
    });
  }, [sentimentData]);

  return (
    <AsideCard classtype={`${styles.overall__sentiment}`}>
      <div className={styles.title}>Overall sentiment</div>
      {!isNaN(sentimentData.positivity_score) &&
      !isNaN(sentimentData.neutrality_score) &&
      !isNaN(sentimentData.negativity_score) &&
      sentimentDataFormatted["datasets"] !== undefined ? (
        <DoughnutChart data={sentimentDataFormatted} />
      ) : (
        ""
      )}
    </AsideCard>
  );
}

OverAllSentimentCard.propTypes = {
  sentimentData: PropTypes.object.isRequired,
};

export default OverAllSentimentCard;
