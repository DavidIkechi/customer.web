import React from "react";
import { useState, useEffect } from "react";
import { totalRecordingData } from "../Data";
import { Bar } from "react-chartjs-2";
import styles from "../DashboardOverview.module.scss";
import toneWave from "../assets/tone_wave.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);

const TotalRecording = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [selectedTotalRecordings, setSelectedTotalRecordings] = useState([]);

  useEffect(() => {
    setChartData({
      labels: selectedTotalRecordings.map((data) => data.time),
      datasets: [
        {
          label: "",
          data: selectedTotalRecordings.map((data) => data.totalRecordings),

          backgroundColor: ["#B0CAD9", "#005584", "#548DAD", "#004D78"],
          maxBarThickness: 10,
          borderSkipped: "start",
        },
      ],
    });
    setChartOptions({
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    });
  }, [selectedTotalRecordings]);

  useEffect(() => {
    setSelectedTotalRecordings(totalRecordingData.week);
  }, []);

  function recordingsTimeStampFunc(e) {
    setSelectedTotalRecordings(totalRecordingData[e.target.value]);
  }
  return (
    <div className={styles.recordings_container}>
      <div className={styles.recordings__heading}>
        <h1>
          <img src={toneWave} alt="" /> Total Recordings
        </h1>
        <select
          className={styles.dropdown}
          id="timeStamp"
          onChange={recordingsTimeStampFunc}
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
        {/* <h2 className={styles.thismonth}>
      This month <img src={chevron} alt="" />
    </h2> */}
      </div>
      <div className={styles.recordings}>
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default TotalRecording;
