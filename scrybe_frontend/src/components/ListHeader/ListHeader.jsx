import React from "react";
import styles from "./listHeader.module.scss";

function ListHeader() {
  return (
    <div className={styles.header}>
      <table className={styles.table}>
        <tr>
          <th>File Name</th>
          <th>Agent</th>
          <th>Sentiment Result</th>
          <th>Date Uploaded</th>
          <th>Lenght</th>
        </tr>
      </table>
    </div>
  );
}

export default ListHeader;
