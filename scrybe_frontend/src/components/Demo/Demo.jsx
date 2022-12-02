import React from "react";
import styles from "./Demo.module.scss";
import firstImg from "./assets/Screen1.png";
import secondtImg from "./assets/Screen2.png";
import thirdImg from "./assets/Screen3.png";
import fourthtImg from "./assets/Screen4.png";
import fifthImg from "./assets/Screen5.png";
import sixthImg from "./assets/Screen6.png";
import seventhImg from "./assets/Screen7.png";
import eighthImg from "./assets/Screen8.png";
import ninthImg from "./assets/Screen9.png";
import tenthImg from "./assets/Screen10.png";
import eleventhImg from "./assets/Screen11.png";
import twelfthImg from "./assets/Screen12.png";
import thirteenthImg from "./assets/Screen13.png";

function Demo() {
  return (
    <>
      <div className={styles.demo_container}>
        <div className={styles.demo_outer}>
          <div className={styles.demo_holder}>
            <div className={`${styles.demo_1} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={firstImg} alt="" />
              </div>
              <h2>Welcome to the Tour</h2>
              <p>Click on Next button to continue</p>
              <div className={`${styles.navigation} ${styles.first_btn}`}>
                <button>NEXT</button>
              </div>
            </div>
            <div className={`${styles.demo_2} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={secondtImg} alt="" />
              </div>
              <h2>Recording Overview</h2>
              <p>
                Your audio uploads are organized by Date of Upload and maximum
                upload size is 50mb
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_1} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_1} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_3} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={thirdImg} alt="" />
              </div>
              <h2>Total Recordings</h2>
              <p>
                Barcharts help you check record of your total uploads; weekly
                and monthly
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_2} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_2} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_4} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={fourthtImg} alt="" />
              </div>
              <h2>Total Analysis</h2>
              <p>Full analysis of your total recording uploads</p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_3} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_3} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_5} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={fifthImg} alt="" />
              </div>
              <h2>Agent's Leaderboard</h2>
              <p>
                Consists of the amount of agents in your team. Your plan
                determines the amount of agents you can have.
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_4} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_4} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_6} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={sixthImg} alt="" />
              </div>
              <h2>Transcription</h2>
              <p>
                Audios are transcribed into break points for easy access
                clarifications
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_5} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_5} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_7} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={seventhImg} alt="" />
              </div>
              <h2>Multi - Recordings</h2>
              <p>
                You can access your previous recordings with just one click.
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_6} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_6} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_8} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={eighthImg} alt="" />
              </div>
              <h2>Sentiment Analysis</h2>
              <p>
                You can access your previous recordings with just one click.
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_7} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_7} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_9} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={ninthImg} alt="" />
              </div>
              <h2>Transcription</h2>
              <p>
                Sentiment analysis into three points: Positive, Negative and
                Neutral.
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_8} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_8} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_10} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={tenthImg} alt="" />
              </div>
              <h2>Overall Sentiment</h2>
              <p>
                Access to quantitive break down of overall sentiment based on
                audio uploaded
              </p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_9} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_9} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_11} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={eleventhImg} alt="" />
              </div>
              <h2>Customer Satisfaction bar</h2>
              <p>Customer satisfaction automatically measured and accessed.</p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_10} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_10} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_12} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={twelfthImg} alt="" />
              </div>
              <h2>Download Categories</h2>
              <p>Download verdict in your preferred format: pdf, html, Json.</p>
              <div className={styles.navigation}>
                <button className={`${styles.prev_11} ${styles.prev}`}>
                  PREVIOUS
                </button>
                <button className={`${styles.next_11} ${styles.next}`}>
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_13} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={thirteenthImg} alt="" />
              </div>
              <h2>TRIAL COMPLETE</h2>
              <p>What next? You can test it out using the button below.</p>
              <div className={styles.navigation}>
                <button className={`${styles.replay} ${styles.prev}`}>
                  REPLAY
                </button>
                <button className={`${styles.start_trial} ${styles.prev}`}>
                  START TRIAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
