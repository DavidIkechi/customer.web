import React from "react";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

import styles from "./checkout.module.scss";
import startUpIcon from "./assets/star.svg";
import currency from "./assets/naira.svg";
import tag from "./assets/sell.svg";
import checkIcon from "./assets/check.svg";
import visa from "./assets/VisaInc.png";
import master from "./assets/Mastercard.png";
import axios from "axios";

function Checkout() {
  const fetchOrders = async () => {
    await axios.get("orders").then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heroH1}>
            Become a{" "}
            <span className={styles.heroAccent}>
              Heedr <wbr />
            </span>
          </h1>
        </div>
        <div className={styles.checkoutDetails}>
          <div className={styles.checkoutForm}>
            <div className={styles.checkoutFormSections}>
              <div className={styles.checkoutSectionHeading}>
                <h2>1. Choose your plan</h2>
              </div>

              <div className={styles.checkoutCards}>
                <div className={styles.checkoutMonthly}>
                  <div className={styles.empty}></div>
                  <div
                    className={`${styles.formCardDetails} ${styles.plainCard}`}
                  >
                    <div className={styles.plansCardTitle}>
                      <div className={styles.plansCardIcon}>
                        <img src={startUpIcon} alt="star icon" />
                      </div>
                      <h3>Startup</h3>
                      <p>Monthly</p>
                    </div>
                    <div className={styles.plansPricing}>
                      <div className={styles.plansPricingFigure}>
                        <div className={styles.plansPricingCurrency}>
                          <img src={currency} alt="currency symbol" />
                        </div>
                        <h4>7,500</h4>
                      </div>
                      <p>per month</p>
                    </div>
                    <div className={styles.plansPricingInfo}>
                      <p>
                        Billed
                        <span>N7,500</span>
                        per month
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.checkoutAnnually}>
                  <div className={styles.checkoutTitle}>
                    <div>
                      <img src={tag} alt="sale-tag icon" />
                    </div>
                    <h2 className={styles.titleH2}>Best Value</h2>
                  </div>
                  <div
                    className={`${styles.formCardDetails} ${styles.valueCard}`}
                  >
                    <div className={styles.plansCardTitle}>
                      <div className={styles.plansCardIcon}>
                        <img src={startUpIcon} alt="star icon" />
                      </div>
                      <h3>Startup</h3>
                      <p>Monthly</p>
                    </div>
                    <div className={styles.plansPricing}>
                      <div className={styles.plansPricingFigure}>
                        <div className={styles.plansPricingCurrency}>
                          <img src={currency} alt="currency symbol" />
                        </div>
                        <h4>7,500</h4>
                      </div>
                      <p>per month</p>
                    </div>
                    <div className={styles.plansPricingInfo}>
                      <p>
                        Billed
                        <span>N7,500</span>
                        per month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.checkoutFormSections}>
              <div className={styles.checkoutSectionHeading}>
                <h2>2. Card holder information</h2>
                <p>
                  Already a Heed User?
                  <span>Login</span>
                </p>
              </div>
              <div className={styles.checkoutFormFields}>
                <form id="my-form">
                  <div>
                    <label htmlFor="card_name">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      id="card_name"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="card_name">Email</label>
                    <input
                      type="text"
                      name="cardName"
                      id="card_name"
                      placeholder="name@company.com"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.checkoutFormSections}>
              <div className={styles.checkoutSectionHeading}>
                <h2>3. Card details </h2>
              </div>
              <div className={styles.checkoutFormFields}>
                <form id="my-form">
                  <div>
                    <label htmlFor="card_name">Card Number</label>
                    <input
                      type="text"
                      name="cardName"
                      id="card_name"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div>
                  <div className={styles.checkoutInputRow}>
                    <div>
                      <label htmlFor="card_name">Expiration Date</label>
                      <input
                        type="text"
                        name="cardName"
                        id="card_name"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="card_name">Security Code</label>
                      <input
                        type="text"
                        name="cardName"
                        id="card_name"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="checkbox" className={styles.chkContainer}>
                      I agreee to <span>Terms and Conditions</span> and{" "}
                      <span>Privacy Policy</span>
                      <input type="checkbox" id="checkbox" />
                      <span className={styles.chkbox}></span>
                    </label>
                  </div>
                </form>
              </div>
              <button className={styles.formButton}>Proceed</button>
            </div>
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.featuresSection}>
              <h2>Features of Starup plan</h2>
              <div className={styles.pricingFeatures}>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Ai-Powered call transcriptions</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Call Tracking & Recording</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p> Business Hours</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Email & Chat Support</p>
                </div>
                <div className={styles.support}>
                  <p>
                    If you have any questions or need more information, please
                    contact us through <span>support</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2>Features of Starup plan</h2>
              <div>
                <div className={styles.cardTypes}>
                  <img src={visa} alt="visa icon" />
                  <img src={master} alt="visa icon" />
                </div>
              </div>
            </div>
            <div className={styles.orderSummary}>
              <h2>Features of Starup plan</h2>
              <div className={styles.planDetails}>
                <p>Heed Startup Plan (annual)</p>
                <p>₦78,000 per year</p>
              </div>
              <div className={styles.totalSummary}>
                <p>Total</p>
                <p>₦78,000 per year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
