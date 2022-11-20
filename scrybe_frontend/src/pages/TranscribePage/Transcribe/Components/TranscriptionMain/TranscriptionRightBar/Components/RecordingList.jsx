import React from "react";
import styles from "./RecordingList.module.scss";
import AudioFilesData from "./AudioFilesData";

function RecordingList() {
  return (
    <div className={styles.RecordingList}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search for  more audio file..."
      />
      <div className={styles.mostRecent}>
        <h3>Most recent</h3>
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.92942 4.87058L4.00013 4.94129L4.07084 4.87058L7.60417 1.33725L7.67365 1.26777L7.6054 1.19708L7.13874 0.713744L7.06805 0.64053L6.99609 0.712492L4.00013 3.70845L1.00417 0.712492L0.932212 0.64053L0.861524 0.713744L0.394857 1.19708L0.326605 1.26777L0.396086 1.33725L3.92942 4.87058Z"
            fill="#828282"
            stroke="#828282"
            strokeWidth="0.2"
          />
        </svg>
      </div>
      <div className={styles.audioList}>
        {AudioFilesData.map((list) => {
          return (
            <div className={styles.AudioInfo} key={list.id}>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="52" height="52" rx="26" fill="#E6F0FF" />
                <g mask="url(#mask0_1919_29315)">
                  <path
                    d="M21.5 31.5V20.5H22.5V31.5H21.5ZM25.5 35.5V16.5H26.5V35.5H25.5ZM17.5 27.5V24.5H18.5V27.5H17.5ZM29.5 31.5V20.5H30.5V31.5H29.5ZM33.5 27.5V24.5H34.5V27.5H33.5Z"
                    fill="#002D6B"
                  />
                </g>
              </svg>
              <div className={styles.AudioName}>
                <h2>{list.name}</h2>
                <p>{list.size}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecordingList;
