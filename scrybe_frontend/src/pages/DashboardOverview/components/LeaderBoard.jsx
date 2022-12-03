import React from "react";
import styles from "../DashboardOverview.module.scss";
import telephone from "../assets/telephone.svg";
import leaderboardIcon from "../assets/leaderboard.svg";
import { useState, useEffect } from "react";

const LeaderBoard = ({ LeaderboardData }) => {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setSelected(LeaderboardData.week);
  }, [LeaderboardData.week]);

  // useEffect(() => {
  //   LeaderboardData.week.length = 3;
  //   LeaderboardData.month.length = 3;
  //   setSelected(LeaderboardData.week);
  // }, [LeaderboardData.week, LeaderboardData.month]);

  function selectFunc(e) {
    setSelected(LeaderboardData[e.target.value]);
  }

  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboard__heading}>
        <h1>
          {" "}
          <img src={leaderboardIcon} alt="leader board" />
          Agents Leaderboard
        </h1>
        <select className={styles.dropdown} onChange={selectFunc}>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>
      <div className={styles.subcontent_con}>
        <div className={styles.agents}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  <img src={telephone} alt="telephone" />
                </th>
                <th>Score /10</th>
                <th>
                  <img src={leaderboardIcon} alt="leaderboard icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              {selected.slice(0, 3).map((value) => (
                <tr>
                  <td>{value.name_id}</td>
                  <td>{value.recordings}</td>
                  <td>{value.score}</td>
                  <td>{value.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div>
            // <h2> {`${value.position} ${value.name}`}</h2>
            //{" "}
            <h2>
              // {value.score}% <span>P</span>
              //{" "}
            </h2>
            //{" "}
          </div> */}
        </div>
      </div>
      {/* <div className={styles.agents_desktop}>
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
      </div> */}
    </div>
  );
};

export default LeaderBoard;

// function Agents(data) {
//   const dat = data.map((d) => console.log(d));
//   console.log("testing", dat);
//   return (
//     <>
//       {data.map((value, index) => (
//         <div>
//           <h2>{value.position} Agent 7</h2>
//           <h2>
//             {value.score}% <span>P</span>
//           </h2>
//         </div>
//       ))}
//     </>
//   );
// }
