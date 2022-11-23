import styles from "./OverallSentiment.module.scss";
import pieChart from "../../icons/pie_chart.svg";
import AsideCard from "../AsideCard";

export default function OverAllSentimentCard() {
  return (
    <AsideCard classType={`${styles.overall__sentiment}`}>
      <div className={styles.title}>Overall sentiment</div>
      <div className={styles.sentiment__chart}>
        <img src={pieChart} alt="pie chart" />
      </div>
      <ul className={styles.sentiment__chart__legend}>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.positive}`} /> Positive
          <div className={styles.score}>15%</div>
        </li>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.neutral}`} /> Neutral
          <div className={styles.score}>15%</div>
        </li>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.negative}`} /> Negative
          <div className={styles.score}>15%</div>
        </li>
      </ul>
    </AsideCard>
  );
}
