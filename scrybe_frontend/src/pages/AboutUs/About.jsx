import React from "react";
import styles from "./About.module.scss";

import image1 from "../../images/image1.svg";
import icon1 from "../../images/icon1.svg";
import icon2 from "../../images/icon2.svg";
import icon3 from "../../images/icon3.svg";
import icon4 from "../../images/icon4.svg";
import partner1 from "../../images/partner1.svg";
import partner2 from "../../images/partner2.svg";
import partner3 from "../../images/partner3.svg";
import partner4 from "../../images/partner4.svg";
import team1 from "../../images/team1.png";
import team2 from "../../images/team2.png";
import team3 from "../../images/team3.png";
import team4 from "../../images/team4.png";
import team5 from "../../images/team5.png";
import team6 from "../../images/team6.png";
import team7 from "../../images/team7.png";
import team8 from "../../images/team8.png";

function About() {
  return (
    <div className="App" data-testid="app-container">
      <div className={`${styles.container} ${styles.hero}`}>
        <div className={styles.row}>
          <div className={styles.contain}>
            <h1 className={styles.heading}>
              Scrybe helps businesses to make informed decisions{" "}
              <span>faster </span>
              <div className={styles.line}></div>
            </h1>
          </div>
        </div>
        <h1 className={styles.heading}>Who we are</h1>
        <div className={`${styles.row} ${styles.row1}`}>
          <div className={`${styles.column__left} ${styles.column}`}>
            <p>
              At Scrybe, we transcribe call recordings between customer support
              agents and customers to give sentimental analysis as we analyze
              transcriptions to give sentiment score of the conversation
              (Positive, Neutral or Negative)
            </p>
            <p>
              At Scrybe, our mission is to provide businesses with intelligent,
              accurate, and precise intent analysis to improve customer
              experience. We believe that through the power of artificial
              intelligence, we can make a real difference in the way businesses
              interact with their customers.
            </p>
            <p>
              We believe that we can come together, to make the business world
              better for all and this is what we are forever committed to. Our
              slogan is <span>Speak, we listen</span>
            </p>
          </div>
          <div className={`${styles.column__right} ${styles.column}`}>
            <img src={image1} alt="" />
          </div>
        </div>
      </div>

      <div className={`${styles.container} ${styles.container__values} `}>
        <div className={styles.row__col}>
          <h1 className={styles.heading}>Our core values</h1>
          <div className={styles.row}>
            <div className={`${styles.column__left} ${styles.column}`}>
              <div className={styles.wrap}>
                <div className={styles.heading__icon}>
                  <h4>Customer Success</h4>
                  <img src={icon3} alt="" />
                </div>
                <p>
                  Our number one goal is to see our customers suceed at
                  business. We will go above and beyond to assist businesses to
                  ensure they are getting the best service from us.
                </p>
              </div>
              <div className={styles.wrap}>
                <div className={styles.heading__icon}>
                  <h4>Teamwork</h4>
                  <img src={icon1} alt="" />
                </div>
                <p>
                  The foundation of Scrybe is Teamwork. Every person in every
                  position allows us to be as great as we are. No one position
                  is greater than the other as we are all needed to achieve our
                  mission.
                </p>
              </div>
            </div>

            <div className={`${styles.column__right} ${styles.column}`}>
              <div className={styles.wrap}>
                <div className={styles.heading__icon}>
                  <h4>Creativity</h4>
                  <img src={icon2} alt="" />
                </div>
                <p>
                  We are a team of creative and innovative people who think
                  outside of the box and we take unconventional approaches to
                  assist our customers to operate at high levels of efficacy.
                </p>
              </div>
              <div className={styles.wrap}>
                <div className={styles.heading__icon}>
                  <h4>Ownership</h4>
                  <img src={icon4} alt="" />
                </div>
                <p>
                  We are more than employees at Scrybe. Every person that is a
                  part of team Scrybe owns the role. We only want team members
                  who fully believe in our vision and are committed to make it a
                  reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.container__partners} `}>
        <div className={styles.row__col}>
          <div className={styles.partners__text}>
            <h1 className={styles.heading}>Partners</h1>
            <p>
              Great Success, they say, is never achieved alone. This is also
              true for us at Scrybe. In order to achieve our goals and to offer
              a better service all customers, we have partnered with a number of
              brands to achieve these goals.{" "}
            </p>
          </div>
          <div className={styles.row}>
            <div className={styles.companies}>
              <img src={partner1} alt="" />
              <h4>HotelsNg</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner2} alt="" />
              <h4>HNG i9</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner3} alt="" />
              <h4>BrainBox inc.</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner4} alt="" />
              <h4>The HNG Internship</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.container} ${styles.container__team} `}>
        <div className={styles.row__col}>
          <div className={styles.team__text}>
            <h1 className={styles.heading}>Meet Our Team</h1>
            <p>
              We are improving at a breakneck speed and are across all tech
              departments. We research and deploy advanced machine learning and
              deep learning technologies. Here are the key members that make up
              the team behind Scrybe.
            </p>
          </div>
          <div className={styles.row}>
            <div className={styles.wrap2}>
              <div className={styles.col}>
                <img src={team1} alt="" />
                <h5>Mark Essien</h5>
                <p>Advisor</p>
              </div>
              <div className={styles.col}>
                <img src={team2} alt="" />
                <h5>Aigbe Marvelous</h5>
                <p>Advisor</p>
              </div>
              <div className={styles.col}>
                <img src={team3} alt="" />
                <h5>Collins Akpaka</h5>
                <p>CEO</p>
              </div>
              <div className={styles.col}>
                <img src={team4} alt="" />
                <h5>Delphine Ogbonna</h5>
                <p>Lead designer</p>
              </div>

              <div className={styles.col}>
                <img src={team5} alt="" />
                <h5>Ugochukwu Odumegwu</h5>
                <p>Back-End Lead</p>
              </div>
              <div className={styles.col}>
                <img src={team6} alt="" />
                <h5>Tochukwu Bedford</h5>
                <p>Front-End Lead</p>
              </div>
              <div className={styles.col}>
                <img src={team7} alt="" />
                <h5>Alice Awobite</h5>
                <p>Product Designer</p>
              </div>
              <div className={styles.col}>
                <img src={team8} alt="" />
                <h5>Favour Mustapha</h5>
                <p>Product Designer</p>
              </div>
              <div className={styles.col}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
