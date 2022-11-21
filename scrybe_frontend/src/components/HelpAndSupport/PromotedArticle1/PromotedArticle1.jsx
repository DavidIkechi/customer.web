/* eslint-disable react/react-in-jsx-scope */
import styles from "./PromotedArticle1.module.scss";
import illustration from "../assets/illustration2.png";
import Articles from "../articles/Articles";

function PromotedArticle1() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.guide}>
          <h4> Article: Manual Transcription v Automated Transcription</h4>
          <div className={styles.image_container}>
            <img src={illustration} alt="dashboard illustration" />
          </div>
          <div className={styles.question}>
            <h5>
              Is automated transcription better than human transcription?{" "}
            </h5>
            <p>
              It is important to know what type of transcription you need before
              choosing an automated system. Due to the high cost of human
              transcription, computerized systems are the norm. They are much
              more efficient than human transcription because they can handle
              massive amounts of data very quickly and dont require any extra
              employees training. However, automated systems arent perfect;
              sometimes they they make mistakes which can lead to poor-quality
              documents.
            </p>
          </div>

          <div className={styles.question}>
            <h5>How much more quickly can machines transcribe than people?</h5>
            <p>
              Compared to human transcription, automated transcription is
              substantially faster. The turnaround time for automated
              transcription services is minutes, not days. For automatic
              transcription services, a 30 minute audio or video file typically
              takes 5 minutes to complete. That identical file might take a
              human transcriptionist two or three days.
            </p>
          </div>

          <div className={styles.question}>
            <h5>
              What might a top-rated automatic transcribing service look like?
            </h5>
            <p>
              In this modern day there are lots of audio transcribing tools for
              businesses out there but if you are looking for an all in one tool
              that does sentimental analysis to give you a positive or negative
              rating on how customer support performed on calls with customers
              then Scrybe is the all in one package for you.
            </p>
          </div>
        </div>
        <Articles />
      </div>
    </div>
  );
}

export default PromotedArticle1;
