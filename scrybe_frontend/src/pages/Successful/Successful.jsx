import React from "react";
import { NavLink } from "react-router-dom";

function Successful() {
  return (
    <main className="signup-wrapper">
      <div className="signup">
        <div className="first signin other-than-signup">
          <h1>Check your Email</h1>
          <h3>We sent a password link to hi@imrvon.com</h3>
          <form action="">
            <input type="submit" value="Open email" className="success-btn" />
            <p className="successful-p">
              Didn’t receive an email? <NavLink to="">Click to resend.</NavLink>
            </p>
          </form>
        </div>
        <div className="second">
          <img src="img/forget-pw-successful.png" alt="" />
        </div>
      </div>
    </main>
  );
}

export default Successful;
