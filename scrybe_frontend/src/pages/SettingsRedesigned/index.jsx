import { useState } from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import PersonalInformation from "./components/PersonalInformation";
import AccountSecurity from "./components/AccountSecurity";
import SubPageSelector from "./components/SubPageSelector";
import UserCard from "./components/UserCard";
import styles from "./SettingsRedesigned.module.scss";

export default function Settings() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [currentSubPage, setCurrentSubPage] = useState("personal-information");
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
            <SubPageSelector setCurrentSubPage={setCurrentSubPage} />
          </div>
          <div className={styles.subpage__container}>
            <div className={styles.plan}>
              <div className={styles.current__plan}>
                You are currently using the limited free plan.{" "}
              </div>
              <div className={styles.advertise__plan}>
                Go unlimited with Pro version
              </div>
            </div>
            {currentSubPage === "personal-information" ? (
              <PersonalInformation />
            ) : (
              <AccountSecurity />
            )}
          </div>
        </div>
        <button className={styles.delete__button}>Delete Account</button>
      </div>
    </NewDesignSideBar>
  );
}
