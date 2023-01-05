import React from "react";
import SnackBar from "../../../components/SnackBar";
import { completeRegistration } from "../hooks";
import styles from "./CompleteSignup.module.scss";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const CompleteSignup = () => {
  const completeSignup = completeRegistration();
  const { response } = useSelector((state) => state.util);

  return (
    <>
      {response.message !== "" && <SnackBar response={response} />}
      <div className={styles.signinContainer}>
        <div className={styles.bgcontainer}>
          <div className={styles.text}>
            <p>...Speak, we listen</p>
            <p>Unlock insight and meaningful data from team call records.</p>
          </div>
        </div>

        <div className={styles.inputsection}>
          <Link to="/">
            <img src={logo} alt="heedLogo" />
          </Link>

          <div className={styles.greeting}>
            <h1>Welcome {completeSignup?.value?.first_name}.</h1>
            <p>We’re almost there. Please enter the required information</p>
          </div>

          <form
            className={styles.formContainer}
            onSubmit={completeSignup.handleTotalSubmit}
          >
            <div className={styles.forms}>
              <label htmlFor="text">Company name</label>
              <input
                className={
                  !completeSignup.companyStateTest
                    ? `${styles.field}  ${styles.errfield}`
                    : ` ${styles.field} `
                }
                type="text"
                placeholder="Enter your company name"
                onChange={completeSignup.handleCompanyName}
                value={completeSignup.company_name}
              />
              {!completeSignup.companyStateTest ? (
                <p className={styles.err}>
                  company name must be 4-16 letters only
                </p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.forms}>
              <label htmlFor="text">Company address</label>
              <input
                className={
                  !completeSignup.addStateTest
                    ? `${styles.field} ${styles.errfield}`
                    : `${styles.field}`
                }
                type="text"
                placeholder="88 Journal Square Jersey City, NJ 07306"
                onChange={completeSignup.handleAddress}
                value={completeSignup.company_address}
              />
              {!completeSignup.addStateTest ? (
                <p className={styles.err}>Enter a valid address</p>
              ) : (
                ""
              )}
            </div>

            <button className={styles.buttonVld}>Get Started</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompleteSignup;
