import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, resetUser } from "../../redux/user/userSlice";
import account from "./assets/account.jpg";
import logout from "./assets/logout.jpg";
import support from "./assets/support.jpg";
import styles from "./dropdown.module.scss";
function DropDownModal({ closeModal }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logoutUser(), resetUser());
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
      {user && (
        <div className={styles.list}>
          <img src={logout} alt="" />
          <Link to="/login" className={styles.p} onClick={signout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default DropDownModal;
