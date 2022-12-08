import React from "react";
import styles from "./RecordingList.module.scss";
import recordingIcon from "../../../../../assets/recording call.png";
import { Link } from "react-router-dom";

function RecordingList({ recentRecordings }) {
  const formatBytes = (bytes, decimals = 0) => {
    if (!+bytes) return "0 bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["bytes", "kb", "mb", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
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
        {recentRecordings.map((list, index) => {
          return (
            <Link className={styles.AudioInfo} key={list.id} to="/">
              {/* <Link className={styles.AudioInfo} key={list.id} to={`/transcriptions/${list.tracnscription_id}`}> */}
              <img src={recordingIcon} alt="recording-Icon" />
              <div className={styles.AudioName}>
                <h2>{list.filename}</h2>
                <p>{`${formatBytes(list.size)}`}</p>
              </div>
            </Link>
          );
        })}
        {/* <div className={styles.AudioInfo}>
          <img src={recordingIcon} alt="recording-Icon" />
          <div className={styles.AudioName}>
            <h2>{`Recording 0${3 + 1} .mp3`}</h2>
            <p>{`.0 mb`}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default RecordingList;
