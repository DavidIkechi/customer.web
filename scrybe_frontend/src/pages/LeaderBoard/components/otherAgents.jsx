import React from "react";
import styles from "../Leaderboard.module.scss";
import ProfileName from "../images/profile-circle.png";

const otherAgents = ({ person, handleAgent, agent_id, rank, show }) => {
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
};

export default otherAgents;
