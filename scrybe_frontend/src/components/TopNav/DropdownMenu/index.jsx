import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import account from "./assets/account.jpg";
import logout from "./assets/logout.jpg";
import support from "./assets/support.jpg";
import styles from "./dropdown.module.scss";
function DropDownModal({ closeModal }) {
  return (
    <div className={styles.dropdown}>
      <div className={styles.opacity} onClick={closeModal}></div>
      <Link to="/account">
        <div className={styles.list}>
          <img src={account} alt="" />
          <p className={styles.p}>Account</p>
        </div>
      </Link>
      <div className={styles.list}>
        <img src={support} alt="" />
        <p className={styles.p}>Support</p>
      </div>
      <div className={styles.list}>
        <img src={logout} alt="" />
        <Link
          to="/signin"
          className={styles.p}
          onClick={() => {
            Cookies.remove("heedAccessToken");
            localStorage.removeItem("auth");
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default DropDownModal;
