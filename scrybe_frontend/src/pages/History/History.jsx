import React, { useState } from "react";
import Grid from "../../components/GridView/Grid";
import data from "../../HistoryData";
import styles from "./history.module.scss";
import List from "../../components/ListView/List";
import ListHeader from "../../components/ListHeader/ListHeader";
import Filter from "../../components/Filter/Filter";

export default function History() {
  const recordGrid = data.map((item) => (
    <Grid
      name={item.name}
      agent={item.agent}
      analysis={item.analysis}
      date={item.date}
    />
  ));

  const recordList = data.map((item) => (
    <List
      name={item.name}
      agent={item.agent}
      analysis={item.analysis}
      date={item.date}
      time={item.time}
      lenght={item.lenght}
    />
  ));

  const [show, setShow] = useState(true);

  return (
    <div className={styles.history}>
      <Filter onClose={() => setShow(false)} show={show} />
      <div className={styles.record}>{recordGrid}</div>
      <div className={styles.list__div}>
        <ListHeader />
        {recordList}
      </div>
    </div>
  );
}
