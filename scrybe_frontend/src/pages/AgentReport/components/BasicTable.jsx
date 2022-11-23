import React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import styles from "../styles/AgentRecordings.module.scss";
// import Icon from "../assets/table-icon.png";

export default function BasicTable() {
  // function createData(name, length, size, uploaded) {
  //   return { name, length, size, uploaded };
  // }

  // const rows = [
  //   createData(
  //     {
  //       title: "Recording1name.mp3",
  //       description: "Inactive recharge card, line barred",
  //     },
  //     "4 mins",
  //     "50mb",
  //     "13/11/22"
  //   ),
  //   createData(
  //     {
  //       title: "Recording1name.mp3",
  //       description: "Inactive recharge card, line barred",
  //     },
  //     "4 mins",
  //     "50mb",
  //     "13/11/22"
  //   ),
  //   createData(
  //     {
  //       title: "Recording1name.mp3",
  //       description: "Inactive recharge card, line barred",
  //     },
  //     "4 mins",
  //     "50mb",
  //     "13/11/22"
  //   ),
  //   createData(
  //     {
  //       title: "Recording1name.mp3",
  //       description: "Inactive recharge card, line barred",
  //     },
  //     "4 mins",
  //     "50mb",
  //     "13/11/22"
  //   ),
  // ];
  return (
    <>
      {/* <TableContainer component={Paper} className={styles.plainTable}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#6A6A6A" }}>Name </TableCell>
              <TableCell align="right" style={{ color: "#6A6A6A" }}>
                Length
              </TableCell>
              <TableCell align="right" style={{ color: "#6A6A6A" }}>
                Size
              </TableCell>
              <TableCell align="right" style={{ color: "#6A6A6A" }}>
                Uploaded
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.nameImg}>
                      <img src={Icon} alt="icon" className={styles.img} />
                    </div>
                    <div>
                      <p className={styles.tableTitle}>{row.name.title}</p>
                      <p className={styles.tableDescription}>
                        {row.name.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right" style={{ color: "#6A6A6A" }}>
                  {row.length}
                </TableCell>
                <TableCell align="right" style={{ color: "#6A6A6A" }}>
                  {row.size}
                </TableCell>
                <TableCell align="right" style={{ color: "#6A6A6A" }}>
                  {row.uploaded}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
