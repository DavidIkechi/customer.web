/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import HelpSupportNav from "../help-support-nav/HelpSupportNav";
import Contact from "../contact/Contact";
import styles from "./General.module.scss";

function General() {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.general}>
        <HelpSupportNav text="General" route="/help-support-general" />
        <Outlet />
        <Contact />
      </div>
    </div>
  );
}

export default General;
