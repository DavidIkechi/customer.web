import React from "react";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

import styles from "../checkout.module.scss";
import startUpIcon from "../assets/star.svg";
import currency from "../assets/dollar.svg";
import tag from "../assets/sell.svg";
import checkIcon from "../assets/check.svg";
import visa from "../assets/VisaInc.png";
import master from "../assets/Mastercard.png";
import NavBarFree from "../../../components/NavbarFree";
import Footer from "../../../components/Footer";
import axios from "axios";

function Checkout() {
  const [dataArray, setDataArray] = useState({});
  const [startup, setStartup] = useState([]);
  const [monthToggle, setMonthToggle] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [nextPaymentDate, setNextPaymentDate] = useState(null);
  const [total, setTotal] = useState(null);

  const token = localStorage.getItem("heedAccessToken");

  const fetchGrowingOrder = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios.get("orders/2", { headers }).then((res) => {
      setDataArray(res.data);
      setUserEmail(res.data.user_email);
    });
  };

  useEffect(() => {
    fetchGrowingOrder();
  }, []);

  const calculatePrice = () => {
    setMonthToggle(true);
    console.log(dataArray);
    const monthlyPrice = Number(dataArray.billing_plan);
    const userEmail = dataArray.user_email;
    const nextPaymentDate = dataArray.next_payment_due_date;
    const orderId = dataArray.id;
    const total = (monthlyPrice - 7) * 12;

    setMonthlyPrice(monthlyPrice);
    setUserEmail(userEmail);
    setNextPaymentDate(nextPaymentDate);
    setTotal(total);

    return monthlyPrice, userEmail, nextPaymentDate, orderId, total;
  };

  const resetMonth = () => {
    setMonthToggle(false);
    const total = dataArray.billing_plan;
    setTotal(total);
    setNextPaymentDate(null);
  };
  return (
    <div className={styles.checkout}>
      <NavBarFree />
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
                <div className={styles.checkoutMonthly} onClick={resetMonth}>
                  <div className={styles.empty}></div>
                  <div
                    className={`${styles.formCardDetails} ${styles.plainCard}`}
                  >
                    <div className={styles.plansCardTitle}>
                      <div className={styles.plansCardIcon}>
                        <img src={startUpIcon} alt="star icon" />
                      </div>
                      <h3>Growing</h3>
                      <p>Monthly</p>
                    </div>
                    <div className={styles.plansPricing}>
                      <div className={styles.plansPricingFigure}>
                        <div className={styles.plansPricingCurrency}>
                          <img src={currency} alt="currency symbol" />
                        </div>
                        <h4>30</h4>
                      </div>
                      <p>per month</p>
                    </div>
                    <div className={styles.plansPricingInfo}>
                      <p>
                        Billed <span>$30</span> per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.checkoutAnnually}
                  onClick={calculatePrice}
                >
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
                      <h3>Growing</h3>
                      <p>Annually</p>
                    </div>
                    <div className={styles.plansPricing}>
                      <div className={styles.plansPricingFigure}>
                        <div className={styles.plansPricingCurrency}>
                          <img src={currency} alt="currency symbol" />
                        </div>
                        <h4>23</h4>
                      </div>
                      <p>per month</p>
                    </div>
                    <div className={styles.plansPricingInfo}>
                      <p>
                        Billed <span>$276</span> annually
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.checkoutFormSections}>
              <div className={styles.checkoutSectionHeading}>
                <h2 className={styles.checkoutSectionHeadingH2}>
                  2. Card holder information
                </h2>
                {/* <p className={styles.checkoutSectionHeadingP}>
                  Already a Heed User?
                  <span>Login</span>
                </p> */}
              </div>
              <div className={styles.checkoutFormFields}>
                <form id="my-form">
                  <div className={styles.formName}>
                    <label htmlFor="card_name">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      id="card_name"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className={styles.formEmail}>
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
                  <div className={styles.cardNumber}>
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
                  <div className={styles.checkboxsection}>
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
              <h2>Features of Growing plan</h2>
              <div className={styles.pricingFeatures}>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Everything in Startup, plus:</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>API & Webhook Access</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p> Custom Workflows</p>
                </div>
                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Dedicated Account Manager</p>
                </div>

                <div className={styles.pricingFeaturesItem}>
                  <img src={checkIcon} alt="check-mark icon" />
                  <p>Priority Support</p>
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
              <h2>Features of Growing plan</h2>
              <div>
                <div className={styles.cardTypes}>
                  <img src={visa} alt="visa icon" />
                  <img src={master} alt="visa icon" />
                </div>
              </div>
            </div>
            <div className={styles.orderSummary}>
              <h2>Features of Growing plan</h2>
              <div className={styles.planDetails}>
                <p>
                  Heed Growing Plan{monthToggle ? "(annually)" : "(monthly)"}
                </p>
                <p>
                  ${total ? total : "30"} per {monthToggle ? "year" : "month"}
                </p>
              </div>
              <div className={styles.totalSummary}>
                <p>Total</p>
                <p>
                  {" "}
                  ${total ? total : "30"} per {monthToggle ? "year" : "month"}
                </p>
              </div>
              <div className={styles.datepayment}>
                <p>
                  Next payment is due on{" "}
                  <b className={styles.spandate}>
                    {monthToggle ? "7th December 2023" : "7th January 2023"}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
