import { React } from "react";
import styles from "../styles/AgentDetails.module.scss";

function AgentDetails({ selectData }) {
  return (
    <>
      {selectData?.length > 0 ? (
        <p className={styles.empty}>
          You will see an overview of your detail here.
        </p>
      ) : (
        <div className={styles.agentDetails} key={selectData?.str_agent_id}>
          <div className={styles.details}>
            <div className={styles.callDetails}>
              <p className={styles.title}>Total Calls</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{selectData?.total_calls}</p>
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Positive</p>
              <p className={styles.dash}>-</p>
              {selectData?.positive_score >= 5 ? (
                <p className={`${styles.number} ${styles.success}`}>
                  {selectData?.positive_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {selectData?.positive_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Neutral</p>
              <p className={styles.dash}>-</p>
              {selectData?.neutral_score >= 5 ? (
                <p className={`${styles.number} ${styles.neutral}`}>
                  {selectData?.neutral_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.fail}`}>
                  {selectData?.neutral_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Negative</p>
              <p className={styles.dash}>-</p>
              {selectData?.negative_score >= 5 ? (
                <p className={`${styles.number} ${styles.fail}`}>
                  {selectData?.negative_score}%
                </p>
              ) : (
                <p className={`${styles.number} ${styles.success}`}>
                  {selectData?.negative_score}%
                </p>
              )}
            </div>

            <div className={styles.callDetails}>
              <p className={styles.title}>Average Score/ 10</p>
              <p className={styles.dash}>-</p>
              <p className={styles.total}>{selectData?.average_score}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AgentDetails;
