/* eslint-disable react/react-in-jsx-scope */
import styles from "./Input.module.scss";
import search from "../assets/search.svg";

function Input() {
  return (
    <div className={styles.input}>
      <div>
        <img src={search} alt="search icon" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default Input;
