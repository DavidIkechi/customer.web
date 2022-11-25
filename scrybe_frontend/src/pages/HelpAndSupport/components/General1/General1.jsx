import styles from "./General1.module.scss";
import Articles from "../articles/Articles";
import PropTypes from "prop-types";
function General1({ setDisplay }) {
  return (
    <div>
      <div className={styles.info_intro}>
        <p>General Info On Scrybe</p>
      </div>

      <div className={styles.articles_cont}>
        <div className={styles.articles_wrapper}>
          <h3 onClick={() => setDisplay(false)}>
            Guide: How to log in and sign up
          </h3>
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

General1.propTypes = {
  setDisplay: PropTypes.func,
};

export default General1;
