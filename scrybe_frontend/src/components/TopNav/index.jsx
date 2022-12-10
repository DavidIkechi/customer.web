import { PropTypes } from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../helpers/axioshelp/apis";
import IsLoadingSkeleton from "./LoadingSkeleton";
import Modal from "../Modal";
import SearchInput from "../SearchInput";
import DropDownModal from "./DropdownMenu";
import dropdown_arr from "./imgs/dropdownArr.svg";
import DummyImg from "./imgs/dummy.png";
import logo from "./imgs/logo.svg";
import toggleNavIcon from "./imgs/toggleNavIcon.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import styles from "./topbar.module.scss";

const TopNav = ({ openSidebar, search }) => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserAccount = async () => {
    const res = await ApiService.Account();
    setCurrentUser(res.data);
  };

  useEffect(() => {
    getUserAccount();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [currentUser]);

  return (
    <div
      className={`${styles.TopNav} ${show ? styles.showDropup : ""} `}
      onClick={() => show && setShow(false)}
    >
      <div className={styles.TopNav_toggle}>
        <img src={toggleNavIcon} alt="" onClick={openSidebar} />
        {/* <img src={logo} alt="" /> */}
        <Link to="/" className={`${styles.logoLink}`}>
          <img src={logo} alt="heed logo" />
          <p>Heed</p>
        </Link>
      </div>
      <div className={styles.TopNav_search}>
        <SearchInput inputValue={search} />
      </div>
      {loading ? (
        <IsLoadingSkeleton />
      ) : (
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
                  : DummyImg
              }
              alt={currentUser?.first_name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// its prop type
TopNav.propTypes = {
  openSidebar: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

export default TopNav;
