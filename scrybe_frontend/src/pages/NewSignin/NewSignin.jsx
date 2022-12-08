import { React, useState, useCallback, useEffect } from "react";
import SnackBar from "../../components/SnackBar";
import { Link, useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
import Cookies from "js-cookie";
import styles from "./NewSignin.module.scss";
import ApiService from "../../helpers/axioshelp/apis";
import ErrorHandler from "../../helpers/axioshelp/Utils/ErrorHandler";

import logo from "./assets/logo.png";
import google from "./assets/google.png";
import visible from "./assets/visible.png";
import hidden from "./assets/hidden.png";

const NewSignin = () => {
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

    // setIsLoading(true);

    try {
      const response = await ApiService.SignIn(formData);

      // setIsLoading(false)

      localStorage.setItem("heedAccessToken", response.data.access_token);

      localStorage.setItem("heedRefreshToken", response.data.refresh_token);

      Cookies.set("heedAccessToken", response.data.access_token);

      localStorage.setItem("heedAccessTokenType", response.data.token_type);

      localStorage.setItem("currentUserEmail", username);

      localStorage.setItem("auth", username);

      navigate("/dashboard");
    } catch (err) {
      // setIsLoading(false);

      setResponse(ErrorHandler(err));
    }
  };

  return (
    <>
      {response.message !== "" && (
        <SnackBar response={response} setResponse={setResponse} />
      )}
      <div className={styles.signinContainer}>
        <div className={styles.bgcontainer}>
          <div className={styles.text}>
            <p>...Speak, we listen</p>
            <p>
              Unlock insights and extract meaningful data from your customer
              support conversations
            </p>
          </div>
        </div>

        <div className={styles.inputsection}>
          <img src={logo} alt="heedLogo" />

          <div className={styles.greeting}>
            <h1>Welcome back Heeder</h1>
            <p>Please enter your details</p>
          </div>

          <a href="#" className={styles.googlego}>
            <img src={google} alt="google" />
            Sign in With google
          </a>

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

            <button disabled={!isValid}>Sign In</button>
          </form>

          <div className={styles.linkbottom}>
            <p>Don't have an account yet?</p>

            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSignin;
