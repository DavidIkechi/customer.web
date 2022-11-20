/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React from "react";
import "./faqStyles.scss";

function FaqComponent({ faq, index, toggleFAQ }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`faq ${faq.open ? "open" : ""}`}
      key={index}
      onClick={() => toggleFAQ(index)}
      tabIndex="0"
    >
      <div className="faq-question">{faq.question}</div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
}

export default FaqComponent;
