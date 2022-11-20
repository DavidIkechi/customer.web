/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import Card from "../card/Card";
import styles from "./Cards.module.scss";
import general from "../assets/general.svg";
import account from "../assets/account.svg";
import started from "../assets/getting_started.svg";
import transcription from "../assets/transcription.svg";
import billing from "../assets/billing.svg";
import privacy from "../assets/privacy.svg";
import info from "../assets/info-circle.svg";

function Cards() {
  return (
    <div className={styles.cards_style}>
      <div className={styles.info_intro}>
        <img src={info} alt="info circle" />
        <p>Help topics</p>
      </div>

      <div className={styles.cards_holder}>
        <Link to="/help-support-general">
          <Card
            src={general}
            header="General"
            paragrapgh="Basic Articles that will help you get the most out of scrybe"
          />
        </Link>
        <Card
          src={account}
          header="Account Management"
          paragrapgh="Learn how to manage your account and navigate through"
        />
        <Card
          src={started}
          header="Getting Started"
          paragrapgh="Get information on how to upload your files"
        />
      </div>

      <div className={styles.cards_holder}>
        <Card
          src={transcription}
          header="Transcription"
          paragrapgh="Documentation about files supported
                        how long it takes to transcribe and more."
        />

        <Card
          src={billing}
          header="Billing"
          paragrapgh="How to create a paid subscription to offer
                        startup, growing and enterprise"
        />

        <Card
          src={privacy}
          header="Privacy"
          paragrapgh="Information regarding account information
                        and how we handle your data."
        />
      </div>

      <div className={styles.btn_container}>
        <button className={styles.transcribe_btn}>
          Start Transcribing Now
        </button>
      </div>
    </div>
  );
}

export default Cards;
