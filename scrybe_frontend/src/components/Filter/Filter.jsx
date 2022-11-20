/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./filter.module.scss";

function Filter(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h1>Record History</h1>
      <div className={styles.history__nav}>
        <div>
          <select className={styles.select__grid} name="Grid" id="">
            <option onClick={props.onClose} value="Grid">
              Grid
            </option>
            <option value="List">List</option>
          </select>
        </div>
        <div className={styles.history__nav2}>
          <select className={styles.select} name="filter" id="">
            <option value="all records">All records</option>
          </select>
          <select className={styles.select} name="date" id="">
            <option value="date">Date Added</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Filter;
