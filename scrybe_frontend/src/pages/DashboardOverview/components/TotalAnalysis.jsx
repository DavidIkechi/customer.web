import React from "react";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "../DashboardOverview.module.scss";
import analysis from "../assets/analytics.svg";
import { BsEmojiNeutral } from "react-icons/bs";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

const TotalAnalysis = ({ totalAnalysisData }) => {
  const [selectedTotalAnalysis, setSelectedTotalAnalysis] = useState([]);
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
          data: [
            selectedTotalAnalysis.map((data) => data.positive),
            selectedTotalAnalysis.map((data) => data.neutral),
            selectedTotalAnalysis.map((data) => data.negative),
          ],
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
          enabled: true,
        },
      },
    });
  }, [selectedTotalAnalysis]);

  useEffect(() => {
    if (totalAnalysisData) {
      setSelectedTotalAnalysis(totalAnalysisData.week);
    } else {
      setSelectedTotalAnalysis([]);
    }
  }, [totalAnalysisData]);

  function analysisTimeStampFunc(e) {
    setSelectedTotalAnalysis(totalAnalysisData[e.target.value]);
  }
  // console.log("d", selectedTotalAnalysis);
  // console.log("ff", Object.keys(selectedTotalAnalysis));

  const totalAnalysis = selectedTotalAnalysis?.map(
    (data) => data.positive + data.neutral + data.negative
  );
  const Positive = selectedTotalAnalysis.map((data) => data.positive);
  const Neutral = selectedTotalAnalysis.map((data) => data.neutral);
  const Negative = selectedTotalAnalysis.map((data) => data.negative);
  const Total = [Positive, Neutral, Negative];
  const Max = Math.max(...Total);
  const MaxAnalysis = Math.round((Max / totalAnalysis) * 100);

  const indexOfMax = Total.reduce(
    (acc, letter, index) => Object.assign(acc, { [letter]: index }),
    {}
  );

  // console.log("Max", indexOfMax[Max]);
  let sentiment, sign;
  switch (indexOfMax[Max]) {
    case 0:
      sentiment = <RiEmotionHappyLine />;
      sign = "+ve";
      break;
    case 1:
      sentiment = <BsEmojiNeutral />;
      sign = " ~Ne";
      break;
    default:
      sentiment = <RiEmotionUnhappyLine />;
      sign = " -Ve";
  }

  // console.log("sentiment", sentiment);

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
      {selectedTotalAnalysis.length > 0 ? (
        <div className={styles.total_analysis_chart}>
          <div className={styles.doughnut_chart}>
            <Doughnut options={chartOptions} data={chartData} />
            <div className={styles.chart_inner}>
              <h1>{`${MaxAnalysis}%`}</h1>
              <span>
                {sentiment} {sign}
              </span>
            </div>
          </div>
          <div className={styles.scale}>
            <h3>
              <span className={styles.positive}>1</span> Positive{" "}
              {selectedTotalAnalysis?.map((data) =>
                Math.round((data.positive / totalAnalysis) * 100)
              )}
              %
            </h3>
            <h3>
              {" "}
              <span className={styles.neutral}>1</span>Neutral{" "}
              {selectedTotalAnalysis?.map((data) =>
                Math.round((data.neutral / totalAnalysis) * 100)
              )}
              %
            </h3>
            <h3>
              <span className={styles.negative}>1</span> Negative{" "}
              {selectedTotalAnalysis?.map((data) =>
                Math.round((data.negative / totalAnalysis) * 100)
              )}
              %
            </h3>
          </div>
        </div>
      ) : (
        <div className={styles.empty_state}>
          <p>An overview of your teams sentiment analysis report shows here.</p>
        </div>
      )}
    </div>
  );
};

export default TotalAnalysis;
