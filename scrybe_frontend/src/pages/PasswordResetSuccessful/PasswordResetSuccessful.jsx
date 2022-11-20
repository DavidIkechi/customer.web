import React from "react";
import { NavLink } from "react-router-dom";

function PasswordResetSuccessful() {
  return (
    <main className="signup-wrapper">
      <div className="signup">
        <div className="first signin other-than-signup">
          <h1>Password reset</h1>
          <h3>
            Your password has been successfully set.
            <br />
            Click below to login.
          </h3>
          <form>
            <NavLink to="/signin">
              <input type="submit" value="Continue" className="success-btn" />
            </NavLink>
          </form>
        </div>
        <div className="second">
          <img src="img/reset-pw.png" alt="" />
        </div>
      </div>
    </main>
  );
}

export default PasswordResetSuccessful;
