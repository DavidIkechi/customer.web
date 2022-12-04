import axios from "axios";
import React from "react";
// import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import footerImg from "./assets/signup-img.svg";
import styles from "./SignUp.module.scss";

function Signup() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [emailStateTest, setEmailStateTest] = useState(false);
  const [passStateTest, setPassStateTest] = useState(false);
  const [nameStateTest, setNameStateTest] = useState(false);
  const [lastStateTest, setLastStateTest] = useState(false);
  const [companyStateTest, setCompanyStateTest] = useState(false);
  const [btn, setBtn] = useState(true);

  const navigate = useNavigate();
  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/),
    firstNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    lastNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    companyNameTest = new RegExp(/^[a-zA-Z]{2,}$/);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
    console.log(nameStateTest);
  };

  const handleUserFirstName = (e) => {
    setFirstName(e.target.value);
    tester(e, firstNameTest, setNameStateTest);
  };

  const handleUserLastName = (e) => {
    setLastName(e.target.value);
    tester(e, lastNameTest, setLastStateTest);
  };

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
    tester(e, emailTest, setEmailStateTest);
  };
  const handleUserCompany = (e) => {
    setCompany(e.target.value);
    tester(e, companyNameTest, setCompanyStateTest);
  };
  const handleUserPassword = (e) => {
    setPassword(e.target.value);
    tester(e, passwordTest, setPassStateTest);
  };

  const validate = useCallback(
    (e) => {
      if (
        first_name.length > 1 &&
        last_name.length > 1 &&
        password.length > 1 &&
        company_name.length > 1 &&
        email.length > 1 &&
        emailStateTest &&
        passStateTest &&
        companyStateTest &&
        nameStateTest &&
        lastStateTest
      ) {
        return false;
      } else {
        return true;
      }
    },
    [
      companyStateTest,
      company_name.length,
      email.length,
      emailStateTest,
      first_name.length,
      lastStateTest,
      last_name.length,
      nameStateTest,
      passStateTest,
      password.length,
    ]
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      company_name: company_name,
      password: password,
    };
    console.log(data);
    const res = await axios.post("create_users", data);
    console.log(res);
    if (res.status === 200) {
      navigate("/verify-signup");
    } else {
      console.log(res);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const isValid = validate();
    setBtn(isValid);
  }, [validate]);

  return (
    <>
      <main className={styles.signUpWrapper}>
        <div className={styles.signup}>
          <div className={styles.first}>
            <h1>Create an account</h1>
            <h3>Let’s get you started</h3>

            <form onSubmit={handleSubmit}>
              <div className={styles.fieldss}>
                <label
                  htmlFor="first_name"
                  className={
                    nameStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Enter your first name"
                  className={
                    nameStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={first_name}
                  onChange={handleUserFirstName}
                />
                {/* <p className={styles.errorMsg}>{errors.first_name?.message}</p> */}
                {!nameStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Please enter your first name
                  </p>
                )}
              </div>

              <div className={styles.fieldss}>
                <label
                  htmlFor="last_name"
                  className={
                    lastStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_nameii"
                  placeholder="Enter your last name"
                  className={
                    lastStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={last_name}
                  onChange={handleUserLastName}
                />
                {!lastStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Please enter your last name
                  </p>
                )}
                {/* <p className={styles.errorMsg}>{errors.last_name?.message}</p> */}
              </div>

              <div className={styles.fieldss}>
                <label
                  htmlFor="email"
                  className={
                    emailStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your company email"
                  className={
                    emailStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={email}
                  onChange={handleUserEmail}
                />
                {!emailStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Please enter a valid email
                  </p>
                )}
                {/* <p className={styles.errorMsg}>{errors.email?.message}</p> */}
              </div>

              <div className={styles.fieldss}>
                <label
                  htmlFor="company_name"
                  className={
                    companyStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company_name"
                  placeholder="Enter your company name"
                  className={
                    companyStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={company_name}
                  onChange={handleUserCompany}
                />
                {!companyStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Please enter your Companys' name
                  </p>
                )}
                {/* <p className={styles.errorMsg}>{errors.company_name?.message}</p> */}
              </div>

              <div className={styles.fieldss}>
                <label
                  htmlFor="password"
                  className={
                    passStateTest
                      ? styles.email_label
                      : styles.email_label_error
                  }
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className={
                    passStateTest
                      ? ` ${styles.email_input}`
                      : `${styles.email_input_invalid}`
                  }
                  value={password}
                  onChange={handleUserPassword}
                />
                {!passStateTest && (
                  <p className={styles.erro_msg_bazz}>
                    Your Password must be more than 8 character
                  </p>
                )}
                {/* <p className={styles.errorMsg}>{errors.password?.message}</p> */}
              </div>

              <input
                type="submit"
                value="Create an account"
                className={`${styles.submitValid}`}
                disabled={btn}
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
