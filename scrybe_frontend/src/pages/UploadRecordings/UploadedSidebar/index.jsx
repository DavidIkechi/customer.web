import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput";
import analysisIcon from "./imgs/analysis_icon.svg";
import closeIcon from "./imgs/closeIcon.svg";
import dropdown_arr from "./imgs/dropdownArr.svg";
import insightIcon from "./imgs/insight_icon.svg";
import ledabordIcon from "./imgs/ledabord_icon.svg";
import logo from "./imgs/logo.svg";
import monthAnalysisIcon from "./imgs/montAnalysis.svg";
import scrybeIcon from "./imgs/my_scrybe_icon.svg";
import settingsIcon from "./imgs/settings_icon.svg";
import usrAvatar from "./imgs/user_avatar.svg";
import styles from "./uploadedsidebar.module.scss";

const UploadedSidebar = ({ closeSidebar, toggleSidebar, getValue }) => {
  const [isToggled, setIsToggled] = React.useState(false);
  return (
    <div
      className={`${styles.UploadedSidebar} ${
        isToggled ? styles.arrowRotate : ""
      } ${toggleSidebar ? styles.showSidebar : ""} `}
    >
      <div className={styles.UploadedSidebar_header}>
        <div className={styles.UploadedSidebar_header_logo_vs_closeIcon}>
          <img src={logo} alt="logo" className={styles.logo} />
          <img
            src={closeIcon}
            alt="closeIcon"
            className={styles.SdiebarcloseIcon}
            onClick={closeSidebar}
          />
        </div>
        <div className={styles.UploadedSidebar_header_userInput}>
          <SearchInput
            className="UploadedSidebar_inputWrap"
            inputValue={getValue}
          />
        </div>
        <div className={styles.UploadedSidebar_header_lists}>
          <div className={styles.UploadedSidebar_header_lists_item}>
            <img src={scrybeIcon} alt="" />
            <Link to="#">My Scrybe</Link>
          </div>
          <div className={` ${styles.sidebar_link_active}`}>
            <img src={analysisIcon} alt="" />
            <Link to="#" className={styles.sidebar_link_active}>
              Analysis
            </Link>
          </div>
          <div className={styles["UploadedSidebar_header_lists_item_diff"]}>
            <div className={`${styles.sidebarTxt_dropdown_arr} `}>
              <div className={styles.sidebarDropDownListWrap}>
                <img src={insightIcon} alt="" />
                <p>Insights</p>
              </div>
              <img
                src={dropdown_arr}
                alt=""
                className={styles.dropdown_arr}
                onClick={() => setIsToggled(!isToggled)}
              />
            </div>
            <div className={styles.UploadedSidebar_header_lists_item_dropdown}>
              <div className={styles.sidebarDropDownList}>
                <img src={ledabordIcon} alt="" />
                <Link to="#">Leaderboard</Link>
              </div>
              <div className={styles.sidebarDropDownList}>
                <img src={monthAnalysisIcon} alt="" />
                <Link to="#">Monthly Analysis</Link>
              </div>
            </div>
          </div>
          <div className={styles.UploadedSidebar_header_lists_item}>
            <img src={settingsIcon} alt="" />
            <Link to="#">Settings</Link>
          </div>
        </div>
      </div>
      <div className={styles.UploadedSidebar__bottom}>
        <div className={styles.UploadedRecNavbar_user_desktop}>
          <img src={usrAvatar} alt="john doe" />
          <div className={styles.UploadedRecNavbar_user_desktop_nameDetails}>
            <div className={styles.UploadedRecNavbar_user_desktop_name_arr}>
              <p className={styles.name}>John Doe</p>
              <img src={dropdown_arr} alt="dropdown arrow" />
            </div>
            <p className={styles.workspace_name}>Office workspace</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// prop type
UploadedSidebar.propTypes = {
  toggleSidebar: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default UploadedSidebar;
