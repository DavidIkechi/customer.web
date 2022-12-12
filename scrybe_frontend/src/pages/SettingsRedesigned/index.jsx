import { useState } from "react";
import NewDesignSideBar from "../../components/NewDesignSidebar";
import TopNav from "../../components/TopNav";
import PersonalInformation from "./components/PersonalInformation";
import AccountSecurity from "./components/AccountSecurity";
import SubPageSelector from "./components/SubPageSelector";
import UserCard from "./components/UserCard";
import styles from "./SettingsRedesigned.module.scss";
import NotificationSubPage from "./components/NotificationSubPage";
import backIcon from "./assets/left_chevron.svg";

export default function Settings() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [currentSubPage, setCurrentSubPage] = useState("personal-information");
  const [mobileSubPageVisible, setMobileSubPageVisible] = useState(false);

  const subPageDictionary = {
    "personal-information": <PersonalInformation />,
    "account-security": <AccountSecurity />,
    "notification-sub-page": <NotificationSubPage />,
  };

  const closeSubPage = () => {
    setMobileSubPageVisible(false);
  };

  const openSubPage = () => {
    setMobileSubPageVisible(true);
  };

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
            <SubPageSelector
              setCurrentSubPage={setCurrentSubPage}
              openSubPage={openSubPage}
            />
            <div className={styles.delete__container}>
              <button className={styles.delete__button}>Delete Account</button>
            </div>
          </div>
          <div
            className={`${styles.subpage__container} ${
              mobileSubPageVisible ? styles.visibleSubPage : ""
            }`}
          >
            <div className={styles.plan}>
              <div className={styles.current__plan}>
                You are currently using the limited free plan.{" "}
              </div>
              <div className={styles.advertise__plan}>
                Go unlimited with Pro version
              </div>
            </div>
            <div className={styles.mobile__back__button}>
              <div
                className={styles.button__icon__container}
                onClick={closeSubPage}
              >
                <img src={backIcon} alt="back icon" />
              </div>
              <div className={styles.settings__title}>Settings</div>
            </div>
            {subPageDictionary[currentSubPage]
              ? subPageDictionary[currentSubPage]
              : "Invalid Option"}
          </div>
        </div>
      </div>
    </NewDesignSideBar>
  );
}
