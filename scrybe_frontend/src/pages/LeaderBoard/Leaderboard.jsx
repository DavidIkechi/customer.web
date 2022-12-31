import styles from "./Leaderboard.module.scss";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import ApiService from "../../helpers/axioshelp/apis/index";
import { useState, useEffect } from "react";
import SearchIcon from "./images/search-icon.png";
import ProfileName from "./images/profile-circle.png";
import notfoundImg from "./images/notfound.svg";
import CallIcon from "./images/Call-icon.png";
import LeaderBoardIcon from "./images/leaderboard-icon.png";
import AgentReport from "../AgentReport";
import { useSelector } from "react-redux";
import { getLeaderboard } from "../../redux/leaderboard/leaderboardSlice";

const bgMap = {
  0: "#E6F0FF",
  1: "#EDF9F0",
  2: "#FFFDEB",
};

const colorMap = {
  0: "#006CFF",
  1: " #4EC264",
  2: "#FFEB3B",
};

function Leaderboard() {
  const leaderboardData = useSelector((state) => state.leaderboard);

  const [search, setSearch] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [leaderboard, setLeaderboard] = useState([]);
  const [data, setData] = useState(null);
  const [otherAgent, setOtherAgent] = useState([]);
  const [range, setRange] = useState("week");

  async function accessData() {
    const response = await ApiService.Leaderboard();
    const arr = response.data.week.Top3_Agents;
    setData(response.data);
    setLeaderboard(arr);
    const otherAgents = response.data.week.Other_Agents;
    setOtherAgent(otherAgents);
  }

  useEffect(() => {
    accessData();
  }, []);

  useEffect(() => {
    if (data) {
      if (range === "week") {
        setLeaderboard(data.week.Top3_Agents);
        setOtherAgent(data.week.Other_Agents);
      }
      if (range === "month") {
        setLeaderboard(data.month.Top3_Agents);
        setOtherAgent(data.month.Other_Agents);
      }
    }
  }, [range, data]);

  // implemented by rambey
  const [controll, setControll] = useState(false);
  const [rank, setRank] = useState();
  const [agentShow, setAgentShow] = useState();
  const [modal, setModal] = useState(false);

  // let modal = useRef();

  const [agent_id, setAgent_id] = useState("");
  const handleAgent = (agent_id, rank, show) => {
    // modal.showModal();
    setModal(true);
    setAgent_id(agent_id);
    setRank(rank);
    setAgentShow(show);
    setControll(true);
  };

  useEffect(() => {
    let FilteredLeaderboard = leaderboard.filter((profile) => {
      return search.toLowerCase() === ""
        ? profile
        : profile.firstname.toLowerCase().includes(search) ||
            profile.str_agent_id.toLowerCase().includes(search) ||
            profile.lastname.toLowerCase().includes(search);
    });

    let FilteredotherAgent = otherAgent.filter((profile) => {
      return search.toLowerCase() === ""
        ? profile
        : profile.firstname.toLowerCase().includes(search) ||
            profile.str_agent_id.toLowerCase().includes(search) ||
            profile.lastname.toLowerCase().includes(search);
    });

    setOtherAgent(FilteredotherAgent);

    setLeaderboard(FilteredLeaderboard);
  }, [search]);

  // // implemented by rambey

  return (
    <>
      {/* implemented by rambey */}
      <div
        className={
          modal
            ? `${styles.agentStyle} ${styles.active}`
            : `${styles.agentStyle}`
        }
      >
        <div className={styles.agent}>
          <AgentReport
            setModal={setModal}
            rank={rank}
            show={agentShow}
            controll={controll}
            agent_id={agent_id}
          />
        </div>
      </div>
      {/* implemented by rambey */}
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
                This is a list showing the performance of your agents on heed
                via the number of customers calls they have received..
              </p>
              <p className={styles.long_paragraph}>
                Please note that each agent’s performance was rated using the
                amount of calls they were able to receive per week, divided by
                the number of days in a week.
              </p>
              <h6>
                To view agent report, please click on any on the agent IDs{" "}
              </h6>

              <div className={styles.right_content2_container}>
                <div className={styles.InputWithIcon}>
                  <img src={SearchIcon} className="" alt="hero img" />
                  <input
                    type="text"
                    name=""
                    id="search-bar"
                    placeholder="   Input Agent ID/Name"
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className={styles.calender_content}>
                  <div>
                    <p id={styles.sort_by}>Sort by </p>
                  </div>
                  <select
                    id="calender-value"
                    name="calender"
                    onChange={(e) => setRange(e.target.value)}
                  >
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                  </select>
                </div>
              </div>

              <div className={styles.Profile_container}>
                {/* {leaderboard.length > 0 ? ( */}
                <>
                  {leaderboard.map((profile, index, index2) => (
                    <>
                      <LeaderBoardDisplay
                        key={profile.agent_id}
                        person={profile}
                        index={index}
                        index2={index2}
                        handleAgent={handleAgent}
                        agent_id={profile.agent_id}
                        rank={profile.rank}
                        show={profile.str_agent_id}
                      />
                    </>
                  ))}
                </>
                {/* ) : (
                  <div className={styles.empty_state}>
                    <img src={notfoundImg} alt="not found" />
                    <h3>Sorry, No Agent Record Found.</h3>
                  </div>
                )} */}
              </div>
            </div>
          </section>

          <section className={styles.Tabular_Container}>
            <div className={styles.Tabular_Content_Container}>
              <div className={styles.Header_title}>
                <p className={styles.Hide_for_mobile}>AGENT NAME</p>
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
              {leaderboard.length > 0 ? (
                <>
                  {otherAgent.map((profile) => (
                    <OtherAgentDisplay
                      key={profile.agent_id}
                      person={profile}
                      handleAgent={handleAgent}
                      agent_id={profile.agent_id}
                      rank={profile.rank}
                      show={profile.str_agent_id}
                    />
                  ))}
                </>
              ) : (
                <div className={styles.empty_state}>
                  <img src={notfoundImg} alt="not found" />
                  <h3>Sorry, No Agent Record Found.</h3>
                </div>
              )}
            </div>
          </section>
        </div>
      </NewDesignSideBar>
    </>
  );
}

function LeaderBoardDisplay({
  person,
  index,
  handleAgent,
  agent_id,
  rank,
  show,
}) {
  return (
    <div
      className={styles.Profile1}
      id={styles.border}
      style={{ background: bgMap[index] }}
      onClick={() => handleAgent(agent_id, rank, show)}
    >
      <div className={styles.Profile_content}>
        <div className={styles.Profile_img}>
          <img src={ProfileName} className="" alt="profile1" />
        </div>
        <p>ID: {person.str_agent_id}</p>
        <h2 className={styles.UppercaseName}>
          {person.firstname.toUpperCase()} {person.lastname.toUpperCase()}
        </h2>

        <p>
          No. of calls taken this {person.weekly || person.monthly}:{" "}
          {person.total_calls}
        </p>
        <h1 style={{ color: colorMap[index] }}>
          {person.average_score} <span className={styles.small_text}>/10</span>
        </h1>
        <p className={styles.Agent_position}> {person.rank}</p>
      </div>
    </div>
  );
}

function OtherAgentDisplay({ person, handleAgent, agent_id, rank, show }) {
  return (
    <div className={styles.Header_content}>
      <div className={styles.Header_profile_container}>
        <img src={ProfileName} className="" alt="profile1" />
        <p
          className={styles.Agent_ID}
          onClick={() => handleAgent(agent_id, rank, show)}
        >
          {person.firstname.toUpperCase()} {person.lastname.toUpperCase()}
        </p>
      </div>
      <p>{person.total_calls}</p>
      <p>{person.average_score}/10</p>
      <p>{person.rank}</p>
    </div>
  );
}

export default Leaderboard;
