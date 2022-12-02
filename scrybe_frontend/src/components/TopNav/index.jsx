import { PropTypes } from "prop-types";
import React from "react";
import SearchInput from "./SearchInput";
import dropdown_arr from "./imgs/dropdownArr.svg";
import logo from "./imgs/logo.svg";
import toggleNavIcon from "./imgs/toggleNavIcon.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import usrAvatar from "./imgs/user_avatar.svg";
import styles from "./uploadedNavbar.module.scss";
import { useState } from "react";
import DropDownModal from "../DropdownMenu";
import dropup from "../../components/DropdownMenu/assets/dropup.jpg"
const TopNav = ({ openSidebar, search }) => {
  const [show , setShow] = useState=(false);
  return (
    <div className={`${styles.TopNav} ${show ? styles.showDropup : ""} `}  onClick={() => show && setShow(false)}>
      <div className={styles.TopNav_toggle}>
        <img src={toggleNavIcon} alt="" onClick={openSidebar} />
        <img src={logo} alt="" />
      </div>
      <SearchInput
        className="TopNav_inputwrap"
        inputValue={search}
      />
      <div className={styles.TopNav_user_btn}>
        <div className={styles.TopNav_user}>
          <div className={styles.TopNav_user_desktop}>
            <img src={usrAvatar} alt="john doe" />
            <div className={styles.TopNav_user_desktop_nameDetails}>
              <div className={styles.TopNav_user_desktop_name_arr}>
                <p className={styles.name}>John Doe</p>
                <img src={dropdown_arr} alt="dropdown arrow"  onClick={() => setShow(prev => !prev)} className={styles.arrow}/>
                {show && (
                <DropDownModal closeModal={() => setShow(false)}/>
                )}
              </div>
              <p className={styles.workspace_name}>Office workspace</p>
            </div>
          </div>
        </div>
        <div className={styles.TopNav_btnwrap}>
          <img src={uploadBtn_icon} alt="" />
          <button className={styles.TopNav_btn}>Upload</button>
        </div>
        <div className={styles.TopNav_user_mobile}>
          <img src={usrAvatar} alt="john doe" />
        </div>
      </div>
    </div>
  );
};

// its prop type
TopNav.propTypes = {
  openSidebar: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default TopNav;
