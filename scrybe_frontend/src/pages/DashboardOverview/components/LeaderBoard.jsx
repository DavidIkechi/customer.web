import React from "react";
import styles from "../DashboardOverview.module.scss";
import leaderboard from "../assets/leaderboard.svg";
import agent from "../assets/agent.png";
import agent1 from "../assets/agent1.png";
import agent2 from "../assets/agent2.png";
import agent3 from "../assets/agent3.png";
import crown from "../assets/crown.svg";
import second from "../assets/2nd.png";
import third from "../assets/3rd.png";

const LeaderBoard = () => {
  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboard__heading}>
        <h1>
          {" "}
          <img src={leaderboard} alt="leader board" />
          Agents Leaderboard
        </h1>
        <select className={styles.dropdown}>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
        {/* <h2 className={styles.thismonth}>
      This month <img src={chevron} alt="analysis" />
    </h2> */}
      </div>
      <div className={styles.subcontent_con}>
        <div className={styles.agents_mobile}>
          <div>
            <h2>
              <img src={agent1} alt="agent" /> Agent 7
            </h2>
            <h2>
              93% <span>P</span>
            </h2>
          </div>
          <div>
            <h2>
              <img src={agent2} alt="agent" />
              Agent 7
            </h2>
            <h2>
              93% <span>P</span>
            </h2>
          </div>
          <div>
            <h2>
              <img src={agent3} alt="agent" /> Agent 7
            </h2>
            <h2>
              93% <span>P</span>
            </h2>
          </div>
        </div>
      </div>

      <div className={styles.agents_desktop}>
        <div className={styles.agentLCon}>
          <div className={styles.agentL}>
            <span>
              <img src={crown} alt="crown" />
            </span>
            <img src={agent} alt="agent" />
            <span className={styles.one}>1</span>
          </div>
        </div>
        <div className={styles.other_agents}>
          <div>
            <h2>
              {" "}
              <img src={second} alt="2nd" /> Agent 2
            </h2>
            <h2>
              93% <span>P</span>
            </h2>
          </div>
          <div>
            <h2>
              <img src={third} alt="3rd" /> Agent 3
            </h2>
            <h2>
              93% <span>P</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
