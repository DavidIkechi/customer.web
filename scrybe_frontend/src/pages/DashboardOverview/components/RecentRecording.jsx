import React from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../DashboardOverview.module.scss";
import toneWave from "../assets/tone_wave.svg";
import upload from "../assets/upload.svg";
import empty_state from "../assets/empty_state.png";

const RecentRecording = ({ recentRecording }) => {
  // console.log(recentRecording[0]);
  // const date = recentRecording.map((data) => data.timestamp);
  // console.log(date);
  return (
    <>
      {recentRecording?.length > 0 ? (
        <table className={styles.recent_recordings}>
          <caption>Recent recordings </caption>
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "left" }}>
                Name
              </th>
              <th scope="col"></th>
              <th scope="col">Length</th>
              <th scope="col">Size</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Uploaded
              </th>
            </tr>
          </thead>
          <tbody>
            {recentRecording.map((data) => (
              <tr>
                <td>
                  <img src={toneWave} alt="tone wave" />
                </td>
                <td style={{ textAlign: "left" }}>{data.filename}</td>
                <td>{data.duration} mins</td>
                <td>{data.size} mb</td>
                <td>
                  {data.timestamp.charAt(11) === "0"
                    ? data.timestamp.replace("T0", " ")
                    : data.timestamp.replace("T", " ")}
                </td>
              </tr>
            ))}
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
            <Link to="/upload-new-file" className={styles.empty_state_btn}>
              <img src={upload} alt="upload" /> Upload
            </Link>
          </div>
          <div className={styles.empty_state_desktop}>
            <img src={empty_state} alt="No activity found" />
            <h2 className={styles.empty_state_header}>Sorry, no recordings</h2>
            <p className={styles.empty_state_paragraph}>
              Your recent uploaded recordings will show here. Use the button
              below to upload a recording and begin your transcription and
              sentiment analysis.
            </p>
            <Link to="/upload-new-file" className={styles.empty_state_btn}>
              <img src={upload} alt="upload" /> Upload
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentRecording;
