// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import axios from "axios";
// import ProgressBar from "../ProgressBar/index";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./try_state_4.module.scss";
// import RecordingName from "../../assets/recording-name-1.png";
import { useEffect, useState } from "react";
// import { useState } from "react";

export default function TryFourth() {
  const { transcribeId } = useParams();
  const [display, setDisplay] = useState({});

  useEffect(() => {
    if (transcribeId) {
      // console.log(transcribeId);
      // console.log("");
      getResults(transcribeId);
    }
  }, [transcribeId]);
  const getResults = async (transcribeId) => {
    const formData = new FormData();
    formData.append("transcript_id", transcribeId);
    try {
      const response = await axios({
        method: "get",
        url: `https://api.heed.hng.tech/get_transcript/${transcribeId}`,
        // data: formData,
        headers: { "Content-Type": "application/json" },
      });
      const results = response.data;
      setDisplay(results);
      // console.log(results);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <section className={styles.transcribeAnalysis}>
      <div>
        <div className={styles.Analysis}>
          <h2>Transcription and Sentiment Analysis</h2>
          <div className={styles.callback}>
            <h3>
              Please copy this transcribe url below to access your results or
              refresh after some time.
            </h3>
            <p>https://heed.hng.tech/try-results/{transcribeId}</p>
          </div>
          <div className={styles.recordingName}>
            <div className={styles.recordingImage}>
              <img
                src="https://res.cloudinary.com/djufngoed/image/upload/v1670423928/recording-name-1_mhlgbq.webp"
                alt="recording_file"
              />
            </div>
            <div className={styles.recordingText}>
              <p>{display.filename}</p>
              <small>{display.filesize}</small>
            </div>
          </div>

          <div className={styles.allWords}>
            <p>{display.transcription}</p>
          </div>

          <hr />

          <div className={styles.overallSentiment}>
            <h3 className={styles.h3}>Overall Sentiment</h3>

            <div className={styles.overallProgress}>
              {/* <div className={styles.progress}>
              <p>Agent Friendliness</p>
              <ProgressBar bgcolor="#B0CAD9" progress="90" height={25} />
            </div>

            <div className={styles.progress}>
              <p>Customer Satisfaction</p>
              <ProgressBar bgcolor="#B0CAD9" progress="70" height={25} />
            </div>

            <div className={styles.progress}>
              <p>Detected Harsh Words</p>
              <ProgressBar bgcolor="#B0CAD9" progress="5" height={25} />
            </div> */}

              <div className={styles.verdict}>
                <p>Verdict:</p>
                <h5>
                  Overall Sentiment of this call is{" "}
                  {display.overall_sentiment_result}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.like}>
          <hr />
          <p>
            Do you like Heed? Track the performance of your customer support
            team with our easy to use sentiment analysis tool. Get access to
            more features when you sign up your company.
          </p>
        </div>
        <div className={styles.priceSignup}>
          <Link to="/pricing" className={styles.button1}>
            View Pricing Plan
          </Link>
          <Link to="/create-account" className={styles.button2}>
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
