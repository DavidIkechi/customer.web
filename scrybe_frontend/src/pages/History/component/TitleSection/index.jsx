import React, { useEffect, useState } from "react";
import { gridIcon } from "../../assets/images";
import "./style.scss";

export default function TitleSection() {
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
        {width >= 768 ? (
          <>
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
                  <option value="agent">Agent name</option>
                </select>
              </div>
              <div className="filter">
                <select name="dates" id="dates">
                  <option value="date">Date Added</option>
                  <option value="List">List</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="filter__2__md">
              <p>
                <b>1-10 </b> of 100
              </p>
            </div>
            <div className="filter__md">
              <button type="button" onClick={() => setShow((prev) => !prev)}>
                Filter
              </button>

              <div
                className={`filterComponent__md ${show ? "" : "display__none"}`}
              >
                <div className="filter">
                  <select name="grid" id="grid">
                    <option value="records">All records</option>
                    <option value="negative">Negative</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="agent">Agent name</option>
                  </select>
                </div>
                <div className="filter">
                  <select name="dates" id="dates">
                    <option value="date">Date Added</option>
                    <option value="List">List</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
