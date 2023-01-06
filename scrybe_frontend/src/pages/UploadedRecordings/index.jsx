import React from "react";
import TableData from "./TableData";

function UploadedRecordings() {
  const [isSearching, setIsSearching] = React.useState("");

  return <TableData searchKeyword={isSearching} />;
}

export default UploadedRecordings;
