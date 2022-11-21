import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../von.css";

import { NavLink } from "react-router-dom";

function ForgetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /* eslint-disable no-unused-vars */
  const [userInfo, setUserInfo] = useState();
  /* eslint-enable no-unused-vars */
  const onSubmit = (data) => {
    console.log(data);
    setUserInfo(data);
  };

  // Watch event for disable button
  const email = watch("email");

  console.log("email", email);

  const isValid = email;

  return (
    <main className="signup-wrapper">
      <div className="signup">
        <div className="first signin other-than-signup">
          <h1>Forgot password</h1>
          <h3>No worries we will send your reset details</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your company email"
                className={`${errors.email && "error-input"} `}
                // eslint-disable-next-line
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                    message: "Please enter a correct company email address",
                  },
                })}
              />
            </label>
            <p className="error-msg">{errors.email?.message}</p>
            <input
              type="submit"
              disabled={!isValid}
              value="Reset password"
              className={`${isValid && "submit-valid"}`}
            />
            <p>
              Don’t have an account?{" "}
              <NavLink to="/create-account">Sign up</NavLink>
            </p>
          </form>
        </div>
        <div className="second">
          <img src="img/forget-pw.svg" alt="" />
        </div>
      </div>
    </main>
  );
}

export default ForgetPassword;
