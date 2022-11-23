// import React, { useState } from "react";
// import Chart from "react-apexcharts";
import styles from "../styles/Chart.module.scss";
import Chartimg from "../assets/chart.svg";
import DownArrow from "../assets/chevron_right.svg";

function Charts() {
  // const [options, setOptions] = useState({
  //   series: [
  //     {
  //       name: "Positive",
  //       data: [80, 55, 57, 56, 61, 58, 63],
  //     },
  //     {
  //       name: "Neutral",
  //       data: [76, 85, 101, 98, 87, 105, 91],
  //     },
  //     {
  //       name: "Negative",
  //       data: [35, 41, 36, 26, 45, 48, 52],
  //     },
  //   ],
  //   options: {
  //     colors: ["#76C86F", "#FFCE54", "#FF7589"],
  //     chart: {
  //       type: "bar",
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: "55%",
  //         endingShape: "rounded",
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ["transparent"],
  //     },
  //     xaxis: {
  //       categories: ["11", "12", "13", "14", "15", "16", "17"],
  //     },
  //     yaxis: {
  //       title: {},
  //     },
  //     fill: {
  //       opacity: 1,
  //     },
  //     tooltip: {
  //       y: {
  //         formatter(val) {
  //           return val + " mins";
  //         },
  //       },
  //     },
  //   },
  // });
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrap}>
        {/* <Chart
          options={options.options}
          series={options.series}
          type="bar"
          className={styles.chartImg}
        /> */}
        <div className={styles.chartHeader}>
          <div className={styles.chartText}>
            <p>Total calls recieved</p>
            <p className={styles.checkbox}>
              Daily{" "}
              <img
                src={DownArrow}
                alt="arrow down"
                className={styles.textIcon}
              />
            </p>
          </div>
          <h1 style={{ fontSize: "24px" }}>50</h1>
        </div>
        <div className={styles.chartImg}>
          <img
            src={Chartimg}
            alt="chart placeholder"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;
