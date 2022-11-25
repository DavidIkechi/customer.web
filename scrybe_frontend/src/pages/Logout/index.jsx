import React from "react";
import logoutIllusration from "./assets/logout-illustration.png";
import logoWithText from "../../assets/scrybe_logo_with_text.svg";
import logoutStyles from "./logout.module.scss";

function Logout() {
  return (
    <div className={logoutStyles.logout}>
      <div className={logoutStyles.logo__div}>
        <img src={logoWithText} alt="Scrybe logo" />
      </div>
      <div>
        <div className={logoutStyles.login_form__div}>
          <form>
            <div className={logoutStyles.login_header__div}>
              <h1>You’ve succesfully signed out.</h1>
              <p>Please enter your details to login again</p>
            </div>
            <div className={logoutStyles.login_fields__div}>
              <label htmlFor="email">
                <span>Email</span>
                <input type="email" id="email" name="email" />
              </label>
              <label htmlFor="password">
                <span>Password</span>
                <input type="password" id="password" name="password" />
              </label>
            </div>
            <div className={logoutStyles.login_options__div}>
              <label htmlFor="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  value="true"
                />
                <span>Remember me</span>
              </label>
              <button type="button">Forgot Password</button>
            </div>
            <label htmlFor="signin-btn">
              <input
                type="button"
                id="signin-btn"
                value="Sign in"
                name="signin-btn"
              />
            </label>
          </form>
          <p>
            Don’t have an account?
            <span> Sign up</span>
          </p>
        </div>
        <div className={logoutStyles.desktop_illustration__div}>
          <img src={logoutIllusration} alt="logout vector illustration" />
        </div>
      </div>
    </div>
  );
}

export default Logout;
