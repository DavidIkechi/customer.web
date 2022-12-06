import styles from "./Leaderboardd.module.scss";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from "./images/search-icon.svg";
import ProfileName from "./images/profile-circle.png";
import CallIcon from "./images/Call-icon.png";
import LeaderBoardIcon from "./images/leaderboard-icon.png";

function Leaderboard() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  const [leaderboard, setLeaderboard] = useState([]);
  const [otherAgent, setOtherAgent] = useState([]);

  // function loadAgentActivity() {
  //   // NOTE: you don't need to loginevery time you are making this call
  //   // const userCredentials = {
  //   //   username: "tekkieware@gmail.com",
  //   //   password: "123456",
  //   // };
  //   // axios
  //   //   .post("https://api.heed.hng.tech/login", userCredentials)
  //   //   .then((response) => {
  //   //     console.log("token response===>", response.data);
  //   //   });
  //   // Before i push, remove line 55 & uncomment line 54, confirm that the token stored in the local storage has a key of token, personally array functions, handle promise, http protocol, axios api  //
  //   // const token = localStorage.getItem("heedAccessToken");
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZWtraWV3YXJlQGdtYWlsLmNvbSIsImV4cCI6MTY3MDE4Nzk5NH0.wQOff8gY8EZhDetiuIY_MevgyaqU0-jUDhtCc6rS9aQ"; //access_token
  //   const headers = { Authorization: `Bearer ${token}` };
  //   axios
  //     .get("https://api.heed.hng.tech/leaderboard", { headers })
  //     .then((response) => {
  //       console.log(response.data["Top3 Agents"]);
  //       const arr = response.data["Top3 Agents"];
  //       console.log(response.data["Other Agents"]);
  //       const otherAgents = response.data["Other Agents"];
  //       setLeaderboard(arr);
  //       setOtherAgent(otherAgents);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  async function accessData() {
    const token = localStorage.getItem("heedAccessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "Application/json",
      },
    };
    const response = await axios.get(
      "https://api.heed.hng.tech/leaderboard",
      config
    );
    // console.log(response);
    const arr = response.data["Top3 Agents"];
    setLeaderboard(arr);
    const otherAgents = response.data["Other Agents"];
    setOtherAgent(otherAgents);
  }

  useEffect(() => {
    accessData();
    // loadAgentActivity();
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
              {/* {leaderboard.map((profile) => (
                <LeaderBoardDisplay key={profile.agent_id} person={profile} />
              ))} */}

              <div className={styles.Profile1}>
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
              </div>
            </div>

            {/* <div className={styles.Profile_Tabular_Container}>
              {/* {otherAgent.map((profile) => (
                <OtherAgentDisplay key={profile.agent_id} person={profile} />
              ))} */}
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
          </div>
        </section>
      </div>
    </NewDesignSideBar>
  );
}

// function LeaderBoardDisplay({ person }) {
//   return (
//     <div className={styles.Profile1}>
//       <div className={styles.Profile_img}>
//         <img src={Profile1} className="" alt="profile1" />
//       </div>
//       <div className={styles.Profile_content}>
//         <h2>
//           {person.first_name} {person.last_name}
//         </h2>
//         <h1>{person.average_score}</h1>
//         <p>Calls Received</p>
//         <div className={styles.Like_container}>
//           <div className={styles.Like_content1}>
//             <div className={styles.Like_icon_content}>
//               <img src={GreenLike} className="" alt="profile1" />
//               <p>{person.positive_score}</p>
//             </div>
//             <p className={styles.Like_text}> POS.CALLS</p>
//           </div>

//           <div className={styles.Like_content1}>
//             <div className={styles.Like_icon_content}>
//               <img src={BlackLike} className="" alt="profile1" />
//               <p>{person.neutral}</p>
//             </div>
//             <p className={styles.Like_text}> NEU.CALLS</p>
//           </div>

//           <div className={styles.Like_content1}>
//             <div className={styles.Like_icon_content}>
//               <img src={GreenLike} className="" alt="profile1" />
//               <p>{person.negative_score}</p>
//             </div>
//             <p className={styles.Like_text}>NEG.CALLS</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function OtherAgentDisplay({ person }) {
//   return (
//     <div className={styles.Profile_Tabular}>
//       <div className={styles.Profile_Tabular_Content}>
//         <div className={styles.Profile_Tabular_Content1}>
//           <img src={ProfileName} className="" alt="profile1" />
//           <p>
//             {person.first_name} {person.last_name}
//           </p>
//         </div>

//         <div className={styles.Profile_Tabular_Content2}>
//           <p className={styles.Profile_tabular_number}>
//             {person.average_score}
//           </p>
//           <p className={styles.Profile_tabular_score}> AVG Score</p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Leaderboard;
