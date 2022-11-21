import React from "react";
import dropdown_arr from "./imgs/dropdownArr.svg";
import logo from "./imgs/logo.svg";
import searchIcon from "./imgs/searchIcon.svg";
import toggleNavIcon from "./imgs/toggleNavIcon.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import usrAvatar from "./imgs/user_avatar.svg";
import styles from "./uploadedNavbar.module.scss";

const UploadedNavbar = () => {
  return (
    <div className={styles.UploadedRecNavbar}>
      <div className={styles.UploadedRecNavbar_toggle}>
        <img src={toggleNavIcon} alt="" />
        <img src={logo} alt="" />
      </div>
      <div className={styles.UploadedRecNavbar_inputwrap}>
        <img src={searchIcon} alt="" className={styles.searchIcon} />
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.UploadedRecNavbar_user_btn}>
        <div className={styles.UploadedRecNavbar_user}>
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
        <div className={styles.UploadedNavbarRec_btnwrap}>
          <img src={uploadBtn_icon} alt="" />
          <button className={styles.UploadedNavbarRec_btn}>Upload</button>
        </div>
        <div className={styles.UploadedRecNavbar_user_mobile}>
          <img src={usrAvatar} alt="john doe" />
        </div>
      </div>
    </div>
  );
};

export default UploadedNavbar;
