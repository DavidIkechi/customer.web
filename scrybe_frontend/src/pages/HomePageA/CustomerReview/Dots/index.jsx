import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";

export default function Dot({ activeIndex, onClick, slider }) {
  return (
    <div className="dots__bazz">
      {slider.map((_, index) => (
        <span
          key={index}
          className={` dot-zz ${activeIndex === index ? "active-dot-zz " : ""}`}
          onClick={() => onClick(index)}
        ></span>
      ))}
    </div>
  );
}

Dot.prototype = {
  activeIndex: PropTypes.number,
  onClick: PropTypes.func,
  slider: PropTypes.array,
};
