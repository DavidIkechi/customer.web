/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./General1.module.scss";
import Articles from "../articles/Articles";

function General1() {
  return (
    <div>
      <div className={styles.info_intro}>
        <p>General Info On Scrybe</p>
      </div>

      <div className={styles.articles_cont}>
        <div className={styles.articles_wrapper}>
          <Link className={styles.link} to="articles">
            Guide: How to log in and sign up
          </Link>
          <h3>Guide: Who can use scrybe?</h3>
          <h3>Guide: How Accurate is the Transcriptor? </h3>
          <h3>Guide: Monitoring your employees data </h3>
          <h3>Article: How to get your downloads in real time</h3>
        </div>
      </div>

      <Articles />
    </div>
  );
}

export default General1;
