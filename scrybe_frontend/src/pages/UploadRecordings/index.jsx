import React from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import TableData from "./TableData";
import styles from "./uploadedRecordings.module.scss";

function UploadedRecordings() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);
  const [setIsSearching] = React.useState("");
  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };
  return (
    <div className={`${styles.uploadedRecordingsParent} `}>
      <NewDesignSideBar
        toggleSidebar={toggleSidebar}
        needSearchMobile="needSearchMobile"
        getValue={(e) => setterFn(e)}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className={styles.uploadedRecordingsCol}>
          <div className={styles.uploadedRecordingsSideBar}>
            <TopNav
              openSidebar={() => {
                setToggleSidebar(!toggleSidebar);
              }}
              search={(e) => setterFn(e)}
            />
          </div>
          <TableData searchKeyword={isSearching} />
        </div>
      </NewDesignSideBar>
    </div>
  );
}

export default UploadedRecordings;
