import React from "react";
import styles from "./TranscriptionHeader.module.scss";

function TranscriptionHeader() {
  return (
    <header className={styles.header}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search through transcripts"
      />
      <div className={styles.headerLeftPanel}>
        <div className={styles.userPanel}>
          <div className={styles.userImage} />
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              <h3>Jane Doe</h3>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z"
                  fill="#1C1B1F"
                />
              </svg>
            </div>
            <p>Office workspace</p>
          </div>
        </div>
        <button className={styles.uploadButton} type="submit">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.625 14.9999C1.15833 14.9999 0.771 14.8459 0.463 14.5379C0.154333 14.2292 0 13.8416 0 13.3749V10.9999H1V13.3749C1 13.5416 1.06267 13.6872 1.188 13.8119C1.31267 13.9372 1.45833 13.9999 1.625 13.9999H12.375C12.5417 13.9999 12.6873 13.9372 12.812 13.8119C12.9373 13.6872 13 13.5416 13 13.3749V10.9999H14V13.3749C14 13.8416 13.846 14.2292 13.538 14.5379C13.2293 14.8459 12.8417 14.9999 12.375 14.9999H1.625ZM6.5 11.2249V2.5749L4.175 4.8999L3.45 4.1999L7 0.649902L10.55 4.1999L9.825 4.8999L7.5 2.5749V11.2249H6.5Z"
              fill="white"
            />
          </svg>
          <p>Upload</p>
        </button>
      </div>
    </header>
  );
}

export default TranscriptionHeader;
