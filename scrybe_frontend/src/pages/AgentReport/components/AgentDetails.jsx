import { React } from "react";
import styles from "../styles/AgentDetails.module.scss";
import { useAgentReport } from "../hooks";

function AgentDetails() {
  const agentReport = useAgentReport();

  return (
    <>
      {agentReport.length === 0 ? (
        <p className={styles.empty}>An overview of agent report shows here</p>
      ) : (
        agentReport.map((detail) => {
          return (
            <div className={styles.agentDetails} key={detail.id}>
              <div className={styles.details}>
                <div className={styles.callDetails}>
                  <p className={styles.title}>Total Calls</p>
                  <p className={styles.dash}>-</p>
                  <p className={styles.total}>{detail.total_calls}</p>
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Call Missed</p>
                  <p className={styles.dash}>-</p>
                  {detail.missed > 0 ? (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.missed}%
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.missed}%
                    </p>
                  )}
                  {/* <p className={styles.number}>{detail.missed}</p> */}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Positive</p>
                  <p className={styles.dash}>-</p>
                  {detail.positive >= 10 ? (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.positive}%
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.positive}%
                    </p>
                  )}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Neutral</p>
                  <p className={styles.dash}>-</p>
                  {detail.neutral >= 10 ? (
                    <p className={`${styles.number} ${styles.neutral}`}>
                      {detail.neutral}%
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.neutral}%
                    </p>
                  )}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Negative</p>
                  <p className={styles.dash}>-</p>
                  {detail.negative >= 5 ? (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.negative}%
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.negative}%
                    </p>
                  )}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Average Score/ 10</p>
                  <p className={styles.dash}>-</p>
                  <p className={styles.total}>{detail.avg}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default AgentDetails;
