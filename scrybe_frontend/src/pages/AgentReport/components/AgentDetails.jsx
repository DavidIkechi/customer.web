import { React } from "react";
import styles from "../styles/AgentDetails.module.scss";
import { useAgentReport } from "../hooks";

function AgentDetails() {
  const agentReportData = useAgentReport();

  return (
    <>
      {agentReportData?.length === 0 ? (
        <p className={styles.empty}>
          You will see an overview of your detail here.
        </p>
      ) : (
        <div
          className={styles.agentDetails}
          key={agentReportData?.str_agent_id}
        >
          <div className={styles.details}>
            <div className={styles.callDetails}>
              <p className={styles.title}>Total Calls</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{agentReportData?.total_calls}</p>
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Positive</p>
              <p className={styles.dash}>-</p>
              {agentReportData?.positive_score >= 5 ? (
                <p className={`${styles.number} ${styles.success}`}>
                  {agentReportData?.positive_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReportData?.positive_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Neutral</p>
              <p className={styles.dash}>-</p>
              {agentReportData?.neutral_score >= 5 ? (
                <p className={`${styles.number} ${styles.neutral}`}>
                  {agentReportData?.neutral_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReportData?.neutral_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Negative</p>
              <p className={styles.dash}>-</p>
              {agentReportData?.negative_score >= 5 ? (
                <p className={`${styles.number} ${styles.fail}`}>
                  {agentReportData?.negative_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.success}`}>
                  {agentReportData?.negative_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Average Score/ 10</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{agentReportData?.average_score}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AgentDetails;
