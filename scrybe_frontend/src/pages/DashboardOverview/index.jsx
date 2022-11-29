import React from "react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ThisWeekRecordings } from "./Data";
import { useMockAuthAndGetRecording } from "./hooks";
import SideBar from "../../components/SideBar";
import styles from "./DashboardOverview.module.scss";
import toneWave from "./assets/tone_wave.svg";
// import chevron from "./assets/chevron_right.svg";
import analysis from "./assets/analytics.svg";
import leaderboard from "./assets/leaderboard.svg";
import agent from "./assets/agent.png";
import agent1 from "./assets/agent1.png";
import agent2 from "./assets/agent2.png";
import agent3 from "./assets/agent3.png";
import crown from "./assets/crown.svg";
import second from "./assets/2nd.png";
import third from "./assets/3rd.png";
import upload from "./assets/upload.svg";
import empty_state from "./assets/empty_state.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);

function DashboardOverview() {
  const recentRecording = useMockAuthAndGetRecording();

  useEffect(() => {
    console.log(recentRecording);
  }, [recentRecording]);

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ThisWeekRecordings.map((data) => data.day),
      datasets: [
        {
          label: "",
          data: ThisWeekRecordings.map((data) => data.totalRecordings),
          backgroundColor: ["#B0CAD9", "#005584", "#548DAD", "#004D78"],
          maxBarThickness: 10,
          borderSkipped: "start",
        },
      ],
    });
    setChartOptions({
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    });
  }, []);

  return (
    <SideBar>
      <section className={styles.dashboard_overview}>
        <div className={styles.container}>
          {/* Total recording */}
          <div className={styles.recordings_container}>
            <div className={styles.recordings__heading}>
              <h1>
                <img src={toneWave} alt="" /> Total Recordings
              </h1>
              <select className={styles.dropdown}>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
              {/* <h2 className={styles.thismonth}>
              This month <img src={chevron} alt="" />
            </h2> */}
            </div>
            <div className={styles.recordings}>
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Analysis */}
          <div className={styles.analysis}>
            <div className={styles.analysis__heading}>
              <h1>
                <img src={analysis} alt="Total recording" /> Total Analysis
              </h1>
              <select className={styles.dropdown}>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
              {/* <h2 className={styles.thismonth}>
              This month <img src={chevron} alt="analysis" />
            </h2> */}
            </div>
            <div className={styles.subcontent_con}>
              <div className={styles.circles}>
                <div className={styles.meduim}>23%</div>
                <div className={styles.small}>8%</div>
                <div className={styles.big}>65%</div>
              </div>
              <div className={styles.scale}>
                <h3>
                  <span className={styles.positive}>1</span> Positive
                </h3>
                <h3>
                  {" "}
                  <span className={styles.neutral}>1</span>Neutral
                </h3>
                <h3>
                  <span className={styles.negative}>1</span> Negative
                </h3>
              </div>
            </div>
          </div>

          {/* Leader Board */}
          <div className={styles.leaderboard}>
            <div className={styles.leaderboard__heading}>
              <h1>
                {" "}
                <img src={leaderboard} alt="leader board" />
                Agents Leaderboard
              </h1>
              <select className={styles.dropdown}>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
              {/* <h2 className={styles.thismonth}>
              This month <img src={chevron} alt="analysis" />
            </h2> */}
            </div>
            <div className={styles.subcontent_con}>
              <div className={styles.agents_mobile}>
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

            <div className={styles.agents_desktop}>
              <div className={styles.agentLCon}>
                <div className={styles.agentL}>
                  <span>
                    <img src={crown} alt="crown" />
                  </span>
                  <img src={agent} alt="agent" />
                  <span className={styles.one}>1</span>
                </div>
              </div>
              <div className={styles.other_agents}>
                <div>
                  <h2>
                    {" "}
                    <img src={second} alt="2nd" /> Agent 2
                  </h2>
                  <h2>
                    93% <span>P</span>
                  </h2>
                </div>
                <div>
                  <h2>
                    <img src={third} alt="3rd" /> Agent 3
                  </h2>
                  <h2>
                    93% <span>P</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Recordings */}
        {recentRecording?.length > 0 ? (
          <table className={styles.recent_recordings}>
            <caption>Recent recordings </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className={styles.notvisible}>
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
                  <span className={styles.bold_td}>
                    {" "}
                    Inactive recharge card
                  </span>
                </td>
                <td>4 mins</td>
                <td>50mb</td>
                <td>14/11/22</td>
              </tr>
              {/* <tr>
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
          </tr> */}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty_state_con}>
            <div className={styles.empty_state_mobile}>
              <img src={empty_state} alt="No activity found" />
              <h2 className={styles.empty_state_header}>No activity found</h2>
              <p className={styles.empty_state_paragraph}>
                Start uploading agent recordings to get an overview of your
                team’s performance.
              </p>
              <button className={styles.empty_state_btn}>
                <img src={upload} alt="upload" /> Upload
              </button>
            </div>
            <div className={styles.empty_state_desktop}>
              <img src={empty_state} alt="No activity found" />
              <h2 className={styles.empty_state_header}>
                Sorry, no recordings
              </h2>
              <p className={styles.empty_state_paragraph}>
                Your recent uploaded recordings will show here. Use the button
                below to upload a recording and begin your transcription and
                sentiment analysis.
              </p>
              <button className={styles.empty_state_btn}>
                <img src={upload} alt="upload" /> Upload
              </button>
            </div>
          </div>
        )}
      </section>
    </SideBar>
  );
}

export default DashboardOverview;
