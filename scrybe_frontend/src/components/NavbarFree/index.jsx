import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { GetAccount, LogOut } from "../../redux/features/users/service";
import { setToken } from "../../redux/features/users/userSlice";
import { dispatch } from "../../redux/store";
import styles from "./nav.module.scss";

function NavBar() {
  const [clicked, setClicked] = useState(false);
  const {
    user: currentUser,
    isLoading,
    token,
  } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(LogOut());
  };
  function handleClick() {
    setClicked((pre) => !pre);
  }

  if (!token) {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      const Token = localStorage.getItem("heedAccessToken");
      if (Token) {
        dispatch(setToken(Token));
        dispatch(GetAccount());
      }
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={` ${styles.nav_content}`}>
        <div className={styles.nav__img}>
          <Link to="/">
            {" "}
            <img
              src="https://res.cloudinary.com/djufngoed/image/upload/v1670428828/heed_logo_with_text_pbkrkv.webp"
              alt="Company Logo"
            />
          </Link>
        </div>

        <div
          className={clicked ? styles.nav__active : styles.nav__mobile}
          onClick={() => setClicked(false)}
        >
          <div className={styles.nav__links}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.activeTab : "")}
            >
              {" "}
              Home{" "}
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => (isActive ? styles.activeTab : "")}
            >
              {" "}
              Pricing{" "}
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? styles.activeTab : "")}
            >
              About Us
            </NavLink>
            {currentUser && <NavLink to="/dashboard">Dashboard</NavLink>}
          </div>
          <div className={styles.nav__ctas}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {currentUser ? (
                  <>
                    <NavLink
                      to="/"
                      className={`${styles.logoutBtn}`}
                      onClick={handleLogout}
                    >
                      {" "}
                      Logout{" "}
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={styles.ctas__button}>
                      Login
                    </NavLink>
                    <NavLink to="/try" className={styles.ctas__button}>
                      Try for Free
                    </NavLink>
                  </>
                )}
              </>
            )}
          </div>

          <div className={styles.nav__ctl}>
            <div className={styles.nav__img}>
              <img
                src="https://res.cloudinary.com/djufngoed/image/upload/v1670428828/heed_logo_with_text_pbkrkv.webp"
                alt=""
              />
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
