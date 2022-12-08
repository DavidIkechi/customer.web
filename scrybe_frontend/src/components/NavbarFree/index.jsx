import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/heed_logo_with_text.svg";
import ApiService from "../../helpers/axioshelp/apis";
import styles from "./nav.module.scss";

function NavBar() {
  const [clicked, setClicked] = useState(false);
  const [activeUser, setActiveUser] = useState(false);

  const fetchUser = async () => {
    try {
      const res = ApiService.Account();
      console.log(res);
      if (res.status === 200) {
        setActiveUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function handleClick() {
    setClicked((pre) => !pre);
  }

  return (
    <nav className={styles.nav}>
      <div className={` ${styles.nav_content}`}>
        <div className={styles.nav__img}>
          <Link to="/">
            {" "}
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>

        <div
          className={clicked ? styles.nav__active : styles.nav__mobile}
          onClick={() => setClicked(false)}
        >
          <div className={styles.nav__links}>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/pricing"> Pricing </NavLink>
            <NavLink to="/about-us">About Us</NavLink>
          </div>
          <div className={styles.nav__ctas}>
            <NavLink to="/signin" className={styles.ctas__button}>
              Login
            </NavLink>
            <NavLink to="/try" className={styles.ctas__button}>
              Try for Free
            </NavLink>
          </div>

          <div className={styles.nav__ctl}>
            <div className={styles.nav__img}>
              <img src={logo} alt="" />
            </div>
            <svg
              className={styles.nav__closed}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick}
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#1C1B1F"
              />
            </svg>
          </div>
        </div>
        <svg
          className={styles.nav__open}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
            fill="#1C1B1F"
          />
        </svg>
      </div>
    </nav>
  );
}

export default NavBar;
