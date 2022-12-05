import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../../../components/Footer";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import AccountPageCss from "./AccountSettings.module.scss";

const AccountSettings = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch event for disable button
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isValid = password && confirmPassword;

  return (
    <div className="">
      <RedirectNav />
      <div className={AccountPageCss.AccountPage_wrapper}>
        <div className={AccountPageCss.AccountPage_header}>
          <h2>Account security</h2>
          <p>Change your password</p>
        </div>
        <form className={AccountPageCss.form}>
          <div className={AccountPageCss.formGroup}>
            <label htmlFor="Password">Enter new password:</label>
            <input
              type="password"
              name="password"
              id="Password"
              className={`${errors.password && AccountPageCss.errorInput} `}
              placeholder="Enter a new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <p className={AccountPageCss.errorMsg}>
              {errors.password?.message}
            </p>
          </div>
          <div className={AccountPageCss.formGroup}>
            <label htmlFor="confirmPassword">Retype password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter Password again"
              {...register("confirmPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password inputted did not match",
                },
              })}
            />
            <p className={AccountPageCss.errorMsg}>
              {errors.confirmPassword?.message}
            </p>
          </div>
          <div
            className={`${!isValid && AccountPageCss.formSubmit} ${
              isValid && AccountPageCss.submitValid
            }`}
          >
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
