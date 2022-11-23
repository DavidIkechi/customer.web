import styles from "./OverallSentiment.module.scss";
import AsideCard from "../AsideCard";
import DoughnutChart from "../DoughnutChart";
import Data from "../DummyData";
import { useState } from "react";

export default function OverAllSentimentCard() {
  const [sentimentData] = useState({
    labels: Data.map((item) => item.sentiment),
    datasets: [
      {
        label: "My first Data",
        data: Data.map((item) => item.score),
        backgroundColor: ["#76C86F", "#FFCE54", "#FF7589"],
      },
    ],
  });
  return (
    <AsideCard classType={`${styles.overall__sentiment}`}>
      <div className={styles.title}>Overall sentiment</div>
      <DoughnutChart data={sentimentData} />
    </AsideCard>
  );
}
