import React from "react";
import { useSelector } from "react-redux";
import TableData from "./TableData";

function UploadedRecordings() {
  const { searchQuery } = useSelector((state) => state.util);

  return <TableData searchKeyword={searchQuery} />;
}

export default UploadedRecordings;
