import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
// import styles from "./SideBar.module.scss";
import closeIcon from "./icons/closeIcon.svg";
import logoSVG from "./icons/logo.svg";
// import insight from "./assets/icons/insight.svg";
import leaderboard from "./icons/leaderboard.svg";
// import monthlyAnalysis from "./assets/icons/monthly-analysis.svg";
import analysis from "./icons/analysis.svg";
import dropdown_arr from "./icons/dropdownArr.svg";
import myScrybe from "./icons/my-scrybe.svg";
import settings from "./icons/settings.svg";
import usrAvatar from "./icons/user_avatar.svg";

import axios from "axios";
import styles from "./generalSidebar.module.scss";

/**
 * Wrap your component with this component to get a sidebar with a logo, a search input field and a list of links.
 * getValue is a function that returns the value of the search input field
 * @param {getValue} function
 * @useage getValue={(e) => console.log(e)} you will get the value of the search input field
 * @param {needSearchMobile} boolean
 * use this prop to determine if the search input field should be rendered on mobile screens or not!
 * @param {needSearchDesktop} boolean
 * use this prop to determine if the search input field should be rendered on desktop screens or not!
 * @param {closeSidebar} function
 * use this prop to close the sidebar on mobile screens
 * @param {toggleSidebar} boolean
 * use this prop to determine if the sidebar should be open or closed on mobile screens when the hamburger icon is clicked from navbar
 * @returns a wrapper component with a sidebar and all the props passed to it
 */
function NewDesignSideBar({
  children,
  getValue,
  needSearchMobile,
  needSearchDesktop,
  closeSidebar,
  toggleSidebar,
}) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const f = async () => {
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
      },
    };
    const res = await axios.get("account", config);
    console.log(res);
    // const activeUser = fetchCurrentUser();
    // console.log(activeUser);
    setCurrentUser(res.data);
  };
  useEffect(() => {
    {
      /**
          api_key
      : 
      "1fa2ba5a-5f0a-4fce-a663-44d64ee3b853"
      company_address
      : 
      null
      company_logo_url
      : 
      null
      company_name
      : 
      "zurikoko"
      email
      : 
      "dprincecoder@gmail.com"
      first_name
      : 
      "Prince"
      last_name
      : 
      "Azubuike"
      phone_number
      : 
      null
  */
    }
    f();
  }, []);
  return (
    <div
      className={`${styles.generalSidebar}
      } ${toggleSidebar ? styles.showSidebar : ""} `}
    >
      <div className={styles.generalSidebar_header}>
        <div className={styles.generalSidebar_itemsFlex}>
          <div className={styles.generalSidebar_header_logo_vs_closeIcon}>
            <NavLink to="/" className={`${styles.logoLink}`}>
              <img src={logoSVG} alt="heed logo" />
              <p>Heed</p>
            </NavLink>
            <img
              src={closeIcon}
              alt="closeIcon"
              className={styles.SidebarcloseIcon}
              onClick={closeSidebar}
            />
          </div>
          <div
            className={` ${styles[`${needSearchDesktop}`]} ${
              styles[`${needSearchMobile}`]
            }`}
          >
            <SearchInput inputValue={getValue} />
          </div>
          <div className={styles.navLinks}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
            >
              <img src={myScrybe} alt="myScrybe icon" />
              <p>Overview</p>
            </NavLink>
            <NavLink
              to="/uploaded-recordings"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
            >
              <img src={analysis} alt="analysis icon" />
              <p>Analysis</p>
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink} `
                  : `${styles.inactive} ${styles.navLink}`
              }
            >
              <img src={leaderboard} alt="leaderboard icon" />
              <p>Leaderboard</p>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
            >
              <img src={settings} alt="settings icon" />
              <p>Settings</p>
            </NavLink>
          </div>
        </div>
        <div className={styles.generalSidebar__bottom}>
          <div className={styles.generalSidebar_user_desktop}>
            <img
              src={
                currentUser?.company_logo_url
                  ? currentUser?.company_logo_url
                  : usrAvatar
              }
              alt={currentUser?.name}
            />
            <div className={styles.generalSidebar_user_desktop_nameDetails}>
              <div className={styles.generalSidebar_user_desktop_name_arr}>
                <p className={styles.name}>
                  {currentUser?.first_name
                    ? `${currentUser?.first_name} ${currentUser?.last_name}`
                    : "John Doe"}
                </p>
                <img src={dropdown_arr} alt="dropdown arrow" />
              </div>
              <p className={styles.workspace_name}>
                {currentUser?.company_name
                  ? currentUser?.company_name
                  : "Office workspace"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default NewDesignSideBar;
