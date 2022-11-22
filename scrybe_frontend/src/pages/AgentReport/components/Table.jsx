import React from "react";
import styles from "../styles/Table.module.scss";
import Icon from "../assets/table-icon.png";

function Table() {
  return (
    <div>
      <table className={styles.table}>
        <thead style={{ textAlign: "left", marginBottom: 20 }}>
          <th style={{ width: "70%", marginRight: "5px" }}>Name</th>
          <th style={{ marginLeft: "5px", marginRight: "5px" }}>Length</th>
          <th style={{ marginLeft: "5px", marginRight: "5px" }}>Size</th>
          <th style={{ marginLeft: "5px", marginRight: "5px" }}>Uploaded</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
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
            <td style={{ paddingHorizontal: "5px" }}>4 mins</td>
            <td style={{ paddingHorizontal: "5px" }}>50mb</td>
            <td style={{ paddingHorizontal: "5px" }}>13/11/22</td>
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
