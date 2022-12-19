import React from "react";
import styled from "./Solutions.module.scss";

import Footer from "../../components/Footer";
import NavBar from "../../components/navBar";

import dashboard from "./assets/dashboard.png";
import heroImg from "./assets/hero-img.png";
import monitor from "./assets/monitor.png";
import durationIcon from "./assets/ranking.svg";
import sentimentsIcon from "./assets/sentiment-icon.svg";
import sentiment from "./assets/sentiments.png";
import transcribeIcon from "./assets/transcribe-icon.svg";

import google from "./assets/googole-logo.svg";
import happy from "./assets/happy-logo.svg";
import hulu from "./assets/hulu-logo.svg";
import microsoft from "./assets/microsoft-logo.svg";
import nCast from "./assets/ncast-logo.svg";
import warpWire from "./assets/warpwire-logo.svg";

function Solutions() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div className="solution-section">
      <NavBar />
      <div className={styled.contentSection}>
        <div className={styled.containers}>
          <div className={styled.flexItems}>
            <div className={styled.txtItem}>
              <h1>Get accurate assessment of your customer support system</h1>
              <p>
                With Scrybe, you can convert recorded call conversations into
                readable and searchable text and automatically analyze the
                recordings to extract sentiment analysis data in just a few
                minutes.
              </p>
              <div className={styled.btns}>
                <button type="button" className={styled.transparent}>
                  Watch Demo
                </button>
              </div>
            </div>
            <div className={styled.imgItem}>
              <img src={heroImg} alt="group" />
            </div>
          </div>
        </div>
      </div>

      <div className={styled.whyScrybe}>
        <div className={styled.containers}>
          <h1>Why Scrybe?</h1>
          <p>
            Our product’s-solution cuts across various pain points faced by call
            center/customer support managers. We help you:
          </p>

          <div className={styled.cardContainers}>
            <div className={styled.card}>
              <img src={transcribeIcon} alt="duration" />
              <p>Transcribe your audio files with your personalized options</p>
            </div>
            <div className={styled.card}>
              <img src={sentimentsIcon} alt="transcribe" />
              <p>
                Run sentiment analysis on audio files to monitor conversations
              </p>
            </div>
            <div className={styled.card}>
              <img src={durationIcon} alt="sentiment" />
              <p>Categorize support agent’s helpfulness from the assessments</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styled.bussSection}>
        <div className={styled.containers}>
          <div className={styled.bussFlex}>
            <div className={styled.bussTxt}>
              <h1>AI Driven, unbiased insights to enhance your brand</h1>

              <p>
                Scrybe accurately tells you how happy or unhappy your customers
                are with your support service, helping you identify lapses and
                improve customer satisfaction. We believe that satisfied
                customers often become a brand’s advocates and evangelists. You
                can take advantage of an automatic tool to achieve things like
                opinion mining, perform improved competitor analysis, and even
                prevent brand reputation crises.
              </p>
            </div>
            <div className={styled.bussImg}>
              <img src={monitor} alt="upload" />
            </div>
          </div>
        </div>
      </div>

      <div className={styled.containers}>
        <div className={styled.uploadContainers}>
          <div className={styled.cont}>
            <h4>Ready to improve your customer support efficiency?</h4>
            <h1>Upload. Transcribe. Analyze.</h1>
            <button type="button">Try for Free</button>
          </div>
        </div>
      </div>

      <div className={styled.monitorSection}>
        <div className={styled.containers}>
          <div className={styled.monitorFlex}>
            <div className={styled.bussImg}>
              <img src={dashboard} alt="upload" className="img" />
            </div>
            <div className={styled.bussTxt}>
              <h1>Save time managing large call data</h1>

              <p>
                Businesses with call centers know customer sentiment is crucial,
                but finding an accurate service is time-intensive. Scrybe is
                accurate and available within minutes via a seamless upload
                process, easing up your analysis process. Scrybe will save work
                hours and compile reliable data on your customers' thinking.
              </p>

              <h4>
                Discover what your customers really think about you as a call
                center.
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className={styled.containers}>
        <div className={styled.setblurContainers}>
          <div className={styled.cont}>
            <h4>
              If you have any questions about our solutions? Please contact us
              by email: info@scrybe.com.
            </h4>
            <h1>Get Started With Scrybe</h1>
            <button type="button">Try for Free</button>
          </div>
        </div>
      </div>

      <div className={styled.bussSection}>
        <div className={styled.containers}>
          <div className={styled.bussFlex}>
            <div className={styled.bussTxt}>
              <h1>Precise transcription and accurate insight</h1>

              <p>
                Scrybe provides call recording solutions that make it easy and
                efficient to increase resolution rates, optimize customer
                service experience, improve retention rates and manage
                operational costs. Our innovative Technology transcribes
                customer service conversations automatically and analyzes the
                sentiment behind them.
              </p>

              <h4>
                Ascertain the efficiency of your customer support with generated
                activity data. Try for free.
              </h4>
            </div>
            <div className={styled.bussImg}>
              <img src={sentiment} alt="upload" />
            </div>
          </div>
        </div>
      </div>

      <div className={styled.logoSection}>
        <div className={styled.containers}>
          <h1>We are loved by Companies of all sizes</h1>
          <p>
            Companies of all sizes from Startup and Fortune 500 companies use
            Scrybe{" "}
          </p>
          <div className={styled.logoFlex}>
            <img src={microsoft} alt="microsoft-logo" />
            <img src={nCast} alt="nCast-logo" />
            <img src={warpWire} alt="warpwire-logo" />
            <img src={hulu} alt="hulu-logo" />
            <img src={happy} alt="hapy-scribelogo" />
            <img src={google} alt="google-logo" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Solutions;
