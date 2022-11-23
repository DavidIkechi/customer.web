/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./index.scss";

function Card({ title, date, imageUrl, body }) {
  return (
    <div className="card__container">
      <div className="card__image">
        <img src={imageUrl} alt="" />
      </div>
      <div id="content">
        <div className="card__title">
          <p>
            {title}
            <span> {date}</span>
          </p>
        </div>
        <div className="card__body">
          <h3>{body}</h3>
        </div>
        <div className="card__btn">
          <button type="button">
            Read More <span> &gt; </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
