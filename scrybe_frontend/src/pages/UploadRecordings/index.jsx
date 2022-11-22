import React from "react";
// import SideBar from "../../components/SideBar/Sidebar";
import TableData from "./TableData";
import UploadedNavbar from "./UploadedNavbar";
import styles from "./uploadedRecordings.module.scss";

function UploadedRecordings() {
  return (
    <div className={styles.uploadedRecordingsParent}>
      {/* <SideBar /> */}
      {/* sidebar */}
      <div className={styles.uploadedRecordingsCol}>
        <div className={styles.uploadedRecordingsSideBar}>
          <UploadedNavbar />
        </div>
        <TableData />
      </div>
    </div>
  );
}

export default UploadedRecordings;
