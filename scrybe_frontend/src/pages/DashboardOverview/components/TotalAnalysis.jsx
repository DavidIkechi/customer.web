import React from "react";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
// import { useMockAuthAndTotalAnalysis } from "../hooks";
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
  // console.log("mock", useMockAuthAndTotalAnalysis());
  // const totalAnalysisData = useMockAuthAndTotalAnalysis();
  // console.log("data", totalAnalysisData);
  // useEffect(() => {
  //   console.log(totalAnalysisData);
  // }, [totalAnalysisData]);

  const [selectedTotalAnalysis, setSelectedTotalAnalysis] = useState([]);
  // console.log(selectedTotalAnalysis);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: "",
      datasets: [
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
      plugins: {
        legend: { display: false, position: "bottom" },
        tooltip: {
          enabled: false,
        },
      },
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
        <div className={styles.doughnut_chart}>
          <Doughnut options={chartOptions} data={chartData} />
          <div className={styles.chart_inner}>
            <h1>{selectedTotalAnalysis?.map((data) => data.positive)}%</h1>
            <span>+ve</span>
          </div>
        </div>
        <div className={styles.scale}>
          <h3>
            <span className={styles.positive}>1</span> Positive{" "}
            {selectedTotalAnalysis?.map((data) => data.positive)}%
          </h3>
          <h3>
            {" "}
            <span className={styles.neutral}>1</span>Neutral{" "}
            {selectedTotalAnalysis?.map((data) => data.neutral)}
          </h3>
          <h3>
            <span className={styles.negative}>1</span> Negative{" "}
            {selectedTotalAnalysis?.map((data) => data.negative)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalAnalysis;
