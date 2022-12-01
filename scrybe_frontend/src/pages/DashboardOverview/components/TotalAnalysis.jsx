import React from "react";
import { useState, useEffect } from "react";
import { totalAnalysisData } from "../Data";
import styles from "../DashboardOverview.module.scss";
import analysis from "../assets/analytics.svg";

const TotalAnalysis = () => {
  const [selectedTotalAnalysis, setSelectedTotalAnalysis] = useState([]);

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
        {/* <h2 className={styles.thismonth}>
       This month <img src={chevron} alt="analysis" />
     </h2> */}
      </div>
      <div className={styles.subcontent_con}>
        <div className={styles.circles}>
          <div className={styles.meduim}>
            {selectedTotalAnalysis.map((data) => data.neutral)}%
          </div>
          <div className={styles.small}>
            {selectedTotalAnalysis.map((data) => data.negative)}%
          </div>
          <div className={styles.big}>
            {selectedTotalAnalysis.map((data) => data.positive)}%
          </div>
        </div>
        <div className={styles.scale}>
          <h3>
            <span className={styles.positive}>1</span> Positive
          </h3>
          <h3>
            {" "}
            <span className={styles.neutral}>1</span>Neutral
          </h3>
          <h3>
            <span className={styles.negative}>1</span> Negative
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalAnalysis;
