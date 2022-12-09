import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import account from "./assets/account.jpg";
import logout from "./assets/logout.jpg";
import support from "./assets/support.jpg";
import styles from "./dropdown.module.scss";
function DropDownModal({ closeModal }) {
  const [currentUser, setCurrentUser] = useState(null);
  const getUserAccount = async () => {
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
      },
    };
    const res = await axios.get("account", config);
    setCurrentUser(res.data);
  };
  useEffect(() => {
    getUserAccount();
  }, []);
  const signout = () => {
    Cookies.remove("heedAccessToken");
    localStorage.removeItem("heedAccessToken");
    localStorage.removeItem("heedRefreshToken");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("auth");
    localStorage.removeItem("heedAccessTokenType");
  };
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
      {currentUser && (
        <div className={styles.list}>
          <img src={logout} alt="" />
          <Link to="/signin" className={styles.p} onClick={signout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default DropDownModal;
