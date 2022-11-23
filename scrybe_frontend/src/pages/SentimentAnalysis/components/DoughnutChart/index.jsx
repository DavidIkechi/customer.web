import styles from "./DoughnutChart.module.scss";
import { Chart as ChartJs, ArcElement } from "chart.js/auto"; // this automatically registers the elements for the chart, do not remove
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart(props) {
  const { data } = props;
  return (
    <>
      <div className={styles.sentiment__chart}>
        <Doughnut
          data={data}
          options={{
            cutout: 60,
            offset: 0,
            spacing: 0,
            plugins: { legend: { display: false, position: "bottom" } },
          }}
          {...props}
        />
      </div>
      <ul className={styles.sentiment__chart__legend}>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.positive}`} /> Positive
          <div className={styles.score}>{data.datasets[0]}%</div>
        </li>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.neutral}`} /> Neutral
          <div className={styles.score}>{data[1]}%</div>
        </li>
        <li className={styles.chart__legend__item}>
          <div className={`${styles.item__icon} ${styles.negative}`} /> Negative
          <div className={styles.score}>{data[2]}%</div>
        </li>
      </ul>
    </>
  );
}
