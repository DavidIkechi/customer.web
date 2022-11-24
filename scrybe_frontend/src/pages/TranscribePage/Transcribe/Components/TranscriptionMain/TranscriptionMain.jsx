import React from "react";
import styles from "./TranscriptionMain.module.scss";
import TranscriptionsList from "./TranscriptionsList/TranscriptionsList";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";
// import { useLocation } from "react-router-dom";

function TranscriptionMain() {
  // const extractID = () => {
  //   const { pathname } = useLocation();
  //   const currentID = pathname.substring(16, pathname.length);
  //   return currentID;
  // };

  // const transcriptionID = extractID();

  // // Function name: generateArray
  // // params: a long str
  // // returns: an array of objects, each object has an id, timeslot, and text for 30secs
  // const generateArray = (str) => {
  //   const cleanedData = [];
  //   const wordArray = str.split(" ");
  //   let time = -30;
  //   let objectID = -1;
  //   let emptyString = "";
  //   let counter = 0;
  //   console.log(wordArray);

  //   wordArray.map((word) => {
  //     if (counter < 30) {
  //       emptyString = emptyString + " " + word;
  //       counter++;
  //     }
  //     if (counter == 30) {
  //       objectID++;
  //       time = time + 30;
  //       const formatedTime = timeFormatter(time);
  //       const object = {
  //         id: objectID,
  //         timeCount: formatedTime,
  //         stringText: emptyString,
  //       };
  //       cleanedData.push(object);
  //       emptyString = "";
  //       counter = 0;
  //     }
  //   });

  //   return cleanedData;
  // };

  // const timeFormatter = (num) => {
  //   const divisor_for_minutes = num % (60 * 60);
  //   const minutes = Math.floor(divisor_for_minutes / 60);
  //   const divisor_for_seconds = divisor_for_minutes % 60;
  //   const seconds = Math.ceil(divisor_for_seconds);
  //   const formatedTime = `${minutes}:${seconds}`;
  //   if (formatedTime.length === 4) return `0${minutes}:${seconds}`;
  //   if (formatedTime.length === 3) return `0${minutes}:${seconds}0`;
  // };

  return (
    <div className={styles.TranscriptionMain}>
      <TranscriptionsList />
      <TranscriptionRightBar />
    </div>
  );
}

export default TranscriptionMain;
