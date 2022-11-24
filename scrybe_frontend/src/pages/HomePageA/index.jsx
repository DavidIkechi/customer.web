import React from "react";
import styles from "./landingpage.module.scss";
import aboutUsimage from "./assets/Group 1000000931.webp";
import Footer from "../../components/footer";
import NavBarFree from "../../components/navBar_free";
import Hero from "./HeroSection";
import CustomerReview from "./CustomerReview";
import BrandsLogo from "./BrandLogos";
import FaqElement from "./FaqElement";
import upLoadAudio from "./assets/upload-photo.svg";
import sentiment from "./assets/rafiki.svg";
import transcribe from "./assets/transcrib-text.svg";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <NavBarFree />
      <Hero />
      <section aria-label="Our Clients">
        <BrandsLogo />
      </section>

      <section aria-label="About Us">
        <div className={` ${styles.aboutUs}`}>
          <div className={styles.aboutUs__img}>
            <img src={aboutUsimage} alt="" srcSet="" />
          </div>
          <div className={styles.aboutUs__content}>
            <h2 className={styles.aboutUs__title}>About Us</h2>
            <div className={styles.aboutUs__i2}>
              <img src={aboutUsimage} alt="" srcSet="" />
            </div>
            <p className={styles.aboutUs__details}>
              Scrybe is a conversation intelligence tool that automatically
              transcribes and analyzes recorded customer support conversations
              to extract sentimental analysis data. We help you determinethe
              efficiency of your customer support agents with the aim of
              improving overall customer satisfaction
            </p>
            <a
              href="https://www.w3schools.com/react/react_css.asp"
              className={styles.aboutUs__cta}
            >
              Read more
            </a>
          </div>
        </div>
      </section>
      <section className={styles.gettingStarted}>
        <div>
          <h2 className={styles.gettingStarted__title}>Getting Started</h2>
          <div className={styles.gettingStarted__cards}>
            <div className={styles.gettingStarted__card}>
              <div className={styles.gettingStarted__card_image}>
                <img src={upLoadAudio} alt="upload" srcset="" />
              </div>
              <h3 className={styles.gettingStarted__card_title}>
                Upload Audio
              </h3>
              <p className={styles.gettingStarted__card_detail}>
                Upload Audio between customers and staff on our database
              </p>
              <a
                href="/transcriptions"
                className={styles.gettingStarted__card_cta}
              >
                Get Started
              </a>
            </div>

            <div className={styles.gettingStarted__card}>
              <div className={styles.gettingStarted__card_image}>
                <img src={transcribe} alt="transcibe" srcset="" />
              </div>
              <h3 className={styles.gettingStarted__card_title}>
                Transcribe Text
              </h3>
              <p className={styles.gettingStarted__card_detail}>
                Our system transcribes these audio into readable texts
              </p>
            </div>

            <div className={styles.gettingStarted__card}>
              <div className={styles.gettingStarted__card_image}>
                <img src={sentiment} alt="sentiment analysis" srcset="" />
              </div>
              <h3 className={styles.gettingStarted__card_title}>
                Sentimental Analysis
              </h3>
              <p className={styles.gettingStarted__card_detail}>
                The text is analyzed using open Ai for for sentiments
              </p>
              <a
                href="transcriptions"
                className={styles.gettingStarted__card_cta}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.customer}>
        <h2 className={styles.customer__h2}>
          See what our clients are<span> saying</span>{" "}
        </h2>
        <CustomerReview />
      </section>
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2 className={styles.faq__h2}>
            FREQUENTLY ASKED <span>QUESTIONS</span>{" "}
          </h2>
          <div className={styles.faq_faqs}>
            <FaqElement question="How do I register on Scrybe?" />
            <FaqElement question="What are the limitations of free package?" />
            <FaqElement question="What format can i use for uploads?" />
            <FaqElement question="Who has access to my data?" />
            <FaqElement question="How can i have best quality of transcript and analysis?" />
          </div>
          <NavLink to="/faq" className={styles.faq__load}>
            See more questions
          </NavLink>
        </div>
      </section>

      <section className={styles.subscribe}>
        <div className={styles.container}>
          <h1 className={styles.subscribe__title}>
            Subscribe To Our Newsletter And Get Newest industry Updates
          </h1>
          <form className={styles.subscribe__form}>
            <input type="text" />
            <button
              type="submit"
              href="https://www.w3schools.com/react/react_css.asp"
              className={styles.subscribe__cta}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
