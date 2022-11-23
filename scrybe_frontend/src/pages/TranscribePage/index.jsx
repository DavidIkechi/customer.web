import React from "react";
import styles from "./TranscribePage.module.scss";
import SideBar from "../../components/SideBar/Sidebar";
import Transcribe from "./Transcribe/Transcribe";

function TranscribePage() {
  return (
    <div className={styles.TranscribePage}>
      <SideBar />
      <Transcribe />
    </div>
  );
}

export default TranscribePage;
