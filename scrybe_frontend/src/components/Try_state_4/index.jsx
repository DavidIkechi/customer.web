// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React from "react";
import { Link } from "react-router-dom";
import styles from "./try_state_4.module.css";
import RecordingName from "../../assets/recording-name-1.png";

export default function TryFourth() {
  // const [filled, setFilled] = useState(0);
  return (
    <section>
      <div className={styles.Analysis}>
        <h2>Transcription and Sentiment Analysis</h2>

        <div className={styles.recordingName}>
          <div>
            <img src={RecordingName} alt="some" />
          </div>
          <div>
            <p>Recording 1 name. mp3</p>
            <small>10 mb</small>
          </div>
        </div>

        <div className={styles.allWords}>
          <div className={styles.callWords}>
            <span>00:01</span>
            <p>I am glad to be onboarded on Scrybe.</p>
          </div>

          <div className={styles.callWords}>
            <span>00:13</span>
            <p>
              Thank you for joining the team. Do you require further assistance?
            </p>
          </div>

          <div className={styles.callWords}>
            <span>00:27</span>
            <p>Yes, please. How do I view your pricing plan?</p>
          </div>

          <div className={styles.callWords}>
            <span>00:34</span>
            <p>
              To view the current pricing plan, kindly visit https://srcybe.com.
              Navigate to the pricing page from the header of our website.
            </p>
          </div>

          <div className={styles.callWords}>
            <span>01:16</span>
            <p>Okay... I am bad at navigating though</p>
          </div>

          <div className={styles.callWords}>
            <span>02:01</span>
            <p>Oh, yes.... seen. Thank you.</p>
          </div>

          <div className={styles.callWords}>
            <span>02:16</span>
            <p>
              Thank you for your time. We hope you have a wonderful experience
              with scrybe.
            </p>
          </div>
        </div>

        <hr />

        <div className={styles.overallSentiment}>
          <h3>Overall Sentiment</h3>

          <div className={styles.overallProgress}>
            <div className={styles.progress}>
              <p>Agent Friendliness</p>
              <div className={styles.spanDiv}>
                <div className={styles.span1}>.</div>
                <p>90%</p>
              </div>
            </div>

            <div className={styles.progress}>
              <p>Customer Satisfaction</p>
              <div className={styles.spanDiv}>
                <div className={styles.span1}>.</div>
                <p>90%</p>
              </div>
            </div>

            <div className={styles.progress}>
              <p>Detected Harsh Words</p>
              <div className={styles.spanDiv}>
                <div className={styles.span1}>.</div>
                <p>90%</p>
              </div>
            </div>

            <div className={styles.verdict}>
              <p>Verdict:</p>
              <h5>Customer is Satisfied</h5>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.progressBar}>
        <div
          style={{
            height: "100%",
            width: `${30}%`,
            backgroundColor: "#006CFF",
          }}
        />
        <span className={styles.progressPercent}>{60}%</span>
      </div> */}

      <div className={styles.like}>
        <hr />
        <p>
          Do you like Scrybe? Track the performance of your customer support
          team with our easy to use sentiment analysis tool. Get access to more
          features when you sign up your company.
        </p>
      </div>

      <div className={styles.priceSignup}>
        <Link to="/" className={styles.button1}>
          View Pricing Plan
        </Link>
        <Link to="/" className={styles.button2}>
          Sign Up
        </Link>
      </div>
    </section>
  );
}
