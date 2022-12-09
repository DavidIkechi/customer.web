import React from "react";
import styles from "../DashboardOverview.module.scss";
import telephone from "../assets/telephone.svg";
import leaderboardIcon from "../assets/leaderboard.svg";
import { useState, useEffect } from "react";

const bgMap = {
  0: "#E6F0FF",
  1: "#EDF9F0",
  2: "#FFFDEB",
};

const LeaderBoard = ({ LeaderboardData }) => {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setSelected(LeaderboardData.week);
  }, [LeaderboardData.week]);
  // console.log("leader", LeaderboardData);
  // console.log("select", selected);
  // console.log("select", selected);

  function selectFunc(e) {
    setSelected(LeaderboardData[e.target.value]);
    console.log("clicked", LeaderboardData[e.target.value]);
  }

  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboard__heading}>
        <h1>
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
              {selected &&
                selected.Top3_Agents?.map((value, index) => (
                  <tr style={{ background: bgMap[index] }} key={index + 1}>
                    <td>{value.str_agent_id}</td>
                    <td>{value.total_calls}</td>
                    <td>{value.average_score}</td>
                    <td>{value.rank}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
