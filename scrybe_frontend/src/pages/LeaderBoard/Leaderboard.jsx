import styles from "./Leaderboard.module.scss";
import IsLoadingSkeleton from "../../components/LoadingSkeleton";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import { useState, useEffect } from "react";
import notfoundImg from "./images/notfound.svg";
import CallIcon from "./images/Call-icon.png";
import LeaderBoardIcon from "./images/leaderboard-icon.png";
import AgentReport from "../AgentReport";
import { useSelector, useDispatch } from "react-redux";
import { LeaderBoard } from "../../redux/features/agents/service";
import TopAgents from "./components/TopAgents";
import OtherAgents from "./components/OtherAgents";

function Leaderboard() {
  const leaderboardData = useSelector((state) => state.agent.leaderboard);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.util);

  const [search, setSearch] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const [leaderboard, setLeaderboard] = useState([]);
  const [data, setData] = useState(null);
  const [otherAgent, setOtherAgent] = useState([]);
  const [range, setRange] = useState("week");

  useEffect(() => {
    const getData = () => {
      const response = leaderboardData;
      const arr = response?.week?.Top3_Agents;
      setData(response);
      setLeaderboard(arr);
      const otherAgents = response?.week?.Other_Agents;
      setOtherAgent(otherAgents);
    };
    getData();
  }, [leaderboardData]);

  useEffect(() => {
    dispatch(LeaderBoard());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (range === "week") {
        setLeaderboard(data?.week?.Top3_Agents);
        setOtherAgent(data?.week?.Other_Agents);
      }
      if (range === "month") {
        setLeaderboard(data?.month?.Top3_Agents);
        setOtherAgent(data?.month?.Other_Agents);
      }
    }
  }, [range, data]);

  const [controll, setControll] = useState(false);
  const [rank, setRank] = useState();
  const [agentShow, setAgentShow] = useState();
  const [modal, setModal] = useState(false);

  const [agent_id, setAgent_id] = useState("");
  const handleAgent = (agent_id, rank, show) => {
    setModal(true);
    setAgent_id(agent_id);
    setRank(rank);
    setAgentShow(show);
    setControll(true);
  };

  const searchFunction = (e) => {
    setSearch(e.target.value);
  };

  const searchLeaderboard = (leaderboardSearch) => {
    return leaderboardSearch?.filter((item) => {
      return JSON.stringify(item?.firstname || item?.lastname)
        ?.toLowerCase()
        .includes(search.toLowerCase());
    });
  };

  return (
    <>
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

      <NewDesignSideBar
        toggleSidebar={toggleSidebar}
        needSearchMobile="needSearchMobile"
        getValue={(e) => searchFunction(e)}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className={styles.content_container}>
          <section>
            <div className={styles.right_section_top}>
              <TopNav
                openSidebar={() => {
                  setToggleSidebar(!toggleSidebar);
                }}
                search={(e) => searchFunction(e)}
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
            </div>
          </section>

          <>
            {isLoading ? (
              <IsLoadingSkeleton />
            ) : (
              <>
                <section className={styles.general_profile}>
                  <div className={styles.Profile_container}>
                    <>
                      {searchLeaderboard(leaderboard)?.length > 0 ? (
                        searchLeaderboard(leaderboard)?.map(
                          (profile, index) => (
                            <>
                              <TopAgents
                                key={profile.agent_id}
                                person={profile}
                                index={index}
                                // index2={index2}
                                handleAgent={handleAgent}
                                agent_id={profile.agent_id}
                                rank={profile.rank}
                                show={profile.str_agent_id}
                              />
                            </>
                          )
                        )
                      ) : (
                        <div className={styles.empty_state}>
                          <img src={notfoundImg} alt="not found" />
                          <h3>Sorry, No Agent Record Found.</h3>
                        </div>
                      )}
                    </>
                  </div>
                </section>

                <section className={styles.Tabular_Container}>
                  <div className={styles.Tabular_Content_Container}>
                    <div className={styles.Header_title}>
                      <p className={styles.Hide_for_mobile}>AGENT NAME</p>
                      <span className={styles.Hide_for_desktop}>ID</span>
                      <p className={styles.Hide_for_mobile}>
                        No. of calls/week
                      </p>
                      <span className={styles.Hide_for_desktop}>
                        <img src={CallIcon} className="" alt="profile1" />
                      </span>

                      <p className={styles.Hide_for_mobile}>Total score </p>
                      <span className={styles.Hide_for_desktop}>Score/10</span>

                      <p className={styles.Hide_for_mobile}>Rank </p>
                      <span className={styles.Hide_for_desktop}>
                        <img
                          src={LeaderBoardIcon}
                          className=""
                          alt="profile1"
                        />
                      </span>
                    </div>
                    <hr></hr>
                    {searchLeaderboard(otherAgent)?.length > 0 ? (
                      <>
                        {searchLeaderboard(otherAgent)?.map((profile) => (
                          <OtherAgents
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
              </>
            )}
          </>
        </div>
      </NewDesignSideBar>
    </>
  );
}

export default Leaderboard;
