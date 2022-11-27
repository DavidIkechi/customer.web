import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignUp.module.scss";
// import { useMockUser } from "./hooks/hook";

function Signup() {
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
    console.log(errors);
    axios
      .post("http://scrybe.hng.tech:5000/users/", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Watch event for disable button
  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const email = watch("email");
  const company_name = watch("company_name");
  const password = watch("password");

  const isValid = first_name && last_name && email && company_name && password;

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div className={styles.first}>
            <h1>Create an account</h1>
            <h3>Let’s get you started</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                className={`${errors.first_name && styles.errorInput} `}
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              <p className={styles.errorMsg}>{errors.first_name?.message}</p>

              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                className={`${errors.last_name && styles.errorInput} `}
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              <p className={styles.errorMsg}>{errors.last_name?.message}</p>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your company email"
                className={`${errors.email && styles.errorInput} `}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                    message: "Please enter a correct company email address",
                  },
                })}
              />
              <p className={styles.errorMsg}>{errors.email?.message}</p>

              <label htmlFor="company_name">Company</label>
              <input
                type="text"
                id="company_name"
                placeholder="Enter your company name"
                className={`${errors.company_name && styles.errorInput} `}
                {...register("company_name", {
                  required: "Company name is required",
                })}
              />
              <p className={styles.errorMsg}>{errors.company_name?.message}</p>

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className={`${errors.password && styles.errorInput} `}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <p className={styles.errorMsg}>{errors.password?.message}</p>

              <input
                type="submit"
                disabled={!isValid}
                value="Create an account"
                className={`${isValid && styles.submitValid}`}
              />
              <div className={`${styles.accept} ${styles.up}`}>
                <input type="checkbox" name="" id="" />
                <span>
                  I have read and agree to{" "}
                  <NavLink to={""}>Terms of Service</NavLink> and{" "}
                  <NavLink to={""}>Privacy Policy</NavLink>
                  <br />
                  Already have an account?{" "}
                  <NavLink to={"/signin"}>Sign in</NavLink>
                </span>
              </div>
            </form>
          </div>
          <div className={styles.second}>
            <img src={footerImg} alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;
