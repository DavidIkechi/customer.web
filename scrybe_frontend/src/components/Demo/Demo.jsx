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
import { NavLink } from "react-router-dom";

const handle1NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-100%";
};
// Second
const handle2NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-200%";
};
const handle2PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "0%";
};

// Third
const handle3NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-300%";
};
const handle3PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-100%";
};

// Fourth
const handle4NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-400%";
};
const handle4PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-200%";
};

// Fifth
const handle5NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-500%";
};
const handle5PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-300%";
};

// Sixth
const handle6NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-600%";
};
const handle6PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-400%";
};

// Seventh
const handle7NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-700%";
};
const handle7PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-500%";
};

// Eighth
const handle8NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-800%";
};
const handle8PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-600%";
};

// Ninth
const handle9NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-900%";
};
const handle9PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-700%";
};

// Tenth
const handle10NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-1000%";
};
const handle10PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-800%";
};

// Eleventh
const handle11NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-1100%";
};
const handle11PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-900%";
};

// Twelfth
const handle12NextClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-1200%";
};
const handle12PrevClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "-1000%";
};

// Thirteen
const handleRestartClick = () => {
  console.log(`.${styles.slidepage}`);
  const slidePage = document.querySelector(`.${styles.slidepage}`);
  slidePage.style.marginLeft = "0%";
};

function Demo() {
  return (
    <>
      <div className={styles.demo_container} onClick={() => {
        closeUpModal(false)}}>
        <div className={styles.demo_outer}>
          <div className={`${styles.demo_holder} ${styles.slidepage}`}>
            <div className={`${styles.demo_1} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={firstImg} alt="" />
              </div>
              <h2>Welcome to the Tour</h2>
              <p>Click on Next button to continue</p>
              <div
                className={`${styles.navigation} ${styles.first_btn}`}
                onClick={handle1NextClick}
              >
                <button className={styles.next}>NEXT</button>
              </div>
            </div>
            <div className={`${styles.demo_2} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={secondtImg} alt="" />
              </div>
              <h2>Recording Overview</h2>
              <p>
                Your audio uploads are organized by <br />
                Date of Upload and maximum upload size is 50mb
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_1} ${styles.prev}`}
                  onClick={handle2PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_1} ${styles.next}`}
                  onClick={handle2NextClick}
                >
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
                Barcharts help you check record of your total uploads; <br />
                weekly and monthly
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_2} ${styles.prev}`}
                  onClick={handle3PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_2} ${styles.next}`}
                  onClick={handle3NextClick}
                >
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
                <button
                  className={`${styles.prev_3} ${styles.prev}`}
                  onClick={handle4PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_3} ${styles.next}`}
                  onClick={handle4NextClick}
                >
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
                Consists of the amount of agents in your team.
                <br />
                Your plan determines the amount of agents you can have.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_4} ${styles.prev}`}
                  onClick={handle5PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_4} ${styles.next}`}
                  onClick={handle5NextClick}
                >
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
                Audios are transcribed into break points <br />
                for easy access clarifications
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_5} ${styles.prev}`}
                  onClick={handle6PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_5} ${styles.next}`}
                  onClick={handle6NextClick}
                >
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
                You can access your previous recordings <br />
                with just one click.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_6} ${styles.prev}`}
                  onClick={handle7PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_6} ${styles.next}`}
                  onClick={handle7NextClick}
                >
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
                You can access your analysis <br />
                with just one click.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_7} ${styles.prev}`}
                  onClick={handle8PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_7} ${styles.next}`}
                  onClick={handle8NextClick}
                >
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
                Sentiment analysis into three points: <br />
                Positive, Negative and Neutral.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_8} ${styles.prev}`}
                  onClick={handle9PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_8} ${styles.next}`}
                  onClick={handle9NextClick}
                >
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
                Access to quantitive break down of overall sentiment <br />
                based on audio uploaded
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_9} ${styles.prev}`}
                  onClick={handle10PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_9} ${styles.next}`}
                  onClick={handle10NextClick}
                >
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_11} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={eleventhImg} alt="" />
              </div>
              <h2>Customer Satisfaction bar</h2>
              <p>
                Customer satisfaction automatically <br />
                measured and accessed.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_10} ${styles.prev}`}
                  onClick={handle11PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_10} ${styles.next}`}
                  onClick={handle11NextClick}
                >
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_12} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={twelfthImg} alt="" />
              </div>
              <h2>Download Categories</h2>
              <p>
                Download verdict in your preferred format: <br />
                pdf, html, Json.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.prev_11} ${styles.prev}`}
                  onClick={handle12PrevClick}
                >
                  PREVIOUS
                </button>
                <button
                  className={`${styles.next_11} ${styles.next}`}
                  onClick={handle12NextClick}
                >
                  NEXT
                </button>
              </div>
            </div>
            <div className={`${styles.demo_13} ${styles.demo}`}>
              <div className={styles.img_container}>
                <img src={thirteenthImg} alt="" />
              </div>
              <h2>TRIAL COMPLETE</h2>
              <p>
                What next? <br />
                You can test it out using the button below.
              </p>
              <div className={styles.navigation}>
                <button
                  className={`${styles.replay} ${styles.prev}`}
                  onClick={handleRestartClick}
                >
                  REPLAY
                </button>
                <NavLink to={"/try"} className={styles.btn_nav}>
                  <button>START TRIAL</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
