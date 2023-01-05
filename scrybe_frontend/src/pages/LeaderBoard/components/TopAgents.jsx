import React from "react";
import styles from "../Leaderboard.module.scss";
import ProfileName from "../images/profile-circle.png";

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

const TopAgents = ({ person, index, handleAgent, agent_id, rank, show }) => {
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
};

export default TopAgents;
