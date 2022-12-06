import React from "react";
import styles from "./homePageRedesign.module.scss";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavbarFree";
import heroCenter from "./assets/hero__center.png";
import saveTime from "./assets/save__time.png";
import easeUse from "./assets/ease__icon.png";
import powerIcon from "./assets/power__icon.png";
import uploadScreen from "./assets/upload__icon.png";
import transScreen from "./assets/trans__screen.png";
import analyzeScreen from "./assets/analyze__screen.png";
import clientOne from "./assets/client__one.png";
import clientTwo from "./assets/client__two.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  // const [supportColor, setSupportColor] = useState(true);
  // const [saleColor, setSaleColor] = useState(false);
  // const [supportText, setSupportText] = useState(true);
  // const [saleText, setSaleText] = useState(false);

  // function toggleColor() {
  //   setSupportColor((preval) => !preval);
  //   setSaleColor((preval) => !preval);
  //   setSupportText((preval) => !preval);
  //   setSaleText((preval) => !preval);
  // }

  return (
    <div>
      <NavBar />

      <section className={styles.first__section}>
        <div className={styles.sect__container}>
          <div className={styles.hero__flex}>
            <div className={styles.hero__text}>
              <div className={styles.hero__heading}>
                <h1 className={styles.hero__head}>
                  AI - Powered Solutions To Boost Sales And Support Teams
                  Efficiency
                </h1>
              </div>
              <div className={styles.hero__subtext}>
                <p className={styles.hero__subhead}>
                  Heed uses Artificial Intelligence to automatically transcribe
                  and analyze recorded audio calls by Customer support agents
                  and sales reps to give cutting-edge insight into customer
                  sentiment, thereby boosting operational efficiency, brand
                  loyalty and customer retention
                </p>
              </div>
            </div>
            <div className={styles.hero__bottom}>
              <div className={styles.hero__action}>
                <div className={styles.button__content}>
                  <Link to="/support-team" style={{ width: "48%" }}>
                    <button
                      className={styles.hero__buttonOne}
                      // style={{
                      //   backgroundColor: supportColor ? "#006CFF" : "#FFFFFF",
                      //   color: supportText ? "#FFFFFF" : "#006CFF",
                      // }}
                      // onClick={toggleColor}
                    >
                      For Support
                    </button>
                  </Link>
                  <Link to="/sales-team" style={{ width: "48%" }}>
                    <button
                      className={styles.hero__buttonTwo}
                      // style={{
                      //   backgroundColor: saleColor ? "#006CFF" : "#FFFFFF",
                      //   color: saleText ? "#FFFFFF" : "#006CFF",
                      // }}
                      // onClick={toggleColor}
                    >
                      For Sales
                    </button>
                  </Link>
                </div>
              </div>
              <div className={styles.hero__image}>
                <img
                  src={heroCenter}
                  alt="hero center icon"
                  className={styles.hero__icon}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.second__section}>
        <div className={styles.sect__container}>
          <div className={styles.second__top}>
            <h2 className={styles.second__head}>Why Heed?</h2>
          </div>
          <div className={styles.second__bottom}>
            <div className={styles.second__flex}>
              <div className={styles.top__layout}>
                <div className={styles.second__icons}>
                  <img
                    src={saveTime}
                    alt="what we do icon"
                    className={styles.save__time}
                  />
                </div>
                <div className={styles.each__heading}>
                  <h4 className={styles.each__head}>
                    Increase Sales/Support Attendance
                  </h4>
                </div>
              </div>
              <div className={styles.bottom__layout}>
                <p className={styles.second__subhead}>
                  With our AI-based customer support attendance, we give you
                  in-depth insight into the activities of your sales agents,
                  support teams and their approach towards buyers sentiment and
                  customers pain point
                </p>
              </div>
            </div>
            <div className={styles.second__flex}>
              <div className={styles.top__layout}>
                <div className={styles.second__icons}>
                  <img
                    src={easeUse}
                    alt="what we do icon"
                    className={styles.ease__icon}
                  />
                </div>
                <div className={styles.each__heading}>
                  <h4 className={styles.each__head}>Make Better Decisions</h4>
                </div>
              </div>
              <div className={styles.bottom__layout}>
                <p className={styles.second__subhead}>
                  Turn data into insights with unique analytics. Heed not only
                  transcribe and analyze the recorded audio files. We give you
                  an audio intelligence insight your sales process and support
                  activities, to help you make better decisions that can result
                  to business growth
                </p>
              </div>
            </div>
            <div className={styles.second__flex}>
              <div className={styles.top__layout}>
                <div className={styles.second__icons}>
                  <img
                    src={powerIcon}
                    alt="what we do icon"
                    className={styles.power__icon}
                  />
                </div>
                <div className={styles.each__heading}>
                  <h4 className={styles.each__head}>
                    Saves Money, Reduce Cost
                  </h4>
                </div>
              </div>
              <div className={styles.bottom__layout}>
                <p className={styles.second__subhead}>
                  Heed helps you monitor and evaluate how your customer service
                  team deals with customer complaints. This will help you with
                  an empathetic approach to your customer's/buyers needs, and
                  give you insight on how to channel your resources rightly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.third__section}>
        <div className={styles.sect__container}>
          <div>
            <div className={styles.third__top}>
              <h3 className={styles.third__head}>How it works?</h3>
            </div>
            <div className={styles.third__bottom}>
              <div className={styles.third__row}>
                <div
                  className={`${styles.third__text} ${styles.mobile__text} `}
                >
                  <p className={styles.third__subtext}>
                    Upload recorded calls from Sale/Support Team
                  </p>
                </div>
                <div className={styles.third__image}>
                  <img
                    src={uploadScreen}
                    alt="How it works icon"
                    className={styles.upload__icon}
                  />
                </div>
              </div>
              <div className={styles.third__col}>
                <div className={styles.third__image}>
                  <img
                    src={transScreen}
                    alt="what we do icon"
                    className={styles.trans__screen}
                  />
                </div>
                <div className={styles.third__text}>
                  <p className={styles.third__subtext}>
                    Heed will analyze the <br />
                    conversation to produce:
                  </p>
                  <ul className={styles.third__lists}>
                    <li className={styles.each__list}>
                      a readable and searchable text file
                    </li>
                    <li className={styles.each__list}>
                      A Sentiment Analysis report
                    </li>
                    <li className={styles.each__list}>
                      A Sentiment score is given on Agent record to prove
                      performance.
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.third__row}>
                <div className={styles.third__text}>
                  <p className={styles.third__subtext}>
                    Analyze the insights and take action.
                  </p>
                  <ul className={styles.third__lists}>
                    <li className={styles.each__list}>
                      Get an overview of your agents' performance
                    </li>
                    <li className={styles.each__list}>
                      Measure the quality of their interactions and see which
                      agents consistently get positive sentiment results and
                      those which need improvement.
                    </li>
                  </ul>
                </div>
                <div className={styles.third__image}>
                  <img
                    src={analyzeScreen}
                    alt="How it works icon"
                    className={styles.analyze__screen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.fourth__section}>
        <div className={styles.sect__container}>
          <div className={styles.fourth__heading}>
            <h3 className={styles.fourth__head}>
              Here's what our{" "}
              <span className={styles.fourth__inline}>clients</span> are saying!
            </h3>
          </div>
          <div className={styles.layout__one}>
            <div className={styles.client__test}>
              <div className={styles.profile__pic}>
                <img
                  src={clientOne}
                  alt="Client testimonial profile"
                  className={styles.client__one}
                />
              </div>
              <div className={styles.profile__head}>
                <h5 className={styles.profile__name}>
                  Mark Essien, CEO Hotels.ng
                </h5>
              </div>
              <div className={styles.profile__text}>
                <p className={styles.profile__msg}>
                  We are so happy to have discovered Heed. It is a good way to
                  monitor our engagements with clients and ensure my agents are
                  effective in our customer support activities.
                </p>
              </div>
            </div>
            <div className={styles.client__test}>
              <div className={styles.profile__pic}>
                <img
                  src={clientTwo}
                  alt="Client testimonial profile"
                  className={styles.client__two}
                />
              </div>
              <div className={styles.profile__head}>
                <h5 className={styles.profile__name}>
                  Chukwuebuka pad, Product manager, Carrot.
                </h5>
              </div>
              <div className={styles.profile__text}>
                <p className={styles.profile__msg}>
                  Heed gave us insight into customers preferences and we were
                  able to use this insight to grow our Sales revenue by 17%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.fifth__section}>
        <div className={styles.sect__container}>
          <div className={styles.top__fifth}>
            <div className={styles.fifth__heading}>
              <h3 className={styles.fifth__head}>
                Drive Sales And Support Team Efficiency
              </h3>
            </div>
            <div className={styles.fifth__subtext}>
              <p className={styles.fifth__subhead}>
                We help businesses unlock insights and extract meaningful data
                from your customer support conversations
              </p>
            </div>
          </div>
          <div className={styles.bottom__fifth}>
            <Link to="/try">
              <button className={styles.fifth__action}>Try Now</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
