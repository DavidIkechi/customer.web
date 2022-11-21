import React from "react";
import { NavLink } from "react-router-dom";

function SignInOutResetHeader() {
  return (
    <header className="header-signup">
      <NavLink to="/">
        <img src="img/scrybe_logo.svg" alt="" />
      </NavLink>
    </header>
  );
}

export default SignInOutResetHeader;
