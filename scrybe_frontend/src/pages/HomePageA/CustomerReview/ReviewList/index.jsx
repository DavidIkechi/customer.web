import React, { useEffect, useRef } from "react";
import { feedback } from "../Review/assets/data";
import Review from "../Review";
import styles from "./reviewList.module.scss";
import Dot from "../Dots";
import PropTypes from "prop-types";

export default function ReviewList({ counter, setCounter }) {
  const slideInterval = useRef();
  function startSlider() {
    stopSlide();
    slideInterval.current = setInterval(() => {
      setCounter((current) =>
        current < feedback.length - 1 ? current + 1 : 0
      );
    }, 4000);
  }

  function stopSlide() {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  }

  useEffect(() => {
    startSlider();
    return () => stopSlide();
  });

  return (
    <div className={styles.slide}>
      <div
        className={styles.inner}
        style={{ transform: `translateX(${-counter * 100}%)` }}
      >
        {feedback.map((data, index) => {
          const { img, author, role, comment } = data;
          return (
            <Review
              key={index}
              img={img}
              author={author}
              role={role}
              comment={comment}
            />
          );
        })}
      </div>
      <Dot slider={feedback} activeIndex={counter} onClick={setCounter} />
    </div>
  );
}
ReviewList.prototype = {
  counter: PropTypes.number.isRequired,
  setCounter: PropTypes.func,
};
