import React from "react";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import AccountPageCss from "./AccountSettings.module.scss";
import Footer from "../../../../components/footer/index";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <div className="">
      <RedirectNav />
      <div className={AccountPageCss.AccountPage_wrapper}>
        <div className={AccountPageCss.AccountPage_header}>
          <h2>Account security</h2>
          <p>Change your password</p>
        </div>
        <form action="" className={AccountPageCss.form}>
          <div className={AccountPageCss.formGroup}>
            <label htmlFor="Password">Enter new password:</label>
            <input
              type="password"
              id="Password"
              placeholder="Enter a new password"
            />
          </div>
          <div className={AccountPageCss.formGroup}>
            <label htmlFor="confirmPassword">Retype password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter Password again"
            />
          </div>
          <div className={AccountPageCss.formSubmit}>
            <button type="submit">Save changes</button>
          </div>
        </form>
        <div className={AccountPageCss.apps}>
          <h2>Connected Apps</h2>
          <div className={AccountPageCss.app}>
            <div className={AccountPageCss.appsList}>
              <h3>Google.com</h3>
              <p>Signed in on {currentDate}</p>
            </div>
            <Link to="">Disconnect App</Link>
          </div>
        </div>
      </div>
      <div className={AccountPageCss.subpages_footer}>
        <Footer />
      </div>
    </div>
  );
};

export default AccountSettings;
