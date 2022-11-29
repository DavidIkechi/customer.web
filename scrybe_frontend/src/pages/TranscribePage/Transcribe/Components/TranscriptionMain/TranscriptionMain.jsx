import React from "react";
import styles from "./TranscriptionMain.module.scss";
// import TranscriptionsList from "./TranscriptionsList/TranscriptionsList";
import Dummy from "./TranscriptionsList/test";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";

function TranscriptionMain() {
  // const [transcribedText, setTranscribedText] = useState("");
  // const [formattedData, setFormattedData] = useState([]);

  // //get custom Id from current window url
  // const getAudioID = () => {
  //   const currentURL = window.location.href
  //     .toString()
  //     .split(window.location.host)[1];
  //   const currentID = currentURL.substring(16, currentURL.length);
  //   console.log(currentID);
  //   return currentID;
  // };

  // //query backend to get transcribed data
  // const loadTranscription = (str) => {
  //   const apiReference = "";
  //   fetch(`${apiReference}/${str}`)
  //     .then((response) => response.json())
  //     .then((data) => setTranscribedText(data));
  // };

  // const loadTest = () => {
  //   const apiReference = "https://www.boredapi.com/api/activity";
  //   fetch(`${apiReference}`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  // //cleanup the data gotten
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

  // //format time function
  // const timeFormatter = (num) => {
  //   const divisor_for_minutes = num % (60 * 60);
  //   const minutes = Math.floor(divisor_for_minutes / 60);
  //   const divisor_for_seconds = divisor_for_minutes % 60;
  //   const seconds = Math.ceil(divisor_for_seconds);
  //   const formatedTime = `${minutes}:${seconds}`;
  //   if (formatedTime.length === 4) return `0${minutes}:${seconds}`;
  //   if (formatedTime.length === 3) return `0${minutes}:${seconds}0`;
  // };

  // useEffect(() => {
  //   loadTest();
  //   // const idQuery = getAudioID();
  //   // loadTranscription(idQuery);
  //   // setFormattedData(generateArray(transcribedText));
  // }, []);

  return (
    <div className={styles.TranscriptionMain}>
      <Dummy />
      <TranscriptionRightBar />
    </div>
  );
}

export default TranscriptionMain;
