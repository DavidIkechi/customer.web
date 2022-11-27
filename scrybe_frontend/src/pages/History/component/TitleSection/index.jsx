import React from "react";
import { gridIcon } from "../../assets/images";
import "./style.scss";

export default function TitleSection() {
  return (
    <div className="title__Section">
      <div className="title">
        <h2>Analysis History</h2>
      </div>
      <div className="filter__container">
        <div className="filter">
          <img src={gridIcon} alt="" />
          <select name="grid" id="grid">
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>
        <div className="filter__2">
          <div className="filter__2__number">
            <p>
              <b>1-20 </b> of 100
            </p>
          </div>
          <div className="filter">
            <select name="grid" id="grid">
              <option value="records">All records</option>
              <option value="negative">Negative</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          <div className="filter">
            <select name="dates" id="dates">
              <option value="date" disabled={true}>
                Date Added
              </option>
              <option value="List">List</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
