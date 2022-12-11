import React from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import TableData from "./TableData";
import styles from "./uploadedRecordings.module.scss";

function UploadedRecordings() {
  const [isSearching, setIsSearching] = React.useState("");
  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };
  return (
    <div className={`${styles.uploadedRecordingsParent} `}>
      <TableData searchKeyword={isSearching} />
    </div>
  );
}

export default UploadedRecordings;
