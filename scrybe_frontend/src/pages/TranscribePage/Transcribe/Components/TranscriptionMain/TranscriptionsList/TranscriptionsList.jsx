import React from "react";
import styles from "./TranscriptionsList.module.scss";
import FillerData from "./FillerData";

function TranscriptionsList() {
  return (
    <div className={styles.TranscriptionsList}>
      <div className={styles.headText}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 15.625L0.375 8L8 0.375L9.075 1.45L3.25 7.25H15.625V8.75H3.25L9.075 14.55L8 15.625Z"
            fill="#1C1B1F"
          />
        </svg>
        <h2>Transcription</h2>
      </div>
      <div className={styles.Lists}>
        {FillerData.map((list) => {
          return (
            <div className={styles.listItem} key={list.id}>
              <h4>{list.time}</h4>
              <p>{list.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TranscriptionsList;
