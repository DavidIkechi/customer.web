import React from "react";
import { Link } from "react-router-dom";
import styles from "./HowItWorks.module.scss";
import Image1 from "./assets/howitworks1.svg";
import Image2 from "./assets/howitworks2.svg";
import Image3 from "./assets/howitworks3.svg";
import Image4 from "./assets/howitworks4.svg";

function HowItWorks() {
  return (
    <div className={styles.howitworks}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>
            How <span>Scrybe</span> works
          </h1>
          <p>Simple and powerful, Scrybe is really smart</p>
        </div>
        <section className={styles.steps}>
          <div className={`${styles.card} ${styles.left}`}>
            <span>1</span>
            <div className={styles.cardInfo}>
              <h3>Sign up to Scribe</h3>
              <p>
                Sign up in just a few steps or Login if you already have an
                account.
              </p>
            </div>
            <div className={styles.cardImage}>
              <img src={Image1} alt="" />
            </div>
          </div>
          <div className={`${styles.card} ${styles.right}`}>
            <span>2</span>
            <div className={styles.cardInfo}>
              <h3>Upload Recordings or Audio files of Conversation</h3>
              <p>Scrybe will analyze the conversation to produce:</p>
              <ul>
                <li>&bull; A readable and searchable text file</li>
                <li>&bull; A Sentiment Analysis report</li>
              </ul>
              <p>
                Scrybe automatically transcribes and analyzes your file within
                minutes. We will also notify you via mail when your report is
                ready.
              </p>
            </div>
            <div className={styles.cardImage}>
              <img src={Image2} alt="" />
            </div>
          </div>
          <div className={`${styles.card} ${styles.left}`}>
            <span>3</span>
            <div className={styles.cardInfo}>
              <h3>
                Analyze the insights and take action to improve call center
                efficiency
              </h3>
              <p>
                With the power of AI, Scrybe automatically transcribes and
                analyzes the text for sentiment. Once this is complete, a
                sentiment score of positive, neutral or negative is assigned to
                each transcription and a report is generated.
              </p>
              <p>
                (Transcriptions take a few minutes, we will notify you via email
                once your report is ready for download.)
              </p>
            </div>
            <div className={styles.cardImage}>
              <img src={Image3} alt="" className={styles.makeLarge} />
            </div>
          </div>
          <div className={`${styles.card} ${styles.right}`}>
            <span>4</span>
            <div className={styles.cardInfo}>
              <h3>
                View and download your report (transcription and the sentiment
                analysis data)
              </h3>
              <p>
                Get an overview of your agents&apos; performance - Measure the
                quality of their interactions and see which agents consistently
                get positive sentiment results and those that need improvement.
              </p>
            </div>
            <div className={styles.cardImage}>
              <img src={Image4} alt="" className={styles.makeLarge} />
            </div>
          </div>
        </section>
        <section className={styles.links}>
          <Link to="/FAQs" className={`${styles.linkBtn} ${styles.white}`}>
            FAQs
          </Link>
          <Link to="/try" className={`${styles.linkBtn} ${styles.blue}`}>
            Try for Free
          </Link>
        </section>
      </div>
    </div>
  );
}

export default HowItWorks;
