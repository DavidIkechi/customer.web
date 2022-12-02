import React, { useEffect } from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignIn.module.scss";
import AuthApi from "../../App";
import { Navigate } from "react-router-dom";
import { useCallback } from "react";
import Cookie from "js-cookie";
function Signin() {
  const emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const passwordTest = new RegExp(/^[a-zA-Z]{8,}$/);
  const Auth = React.useContext(AuthApi);
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
    console.log(emailStateTest);
  };
  const testerB = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
    console.log(passStateTest);
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
  }, [validate]);
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await axios
      .post("login", formData, config)

      .then((response) => {
        // console.log(response);

        const acessToken = response.data.access_token;
        Cookie.set("heedAccessToken", response?.data?.access_token);
        // localStorage.setItem("accessToken", acessToken);

        // console.log(response.data.access_token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["access_token"]}`;

        setNavigate(true);
      })

      .catch((error) => {});
  };
  // console.log(response.data);
  // Cookies.set("token", response.data.access_token);

  if (navigate) {
    return <Navigate to="/account" />;
  }

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div
            className={`${styles.first} ${styles.signin} ${styles.otherThanSignup}`}
          >
            <h1>Welcome back, Heed!</h1>
            <h3>Please enter your details</h3>
            <form onSubmit={handleSubmit}>
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
              <input
                type="submit"
                value="Sign in"
                className={`${styles.submitValid}`}
                disabled={!isValid}
              />
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
