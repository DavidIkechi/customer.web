import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./nav.module.scss";
import logo from "../../assets/scrybe_logo_with_text.svg";

function NavBar() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked((pre) => !pre);
  }
  return (
    <nav className={styles.nav}>
      <div className={` ${styles.nav_content}`}>
        <div className={styles.nav__img}>
          <img src={logo} alt="Company Logo" />
        </div>

        <div className={styles.nav__links}>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/services">Service</NavLink>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/"> Pricing </NavLink>
          <NavLink to="/industry"> Industry</NavLink>
          <NavLink to="/">About Us</NavLink>
        </div>
        <div className={styles.nav__ctas}>
          <button type="button">Login</button>

          <button type="button">
            <NavLink to="/terms">Upgrade Plan</NavLink>
          </button>
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
