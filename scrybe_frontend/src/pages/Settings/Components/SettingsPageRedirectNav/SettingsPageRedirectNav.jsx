import React from "react";
import RedirectNavCss from "./SettingsPageRedirectNav.module.scss";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import { Link } from "react-router-dom";

const RedirectNav = () => {
  return (
    <div>
      <div
        style={{ backgroundColor: window.innerWidth > 768 ? "#e6f0ff" : "" }}
        className={RedirectNavCss.nav}
      >
        <Link to="/settings" className={RedirectNavCss.nav__link}>
          <img src={ChevronLeft} alt="" />
        </Link>
        <div className={RedirectNavCss.redirect}>
          <h1 className={RedirectNavCss.nav__title}>Settings</h1>
          <p>
            You are using the limited free plan.{" "}
            <Link to="">Go unlimited with Pro version</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedirectNav;
