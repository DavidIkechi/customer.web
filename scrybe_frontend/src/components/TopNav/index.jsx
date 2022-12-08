import axios from "axios";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal";
import SearchInput from "../SearchInput";
import DropDownModal from "./DropdownMenu";
import dropdown_arr from "./imgs/dropdownArr.svg";
import logo from "./imgs/logo.svg";
import toggleNavIcon from "./imgs/toggleNavIcon.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import styles from "./topbar.module.scss";
import DummyImg from "./imgs/dummy.png";
import { headers } from "../../helpers/axioshelp";

const TopNav = ({ openSidebar, search }) => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getUserAccount = async () => {
    const res = await axios.get("account", { headers });
    setCurrentUser(res.data);
  };

  React.useEffect(() => {
    getUserAccount();
  }, []);

  return (
    <div
      className={`${styles.TopNav} ${show ? styles.showDropup : ""} `}
      onClick={() => show && setShow(false)}
    >
      <div className={styles.TopNav_toggle}>
        <img src={toggleNavIcon} alt="" onClick={openSidebar} />
        {/* <img src={logo} alt="" /> */}
        <div className={`${styles.logoLink}`}>
          <img src={logo} alt="heed logo" />
          <p>Heed</p>
        </div>
      </div>
      <div className={styles.TopNav_search}>
        <SearchInput inputValue={search} />
      </div>
      <div className={styles.TopNav_user_btn}>
        <div className={styles.TopNav_user}>
          <div className={styles.TopNav_user_desktop}>
            <img
              className={styles.userimg}
              src={
                currentUser?.company_logo_url
                  ? currentUser?.company_logo_url
                  : DummyImg
              }
              alt="john doe"
            />
            <div className={styles.TopNav_user_desktop_nameDetails}>
              <div className={styles.TopNav_user_desktop_name_arr}>
                <p className={styles.name}>
                  {currentUser?.first_name
                    ? `${currentUser?.first_name} ${currentUser?.last_name}`
                    : "John Doe"}
                </p>
                <img
                  src={dropdown_arr}
                  alt="dropdown arrow"
                  onClick={() => setShow((prev) => !prev)}
                  className={styles.arrow}
                />
                {show && <DropDownModal closeModal={() => setShow(false)} />}
              </div>
              <p className={styles.workspace_name}>
                {currentUser?.company_name
                  ? currentUser?.company_name
                  : "Office workspace"}
              </p>
            </div>
          </div>
        </div>
        {currentUser && (
          <>
            {/* <NavLink > */}
            <div
              className={styles.TopNav_btnwrap}
              onClick={() => setModalOpen(true)}
            >
              <img src={uploadBtn_icon} alt="" />
              <button className={styles.TopNav_btn}>Upload</button>
            </div>
            {/* </NavLink> */}
            <Modal open={modalOpen} setOpen={setModalOpen} />
          </>
        )}

        <div className={styles.TopNav_user_mobile}>
          <img
            className={styles.userimg}
            src={
              currentUser?.company_logo_url
                ? currentUser?.company_logo_url
                : "img/dummy.png"
            }
            alt={currentUser?.first_name}
          />
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
