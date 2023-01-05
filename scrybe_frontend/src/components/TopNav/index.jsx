import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDownModal from "../DropdownMenu";
import { NavSkeleton } from "../LoadingSkeleton";
import Modal from "../Modal";
import SearchInput from "../SearchInput";
import SnackBar from "../SnackBar";
import dropdown_arr from "./imgs/dropdownArr.svg";
import DummyImg from "./imgs/dummy.png";
import logo from "./imgs/logo.svg";
import toggleNavIcon from "./imgs/toggleNavIcon.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import styles from "./topbar.module.scss";

const TopNav = ({ openSidebar, search }) => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div
      className={`${styles.TopNav} ${show ? styles.showDropup : ""} `}
      onClick={() => show && setShow(false)}
    >
      {response.message !== "" && (
        <SnackBar response={response} setResponse={setResponse} />
      )}
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
      <div className={styles.TopNav_user_btn}>
        {!loading ? (
          <div className={styles.TopNav_user}>
            <div className={styles.TopNav_user_desktop}>
              <img
                className={styles.userimg}
                src={user?.company_logo_url ? user?.company_logo_url : DummyImg}
                alt={user?.first_name}
              />
              <div className={styles.TopNav_user_desktop_nameDetails}>
                <div className={styles.TopNav_user_desktop_name_arr}>
                  <p className={styles.name}>
                    {user?.first_name} {user?.last_name}
                  </p>
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
          </div>
        ) : (
          // <div className={styles.TopNav_user}>
          //   <div className={styles.TopNav_user_desktop}>
          //     <img className={styles.userimg} src={DummyImg} alt="john doe" />
          //     <div className={styles.TopNav_user_desktop_nameDetails}>
          //       <div className={styles.TopNav_user_desktop_name_arr}>
          //         <p className={styles.name}>John Doe</p>
          //       </div>
          //       <p className={styles.workspace_name}>Office workspace</p>
          //     </div>
          //   </div>
          // </div>
          <NavSkeleton />
        )}
        {user && (
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
            src={user?.company_logo_url ? user?.company_logo_url : DummyImg}
            alt={user?.first_name}
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
