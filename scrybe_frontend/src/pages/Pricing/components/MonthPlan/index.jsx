import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../assets/check.svg";
import currency from "../../assets/dollar.svg";
import { monthlyPricing } from "./data";
import styles from "./monthplans.module.scss";

function MonthPlans() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("heedAccessToken");

  const checkoutStartup = async (pricing) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "orders/create_order",
        {
          pricing,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        navigate("/checkout-startup");
      });
  };
  const checkoutGrowing = async (pricing) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "orders/create_order",
        {
          pricing,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        navigate("/checkout-growing");
      });
  };
  const checkoutEnterprise = async (pricing) => {
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "orders/create_order",
        {
          pricing,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        navigate("/checkout-enterprise");
      });
  };

  return (
    <div className={`${styles.month}`}>
      <div className={`${styles.plans}`}>
        {monthlyPricing.map((data) => {
          const {
            id,
            icon,
            title,
            pricing,
            headDescription,
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

                <button
                  onClick={() => {
                    id === 1
                      ? checkoutStartup(pricing)
                      : id === 2
                      ? checkoutGrowing(pricing)
                      : checkoutEnterprise(pricing);
                  }}
                >
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

export default MonthPlans;
