import React from "react";
import { useEffect } from "react";
import { useMockAuthAndGetRecording } from "../hooks";
import styles from "../DashboardOverview.module.scss";
import toneWave from "../assets/tone_wave.svg";
import upload from "../assets/upload.svg";
import empty_state from "../assets/empty_state.png";

const RecentRecording = () => {
  const recentRecording = useMockAuthAndGetRecording();
  console.log(recentRecording);
  useEffect(() => {}, [recentRecording]);
  return (
    <>
      {recentRecording?.length < 0 ? (
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
                {recentRecording.audio_path}
                {/* <span>{recentRecording.audio_path}</span> */}
                {/* <span className={styles.bold_td}> Inactive recharge card</span> */}
              </td>
              <td>{recentRecording.duration}</td>
              <td>{recentRecording.size}</td>
              <td>{recentRecording.timestamp}</td>
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
              Start uploading agent recordings to get an overview of your team’s
              performance.
            </p>
            <button className={styles.empty_state_btn}>
              <img src={upload} alt="upload" /> Upload
            </button>
          </div>
          <div className={styles.empty_state_desktop}>
            <img src={empty_state} alt="No activity found" />
            <h2 className={styles.empty_state_header}>Sorry, no recordings</h2>
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
    </>
  );
};

export default RecentRecording;
