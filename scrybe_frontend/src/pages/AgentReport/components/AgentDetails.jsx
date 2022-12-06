import { React } from "react";
import styles from "../styles/AgentDetails.module.scss";
import { useAgentReport } from "../hooks";

function AgentDetails() {
  const agentReport = useAgentReport();

  return (
    <>
      {agentReport?.length === 0 ? (
        <p className={styles.empty}>
          You will see an overview of your detail here.
        </p>
      ) : (
        <div className={styles.agentDetails} key={agentReport?.str_agent_id}>
          <div className={styles.details}>
            <div className={styles.callDetails}>
              <p className={styles.title}>Total Calls</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{agentReport?.total_calls}</p>
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Positive</p>
              <p className={styles.dash}>-</p>
              {agentReport?.positive_score >= 5 ? (
                <p className={`${styles.number} ${styles.success}`}>
                  {agentReport?.positive_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReport?.positive_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Neutral</p>
              <p className={styles.dash}>-</p>
              {agentReport?.neutral_score >= 5 ? (
                <p className={`${styles.number} ${styles.neutral}`}>
                  {agentReport?.neutral_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReport?.neutral_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Negative</p>
              <p className={styles.dash}>-</p>
              {agentReport?.negative_score >= 5 ? (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReport?.negative_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.success}`}>
                  {agentReport?.negative_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Average Score/ 10</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{agentReport?.average_score}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AgentDetails;
