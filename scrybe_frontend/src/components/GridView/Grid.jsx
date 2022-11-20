/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import CallImage from "../../assets/callImage.png";
import styles from "./grid.module.scss";

function Grid(props) {
  return (
    <div className={styles.card}>
      <div className={styles.filename}>
        <img src={CallImage} alt="" />
        <div className={styles.filename__text}>
          <h5>{props.name}</h5>
          <p className={styles.paragraph}>{props.agent}</p>
        </div>
      </div>
      <div className={styles.analysis}>
        <h5 className={styles.main__analysis}>{props.analysis}</h5>
        <p className={styles.paragraph}>{props.date}</p>
      </div>
    </div>
  );
}

export default Grid;
