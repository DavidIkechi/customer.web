import React, { useState, useEffect, useRef } from "react";
import styles from "./TranscriptionMain.module.scss";
// import TranscriptionsList from "./TranscriptionsList/TranscriptionsList";
import Dummy from "./TranscriptionsList/test";
import TranscriptionRightBar from "./TranscriptionRightBar/TranscriptionRightBar";
import axios from "axios";

function TranscriptionMain() {
  const [transcription_id, setTranscriptionId] = useState("");
  const [formattedData, setFormattedData] = useState([]);

  const [timeUpdateTracker, setTimeUpdateTracker] = useState(false);

  const [audioSrc, setAudioSrc] = useState("");
  const audioElem = useRef();
  const [audioFileSize, setAudioFileSize] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
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
    setTimeUpdateTracker(true);
    if (timeUpdateTracker) console.log(`tracker is true`);
    if (formattedData)
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
  }, [isPlaying]);
  useEffect(() => {
    async function fetchAudio() {
      const audioSrc =
        "http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg";
      setAudioSrc(audioSrc);
    }
    fetchAudio();
  }, []);

  const getTranscriptionId = () => {
    return window.location.pathname.substring(
      16,
      window.location.pathname.length
    );
  };
  //fetch data from custom API for now.
  const fetchData = () => {
    axios
      .get("https://api.mocki.io/v2/fc2a0cd8/transcription")
      .then((newRes) => {
        setFormattedData(generateArray(newRes.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //fetch data(transcription text and audio) from our API.
  const fetchActualData = (transcription_id) => {
    const data =
      "grant_type=password&username=arcteggzz%40gmail.com&password=123456789&scope=&client_id=&client_secret=";
    axios.post("https://api.heed.hng.tech/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get(`https://api.heed.hng.tech/transcription/${transcription_id}`, {
          headers,
        })
        .then((newRes) => {
          console.log(newRes.data);
          setFormattedData(
            generateArray(newRes.data.sentiment_result.transcript)
          );
          setAudioSrc(newRes.data.sentiment_result.audio_url);
          setAudioFileSize(newRes.data.sentiment_result.audio_size);
        });
    });
  };
  useEffect(() => {
    fetchActualData(getTranscriptionId());
  }, []);

  // format array function
  const generateArray = (str) => {
    const cleanedData = [];

    const wordArray = str.split(" ");
    let time = -5;
    let objectID = -1;
    let emptyString = "";
    let counter = 0;

    wordArray.map((word) => {
      if (counter < 20) {
        emptyString = emptyString + " " + word;
        counter++;
      }
      if (counter == 20) {
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

  return (
    <div className={styles.TranscriptionMain}>
      <Dummy
        formattedData={formattedData}
        isPlaying={isPlaying}
        audioElem={audioElem}
        currentTime={currentTime}
        timeUpdateTracker={timeUpdateTracker}
      />
      <TranscriptionRightBar
        audioElem={audioElem}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioDuration={audioDuration}
        currentTime={currentTime}
        audioFileSize={audioFileSize}
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
