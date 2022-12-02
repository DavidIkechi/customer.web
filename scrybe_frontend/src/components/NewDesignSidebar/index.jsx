import { PropTypes } from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
// import styles from "./SideBar.module.scss";
import closeIcon from "./assets/icons/closeIcon.svg";
import logoSVG from "./assets/logo.svg";
// import insight from "./assets/icons/insight.svg";
import leaderboard from "./assets/icons/leaderboard.svg";
// import monthlyAnalysis from "./assets/icons/monthly-analysis.svg";
import analysis from "./assets/icons/analysis.svg";
import myScrybe from "./assets/icons/my-scrybe.svg";
import settings from "./assets/icons/settings.svg";
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
  // const [isToggled, setIsToggled] = React.useState(false);
  console.log("toggleSidebar", toggleSidebar);
  return (
    <div
      className={`${styles.generalSidebar}
      } ${toggleSidebar ? styles.showSidebar : ""} `}
    >
      <div className={styles.generalSidebar_header}>
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
            to="/sentiment-analysis"
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
      {children}
    </div>
  );
}

// prop type
NewDesignSideBar.propTypes = {
  toggleSidebar: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default NewDesignSideBar;
