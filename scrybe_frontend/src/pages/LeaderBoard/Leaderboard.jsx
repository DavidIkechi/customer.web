import "./Leaderboard.module.scss";
import React from "react";
import Logo from "./images/Scrybe-logo.svg";
import MyScrybe from "./images/My-scrybe.svg";
import Analysis from "./images/Analysis.svg";
import Insight from "./images/Insight.svg";
import LeaderBoard from "./images/Leader-board.svg";
import MonthlyAnalysis from "./images/Monthly-Analysis.svg";
import Settings from "./images/Settings.svg";
import Agent from "./images/Agent-leaderboard.svg";
import SearchIcon from "./images/search-icon.svg";
import Calender from "./images/Calendar.svg";
import Profile1 from "./images/profile1.svg";
import Profile2 from "./images/profile2.svg";
import Profile3 from "./images/profile3.svg";
import GreenLike from "./images/Like-green.svg";
import BlackLike from "./images/Like-black.svg";
import ProfileName from "./images/Profile-name.svg";
import ProfileName5 from "./images/Profile-name5.svg";
import ProfileName6 from "./images/Profile-name6.svg";
import ProfileName7 from "./images/Profile-name7.svg";
import ProfileName8 from "./images/Profile-name8.svg";
import ProfileName9 from "./images/Profile-name9.svg";
import ProfileName10 from "./images/Profile-name10.svg";
import ProfileName11 from "./images/Profile-name11.svg";
import ProfileName12 from "./images/Profile-name12.svg";
import ProfileName13 from "./images/Profile-name13.svg";
import ProfileName14 from "./images/Profile-name14.svg";
import ProfileName15 from "./images/Profile-name15.svg";
import ProfileName16 from "./images/Profile-name16.svg";
import ProfileUpload from "./images/Profile-upload.svg";
import UploadIcon from "./images/Upload-icon.svg";

function Leaderboard() {
  return (
    <div className="content-container">
      <section class="left_section">
        <nav>
          <img src={Logo} className="Scrybe_logo" alt="hero img" />

          <img src={MyScrybe} className="" alt="hero img" />

          <img src={Analysis} className="" alt="hero img" />

          <img src={Insight} className="" alt="hero img" />

          <div className="Leader-logo">
            <img src={LeaderBoard} className="" alt="hero img" />
          </div>

          <img src={MonthlyAnalysis} className="" alt="hero img" />

          <img src={Settings} className="" alt="hero img" />
        </nav>
      </section>

      <section>
        <div className="right-section-top">
          <div className="InputWithIcon" id="hide-for-mobile">
            <img src={SearchIcon} className="" alt="hero img" />
            <input
              type="text"
              name=""
              id="search-bar"
              placeholder="  &nbsp; &nbsp; &nbsp; search again"
              required
            />
          </div>

          <div className="Upload-profile-container">
            <img src={ProfileUpload} className="" alt="hero img" />
            <button className="Upload-button">
              <img src={UploadIcon} className="" alt="hero img" /> &nbsp; &nbsp;
              upload
            </button>
          </div>
        </div>

        <div className="right-section">
          <img src={Agent} className="Agent-img" alt="hero img" />

          <div className="right-cotent2-container">
            <div className="InputWithIcon">
              <img src={SearchIcon} className="" alt="hero img" />
              <input
                type="text"
                name=""
                id="search-bar"
                placeholder="  &nbsp; &nbsp; &nbsp; search again"
                required
              />
            </div>

            <p id="hide-for-mobile">
              {" "}
              1-20 <span> of 100</span>
            </p>

            <div className="calender-content">
              <img src={Calender} className="" alt="hero img" />
              <select id="calender-value" name="calender">
                <option value="monthly">monthly</option>
              </select>
            </div>
          </div>

          <div className="Profile-container">
            <div className="Profile1">
              <div className="Profile-img">
                <img src={Profile1} className="" alt="profile1" />
              </div>
              <div className="Profile-content">
                <h2>Awesome Lily</h2>
                <h1> 10</h1>
                <p>Calls Received</p>
                <div className="Like-container">
                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> 31.k</p>
                    </div>
                    <p className="Like-text"> POS.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={BlackLike} className="" alt="profile1" />
                      <p> .4k</p>
                    </div>
                    <p className="Like-text"> NEU.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> .7k</p>
                    </div>
                    <p className="Like-text">NEG.CALLS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Profile1">
              <div className="Profile-img">
                <img src={Profile2} className="" alt="profile1" />
              </div>
              <div className="Profile-content">
                <h2>Simidi Ade</h2>
                <h1> 8.9</h1>
                <p>Calls Received</p>
                <div className="Like-container">
                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> 2.1k</p>
                    </div>
                    <p className="Like-text"> POS.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={BlackLike} className="" alt="profile1" />
                      <p> .670k</p>
                    </div>
                    <p className="Like-text"> NEU.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> .9k</p>
                    </div>
                    <p className="Like-text"> NEG.CALLS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Profile1">
              <div className="Profile-img">
                <img src={Profile3} className="" alt="profile1" />
              </div>
              <div className="Profile-content">
                <h2>Delphine Ogbonna</h2>
                <h1> 7.6 </h1>
                <p>Calls Received</p>
                <div className="Like-container">
                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> 1.9k</p>
                    </div>
                    <p className="Like-text"> POS.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={BlackLike} className="" alt="profile1" />
                      <p> .4k</p>
                    </div>
                    <p className="Like-text"> NEU.CALLS</p>
                  </div>

                  <div className="Like-content1">
                    <div className="Like-icon-content">
                      <img src={GreenLike} className="" alt="profile1" />
                      <p> .7k</p>
                    </div>
                    <p className="Like-text"> NEG.CALLS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName} className="" alt="profile1" />
                <p> Ruth Sandra</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 7 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName5} className="" alt="profile1" />
                <p> Kelvin O.</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 6.7 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName6} className="" alt="profile1" />
                <p> T. Black</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 6.3 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName7} className="" alt="profile1" />
                <p> Victor</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 6 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName8} className="" alt="profile1" />
                <p> Mike</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.8 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName9} className="" alt="profile1" />
                <p> Bello. C</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.5 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName10} className="" alt="profile1" />
                <p> Elizabeth</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.4 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName11} className="" alt="profile1" />
                <p> Lucas</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.3 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName12} className="" alt="profile1" />
                <p> Violet. W</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.2 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName13} className="" alt="profile1" />
                <p> Khloe. F</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 5.0 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName14} className="" alt="profile1" />
                <p> Donald E.</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 4.9 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName15} className="" alt="profile1" />
                <p> Gozie</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 4.9 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>

          <div className="Profile-Tabular">
            <div className="Profile-Tabular-Content">
              <div className="Profile-Tabular-Content1">
                <img src={ProfileName16} className="" alt="profile1" />
                <p> Adaobi A.</p>
              </div>

              <div className="Profile-Tabular-Content2">
                <p className="Profile-tabular-number"> 4.6 </p>
                <p className="Profile-tabular-score"> AVG Score</p>
              </div>
            </div>
          </div>
        </div>

        <div class="Page-num-container">
          <p className="page-btn-start-page">Previous</p>
          <p className="page-btn-active">1</p>
          <p className="page-btn">2</p>
          <p className="page-btn">3</p>
          <p className="page-btn">4</p>
          <p className="page-btn">5</p>
          <p className="page-btn-color">Next</p>
        </div>
      </section>
    </div>
  );
}

export default Leaderboard;
