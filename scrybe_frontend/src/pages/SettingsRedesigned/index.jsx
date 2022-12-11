import { useState } from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import SubPageSelector from "./components/SubPageSelector";
import UserCard from "./components/UserCard";
import styles from "./SettingsRedesigned.module.scss";

export default function Settings() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <NewDesignSideBar>
      <div className={styles.page__container}>
        <TopNav
          openSidebar={() => {
            setToggleSidebar(!toggleSidebar);
          }}
        />
        <div className={styles.inner__page__container}>
          <div className={styles.subpage__selector__container}>
            <div className={styles.title}>Settings</div>
            <UserCard />
            <SubPageSelector />
          </div>
          <div className={styles.subpage__container}></div>
        </div>
      </div>
    </NewDesignSideBar>
  );
}
