import { Link } from "react-router-dom";
import styles from "./HelpSupportNav.module.scss";
import search from "../assets/search.svg";
import icon from "../assets/Icon.svg";
import PropTypes from "prop-types";

function HelpSupportNav({ text, setDisplay }) {
  const handleClick = () => {
    if (setDisplay !== undefined) {
      setDisplay(true);
    }
  };

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav}>
        <Link to={"/help-support"}>Help and Support</Link>
        <img src={icon} alt="" />
        <span onClick={handleClick}>{text}</span>
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

HelpSupportNav.propTypes = {
  text: PropTypes.string.isRequired,
  setDisplay: PropTypes.func,
};

export default HelpSupportNav;
