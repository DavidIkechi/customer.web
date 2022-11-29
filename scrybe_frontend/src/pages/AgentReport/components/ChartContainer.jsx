import { useState } from "react";
import styles from "../styles/Chart.module.scss";
import DownArrow from "../assets/chevron_right.svg";
import Chart from "./Chart";
import { UserData } from "./Data";
import Icon from "../assets/table-icon.png";

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    title: {
      display: false,
      text: "Agent Report",
    },
    legend: {
      title: {
        font: {
          size: 16,
        },
      },
      position: "bottom",
      labels: {
        boxWidth: 10,
        useBorderRadius: true,
        borderRadius: 4,
      },
    },
  },
  responsive: true,
};

function Charts() {
  const [userDataDaily, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Positive",
        data: UserData.map((data) => data.positive),
        backgroundColor: "#76C86F",
        borderRadius: 5,
      },
      {
        label: "Neutral",
        data: UserData.map((data) => data.neutral),
        backgroundColor: "#FFCE54",
        borderRadius: 5,
      },
      {
        label: "Negative",
        data: UserData.map((data) => data.negative),
        backgroundColor: "#FF7589",
        borderRadius: 5,
      },
    ],
  });
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrap}>
        <div className={styles.chartHeader}>
          <div className={styles.chartText}>
            <p className={styles.callText}>
              <img src={Icon} alt="icon" className={styles.callIcon} /> Total
              calls recieved
            </p>
            <p className={styles.checkbox}>
              Daily{" "}
              <img
                src={DownArrow}
                alt="arrow down"
                className={styles.textIcon}
              />
            </p>
          </div>
          <p>50</p>
        </div>
        <div className={styles.chartImg}>
          {/* <img
            src={Chartimg}
            alt="chart placeholder"
            width="100%"
            height="100%"
            className={styles.chartpic}
          /> */}
          <Chart
            options={options}
            chartData={userDataDaily}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;
