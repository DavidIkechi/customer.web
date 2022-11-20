import React from "react";
import styles from "./Reviews.module.scss";
// Import Images
import headerImg from "./assets/reviews-head-img.svg";
import company1 from "./assets/companies-1.svg";
import company2 from "./assets/companies-2.svg";
import company3 from "./assets/companies-3.svg";
import company4 from "./assets/companies-4.svg";
import company5 from "./assets/companies-5.svg";
import company6 from "./assets/companies-6.svg";
import avi1 from "./assets/avi-1.svg";
import avi2 from "./assets/avi-2.svg";
import avi3 from "./assets/avi-3.svg";
import avi4 from "./assets/avi-4.svg";
import avi5 from "./assets/avi-5.svg";
import avi6 from "./assets/avi-6.svg";
import footerImg from "./assets/reviews-bottom-img.png";

function Reviews() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className={styles.text}>
          <h1>Community Love</h1>
          <p>
            Scrybe provides guaranteed 99% accurate transcripts and sentimental
            analysis with quick turnaround for customers large and small. That’s
            why we have the highest number of positie reviews than any other
            transcription service around .
          </p>
        </div>
        <div className={styles.image}>
          <img src={headerImg} alt="" />
        </div>
      </header>

      <section className={styles.first_title}>
        <h2>We are loved by Companies of all sizes</h2>
        <h3>
          Companies of all sizes from Startup and Fortune 500 companies use
          Scribe{" "}
        </h3>
      </section>

      <section className={styles.companies}>
        <div>
          <img src={company1} alt="" />
        </div>
        <div>
          <img src={company2} alt="" />
        </div>
        <div>
          <img src={company3} alt="" />
        </div>
        <div>
          <img src={company4} alt="" />
        </div>
        <div>
          <img src={company5} alt="" />
        </div>
        <div>
          <img src={company6} alt="" />
        </div>
      </section>

      <section className={styles.testimonial}>
        <div>
          <div>
            <img src={avi1} alt="" />
          </div>
          <h3>Alex Aloxie, CEO United Bank of Africa.</h3>
          <p>
            Scrybe has helped our business grow and expand as we have great
            insight into our customer preferences
          </p>
        </div>

        <div>
          <div>
            <img src={avi2} alt="" />
          </div>
          <h3>Richard,Customer experience manager, Bua foods.</h3>
          <p>
            Scrybe has reduced the after call admin work and this saves a whole
            lot of time
          </p>
        </div>

        <div>
          <div>
            <img src={avi3} alt="" />
          </div>
          <h3>Alice Ndukwe, Content Creator.</h3>
          <p>
            Captioning has been made a nightmare for me !!, and it took only few
            minutes to be delivered by scrybe that’s incredible!!
          </p>
        </div>

        <div>
          <div>
            <img src={avi4} alt="" />
          </div>
          <h3>Babatunde Ajayi, HR Manager, Chevron.</h3>
          <p>Fast and accurate ,As always, Great turn around time</p>
        </div>

        <div>
          <div>
            <img src={avi5} alt="" />
          </div>
          <h3>Anna Hartley, HR Manager, Otter AI.</h3>
          <p>Scrybe has been a game changer In the way my business operates-</p>
        </div>

        <div>
          <div>
            <img src={avi6} alt="" />
          </div>
          <h3>John ohio, HR Manager, Google.</h3>
          <p>
            With the audio transcription and sentiment analysis,we are able to
            get feedback from our clients and make necessary changes in a timely
            manner
          </p>
        </div>
      </section>

      <section className={styles.join}>
        <h3>Join 100+ companies to use Scrybe</h3>
        <p>
          Companies of all sizes from Startup and Fortune 500 companies use
          Scribe{" "}
        </p>
        <div className={styles.join_flex}>
          <div>
            <img src={footerImg} alt="" />
          </div>
          <div>
            <h2>Start using Scrybe today</h2>
            <div className={styles.btns_btm}>
              <button type="button" className={styles.left_btn}>
                Try for free
              </button>
              <button type="button" className={styles.right_btn}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Reviews;
