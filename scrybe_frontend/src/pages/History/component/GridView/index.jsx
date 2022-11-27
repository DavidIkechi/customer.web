import React from "react";
import { analysisIcon } from "../../assets/images";
import styles from "./style.module.scss";
export default function GridView({ title, name, review, date }) {
  return (
    <div className={styles.grid__view}>
      <div className={styles.grid__container}>
        <div className={styles.grid__image}>
          <img src={analysisIcon} alt="analysis icon" />
          <div className={styles.grid__title}>
            <h3>{title}</h3>
            <p>{name}</p>
          </div>
        </div>
        <div className={styles.grid__btns}>
          <button type="button">{review}</button>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
