import React, { useState, useEffect } from "react";
import styles from "./TranscriptionsList.module.scss";
import { useMockAuthAndReadSentiment } from "../../../../hooks/index";

function TranscriptionsList() {
  const [formattedData, setFormattedData] = useState([]);
  const sentimentData = useMockAuthAndReadSentiment(1);

  useEffect(() => {
    console.log("fired");
    setFormattedData(generateArray(sentimentData.transcript));
  }, []);

  console.log(formattedData);

  // cleanup the data gotten
  const generateArray = (str) => {
    const cleanedData = [];
    if (console.log(str) === undefined)
      return [
        {
          id: 1,
          timeCount: "00:00",
          stringText: "Loading Transcription",
        },
      ];
    const wordArray = str.split(" ");
    let time = -30;
    let objectID = -1;
    let emptyString = "";
    let counter = 0;

    wordArray.map((word) => {
      if (counter < 30) {
        emptyString = emptyString + " " + word;
        counter++;
      }
      if (counter === 30) {
        objectID++;
        time = time + 30;
        const formatedTime = timeFormatter(time);
        const object = {
          id: objectID,
          timeCount: formatedTime,
          stringText: emptyString,
        };
        cleanedData.push(object);
        emptyString = "";
        counter = 0;
      }
    });

    return cleanedData;
  };

  // format time function
  const timeFormatter = (num) => {
    const divisor_for_minutes = num % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const formatedTime = `${minutes}:${seconds}`;
    if (formatedTime.length === 4) return `0${minutes}:${seconds}`;
    if (formatedTime.length === 3) return `0${minutes}:${seconds}0`;
  };

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
        {formattedData.map((list) => {
          return (
            <div className={styles.listItem} key={list.id}>
              <h4>{list.timeCount}</h4>
              <p>{list.stringText}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TranscriptionsList;
