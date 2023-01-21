import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Check from "../assets/check.svg";
import selectArr from "../assets/select-arrow.svg";
import { PricingData } from "../Plans/data";
import styles from "./checkout.module.scss";
const CheckoutPage = () => {
  const selectedPlanKey = localStorage.getItem("selectedPlan");
  const [selectedPlan, setSelectedPlan] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPay, setTotalPay] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [mins, setMins] = useState("");

  const getSelectedPlan = (plankey) => {
    if (selectedPlanKey) {
      let thePlan = PricingData.filter((plan) => plan.planKey === plankey)[0];
      setSelectedPlan(thePlan);
    }
  };

  const getMin = (min) => {
    const toPay = min * selectedPlan?.pricing;
    setTotalPay(toPay);
  };

  const handlesSelectPlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", plan.planKey);
    getSelectedPlan(plan.planKey);
    setIsModalOpen(false);
    getMin(Number(mins));
  };

  useEffect(() => {
    getMin(Number(mins));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mins, selectedPlan]);

  useEffect(() => {
    getSelectedPlan(selectedPlanKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutGrid}>
        <div className={styles.checkoutGrid__billing}>
          <h1>Billing details</h1>
          <div className={styles.billingDropDown}>
            <h3>choose a different plan:</h3>
            <p>Click dropdown to switch between available plans</p>
            <div className={styles.billingDropDown__input}>
              {selectedPlan && (
                <div className={styles.inputItem}>
                  <div className={styles.nameDetails}>
                    <p>{selectedPlan.headDescription} Plan</p>
                    <h2>{selectedPlan.title}</h2>
                    <p>{selectedPlan.duration}</p>
                  </div>
                  <div className={styles.priceDetails}>
                    <div className={styles.priceDetails__price}>
                      <h2>${selectedPlan.pricing}</h2>
                      <p>Per minute</p>
                    </div>
                    <img
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      src={selectArr}
                      className={`${styles.arrow} ${
                        isModalOpen && styles.open
                      }`}
                      alt="select arrow"
                    />
                  </div>
                </div>
              )}
            </div>
            {isModalOpen && (
              <div className={styles.billingDropDown__modal}>
                <div className={styles.modalContent}>
                  {PricingData.map((plan, index) => (
                    <div
                      onClick={() => handlesSelectPlan(plan)}
                      className={`${styles.modalContent__item} ${
                        plan.headDescription === "Enterprise Plus" &&
                        styles.plus
                      }`}
                      key={index}
                    >
                      <div className={styles.nameDetails}>
                        <p>{plan.headDescription}</p>
                        <h2>{plan.title}</h2>
                        <p>{plan.duration}</p>
                      </div>
                      <div className={styles.priceDetails}>
                        <div className={styles.priceDetails__price}>
                          <h2>${plan.pricing}</h2>
                          <p>Per minute</p>
                        </div>
                        <div className={styles.priceDetails__button}>
                          {plan.id === selectedPlan.id ? (
                            <img src={Check} alt="check" />
                          ) : (
                            <p>click to select</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.paymentCard}>
            <h3>Minutes</h3>
            <p>Type in the amount of minutes you want to buy</p>
            <div className={styles.paymentCard__input}>
              <div className={styles.paymentCardInputBox}>
                <input
                  type="number"
                  placeholder="200"
                  value={mins}
                  onChange={(e) => setMins(e.target.value)}
                />
                <p>minutes</p>
              </div>
              <p>X</p>
              <div className={styles.planPrice}>
                ${selectedPlan && selectedPlan.pricing}
              </div>
            </div>
            <div className={styles.hr} />
            <div className={styles.paymentCard__total}>
              <h3>Total to pay</h3>
              <h1 className={styles.paymentPrice}>${totalPay}</h1>
            </div>
          </div>
          <div className={styles.completePayment}>
            <div className={styles.agreement}>
              <input
                type="checkbox"
                onChange={(e) => setIsChecked(e.target.value)}
              />
              <p>
                We process payments through a trusted third party payment
                company. By clicking ‘proceed to checkout’ button below, you
                agree to be redirected to our processor’s payment page.
              </p>
            </div>
            <button
              className={`${styles.payBtn} ${!isChecked && styles.disabled}`}
            >
              Proceed to checkout
            </button>
            <p className={styles.cancelBtn}>
              <Link to="/">Exit payment</Link>
            </p>
          </div>
        </div>
        <div className={styles.selectedPlanDetails}>
          {selectedPlan && (
            <div className={styles.selectedPlanDetails__plan}>
              <h1>{selectedPlan.title}</h1>
              <h3>Features:</h3>
              {selectedPlan.features.map((feature, index) => (
                <p key={index}>
                  <img src={Check} alt="check" />
                  {feature}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
