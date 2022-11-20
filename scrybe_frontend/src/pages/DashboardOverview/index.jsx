import React from "react";
import styles from "./DashboardOverview.module.scss";
import toneWave from "./assets/tone_wave.svg";
import chevron from "./assets/chevron_right.svg";
import analysis from "./assets/analytics.svg";
import leaderboard from "./assets/leaderboard.svg";
// import agent from "../assets/agent.png";
import agent1 from "./assets/agent1.png";
import agent2 from "./assets/agent2.png";
import agent3 from "./assets/agent3.png";

function DashboardOverview() {
  return (
    <section className={styles.dashboard_overview}>
      <div className={styles.container}>
        {/* Total recording */}
        <div className={styles.recordings_container}>
          <div className={styles.recordings__heading}>
            <h1>
              <img src={toneWave} alt="" /> Total Recordings
            </h1>
            <h2>
              This month <img src={chevron} alt="" />
            </h2>
          </div>
          <div className={styles.recordings}>
            <div>
              <div className={`${styles.bar} ${styles.one}`}>1</div>
              <div className={`${styles.bar} ${styles.two}`}>2</div>
              <div className={`${styles.bar} ${styles.three}`}>3</div>
              <div className={`${styles.bar} ${styles.four}`}>3</div>
              <ul className={styles.vmeter}>
                {/* <li>
              <div>20ms</div>
            </li> */}
                <li>
                  <div>3000</div>
                </li>
                <li>
                  <div>2000</div>
                </li>
                <li>
                  <div>1000</div>
                </li>
                <li>
                  <div>0</div>
                </li>
              </ul>
            </div>

            <div>
              <ul className={styles.tmeter}>
                <li>wk1</li>
                <li>wk2</li>
                <li>wk3</li>
                <li>wk4</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.analysis}>
          <div className={styles.analysis__heading}>
            <h1>
              <img src={analysis} alt="Total recording" /> Total Analysis
            </h1>
            <h2>
              This month <img src={chevron} alt="analysis" />
            </h2>
          </div>

          <div className={styles.circles}>
            <div className={styles.meduim}>23%</div>
            <div className={styles.small}>8%</div>
            <div className={styles.big}>65%</div>
          </div>

          <div className={styles.scale}>
            <h3>
              <span>1</span> Positive
            </h3>
            <h3>
              {" "}
              <span>1</span>Neutral
            </h3>
            <h3>
              <span>1</span> Negative
            </h3>
          </div>
        </div>

        <div className={styles.leaderboard}>
          <div className={styles.leaderboard__heading}>
            <h1>
              {" "}
              <img src={leaderboard} alt="leader board" />
              Agents Leaderboard
            </h1>
            <h2>
              This month <img src={chevron} alt="analysis" />
            </h2>
          </div>

          <div className={styles.agents}>
            <div>
              <h2>
                <img src={agent1} alt="agent" /> Agent 7
              </h2>
              <h2>
                93% <span>P</span>
              </h2>
            </div>
            <div>
              <h2>
                <img src={agent2} alt="agent" />
                Agent 7
              </h2>
              <h2>
                93% <span>P</span>
              </h2>
            </div>
            <div>
              <h2>
                <img src={agent3} alt="agent" /> Agent 7
              </h2>
              <h2>
                93% <span>P</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <table className={styles.recent_recordings}>
        <caption>Recent recordings </caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className={styles.transperent}>
              Recording
            </th>
            <th scope="col">Length</th>
            <th scope="col">Size</th>
            <th scope="col">Uploaded</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={toneWave} alt="tone wave" />
            </td>
            <td>
              <span>Recording mp3</span>
              <span className={styles.bold_td}> Inactive recharge card</span>
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>14/11/22</td>
          </tr>
          <tr>
            <td>
              <img src={toneWave} alt="tone wave" />
            </td>
            <td>
              <span>Recording mp3</span>
              <span className={styles.bold_td}>
                Inactive recharge card
              </span>{" "}
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>14/11/22</td>
          </tr>
          <tr>
            <td>
              <img src={toneWave} alt="tone wave" />
            </td>
            <td>
              <span>Recording mp3</span>
              <span className={styles.bold_td}>
                Inactive recharge card
              </span>{" "}
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>14/11/22</td>
          </tr>
          <tr>
            <td>
              <img src={toneWave} alt="tone wave" />
            </td>
            <td>
              <span>Recording mp3</span>
              <span className={styles.bold_td}>
                Inactive recharge card
              </span>{" "}
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>14/11/22</td>
          </tr>
          <tr>
            <td>
              <img src={toneWave} alt="tone wave" />
            </td>
            <td>
              <span>Recording mp3</span>
              <span className={styles.bold_td}>
                Inactive recharge card
              </span>{" "}
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>14/11/22</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default DashboardOverview;
