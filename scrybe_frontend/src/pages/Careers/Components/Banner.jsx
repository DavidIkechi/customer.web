import React from "react";
import bannerImage from "../Assets/image-1.jpg";
import { BsSearch } from "react-icons/bs";
import "../Style/banner.scss";

function Banner() {
  return (
    <div className="problem-solvers">
      <img src={bannerImage} alt="" />
      <div className="problem-solvers-container">
        <h1>We are looking for briliant problem solvers</h1>
        <div className="input-containers">
          <div className="input">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search by Team" />
          </div>
          <div className="input">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search by Location" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
