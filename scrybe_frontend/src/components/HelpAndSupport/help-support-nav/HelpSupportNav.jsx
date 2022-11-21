/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./HelpSupportNav.module.scss";
import search from "../assets/search.svg";
import icon from "../assets/Icon.svg";

function HelpSupportNav({ text, route }) {
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav}>
        <Link to="/help-support">Help and Support</Link>
        <img src={icon} alt="" />
        <Link to={route}>{text}</Link>
      </div>

      <div className={styles.input}>
        <div>
          <img src={search} alt="search icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  );
}

export default HelpSupportNav;
