import React from "react";
import { useState, useEffect } from "react";
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

const TotalRecording = ({ totalRecordingData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [selectedTotalRecordings, setSelectedTotalRecordings] = useState([]);

  useEffect(() => {
    setChartData({
      labels: selectedTotalRecordings?.map((data) => data?.time),
      datasets: [
        {
          label: "",
          data: selectedTotalRecordings?.map((data) => data.totalRecordings),
          backgroundColor: ["#B0CAD9", "#005584", "#548DAD", "#004D78"],
          maxBarThickness: 10,
          borderSkipped: "start",
        },
      ],
    });
    setChartOptions({
      responsive: false,
      spacing: 10,
      borderSkipped: "bottom",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    });
  }, [selectedTotalRecordings]);

  useEffect(() => {
    if (totalRecordingData) {
      setSelectedTotalRecordings(totalRecordingData?.week);
    } else {
      setSelectedTotalRecordings([]);
    }
  }, [totalRecordingData]);

  function recordingsTimeStampFunc(e) {
    setSelectedTotalRecordings(totalRecordingData[e.target.value]);
  }
  return (
    <div className={styles.recordings}>
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
      </div>
      {selectedTotalRecordings?.length > 0 ? (
        <div className={styles.recordings__chart}>
          <div>
            <h1 className={styles.totalNumber}>
              {selectedTotalRecordings?.map((data) => data?.total_recording)}
            </h1>
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
      ) : (
        <div className={styles.empty_state}>
          <p>
            You will see an overview of your activities here when you start
            uploading.
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalRecording;
