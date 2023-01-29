import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../assets/check.svg";
import currency from "../assets/dollar.svg";
import { PricingData } from "./data";
import styles from "./plans.module.scss";

function Plans() {
  const navigate = useNavigate();

  const getSelectedPlan = (plan) => {
    localStorage.setItem("selectedPlan", plan);
    navigate("/checkout");
  };

  return (
    <div className={`${styles.month}`}>
      <div className={`${styles.plans}`}>
        {PricingData.map((data) => {
          const {
            id,
            icon,
            title,
            pricing,
            headDescription,
            planKey,
            duration,
            features,
          } = data;

          return (
            <div
              key={id}
              className={`${styles.plansCard} ${styles.startUp} ${
                id === 3 ? styles.enterprise : ""
              }`}
            >
              <div className={styles.plansCardHeading}>
                <div className={styles.plansCardTitle}>
                  <div className={styles.plansCardIcon}>
                    <img src={icon} alt="star icon" />
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
                <p>{duration}</p>
              </div>
              <div className={styles.FtnBtn}>
                <div className={styles.pricingFeatures}>
                  {features.map((feature, index) => (
                    <div className={styles.pricingFeaturesItem} key={index}>
                      <img src={checkIcon} alt="check-mark icon" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => getSelectedPlan(planKey)}>
                  Get Started
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Plans;
