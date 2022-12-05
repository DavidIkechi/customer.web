import React from "react";
import styles from "../styles/Table.module.scss";
import Icon from "../assets/table-icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [record, setRecord] = useState([]);
  const getRecord = async () => {
    try {
      await axios
        .get("https://638b959081df38ab346c7d6e.mockapi.io/recordings")
        .then((res) => {
          setRecord(res.data);
          console.log(res.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.head}>
          <p style={{ width: "79%" }}>Name</p>
          <p>Length</p>
          <p>Size</p>
          <p>Uploaded</p>
        </div>

        <div className={styles.records}>
          <div className={styles.detail}>
            <div className={styles.nameImg}>
              <img src={Icon} alt="icon" className={styles.img} />
            </div>
            <div className={styles.tableName}>
              <p className={styles.tableTitle}>Recording1name.mp3</p>
              <p className={styles.tableDescription}>
                Inactive recharge card, line barred
              </p>
            </div>
          </div>
          <div className={styles.property}>
            <p>4 mins</p>
            <p>50mb</p>
            <p>13/11/22</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
