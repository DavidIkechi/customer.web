import React from "react";
import styles from "./TranscriptionsList.module.scss";
import IsLoadingSkeleton from "../../../../../../components/LoadingSkeleton";
import { Link } from "react-router-dom";

function Dummy({ formattedData, isFetching, apiError, stillProcessing }) {
  return (
    <div className={styles.TranscriptionsList}>
      <div className={styles.headText}>
        <Link to="/uploaded-recordings" className={styles.headTextLink}>
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
        </Link>
        <h2>Transcription</h2>
      </div>
      <div>
        {apiError ? (
          <div className={styles.error}>
            ServerSide Error...Kindly refresh the page.
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {stillProcessing ? (
          <div className={styles.error}>
            Wow, seems like your Audio file is heavy... We are still processing
            your audio... Kindly wait for a few more moments.
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {isFetching ? (
          <IsLoadingSkeleton />
        ) : (
          <>
            <div className={styles.Lists}>
              {formattedData.map((list) => {
                return (
                  <div className={styles.listItem} key={list.id}>
                    <h4
                      className={
                        list.isActive
                          ? styles.listItemActive
                          : styles.listItemInActiveh4
                      }
                    >
                      {list.timeCount}
                    </h4>
                    <p
                      className={
                        list.isActive
                          ? styles.listItemActive
                          : styles.listItemInActiveP
                      }
                    >
                      {list.stringText}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dummy;
