import React from "react";
import styles from "./Transcribe.module.scss";
// import TranscriptionHeader from "./Components/TranscriptionHeader/TranscriptionHeader";
import TranscriptionMain from "./Components/TranscriptionMain/TranscriptionMain";
// import NewDesignSideBar from "../../../components/NewDesignSidebar";
import TopNav from "../../../components/TopNav";

function Transcribe() {
  return (
    <div className={styles.Transcribe}>
      <TopNav />
      <TranscriptionMain />
    </div>
  );
}

export default Transcribe;
