import React from "react";
import styles from "./About.module.scss";
import Footer from "../../components/footer";
import NavBar from "../../components/navBar";
import image1 from "./assets/image1.svg";
import icon1 from "./assets/icon1.svg";
import icon2 from "./assets/icon2.svg";
import icon3 from "./assets/icon3.svg";
import icon4 from "./assets/icon4.svg";
import partner1 from "./assets/partner1.svg";
import partner2 from "./assets/partner2.svg";
import partner3 from "./assets/partner3.svg";
import partner4 from "./assets/partner4.svg";
import team1 from "./assets/team1.png";
import team2 from "./assets/team2.png";
import team3 from "./assets/team3.png";
import team4 from "./assets/team4.png";
import team5 from "./assets/team5.png";
import team6 from "./assets/team6.png";
import team7 from "./assets/team7.png";
import team8 from "./assets/team8.png";

function About() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div className="App" data-testid="app-container">
      <NavBar />
      <div className={`${styles.container} ${styles.hero}`}>
        <div className={styles.row}>
          <div className={styles.contain}>
            <h1 className={styles.heading}>
              Heed helps businesses to make informed decisions{" "}
              <span>faster </span>
            </h1>
          </div>
        </div>
        <h1 className={styles.heading}>Who we are</h1>
        <div className={`${styles.row} ${styles.row1}`}>
          <div className={`${styles.column__left} ${styles.column}`}>
            <p>
              At Heed, we transcribe call recordings between customer support
              agents and customers to give sentimental analysis as we analyze
              transcriptions to give sentiment score of the conversation
              (Positive, Neutral or Negative)
            </p>
            <p>
              At Heed, our mission is to provide businesses with intelligent,
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
            <img src={image1} alt="hero figure" />
          </div>
        </div>
      </div>

      <div className={styles.overall__value}>
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
                    business. We will go above and beyond to assist businesses
                    to ensure they are getting the best service from us.
                  </p>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.heading__icon}>
                    <h4>Teamwork</h4>
                    {/* <img src={icon1} alt="" /> */}
                    <img src={icon1} alt="" />
                  </div>
                  <p>
                    The foundation of Heed is Teamwork. Every person in every
                    position allows us to be as great as we are. No one position
                    is greater than the other as we are all needed to achieve
                    our mission.
                  </p>
                </div>
              </div>

              <div className={`${styles.column__right} ${styles.column}`}>
                <div className={styles.wrap}>
                  <div className={styles.heading__icon}>
                    <h4>Creativity</h4>
                    {/* <img src={icon2} alt="" /> */}
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
                    {/* <img src={icon4} alt="" /> */}
                    <img src={icon4} alt="" />
                  </div>
                  <p>
                    We are more than employees at Heed. Every person that is a
                    part of team Scrybe owns the role. We only want team members
                    who fully believe in our vision and are committed to make it
                    a reality.
                  </p>
                </div>
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
              true for us at Heed. In order to achieve our goals and to offer a
              better service all customers, we have partnered with a number of
              brands to achieve these goals.{" "}
            </p>
          </div>
          <div className={styles.row}>
            <div className={styles.companies}>
              <img src={partner1} alt="companies icon" />
              <h4>HotelsNg</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner2} alt="companies icon" />
              <h4>HNG i9</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner3} alt="companies icon" />
              <h4>BrainBox inc.</h4>
            </div>
            <div className={styles.companies}>
              <img src={partner4} alt="companies icon" />
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
              the team behind Heed.
            </p>
          </div>
          <div className={styles.row}>
            <div className={styles.wrap2}>
              <div className={styles.col}>
                <img src={team1} alt="team members" />
                <h5>Mark Essien</h5>
                <p>Advisor</p>
              </div>
              <div className={styles.col}>
                <img src={team2} alt="team members" />
                <h5>Aigbe Marvelous</h5>
                <p>Advisor</p>
              </div>
              <div className={styles.col}>
                <img src={team3} alt="team members" />
                <h5>Collins Akpaka</h5>
                <p>CEO</p>
              </div>
              <div className={styles.col}>
                <img src={team4} alt="team members" />
                <h5>Delphine Ogbonna</h5>
                <p>Lead designer</p>
              </div>

              <div className={styles.col}>
                <img src={team5} alt="team members" />
                <h5>Ugochukwu Odumegwu</h5>
                <p>Back-End Lead</p>
              </div>
              <div className={styles.col}>
                <img src={team6} alt="team members" />
                <h5>Tochukwu Bedford</h5>
                <p>Front-End Lead</p>
              </div>
              <div className={styles.col}>
                <img src={team7} alt="team members" />
                <h5>Alice Awobite</h5>
                <p>Product Designer</p>
              </div>
              <div className={styles.col}>
                <img src={team8} alt="team members" />
                <h5>Favour Mustapha</h5>
                <p>Product Designer</p>
              </div>
              <div className={styles.col}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
