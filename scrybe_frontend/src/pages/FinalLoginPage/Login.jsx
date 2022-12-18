import { React, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SnackBar from "../../components/SnackBar";
// import Loading from "../../components/Loading";
import styles from "./Login.module.scss";

import { useDispatch, useSelector } from "react-redux";
import ErrorHandler from "../../helpers/axioshelp/Utils/ErrorHandler";
import { loginUser } from "../../redux/user/userSlice";
import hidden from "./assets/hidden.png";
import logo from "./assets/logo.png";
import visible from "./assets/visible.png";

const Login = () => {
  // const [
  //   loginUser,
  //   {
  //     data: loginData,
  //     isSuccess: isLoginSuccess,
  //     isError: isLoginError,
  //     error: loginError,
  //   },
  // ] = useLoginUserMutation();
  const { userData, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);
  const [isValid, setIsValid] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });

  const navigate = useNavigate();

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
  }, [username, password]);

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
    dispatch(loginUser(formData));
  };

  // useEffect(() => {
  //   if (isLoginSuccess) {
  //     localStorage.setItem("heedAccessToken", loginData.access_token);
  //     localStorage.setItem("heedRefreshToken", loginData.refresh_token);
  //     Cookies.set("heedAccessToken", loginData.access_token);
  //     localStorage.setItem("heedAccessTokenType", loginData.token_type);
  //     window.location.href = "/dashboard";
  //   } else if (isLoginError) {
  //     setResponse(ErrorHandler(loginError));
  //   }
  // }, [isLoginError, isLoginSuccess, loginData, loginError, navigate]);

  useEffect(() => {
    if (status === "success") {
      window.location.href = "/dashboard";
    } else if (error) {
      setResponse(ErrorHandler(error));
    }
  }, [status, userData, error]);

  return (
    <>
      {response.message !== "" && (
        <SnackBar response={response} setResponse={setResponse} />
      )}
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
            <p>Please enter your details</p>
          </div>

          {/* <a href="/coming-soon" className={styles.googlego}>
            <img src={google} alt="google" />
            Sign in With google
          </a>

          <div className={styles.line}>
            <div className={styles.dash}></div>
            <p>or</p>
            <div className={styles.dash}></div>
          </div> */}

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div
              className={styles.forms}
              onClick={() => setEmailStateTest(true)}
            >
              <label htmlFor="email">Email</label>

              <input
                type="email"
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
            <p>Don't have an account yet?</p>
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
