import React from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
// import SideBar from "../../components/SideBar";
import TableData from "./TableData";
import UploadedNavbar from "./UploadedNavbar";
import styles from "./uploadedRecordings.module.scss";
// import UploadedSidebar from "./UploadedSidebar";

function UploadedRecordings() {
  const [toggleSidebar, setToggleSidebar] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState("");
  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };
  return (
    <div className={`${styles.uploadedRecordingsParent} `}>
      {/* <UploadedSidebar
        getValue={(e) => setterFn(e)}
        toggleSidebar={toggleSidebar}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      /> */}
      <NewDesignSideBar
        toggleSidebar={toggleSidebar}
        needSearchMobile="needSearchMobile"
        getValue={(e) => setterFn(e)}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className={styles.uploadedRecordingsCol}>
          <div className={styles.uploadedRecordingsSideBar}>
            <UploadedNavbar
              openSidebar={() => {
                console.log("open sidebar");
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
