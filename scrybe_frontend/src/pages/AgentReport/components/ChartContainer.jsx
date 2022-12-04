import { useState, useEffect } from "react";
import { useAgentReport } from "../hooks";
import styles from "../styles/Chart.module.scss";
import { Bar } from "react-chartjs-2";
import { agentData } from "./Data";
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

  // const [selectReport, setSelectReport] = useState([]);
  // console.log("selectReport", selectReport);
  // console.log("data", userData);

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

  // useEffect(() => {
  //   setSelectReport(agentData.week);
  //   // console.log(selectReport);
  // }, []);

  // const handleDate = (e) => {
  //   setSelectReport(agentData[e.target.value]);
  // };

  return (
    <div className={styles.chartContainer}>
      {/* <div className={styles.select}>
        <p>View by</p>
        <select className={styles.dropdown} onChange={handleDate}>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div> */}
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
          <Bar data={userData} options={option} />;
        </div>
      </div>
    </div>
  );
}

export default Charts;
