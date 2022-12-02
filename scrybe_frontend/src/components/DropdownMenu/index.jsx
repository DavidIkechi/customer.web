import account from "./assets/account.jpg";
import support from "./assets/support.jpg";
import logout from "./assets/logout.jpg";
import styles from "./dropdown.module.css";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
function DropDownModal({closeModal}) {
    return (  
      <div className={styles.dropdown}>
        <div className={styles.opacity} onClick={closeModal}></div>
        <div className={styles.list}>
          <img src={account} alt="" />
          <p className={styles.p}>Account</p>
        </div>
        <div className={styles.list}>
          <img src={support} alt="" />
          <p className={styles.p}>Support</p>
        </div>
        <div className={styles.list}>
        <img src={logout} alt="" />
          <Link to ="/logout" className={styles.p} onClick={()=> Cookie.remove("heedAccessToken")}>Logout</Link>
        </div>
      </div>
    );
}

export default DropDownModal;