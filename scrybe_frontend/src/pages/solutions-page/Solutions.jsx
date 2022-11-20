import React from "react";
import "./Solutions.scss";

import heroImg from "./assets/hero-img.png";
import durationIcon from "./assets/time-icon.svg";
import transcribeIcon from "./assets/transcribe-icon.svg";
import sentimentsIcon from "./assets/sentiment-icon.svg";
import uploadImg from "./assets/upload-img.png";
import monitor from "./assets/monitor.png";
import dashboard from "./assets/dashboard.png";
import sentiment from "./assets/sentiments.png";

import warpWire from "./assets/warpwire-logo.svg";
import nCast from "./assets/ncast-logo.svg";
import microsoft from "./assets/microsoft-logo.svg";
import hulu from "./assets/hulu-logo.svg";
import happy from "./assets/happy-logo.svg";
import google from "./assets/googole-logo.svg";

function Solutions() {
  return (
    <div className="solution-section">
      <div className="content-section">
        <div className="container">
          <div className="flex-items">
            <div className="txt-item">
              <h1>
                Get In-depth Knowledge of Customer Service Engagement with
                Scrybe
              </h1>
              <p>
                With Scrybe, you can convert all recorded calls into readable
                and searchable text and automatically analyze recordings to
                extract sentiment analysis data
              </p>
              <div className="btns">
                <button type="button" className="filled">
                  Try Free
                </button>
                <button type="button" className="transparent">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="img-item">
              <img src={heroImg} alt="group" />
            </div>
          </div>
        </div>
      </div>

      <div className="why-scrybe">
        <div className="container">
          <h1>Why Scrybe?</h1>
          <p>
            Our product’s-solution cuts across various pain points faced by call
            center/customer support managers. We help you:
          </p>

          <div className="card-container">
            <div className="card">
              <img src={durationIcon} alt="duration" />
              <p>Break your audio files into sections using time frames</p>
            </div>
            <div className="card">
              <img src={transcribeIcon} alt="transcribe" />
              <p>Transcribe your audio files with your personalized options</p>
            </div>
            <div className="card">
              <img src={sentimentsIcon} alt="sentiment" />
              <p>
                Run sentiment anaylsis on audio files to monitor customer calls
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="buss-section">
        <div className="container">
          <div className="buss-flex">
            <div className="buss-txt">
              <h1>
                Businesses with call centers know sentiment analysis data is
                crucial, but finding an accurate service is time-intensive
              </h1>

              <p>
                Scrybe is accurate and available within minutes via a seamless
                upload process, letting you use your time for other tasks!
                Outsourcing customer feedback to Scrybe will save work hours and
                compile reliable data on your customers thinking.
              </p>

              <h4>
                Discover what your customers really think about you as a call
                center.
              </h4>
            </div>
            <div className="buss-img">
              <img src={uploadImg} alt="upload" />
            </div>
          </div>
        </div>
      </div>

      <div className="monitor-section">
        <div className="container">
          <div className="monitor-flex">
            <div className="buss-img">
              <img src={monitor} alt="upload" className="img" />
            </div>
            <div className="buss-txt">
              <h1>
                Monitoring customer service conversations and identifying
                unhappy customers is time-consuming and expensive
              </h1>

              <p>
                Scrybe boosts your call center management efficiency by
                automating the transcription and sentiment analysis process, so
                you can focus more on what needs your attention: reevaluating
                customer concerns. Could it get any easier? Set up a few rules
                to customize and keep tabs on how human-like your bots sound
                with just a few clicks.
              </p>

              <h4>
                Ascertain the efficiency of your customer support with generated
                activity data.
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="upload-container">
          <div className="cont">
            <h4>Ready to improve your customer support efficiency?</h4>
            <h1>Upload. Transcribe. Analyze.</h1>
            <button type="button">Try for Free</button>
          </div>
        </div>
      </div>

      <div className="monitor-section">
        <div className="container">
          <div className="monitor-flex">
            <div className="buss-img">
              <img src={dashboard} alt="dashboard" />
            </div>
            <div className="buss-txt">
              <h1>
                The need for precise analytics data is ever-growing; quickly
                analyze customer interactions, get accurate data, and extract
                insights.
              </h1>

              <p>
                Scrybe provides call recording solutions that make it easy and
                efficient to increase resolution rates, optimize customer
                service experience, improve retention rates and manage
                operational costs. Our innovative Technology records customer
                service conversations automatically, transcribes them, and
                analyzes the sentiment behind them.
              </p>

              <h4>
                Find out how to use Scrybe to generate insightful customer
                insight data. Try it for free.
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="monitor-section">
        <div className="container">
          <div className="monitor-flex">
            <div className="buss-img">
              <img src={sentiment} alt="sentiment" />
            </div>
            <div className="buss-txt">
              <h1>
                Managing your phone calls can take up a lot of time and telling
                who is happy and unhappy with your service isn’t easy
              </h1>

              <p>
                Scrybe always tells you who is happy and unhappy with your
                service. You can make changes and prevent fires before they get
                too large to manage efficiently. Start managing customer
                conversations with ease! You must upload the call, find out what
                people think about your product or service, and fix any problems
                you’ve overlooked. Get your <span>free trial</span> today!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="setblur-container">
          <div className="cont">
            <h4>
              If you have any questions about our solutions? Please contact us
              by email: info@scrybe.com.
            </h4>
            <h1>Get Started With Scrybe</h1>
            <button type="button">Try for Free</button>
          </div>
        </div>
      </div>

      <div className="logo-section">
        <div className="container">
          <h1>We are loved by Companies of all sizes</h1>
          <p>
            Companies of all sizes from Startup and Fortune 500 companies use
            Scribe{" "}
          </p>
          <div className="logo-flex">
            <img src={microsoft} alt="microsoft-logo" />
            <img src={nCast} alt="nCast-logo" />
            <img src={warpWire} alt="warpwire-logo" />
            <img src={hulu} alt="hulu-logo" />
            <img src={happy} alt="hapy-scribelogo" />
            <img src={google} alt="google-logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solutions;
