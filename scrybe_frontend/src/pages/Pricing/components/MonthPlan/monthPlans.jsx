import React from "react";
import { Link } from "react-router-dom";
import styles from "./monthplans.module.scss";
import currency from "../../assets/naira.svg";
import startUpIcon from "../../assets/star.svg";
import growingIcon from "../../assets/auto_graph.svg";
import enterpriseIcon from "../../assets/corporate_fare.svg";
import checkIcon from "../../assets/check.svg";
import data from "../../../History/assets/data";
import { monthlyPricing } from "./data";

function MonthPlans({ monthState }) {
  return (
    <div className={`${styles.month}`}>
      <div className={`${styles.plans}`}>
        {monthlyPricing.map((data) => {
          const { id, title, pricing, headDescription, duration, features } =
            data;

          return (
            <div
              className={`${styles.plansCard} ${styles.startUp} ${
                id === 3 ? styles.enterprise : ""
              }`}
            >
              <div className={styles.plansCardHeading}>
                <div className={styles.plansCardTitle}>
                  <div className={styles.plansCardIcon}>
                    <img src={startUpIcon} alt="star icon" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <p>{headDescription}</p>
              </div>
              <div className={styles.plansPricing}>
                <div className={styles.plansPricingFigure}>
                  <div className={styles.plansPricingCurrency}>
                    <img src={currency} alt="currency symbol" />
                  </div>
                  <h4>{pricing}</h4>
                </div>
                <p>per month</p>
              </div>
              <div className={styles.FtnBtn}>
                <div className={styles.pricingFeatures}>
                  {features.map((feature) => (
                    <div className={styles.pricingFeaturesItem}>
                      <img src={checkIcon} alt="check-mark icon" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link to="/create-account">Get Started</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthPlans;
