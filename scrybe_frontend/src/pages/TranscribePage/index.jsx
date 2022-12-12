import React from "react";
import styles from "./TranscribePage.module.scss";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import TranscriptionMain from "./Transcribe/Components/TranscriptionMain/TranscriptionMain";

function TranscribePage() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  return (
    <div className={styles.TranscribePage}>
      <NewDesignSideBar
        toggleSidebar={toggleSidebar}
        needSearchMobile="needSearchMobile"
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className={styles.Transcribe}>
          <TopNav
            openSidebar={() => {
              setToggleSidebar(!toggleSidebar);
            }}
          />
          <TranscriptionMain />
        </div>
      </NewDesignSideBar>
    </div>
  );
}

export default TranscribePage;
