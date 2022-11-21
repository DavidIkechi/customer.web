import React from "react";
import styles from "../styles/Table.module.scss";
import Icon from "../assets/table-icon.png";

function Table() {
  return (
    <div>
      <table className={styles.table}>
        <thead style={{ textAlign: "left" }}>
          <th style={{ width: "75%" }}>Name</th>
          <th>Length</th>
          <th>Size</th>
          <th>Uploaded</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
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
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>13/11/22</td>
          </tr>
          <tr>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
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
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>13/11/22</td>
          </tr>
          <tr>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
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
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>13/11/22</td>
          </tr>
          <tr>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
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
            </td>
            <td>4 mins</td>
            <td>50mb</td>
            <td>13/11/22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
