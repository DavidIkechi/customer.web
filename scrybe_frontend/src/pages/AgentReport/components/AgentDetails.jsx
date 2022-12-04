import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import styles from "../styles/AgentDetails.module.scss";
import axios from "axios";

function AgentDetails() {
  const [details, setDetails] = useState([]);
  const getDetails = async () => {
    try {
      await axios
        .get("https://638b959081df38ab346c7d6e.mockapi.io/details")
        .then((res) => {
          setDetails(res.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {details.length === 0 ? (
        <p>Nothing to show yet</p>
      ) : (
        details.map((detail) => {
          return (
            <div className={styles.agentDetails} key={detail.id}>
              <div className={styles.agentId}>
                <p className={styles.secondp}>
                  Agent ID: &nbsp; &nbsp; {detail.agent_id}
                </p>
                <p className={styles.secondp}>
                  Rank: &nbsp; &nbsp; {detail.rank}
                </p>
              </div>

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
                      {detail.missed}
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.missed}
                    </p>
                  )}
                  {/* <p className={styles.number}>{detail.missed}</p> */}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Positive</p>
                  <p className={styles.dash}>-</p>
                  {detail.positive >= 10 ? (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.positive}
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.positive}
                    </p>
                  )}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Neutral</p>
                  <p className={styles.dash}>-</p>
                  {detail.neutral >= 10 ? (
                    <p className={`${styles.number} ${styles.neutral}`}>
                      {detail.neutral}
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.neutral}
                    </p>
                  )}
                </div>

                <div className={styles.callDetails}>
                  <p className={styles.title}>Negative</p>
                  <p className={styles.dash}>-</p>
                  {detail.negative >= 5 ? (
                    <p className={`${styles.number} ${styles.fail}`}>
                      {detail.negative}
                    </p>
                  ) : (
                    <p className={`${styles.number} ${styles.success}`}>
                      {detail.negative}
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
