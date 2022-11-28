import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SideBar.module.scss";
import logoSVG from "./assets/logo.svg";
import arrowDown from "./assets/icons/arrow-down.svg";
import myScrybe from "./assets/icons/my-scrybe.svg";
import analysis from "./assets/icons/analysis.svg";
import insight from "./assets/icons/insight.svg";
import leaderboard from "./assets/icons/leaderboard.svg";
import monthlyAnalysis from "./assets/icons/monthly-analysis.svg";
import settings from "./assets/icons/settings.svg";

function SideBar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.sidebar__container}>
      <div className={`${styles.sidebar} ${sidebarOpen && styles.open}`}>
        <img
          src={arrowDown}
          alt="arrow icon"
          className={`${styles.navOpener} ${sidebarOpen && styles.rotate}`}
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        />
        <NavLink
          to="/"
          className={
            sidebarOpen
              ? `${styles.logoLink} ${styles.open}`
              : `${styles.logoLink}`
          }
        >
          <img src={logoSVG} alt="Scrybe logo" />
          <p>Scrybe</p>
        </NavLink>
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
            <img src={analysis} alt="analysis icon" />
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
}

SideBar.propTypes = {
  children: PropTypes.node,
};

export default SideBar;
