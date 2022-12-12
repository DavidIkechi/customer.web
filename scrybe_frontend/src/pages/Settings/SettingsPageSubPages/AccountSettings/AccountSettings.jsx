import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../../../components/Footer";
import SnackBar from "../../../../components/SnackBar";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import AccountPageCss from "./AccountSettings.module.scss";
import axios from "axios";

const AccountSettings = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");
  const [response, setResponse] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const baseUrl = "https://api.heed.hng.tech";
  const submitCallback = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
        Accept: "application/json",
      },
    };
    axios
      .patch(
        baseUrl + "/change-password",
        {
          old_password: old_password,
          new_password: new_password,
        },
        config
      )
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setResponse({
            type: "Success",
            message: "Password reset successful",
          });
        }
      })
      .catch((err) => {
        setResponse({
          type: "Error",
          message: err.response.data.detail,
        });
      });
  };

  // Watch event for disable button
  const old_password = watch("old_password");
  const new_password = watch("new_password");

  const isValid = old_password && new_password;

  return (
    <>
      {response.message !== "" && (
        <SnackBar response={response} setResponse={setResponse} />
      )}
      <div className="">
        <RedirectNav />
        <div className={AccountPageCss.AccountPage_wrapper}>
          <div className={AccountPageCss.AccountPage_header}>
            <h2>Account security</h2>
            <p>Change your password</p>
          </div>
          <form
            className={AccountPageCss.form}
            onSubmit={handleSubmit(submitCallback)}
          >
            <div className={AccountPageCss.formGroup}>
              <label htmlFor="Password">Enter your current password:</label>
              <input
                type="password"
                name="old_password"
                id="old_password"
                className={`${errors.password && AccountPageCss.errorInput} `}
                placeholder="Enter a new password"
                {...register("old_password", {
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
              <label htmlFor="confirmPassword">Enter your new password:</label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                placeholder="Enter Password again"
                {...register("new_password", {
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
    </>
  );
};

export default AccountSettings;
