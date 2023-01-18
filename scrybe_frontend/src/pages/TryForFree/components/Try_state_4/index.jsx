import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./try_state_4.module.scss";
import { useEffect, useState } from "react";
import { GetTranscript } from "../../../../redux/features/transcriptions/service";
import { dispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";

export default function TryFourth() {
  const { transcribeId } = useParams();
  const { transcript } = useSelector((state) => state.transcription);
  const [display, setDisplay] = useState({});

  useEffect(() => {
    if (transcribeId) {
      dispatch(GetTranscript(transcribeId));
    }
  }, [transcribeId]);

  useEffect(() => {
    if (transcript) {
      setDisplay(transcript);
    }
  }, [transcript]);

  return (
    <section className={styles.transcribeAnalysis}>
      <div>
        <div className={styles.Analysis}>
          <h2>Transcription and Sentiment Analysis</h2>
          <div className={styles.callback}>
            <h3>
              Please copy this transcribe url below to access your results or
              click
              <span
                onClick={() => window.location.reload(false)}
                className={styles.link}
              >
                {" "}
                Refresh{" "}
              </span>
              to reload the page and see the results after some time .
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
          <Link to="/signup" className={styles.button2}>
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
