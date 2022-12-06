import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Articles from "../Articles";
import styles from "./General1.module.scss";
function General1({ setDisplay }) {
  return (
    <div className={styles.general1}>
      <div className={styles.info_intro}>
        <p>General Info On Heed</p>
      </div>

      <div className={styles.articles_cont}>
        <div className={styles.articles_wrapper}>
          <Link>
            <h3 onClick={() => setDisplay(false)}>
              Guide: How to log in and sign up
            </h3>
          </Link>
          <Link>
            <h3>Guide: Who can use Heed?</h3>
          </Link>

          <Link>
            {" "}
            <h3>Guide: How Accurate is the Transcriptor? </h3>
          </Link>
          <Link>
            {" "}
            <h3>Guide: Monitoring your employees data </h3>
          </Link>
          <Link>
            {" "}
            <h3>Article: How to get your downloads in real time</h3>
          </Link>
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
