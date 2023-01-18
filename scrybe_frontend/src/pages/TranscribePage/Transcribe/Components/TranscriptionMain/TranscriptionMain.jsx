import React, { useState, useEffect, useRef } from "react";
import styles from "./TranscriptionMain.module.scss";
import Dummy from "./TranscriptionsList/test";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";
import axios from "axios";

function TranscriptionMain() {
  const [formattedData, setFormattedData] = useState([]);

  const [timeUpdateTracker, setTimeUpdateTracker] = useState(false);

  const [audioSrc, setAudioSrc] = useState("");
  const audioElem = useRef();
  const [audioFileSize, setAudioFileSize] = useState("");
  const [audioFilename, setAudioFileName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [recentRecordings, setRecentRecordings] = useState([]);
  const [donwloadData, setDownloadData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [stillProcessing, setStillProcessing] = useState(false);

  const onLoadedMetadata = () => {
    setAudioDuration(Math.round(audioElem.current?.duration));
  };
  const onTimeUpdate = () => {
    updateTranscribedText();
    setCurrentTime(Math.floor(audioElem.current.currentTime));
  };
  const onPause = () => {
    setTimeUpdateTracker(false);
  };
  const updateCurrentTime = () => {
    if (isPlaying) setCurrentTime(audioElem.current?.currentTime);
  };
  const updateTranscribedText = () => {
    const highestTime = formattedData[formattedData.length - 1].time + 5;
    setTimeUpdateTracker(true);
    if (formattedData && highestTime > currentTime)
      formattedData[Math.floor(currentTime / 5)].isActive = true;
    for (
      let i = Math.floor(currentTime / 5) + 1;
      i < formattedData.length;
      i++
    ) {
      formattedData[i].isActive = false;
    }
  };
  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
      updateCurrentTime();
    } else audioElem.current.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);
  const getTranscriptionId = () => {
    return window.location.pathname.substring(
      16,
      window.location.pathname.length
    );
  };

  //fetch data(transcription text and audio) from our API.
  const fetchActualData = (accessToken, transcription_id) => {
    setIsFetching(true);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .get(`https://api.heed.cx/transcription/${transcription_id}`, {
        headers,
      })
      .then((newRes) => {
        setStillProcessing(false);
        setIsFetching(false);

        setApiError(false);
        setFormattedData(generateArray(newRes.data.detail.transcript));
        setAudioSrc(newRes.data.detail.audio_url);
        setAudioFileSize(newRes.data.detail.audio_size);
        setAudioFileName(newRes.data.detail.audio_filename);
        setDownloadData(newRes.data.detail);
      })
      .catch(() => {
        setApiError(true);
        setIsFetching(false);
      });
  };
  useEffect(() => {
    const accessToken = sessionStorage.getItem("heedAccessToken");
    fetchActualData(accessToken, getTranscriptionId());
    fetchRecentRecordings(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // format array function
  const generateArray = (str) => {
    const cleanedData = [];

    const wordArray = str.split(" ");
    let time = -5;
    let objectID = -1;
    let emptyString = "";
    let counter = 0;

    if (wordArray.length < 20) {
      const object = {
        id: 0,
        timeCount: "00:00",
        stringText: str,
        isActive: false,
      };
      cleanedData.push(object);
      return cleanedData;
    }

    // eslint-disable-next-line array-callback-return
    wordArray.map((word, index) => {
      if (counter < 20) {
        emptyString = emptyString + " " + word;
        counter++;
      }
      if (
        counter === 20 ||
        wordArray[wordArray.length - 1] === wordArray[index]
      ) {
        objectID++;
        time = time + 5;
        const formatedTime = timeFormatter(time);
        const object = {
          id: objectID,
          time: time,
          timeCount: formatedTime,
          stringText: emptyString,
          isActive: false,
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
    if (num === 0 || isNaN(num)) return `00:00`;
    const divisor_for_minutes = num % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const formatedTime = `${minutes}:${seconds}`;
    if (formatedTime.length === 3 && minutes < 1)
      return `0${minutes}:0${seconds}`;
    if (formatedTime.length === 4) return `0${minutes}:${seconds}`;
    if (formatedTime.length === 3 && minutes > 0)
      return `0${minutes}:${seconds}0`;
  };
  // fetch recent recordings
  const fetchRecentRecordings = (accessToken) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    axios
      .get(`https://api.heed.cx/audios/recent-recordings?skip=0&limit=5`, {
        headers,
      })
      .then((newRes) => {
        setRecentRecordings(newRes.data.detail);
      });
  };

  return (
    <div className={styles.TranscriptionMain}>
      <Dummy
        formattedData={formattedData}
        isPlaying={isPlaying}
        audioElem={audioElem}
        currentTime={currentTime}
        timeUpdateTracker={timeUpdateTracker}
        isFetching={isFetching}
        apiError={apiError}
        stillProcessing={stillProcessing}
      />
      <TranscriptionRightBar
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioDuration={audioDuration}
        currentTime={currentTime}
        audioFileSize={audioFileSize}
        recentRecordings={recentRecordings}
        donwloadData={donwloadData}
        audioFilename={audioFilename}
      />
      <audio
        src={audioSrc}
        ref={audioElem}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPause={onPause}
      />
    </div>
  );
}

export default TranscriptionMain;
