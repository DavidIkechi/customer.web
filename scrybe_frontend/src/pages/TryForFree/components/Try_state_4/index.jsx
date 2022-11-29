// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import ProgressBar from "../ProgressBar/index";
import { Link } from "react-router-dom";
import styles from "./try_state_4.module.scss";
import RecordingName from "../../assets/recording-name-1.png";

export default function TryFourth() {
  return (
    <section className={styles.transcribeAnalysis}>
      <div className={styles.Analysis}>
        <h2>Transcription and Sentiment Analysis</h2>

        <div className={styles.recordingName}>
          <div className={styles.recordingImage}>
            <img src={RecordingName} alt="some" />
          </div>
          <div className={styles.recordingText}>
            <p>Recording 1 name. mp3</p>
            <small>10 mb</small>
          </div>
        </div>

        <div className={styles.allWords}>
          <p>
            "I am glad to be onboarded on Scrybe. Thank you for joining the
            team. Do you require further assistance? Yes, please. How do I view
            your pricing plan? To view the current pricing plan, kindly visit
            https://srcybe.com . Navigate to the pricing page from the header of
            our website. Okay... I am bad at navigating though No worries, just
            look at the top of your screen. Oh, yes.... seen. Thank you. Thank
            you for your time. We hope you have a wonderful experience with
            scrybe."
          </p>
        </div>

        <hr />

        <div className={styles.overallSentiment}>
          <h3 className={styles.h3}>Overall Sentiment</h3>

          <div className={styles.overallProgress}>
            <div className={styles.progress}>
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
            </div>

            <div className={styles.verdict}>
              <p>Verdict:</p>
              <h5>Customer is Satisfied</h5>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.like}>
        <hr />
        <p>
          Do you like Heed? Track the performance of your customer support
          team with our easy to use sentiment analysis tool. Get access to more
          features when you sign up your company.
        </p>
      </div>
      <div className={styles.priceSignup}>
        <Link to="/" className={styles.button1}>
          View Pricing Plan
        </Link>
        <Link to="/signin" className={styles.button2}>
          Sign Up
        </Link>
      </div>
    </section>
  );
}
