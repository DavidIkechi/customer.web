import { React } from "react";
import styles from "./comingSoon.module.scss";
import ComingSoonPNG from "./assets/comingSoon.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className={styles.signinContainer}>
        <img src={ComingSoonPNG} alt="coming soon png" />
        We are working hard on this feature... Kindly sigin with your email and
        password for now.
        <Link to="/login">
          <div>Back to Login</div>
        </Link>
      </div>
    </>
  );
};

export default Login;
