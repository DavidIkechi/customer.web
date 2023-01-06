import { React, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackBar from "../../components/SnackBar";
// import Loading from "../../components/Loading";
import styles from "./Login.module.scss";

import { useDispatch, useSelector } from "react-redux";
// import { useFetchUserQuery } from "../../redux/user/rtkquery";
import {
  auth,
  provider,
  signInWithPopup,
} from "../../redux/axios/Utils/Firebase";
import { SignIn, UserGoogleLogin } from "../../redux/features/users/service";
import google from "./assets/google.png";
import hidden from "./assets/hidden.png";
import logo from "./assets/logo.png";
import visible from "./assets/visible.png";

const Login = () => {
  // const { userData, status, error } = useSelector((state) =>
  //   selectUserState(state)
  // );
  const { user } = useSelector((state) => state.user);
  // const { data, isSuccess, error: hasError } = useFetchUserQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailTest = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  const testerB = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  const validate = useCallback(() => {
    if (
      username.length >= 1 &&
      password.length >= 1 &&
      passStateTest &&
      emailStateTest
    ) {
      return true;
    }
  }, [username.length, password.length, passStateTest, emailStateTest]);

  useEffect(() => {
    const isValid = validate();
    setIsValid(isValid);
  }, [validate, username, password]);

  const passwordVisibility = () => {
    setVisibility(!visibility);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    tester(e, emailTest, setEmailStateTest);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    testerB(e, passwordTest, setPassStateTest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    // login user redux hook
    dispatch(SignIn(formData));
  };

  const GoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const email = result.user.email;

        console.log(email);
        dispatch(UserGoogleLogin(email));
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  }, [user, navigate]);

  return (
    <>
      <div className={styles.signinContainer}>
        <div className={styles.bgcontainer}>
          <div className={styles.text}>
            <p>...Speak, we listen</p>
            <p>Unlock insight and meaningful data from team call records.</p>
          </div>
        </div>

        <div className={styles.inputsection}>
          <Link to="/">
            <img src={logo} alt="heedLogo" />
          </Link>

          <div className={styles.greeting}>
            <h1>Welcome back Heeder</h1>
          </div>

          <div className={styles.googlego} onClick={() => GoogleLogin()}>
            <img src={google} alt="google" />
            Sign in With google
          </div>

          <div className={styles.line}>
            <div className={styles.dash}></div>
            <p>or</p>
            <div className={styles.dash}></div>
          </div>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div
              className={styles.forms}
              onClick={() => setEmailStateTest(true)}
            >
              <label htmlFor="email">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your company email"
                onChange={handleUsername}
                value={username}
                className={emailStateTest ? `${styles.br_err}` : ""}
              />
              {!emailStateTest && (
                <p className={styles.err}>
                  Please enter a correct company email{" "}
                </p>
              )}
            </div>

            <div
              className={`${styles.forms} ${styles.pass}`}
              onClick={() => setPassStateTest(true)}
            >
              <label htmlFor="password">Password</label>

              <input
                placeholder="Password atleast 8 characters"
                onChange={handlePassword}
                type={visibility ? "text" : "password"}
                value={password}
                className={passStateTest ? `${styles.br_err}` : ""}
              />

              <img
                src={visibility ? visible : hidden}
                alt="hidden"
                onClick={passwordVisibility}
              />

              {!passStateTest && (
                <p className={styles.err}>
                  Password must contain atleast 8 characters
                </p>
              )}
            </div>

            <div className={styles.checkbox}>
              <div>
                <input type="checkbox" />
                <p>Remember me</p>
              </div>
              <Link to="/forget-password">Forgot Password</Link>
            </div>

            <button type="submit" disabled={!isValid}>
              Sign In
            </button>
          </form>

          <div className={styles.linkbottom}>
            <p style={{ marginRight: "5px" }}>Don't have an account yet?</p>{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
