import PropTypes from "prop-types";
import React from "react";
import utils from "../assets/utils.module.scss";
import slideLeft from "../assets/slide_left.svg";
import slideRight from "../assets/slide_right.svg";
import sliderImage from "../assets/slider.png";
import styles from "./styles.module.scss";

function DefaultLayout(props) {
  const { children } = props;

  return (
    <div className={styles.default_layout}>
      <div>{children}</div>

      <div className={styles.default_layout__instagram}>
        <div className={utils.d_grid} style={{ "--gap": "32px" }}>
          <div className={utils.container}>
            <h3 className={styles.default_layout__section_title}>
              Instagram Posts
            </h3>
          </div>

          {/* slider */}
          <div className={utils.d_grid} style={{ "--gap": "32px" }}>
            {/* images */}
            <div className={styles.slider__images}>
              <img src={sliderImage} alt="slider illustration" />
              <img src={sliderImage} alt="slider illustration" />
              <img src={sliderImage} alt="slider illustration" />
            </div>

            {/* content */}
            <div className={styles.slider__content}>
              <div>
                <button
                  className={`${styles.slider__button} ${utils.d_none} ${utils.md_d_block}`}
                  type="button"
                >
                  <img src={slideLeft} alt="slide left icon" />
                </button>
              </div>
              <div>
                <button
                  className={`${styles.slider__button} ${utils.d_none} ${utils.md_d_block}`}
                  type="button"
                >
                  <img src={slideRight} alt="slide right icon" />
                </button>
              </div>
            </div>

            <div
              className={`${utils.d_flex} ${utils.justify_content_center}`}
              style={{ "--gap": "8px" }}
            >
              <span className={styles.slider__indicator} />
              <span
                className={`${styles.slider__indicator} ${styles["slider__indicator--current"]}`}
              />
              <span className={styles.slider__indicator} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DefaultLayout.defaultProps = {
  children: null,
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default DefaultLayout;
