import React from "react";
import Styling from "./Services.module.scss";

import weCan from "./assets/what-we-can-do.png";
import heroImg from "./assets/header-image.png";
import check from "./assets/checkmark.svg";
import arrow from "./assets/arrow-right.svg";
import sentiment from "./assets/sentiment-page.png";

import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function Services() {
  return (
    <div className="services-section">
      <NavBar />
      <div className={Styling.heroSection}>
        <div className={Styling.containers}>
          <div className={Styling.heroFlex}>
            <div className={Styling.textCont}>
              <h1>Services</h1>
              <p>
                Get the best off your Audio calls.
                <br /> A solution you need
              </p>
              <button type="button">Try for free</button>
            </div>
            <div className={Styling.imgCont}>
              <img src={heroImg} alt="transcribe" />
            </div>
          </div>
        </div>
      </div>

      <div className={Styling.offerSection}>
        <div className={Styling.containers}>
          <h1>We offer the best services</h1>
          <p>
            Scrybe makes customer engagement in your business seamless and easy
            to improve
          </p>
          <button type="button">Watch a demo</button>
        </div>
      </div>

      <div className={Styling.wecanSection}>
        <div className={Styling.containers}>
          <div className={Styling.wecanFlex}>
            <div className={Styling.wecanImg}>
              <img src={weCan} alt="wecan" className={Styling.weImg} />
            </div>
            <div className={Styling.wecanTxt}>
              <h1>Here Is What We Can Do For You</h1>
              <li className={Styling.list}>
                An AI-based customer support attendance that automatically
                transcribes and analyzes recorded conversations.
              </li>
              <li>
                This allows you to find out the overall sentiment and input
                levels of your support team as well as individual responses to
                customer queries.
              </li>
            </div>
          </div>
        </div>
      </div>

      <div className={Styling.transcriptionSection}>
        <div className={Styling.containers}>
          <div className={Styling.transFlex}>
            <div className={Styling.transTxt}>
              <h1>Audio-to-text Transcription</h1>
              <div className={Styling.checkContainers}>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Time Stamp</p>
                </span>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Convert recorded calls into readable text</p>
                </span>
                <span>
                  <img src={check} alt="checkmark" />
                  <p> Built with diversity and inclusion in mind</p>
                </span>
              </div>
              <button type="button">
                Learn More
                <img src={arrow} alt="arrow" />
              </button>
            </div>
            <div className="tras-img">
              <img src={heroImg} alt="transcribe" />
            </div>
          </div>
          <div className={Styling.line} />
        </div>
      </div>

      <div className={Styling.sentimentSection}>
        <div className={Styling.containers}>
          <div className={Styling.transFlex}>
            <div className={Styling.transTxt}>
              <h1>Sentiment Analysis</h1>
              <div className={Styling.checkContainers}>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Detects unprofessional words</p>
                </span>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Recordings are analyzed by our high-performance AI</p>
                </span>
              </div>
              <button type="button">
                Learn More
                <img src={arrow} alt="arrow" />
              </button>
            </div>
            <div className="tras-img">
              <img src={sentiment} alt="transcribe" />
            </div>
          </div>
          <div className="line" />
        </div>
      </div>

      <div className={Styling.reportSection}>
        <div className={Styling.containers}>
          <div className={Styling.transFlex}>
            <div className={Styling.transTxt}>
              <h1>Detailed Report</h1>
              <div className={Styling.checkContainers}>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>
                    Reports on customer’s engagement and call agent’s efficiency
                  </p>
                </span>
              </div>
              <button type="button">
                Learn More
                <img src={arrow} alt="arrow" />
              </button>
            </div>
            <div className={Styling.trasImg}>
              <img src={heroImg} alt="transcribe" />
            </div>
          </div>
          <div className={Styling.line} />
        </div>
      </div>

      <div className={Styling.articleSection}>
        <div className={Styling.containers}>
          <p>
            We help you inderstand your customers and your customer service.
            Have a feel of our uniqueness!
          </p>
          <button type="button">Try For Free</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
