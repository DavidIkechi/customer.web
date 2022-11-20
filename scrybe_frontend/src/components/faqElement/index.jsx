/* eslint-disable */
import React from "react";
import styles from "./faq.module.scss";

function FaqElement({ question, ans }) {
  return (
    <details className={styles.faq}>
      <summary className={styles.faq__question}>{question}</summary>
      <p className={styles.faq__ans}>{ans}</p>
    </details>
  );
}

FaqElement.defaultProps = {
  question: "What are you looking for?",
  ans: " Hoped you found what you are looking for",
};


export default FaqElement;
