import React from "react";
import data from "./assets/data";
import { GridView, ListHeader, ListView } from "./component";
import SideBar from "./component/SideBar";
import styles from "./style.module.scss";

export default function History() {
  // const recordGrid = data.map((item) => (
  //   <Grid
  //     name={item.name}
  //     agent={item.agent}
  //     analysis={item.analysis}z
  //     date={item.date}
  //   />
  // ));

  // const recordList = data.map((item) => (
  //   <List
  //     name={item.name}
  //     agent={item.agent}
  //     analysis={item.analysis}
  //     date={item.date}
  //     time={item.time}
  //     lenght={item.lenght}
  //   />
  // ));

  // const [show, setShow] = useState(true);

  return (
    <div>
      <SideBar />
      <div className={styles.history__content}>
        <ListHeader />
      </div>
      {/* <Filter onClose={() => setShow(false)} show={show} />
      <div className={styles.record}>{recordGrid}</div>
      <div className={styles.list__div}>
        {recordList}
      </div> */}
    </div>
  );
}
