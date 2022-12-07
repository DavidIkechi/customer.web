import styles from "./Leaderboard.module.scss";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "./images/search-icon.png";
import ProfileName from "./images/profile-circle.png";
import CallIcon from "./images/Call-icon.png";
import LeaderBoardIcon from "./images/leaderboard-icon.png";

const bgMap = {
  0: "#E6F0FF",
  1: "#EDF9F0",
  2: "#FFFDEB",
};

function Leaderboard() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  const [leaderboard, setLeaderboard] = useState([]);
  const [otherAgent, setOtherAgent] = useState([]);

  async function accessData() {
    const token = localStorage.getItem("heedAccessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "Application/json",
      },
    };
    const response = await axios
      .get("https://api.heed.hng.tech/leaderboard", config)
      .catch((error) => {
        console.error(error);
      });
    const arr = response.data["Top3_Agents"];
    setLeaderboard(arr);
    const otherAgents = response.data["Other_Agents"];
    setOtherAgent(otherAgents);
  }

  useEffect(() => {
    accessData();
  }, []);

  return (
    <NewDesignSideBar
      toggleSidebar={toggleSidebar}
      needSearchMobile="needSearchMobile"
      closeSidebar={() => setToggleSidebar(!toggleSidebar)}
    >
      <div className={styles.content_container}>
        <section>
          <div className={styles.right_section_top}>
            <TopNav
              openSidebar={() => {
                setToggleSidebar(!toggleSidebar);
              }}
            />
          </div>

          <div className={styles.right_section}>
            <h2>Leaderboard</h2>
            <p>
              This is a list showing the performance your mounted agents on Heed
              via the number of customer calls they’ve received.
            </p>
            <p className={styles.long_paragraph}>
              Please note that each agent’s performance was rated using the
              amount of calls they were able to receive per week, divided by the
              number of days in a week.
            </p>
            <h6>To view agent report, please click on any on the agent IDs </h6>

            <div className={styles.right_content2_container}>
              <div className={styles.InputWithIcon}>
                <img src={SearchIcon} className="" alt="hero img" />
                <input
                  type="text"
                  name=""
                  id="search-bar"
                  placeholder="  &nbsp; &nbsp; &nbsp; Input Agent ID"
                  required
                />
              </div>

              <div className={styles.calender_content}>
                <div>
                  <p id={styles.sort_by}>Sort by </p>
                </div>
                <select id="calender-value" name="calender">
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                </select>
              </div>
            </div>

            <div className={styles.Profile_container}>
              {leaderboard.map((profile, index) => (
                <LeaderBoardDisplay
                  key={profile.agent_id}
                  person={profile}
                  index={index}
                />
              ))}

              {/* <div className={styles.Profile1}>
                <div className={styles.Profile_content}>
                  <div className={styles.Profile_img}>
                    <img src={ProfileName} className="" alt="profile1" />
                  </div>
                  <h2>ID: AG685500DE</h2>
                  <p>No. of calls taken this week: 152</p>
                  <h1>
                    10 <span className={styles.small_text}>/10</span>
                  </h1>
                  <p className={styles.Agent_position}> 1st</p>
                </div>
              </div>

              <div className={styles.Profile2}>
                <div className={styles.Profile_content}>
                  <div className={styles.Profile_img}>
                    <img src={ProfileName} className="" alt="profile1" />
                  </div>
                  <h2>ID: AG685500DE</h2>
                  <p>No. of calls taken this week: 152</p>
                  <h1>
                    7.5 <span className={styles.small_text}>/10</span>
                  </h1>
                  <p className={styles.Agent_position}> 2nd</p>
                </div>
              </div>

              <div className={styles.Profile3}>
                <div className={styles.Profile_content}>
                  <div className={styles.Profile_img}>
                    <img src={ProfileName} className="" alt="profile1" />
                  </div>
                  <h2>ID: AG685500DE</h2>
                  <p>No. of calls taken this week: 152</p>
                  <h1>
                    5 <span className={styles.small_text}>/10</span>
                  </h1>
                  <p className={styles.Agent_position}> 3rd</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className={styles.Tabular_Container}>
          <div className={styles.Tabular_Content_Container}>
            <div className={styles.Header_title}>
              <p className={styles.Hide_for_mobile}>ID NUMBER</p>
              <span className={styles.Hide_for_desktop}>ID</span>
              <p className={styles.Hide_for_mobile}>No. of calls/week</p>
              <span className={styles.Hide_for_desktop}>
                <img src={CallIcon} className="" alt="profile1" />
              </span>

              <p className={styles.Hide_for_mobile}>Total score </p>
              <span className={styles.Hide_for_desktop}>Score/10</span>

              <p className={styles.Hide_for_mobile}>Rank </p>
              <span className={styles.Hide_for_desktop}>
                <img src={LeaderBoardIcon} className="" alt="profile1" />
              </span>
            </div>
            <hr></hr>
            {otherAgent.map((profile) => (
              <OtherAgentDisplay key={profile.agent_id} person={profile} />
            ))}
            {/* <div className={styles.Header_content}>
              <div className={styles.Header_profile_container}>
                <img src={ProfileName} className="" alt="profile1" />
                <p>AG685500DE</p>
              </div>
              <p>24</p>
              <p>5/10</p>
              <p>5th</p>
            </div>
            <div className={styles.Header_content}>
              <div className={styles.Header_profile_container}>
                <img src={ProfileName} className="" alt="profile1" />
                <p>AG685500DE</p>
              </div>
              <p>24</p>
              <p>5/10</p>
              <p>5th</p>
            </div>
            <div className={styles.Header_content}>
              <div className={styles.Header_profile_container}>
                <img src={ProfileName} className="" alt="profile1" />
                <p>AG685500DE</p>
              </div>
              <p>24</p>
              <p>5/10</p>
              <p>5th</p>
            </div>
            <div className={styles.Header_content}>
              <div className={styles.Header_profile_container}>
                <img src={ProfileName} className="" alt="profile1" />
                <p>AG685500DE</p>
              </div>
              <p>24</p>
              <p>5/10</p>
              <p>5th</p>
            </div> */}
          </div>
        </section>
      </div>
    </NewDesignSideBar>
  );
}

function LeaderBoardDisplay({ person, index }) {
  return (
    <div
      className={styles.Profile1}
      id={styles.border}
      style={{ background: bgMap[index] }}
    >
      <div className={styles.Profile_content}>
        <div className={styles.Profile_img}>
          <img src={ProfileName} className="" alt="profile1" />
        </div>
        <h2>{person.str_agent_id}</h2>
        <p>No. of calls taken this week: {person.total_calls}</p>
        <h1>
          {person.average_score} <span className={styles.small_text}>/10</span>
        </h1>
        <p className={styles.Agent_position}> {person.rank}th</p>
      </div>
    </div>
  );
}

function OtherAgentDisplay({ person }) {
  return (
    <div className={styles.Header_content}>
      <div className={styles.Header_profile_container}>
        <img src={ProfileName} className="" alt="profile1" />
        <p>{person.str_agent_id}</p>
      </div>
      <p>{person.total_calls}</p>
      <p>{person.average_score}/10</p>
      <p>{person.rank}th</p>
    </div>
  );
}

export default Leaderboard;
