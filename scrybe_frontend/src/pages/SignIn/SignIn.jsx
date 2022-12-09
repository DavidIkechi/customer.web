import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthApi from "../../App";
import Loading from "../../components/Loading";
import SnackBar from "../../components/SnackBar";
import ApiService from "../../helpers/axioshelp/apis";
import ErrorHandler from "../../helpers/axioshelp/Utils/ErrorHandler";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignIn.module.scss";
import heedLogo from "./assets/heedLogo.png";
import googleLogo from "./assets/googleLogo.png";

function Signin() {
  const emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/);
  const Auth = React.useContext(AuthApi);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleInputUserName = (e) => {
    setName(e.target.value);
    tester(e, emailTest, setEmailStateTest);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
    testerB(e, passwordTest, setPassStateTest);
  };

  useEffect(() => {
    const isValid = validate();
    setIsValid(isValid);
  }, [validate, username, password]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "content-type": "Application/json",
      },
    };
    setIsLoading(true);
    await ApiService.SignIn(formData)
      .then((response) => {
        setIsLoading(false);

        localStorage.setItem("heedAccessToken", response.data.access_token);
        localStorage.setItem("heedRefreshToken", response.data.refresh_token);
        Cookies.set("heedAccessToken", response.data.access_token);
        localStorage.setItem("heedAccessTokenType", response.data.token_type);
        localStorage.setItem("currentUserEmail", username);
        localStorage.setItem("auth", username);
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        setIsLoading(false);
        setResponse(ErrorHandler(err));
      });
  };

  return (
    <>
      {response.message !== "" && (
        <SnackBar response={response} setResponse={setResponse} />
      )}
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <img className={styles.heedLogo} src={heedLogo} alt="logo" />
            <h1>Welcome back</h1>
            <h3>Please enter your details</h3>
            <form onSubmit={handleSubmit}>
              <label className="googleSignup-wrapper" htmlFor="googleSignup">
                <input
                  className=""
                  type="text"
                  placeholder="Sign up with google"
                />
                <img src={googleLogo} alt="google-logo" />
              </label>

              <div
                className={styles.fieldss}
                onClick={() => setEmailStateTest(true)}
              >
                <label
                  data-error-msg="Please enter a correct company email address"
                  className={
                    emailStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your company email"
                  className={
                    emailStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={username}
                  onChange={handleInputUserName}
                  required
                />

                {!emailStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Please enter a correct email address
                  </p>
                )}
              </div>
              {/* <p className={styles.errorMsg}>{errors.email?.message}</p> */}
              <div
                className={styles.fieldss}
                onClick={() => setPassStateTest(true)}
              >
                <label
                  className={
                    passStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password at least 8 characters"
                  className={
                    passStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={password}
                  onChange={handleInputPassword}
                  required
                />
                {!passStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Password must be at least 8 characters
                  </p>
                )}
                {/* <p className={styles.errorMsg}>{errors.password?.message}</p> */}
              </div>
              <div className={`${styles.accept} ${styles.remember}`}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" name="" id="" />
                  <span className={styles.rememberSpan}>Remember me</span>
                </div>
                <NavLink
                  to={"/forget-password"}
                  className={styles.rememberForget}
                >
                  Forgot password?
                </NavLink>
              </div>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <input
                    type="submit"
                    value="Sign in"
                    className={`${styles.submitValid}`}
                    disabled={!isValid}
                  />
                </>
              )}
              <p>
                Don’t have an account?
                <NavLink to={"/create-account"}>Sign up</NavLink>
              </p>
            </form>
          </div>
          <div className={styles.second}>
            <img src={footerImg} alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Signin;
