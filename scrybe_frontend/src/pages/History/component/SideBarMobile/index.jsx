import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SideBarMobile.module.scss";
import logoSVG from "./assets/logo.svg";
import { analysisIcon, closeIcon, profileSibar } from "../../assets/images";
import myScrybe from "./assets/icons/my-scrybe.svg";
import insight from "./assets/icons/insight.svg";
import leaderboard from "./assets/icons/leaderboard.svg";
import monthlyAnalysis from "./assets/icons/monthly-analysis.svg";
import settings from "./assets/icons/settings.svg";

const SideBar = React.forwardRef(({ children }, refed) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.sidebarMobile__container}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.close : ""}`}>
        <div className={styles.inputWithIcon}>
          <input type="text" name="" id="search-bar" placeholder="Search" />
        </div>
        <div className={styles.profile}>
          <div className={styles.profileSidebar}>
            <img src={profileSibar} alt="" />
            <div className="name">
              <h3>Jane Doe</h3>
              <p>Office workspace</p>
            </div>
            <span>❯</span>
          </div>
        </div>
        <div className={styles.logo__con}>
          <img
            src={closeIcon}
            ref={refed}
            alt="arrow icon"
            className={`${styles.navOpener} ${
              sidebarOpen ? styles.rotate : ""
            }`}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          />

          <NavLink
            to="/history"
            className={
              sidebarOpen
                ? `${styles.logoLink} ${styles.open}`
                : `${styles.logoLink}`
            }
          >
            <img src={logoSVG} alt="Scrybe logo" />
            <p>Heed</p>
          </NavLink>
        </div>
        <div className={styles.navLinks}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
            }
          >
            <img src={myScrybe} alt="myScrybe icon" />
            <p>My Scrybe</p>
          </NavLink>
          <NavLink
            to="/sentiment-analysis"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
            }
          >
            <img src={analysisIcon} alt="analysis icon" />
            <p>Analysis</p>
          </NavLink>
          <NavLink
            to="./"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
            }
          >
            <img src={insight} alt="insight icon" />
            <p>Insight</p>
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
            }
          >
            <img src={leaderboard} alt="leaderboard icon" />
            <p>Leaderboard</p>
          </NavLink>
          <NavLink
            to="/sentiment-analysis/monthly-analysis"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
            }
          >
            <img src={monthlyAnalysis} alt="monthly analysis icon" />
            <p>Monthly Analysis</p>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
                : `${styles.inactive} ${styles.navLink} ${
                    sidebarOpen && styles.open
                  }`
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
});

SideBar.propTypes = {
  children: PropTypes.node,
};

export default SideBar;
