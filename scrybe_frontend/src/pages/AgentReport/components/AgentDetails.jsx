import PropTypes from "prop-types";
import React from "react";
import styles from "../styles/AgentDetails.module.scss";

function AgentDetails() {
  return (
    <div className={styles.agentDetails}>
      <p className={styles.firstp}>Agent Performance Report</p>
      <p className={styles.secondp}>Name: Delphine Ogbonna</p>
      <p className={styles.secondp}>Email: chinyeredelphine@yahoo.com</p>
      <div className={styles.details}>
        <DetailsRow title="Total calls" number="50" />
        <DetailsRow title="Positive" number="30 (60%)" />
        <DetailsRow title="Neutral" number="13 (30%)" />
        <DetailsRow title="Negative" number="5 (10%)" />
        <DetailsRow title="Average Score - 10" number="8" />
      </div>
    </div>
  );
}

function DetailsRow({ title, number }) {
  return (
    <div className={styles.callDetails}>
      <p className={styles.title}>{title}</p>
      <p>--</p>
      <p className={styles.number}>{number}</p>
    </div>
  );
}

DetailsRow.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default AgentDetails;
