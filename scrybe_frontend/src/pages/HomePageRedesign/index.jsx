import React from "react";
import styles from "./homePageRedesign.module.scss";
import heroCenter from "./assets/hero__center.png";
import saveTime from "./assets/save__time.png";
import easeUse from "./assets/ease__icon.png";
import powerIcon from "./assets/power__icon.png";
import uploadScreen from "./assets/upload__icon.png";
import transScreen from "./assets/trans__screen.png";
import analyzeScreen from "./assets/analyze__screen.png";
import clientOne from "./assets/client__one.png";
import clientTwo from "./assets/client__two.png";

const index = () => {
  return (
    <div>
      {/* <div className={styles.header__container}></div> */}
      <section className={styles.first__section}>
        <div className={styles.sect__container}>
          <div>
            <div>
              <h1>AI-Powered tool for an Enlightened Customer Engagement</h1>
            </div>
            <div>
              <p>
                Heed uses Artificial Intelligence to automatically transcribe
                and analyze recorded audio calls by Customer support agents and
                sales reps to give cutting-edge insight into customer sentiment,
                thereby boosting operational efficiency, brand loyalty and
                customer retention
              </p>
            </div>
          </div>
          <div>
            <div>
              <button>For Support</button>
              <button>For Sales</button>
            </div>
          </div>
          <div>
            <img
              src={heroCenter}
              alt="hero center icon"
              className={styles.hero__icon}
            />
          </div>
        </div>
      </section>
      <section className={styles.second__section}>
        <div className={styles.sect__container}>
          <div>
            <h2>Grow your Business with us</h2>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <img
                    src={saveTime}
                    alt="what we do icon"
                    className={styles.save__time}
                  />
                </div>
                <div>
                  <h4>Saves Time</h4>
                </div>
              </div>
              <div>
                <p>
                  Many sentiment analysis tools can be time-consuming, some take
                  as much as 30 minutes to transcribe audio, analyze and give
                  insight. Heed stands out by performing all these functions in
                  less than 20 minutes, thereby saving you time while also
                  giving you a much better customer sentiment insight
                </p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img
                    src={easeUse}
                    alt="what we do icon"
                    className={styles.ease__icon}
                  />
                </div>
                <div>
                  <h4>Ease of use</h4>
                </div>
              </div>
              <div>
                <p>
                  Our Web dashboard is very user-friendly. We've been Performing
                  sentimental analysis for a very long time and upgrading our
                  tools frequently to make sure all of our customers can
                  continue to have a wonderful experience while performing
                  analysis
                </p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img
                    src={powerIcon}
                    alt="what we do icon"
                    className={styles.power__icon}
                  />
                </div>
                <div>
                  <h4>Powerful analytics</h4>
                </div>
              </div>
              <div>
                <p>
                  Many sentiment analysis tools can be time-Turn data into
                  insights with unique analytics. Heed not only transcribe and
                  analyze the recorded audio files. We give you an audio
                  intelligence insight to help you make better decisions that
                  can result in customer retention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.third__section}>
        <div className={styles.sect__container}>
          <div>
            <div>
              <h3>How it works?</h3>
            </div>
            <div>
              <div>
                <div>
                  <p>
                    Upload the audio file you want to analyze (in mp3 format){" "}
                    <br />
                    Heed will analyze the conversation to produce:
                    <ul>
                      <li>a readable and searchable text file </li>
                      <li>A Sentiment Analysis report</li>
                    </ul>
                  </p>
                </div>
                <div>
                  <img
                    src={uploadScreen}
                    alt="How it works icon"
                    className={styles.upload__icon}
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    src={transScreen}
                    alt="what we do icon"
                    className={styles.trans__screen}
                  />
                </div>
                <div>
                  <p>
                    Heed automatically transcribes and analyzes your file within
                    minutes. We will also notify you via mail when your report
                    is ready.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>
                    Analyze the insights and take action.
                    <ul>
                      <li>Get an overview of your agents' performance</li>
                      <li>
                        Measure the quality of their interactions and see which
                        agents consistently get positive sentiment results and
                        those which need improvement.
                      </li>
                    </ul>
                  </p>
                </div>
                <div>
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
          <div>
            <h3>Here's what our clients are saying!</h3>
          </div>
          <div>
            <div>
              <div>
                <img
                  src={clientOne}
                  alt="Client testimonial profile"
                  className={styles.client__one}
                />
              </div>
              <div>
                <h5>Mark Essien, CEO Hotels.ng</h5>
              </div>
              <div>
                <p>
                  Heed is half the price and twice the speed, We looked for a
                  more reliable and flexible platform for our call analysis.
                  Then we found Heed. ever since then, its been a wonderful
                  experience being their client.
                </p>
              </div>
            </div>
            <div>
              <div>
                <img
                  src={clientTwo}
                  alt="Client testimonial profile"
                  className={styles.client__two}
                />
              </div>
              <div>
                <h5>Chukwuebuka pad, Product manager, Carrot.</h5>
              </div>
              <div>
                <p>
                  We are so happy to have discovered Heed. It is a good way to
                  get feedback from clients about their experience with my
                  company. It's even better for making sure our audio
                  transcription service is on the right track
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3>Drive Sales And Support Team Efficiency</h3>
            <div>
              <p>
                We help businesses unlock insights and extract meaningful data
                from your customer support conversations
              </p>
            </div>
          </div>
          <div>
            <button>Get Started</button>
          </div>
        </div>
      </section>
      {/* <div className={styles.footer__container}></div> */}
    </div>
  );
};

export default index;
