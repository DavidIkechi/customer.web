import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import closeIcon from "./icons/closeIcon.svg";
import dropdown_arr from "./icons/dropdownArr.svg";
import DummyImg from "./icons/dummy.png";
import logoSVG from "./icons/logo.svg";

import DropDownModal from "../DropdownMenu";
import SearchInput from "../SearchInput";
import styles from "./generalSidebar.module.scss";

import { useSelector } from "react-redux";
import TopNav from "../TopNav";

/**
 * Wrap your component with this component to get a sidebar with a logo, a search input field and a list of links.
 * search is the value of the search input field
 * @param {search} string
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
function NewDesignSideBar({ children, needSearchMobile, needSearchDesktop }) {
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { searchQuery } = useSelector((state) => state.util);
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
              onClick={() => setToggleSidebar(!toggleSidebar)}
            />
          </div>
          <div
            className={` ${styles[`${needSearchDesktop}`]} ${
              styles[`${needSearchMobile}`]
            }`}
          >
            <SearchInput inputValue={searchQuery} />
          </div>
          <div className={styles.navLinks}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
              onClick={() => setToggleSidebar(!toggleSidebar)}
            >
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670577828/my-scrybe_zxxyrj.webp"
                alt="myScrybe icon"
              />
              <p>Overview</p>
            </NavLink>
            <NavLink
              to="/uploaded-recordings"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
              onClick={() => setToggleSidebar(!toggleSidebar)}
            >
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670577829/analysis_gisqdf.webp"
                alt="analysis icon"
              />
              <p>Analysis</p>
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink} `
                  : `${styles.inactive} ${styles.navLink}`
              }
              onClick={() => setToggleSidebar(!toggleSidebar)}
            >
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670577828/leaderboard_kqe7de.webp"
                alt="leaderboard icon"
              />
              <p>Leaderboard</p>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navLink}`
                  : `${styles.inactive} ${styles.navLink}`
              }
              onClick={() => setToggleSidebar(!toggleSidebar)}
            >
              <img
                src="https://res.cloudinary.com/dvm7gjjp8/image/upload/v1670577828/settings_wzhu1l.webp"
                alt="settings icon"
              />
              <p>Settings</p>
            </NavLink>
          </div>
        </div>
        <div className={styles.generalSidebar__bottom}>
          {user ? (
            <div className={styles.generalSidebar_user_desktop}>
              <img
                className={styles.userimg}
                src={user?.company_logo_url ? user?.company_logo_url : DummyImg}
                alt={user?.first_name}
              />
              <div className={styles.generalSidebar_user_desktop_nameDetails}>
                <div className={styles.generalSidebar_user_desktop_name_arr}>
                  <Link to="/account" className={styles.name}>
                    {user?.first_name} {user?.last_name}
                  </Link>
                  <img
                    src={dropdown_arr}
                    alt="dropdown arrow"
                    onClick={() => setShow((prev) => !prev)}
                    className={styles.arrow}
                  />
                  {show && <DropDownModal closeModal={() => setShow(false)} />}
                </div>
                <p className={styles.workspace_name}>{user?.company_name}</p>
              </div>
            </div>
          ) : (
            <div className={styles.generalSidebar_user_desktop}>
              <img className={styles.userimg} src={DummyImg} alt="John Doe" />
              <div className={styles.generalSidebar_user_desktop_nameDetails}>
                <div className={styles.generalSidebar_user_desktop_name_arr}>
                  <p className={styles.name}>John Doe</p>
                  <img
                    src={dropdown_arr}
                    alt="dropdown arrow"
                    onClick={() => setShow((prev) => !prev)}
                    className={styles.arrow}
                  />
                </div>
                <p className={styles.workspace_name}>Office workspace</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightChild}>
        <TopNav
          openSidebar={() => {
            setToggleSidebar(!toggleSidebar);
          }}
          search={searchQuery}
        />
        {children}
      </div>
    </div>
  );
}

export default NewDesignSideBar;
