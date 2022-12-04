import React from "react";
import { useLocation } from "react-router-dom";

const EmailVerificationSuccess = () => {
  // get token from url
  // const token = window.location.href.split("/")[4];
  const query = new URLSearchParams(useLocation);
  const token = query.get("token");
  console.log(token);
  return (
    <div>
      <h1>Email Verification Successfull</h1>
    </div>
  );
};

export default EmailVerificationSuccess;
