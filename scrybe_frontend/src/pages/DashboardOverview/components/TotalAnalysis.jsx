import React from "react";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { totalAnalysisData } from "../Data";
import styles from "../DashboardOverview.module.scss";
import analysis from "../assets/analytics.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

const TotalAnalysis = () => {
  const [selectedTotalAnalysis, setSelectedTotalAnalysis] = useState([]);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  // const [doughnutChart, setDoughnutChart] = useState({
  //   datasets: [],
  // });
  useEffect(() => {
    setChartData({
      labels: "",
      datasets: [
        //   ${data.positive}
        //   ${data.neutral}
        //  ${data.negative}
        {
          label: selectedTotalAnalysis.map((data) => data.positive),
          data: [20, 12, 3],
          backgroundColor: ["#76C86F", "#FFCE54", "#FF7589"],
          borderWidth: 0,
        },
      ],
    });
    setChartOptions({
      cutout: "60%",
      offset: 0,
      spacing: 0,
      plugins: { legend: { display: false, position: "bottom" } },
    });
  }, [selectedTotalAnalysis]);

  useEffect(() => {
    setSelectedTotalAnalysis(totalAnalysisData.week);
  }, []);

  function analysisTimeStampFunc(e) {
    setSelectedTotalAnalysis(totalAnalysisData[e.target.value]);
  }
  return (
    <div className={styles.analysis}>
      <div className={styles.analysis__heading}>
        <h1>
          <img src={analysis} alt="Total recording" /> Total Analysis
        </h1>
        <select className={styles.dropdown} onChange={analysisTimeStampFunc}>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>
      <div className={styles.total_analysis_chart}>
        <div style={{ width: 200 }}>
          <Doughnut options={chartOptions} data={chartData} />
        </div>
        {/* <div style={{ width: 170 }}>
          <Doughnut
            data="test"
            options={{
              cutout: "60%",
              offset: 0,
              spacing: 0,
              // plugins: { legend: { display: false, position: "bottom" } },
            }}
          />
        </div> */}
        {/* <div className={styles.circles}>
          <div className={styles.meduim}>
            {selectedTotalAnalysis.map((data) => data.neutral)}%
          </div>
          <div className={styles.small}>
            {selectedTotalAnalysis.map((data) => data.negative)}%
          </div>
          <div className={styles.big}>
            {selectedTotalAnalysis.map((data) => data.positive)}%
          </div>
        </div> */}
        <div className={styles.scale}>
          <h3>
            <span className={styles.positive}>1</span> Positive{" "}
            {selectedTotalAnalysis.map((data) => data.positive)}%
          </h3>
          <h3>
            {" "}
            <span className={styles.neutral}>1</span>Neutral{" "}
            {selectedTotalAnalysis.map((data) => data.neutral)}
          </h3>
          <h3>
            <span className={styles.negative}>1</span> Negative{" "}
            {selectedTotalAnalysis.map((data) => data.negative)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalAnalysis;
