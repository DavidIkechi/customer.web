import React from "react";
import styles from "./TranscriptionsList.module.scss";
import FillerData from "./FillerData";

function TranscriptionsList() {
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
