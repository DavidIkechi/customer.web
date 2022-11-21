/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import HelpSupportNav from "../help-support-nav/HelpSupportNav";
import Contact from "../contact/Contact";
import styles from "./PromotedArticles.module.scss";

function PromotedArticles() {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.general}>
        <HelpSupportNav
          text="Promoted Articles"
          route="/help-support-promoted-articles"
        />
        <Outlet />
        <Contact />
      </div>
    </div>
  );
}

export default PromotedArticles;
