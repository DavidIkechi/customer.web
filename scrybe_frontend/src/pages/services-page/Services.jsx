import React from "react";
import "./Services.scss";

import weCan from "./assets/what-we-can-do.png";
import heroImg from "./assets/header-image.png";
import check from "./assets/checkmark.svg";
import arrow from "./assets/arrow-right.svg";
import sentiment from "./assets/sentiment-page.png";

function Services() {
  return (
    <div className="services-section">
      <div className="hero-section">
        <div className="container">
          <div className="hero-flex">
            <div className="text-cont">
              <h1>Services</h1>
              <p>
                Get the best off your Audio calls.
                <br /> A solution you need
              </p>
              <button type="button">Try for free</button>
            </div>
            <div className="img-cont">
              <img src={heroImg} alt="transcribe" />
            </div>
          </div>
        </div>
      </div>

      <div className="offer-section">
        <div className="container">
          <h1>We offer the best services</h1>
          <p>
            Scrybe makes customer engagement in your business seamless and easy
            to improve
          </p>
          <button type="button">Watch a demo</button>
        </div>
      </div>

      <div className="we-can-section">
        <div className="container">
          <div className="wecan-flex">
            <div className="wecan-img">
              <img src={weCan} alt="wecan" />
            </div>
            <div className="wecan-txt">
              <h1>Here Is What We Can Do For You</h1>
              <li className="list">
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

      <div className="transcription-section">
        <div className="container">
          <div className="trans-flex">
            <div className="trans-txt">
              <h1>Audio-to-text Transcription</h1>
              <div className="check-container">
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Time Stamp</p>
                </span>
                <span>
                  <img src={check} alt="checkmark" />
                  <p>Convert recorded calls into readable tex</p>
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
          <div className="line" />
        </div>
      </div>

      <div className="sentiment-section">
        <div className="container">
          <div className="trans-flex">
            <div className="trans-txt">
              <h1>Sentiment Analysis</h1>
              <div className="check-container">
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

      <div className="report-section">
        <div className="container">
          <div className="trans-flex">
            <div className="trans-txt">
              <h1>Detailed Report</h1>
              <div className="check-container">
                <span>
                  <img src={check} alt="checkmark" />
                  <p>
                    Reports on customers’ engagement and call agent’s
                    efficeiency.
                  </p>
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
          <div className="line" />
        </div>
      </div>

      <div className="article-section">
        <div className="container">
          <p>
            We help you inderstand your customers and your customer service.
            Have a feel of our uniqueness!
          </p>
          <button type="button">Try For Free</button>
        </div>
      </div>
    </div>
  );
}

export default Services;
