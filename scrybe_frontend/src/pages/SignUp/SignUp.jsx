import React from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignUp.module.scss";
import { Navigate } from "react-router-dom";

function Signup() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      company_name: company_name,
      password: password,
    };
    await axios
      .post("users", data)
      .then((response) => {
        console.log(response);
        setNavigate(true);
      })
      .catch((error) => {});
  };

  if (navigate) {
    return <Navigate to="/verify-signup" />;
  }

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div className={styles.first}>
            <h1>Create an account</h1>
            <h3>Let’s get you started</h3>

            <form onSubmit={handleSubmit}>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                className={`${styles.errorInput} `}
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.first_name?.message}</p> */}

              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                className={`${styles.errorInput} `}
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.last_name?.message}</p> */}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your company email"
                className={`${styles.errorInput} `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.email?.message}</p> */}

              <label htmlFor="company_name">Company</label>
              <input
                type="text"
                id="company_name"
                placeholder="Enter your company name"
                className={`${styles.errorInput} `}
                value={company_name}
                onChange={(e) => setCompany(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.company_name?.message}</p> */}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className={`${styles.errorInput} `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <p className={styles.errorMsg}>{errors.password?.message}</p> */}

              <input
                type="submit"
                value="Create an account"
                className={`${styles.submitValid}`}
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
