import styles from "./OverallSentiment.module.scss";
import AsideCard from "../AsideCard";
import DoughnutChart from "../DoughnutChart";
import Data from "../DummyData";
import { useState } from "react";

export default function OverAllSentimentCard(props) {
  const [sentimentData] = useState({
    labels: Data.map((item) => item.sentiment),
    datasets: [
      {
        label: "Sentiment Score",
        data: Data.map((item) => item.score),
        backgroundColor: ["#76C86F", "#FFCE54", "#FF7589"],
      },
    ],
  });
  return (
    <AsideCard classtype={`${styles.overall__sentiment}`} {...props}>
      <div className={styles.title}>Overall sentiment</div>
      <DoughnutChart data={sentimentData} />
    </AsideCard>
  );
}
