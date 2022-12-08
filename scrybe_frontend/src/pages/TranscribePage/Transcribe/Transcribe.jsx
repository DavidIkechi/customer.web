import React from "react";
import styles from "./Transcribe.module.scss";
import TranscriptionMain from "./Components/TranscriptionMain/TranscriptionMain";
import TopNav from "../../../components/TopNav";

function Transcribe() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);
  return (
    <div className={styles.Transcribe}>
      <TopNav
        openSidebar={() => {
          setToggleSidebar(!toggleSidebar);
        }}
      />
      <TranscriptionMain />
    </div>
  );
}

export default Transcribe;
