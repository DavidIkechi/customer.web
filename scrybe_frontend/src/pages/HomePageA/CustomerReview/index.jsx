/* eslint-disable */
import { useState } from "react";
import Dot from "./Dots";
import { feedback } from "./Review/assets/data";
import ReviewList from "./ReviewList";
import styles from "./slide.module.scss";



function CustomerReview() {
  const [counter, setCounter] = useState(0)
  function pre(){
    const index = counter > 0 ? counter - 1 : feedback.length - 1;
    setCounter(index)
  }
  function next(){
    const index = counter < feedback.length - 1 ? counter + 1 : 0;
    setCounter(index)
  }

  

  return (
    <div className={styles.customerFeed}>
      <svg
        className={styles.customerFeed__left}
        width="3.8rem"
        height="3.7rem"
        viewBox="0 0 61 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={pre}
      >
        <rect x="0.5" width="60" height="60" rx="30" fill="#0077FF" />
        <path
          d="M34.25 37.5L26.75 30L34.25 22.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <ReviewList counter={counter} setCounter={setCounter} />
      <svg
        className={styles.customerFeed__right}
        width="3.8rem"
        height="3.7rem"
        viewBox="0 0 61 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={next}
      >
        <rect x="0.5" width="60" height="60" rx="30" fill="#0077FF" />
        <path
          d="M34.25 37.5L26.75 30L34.25 22.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default CustomerReview;
