import { useState, useEffect } from "react";
// import { useAgentReport } from "../hooks";
import styles from "../styles/Chart.module.scss";
import { Bar } from "react-chartjs-2";
// import { agentData } from "./Data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import Icon from "../assets/table-icon.png";
ChartJS.register(CategoryScale, LinearScale, BarElement);

function Charts({ selectReport }) {
  // const agentReport = useAgentReport()

  const [option, setOption] = useState({});

  const [userData, setUserData] = useState({
    datasets: [],
  });

  useEffect(() => {
    setUserData({
      labels: selectReport.map((data) => data.day),
      datasets: [
        {
          label: "Positive",
          data: selectReport.map((data) => data.positive),
          backgroundColor: "#76C86F",
        },
        {
          label: "Neutral",
          data: selectReport.map((data) => data.neutral),
          backgroundColor: "#FFCE54",
        },
        {
          label: "Negative",
          data: selectReport.map((data) => data.negative),
          backgroundColor: "#FF7589",
        },
      ],
    });

    setOption({
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
            boxWidth: 15,
            useBorderRadius: true,
            borderRadius: 4,
          },
        },
      },
      responsive: true,
    });
  }, [selectReport]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrap}>
        <div className={styles.chartHeader}>
          <div className={styles.chartText}>
            <p className={styles.callText}>
              <img src={Icon} alt="icon" className={styles.callIcon} />
              Total calls recieved
            </p>

            <p className={styles.calltxt}>50</p>
          </div>
        </div>
        <div className={styles.chartImg}>
          {selectReport.length === 0 ? (
            <p>Agent Reports show here</p>
          ) : (
            <Bar data={userData} options={option} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Charts;
