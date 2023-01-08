import React from "react";
import checkIcon from "../../assets/check.svg";
import currency from "../../assets/naira.svg";
import startUpIcon from "../../assets/star.svg";
import { yearlyPricing } from "./data";
import styles from "./yearplans.module.scss";

function YearPlans({ yearState }) {
  return (
    <div className={`${styles.year}`}>
      <div className={`${styles.plans}`}>
        {yearlyPricing.map((data) => {
          const { id, title, pricing, headDescription, features } = data;

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
                  {features.map((feature, index) => (
                    <div className={styles.pricingFeaturesItem} key={index}>
                      <img src={checkIcon} alt="check-mark icon" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <button>Get Started</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YearPlans;
