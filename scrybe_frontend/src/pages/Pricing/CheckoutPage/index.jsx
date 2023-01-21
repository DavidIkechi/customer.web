import React, { useEffect, useState } from "react";
import Check from "../assets/check.svg";
import { PricingData } from "../Plans/data";
import styles from "./checkout.module.scss";
const CheckoutPage = () => {
  const selectedPlanKey = localStorage.getItem("selectedPlan");
  const [selectedPlan, setSelectedPlan] = useState();

  // get selected plan from all plans
  const getSelectedPlan = (plankey) => {
    if (selectedPlanKey) {
      let thePlan = PricingData.filter((plan) => plan.planKey === plankey)[0];
      setSelectedPlan(thePlan);
    }
  };

  console.log("selectedPlan", selectedPlan);

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
            <div className={styles.billingDropDown__input}></div>
            <div className={styles.billingDropDown__modal}>
              <div className={styles.modalContent}>
                {PricingData.map((plan, index) => (
                  <div className={styles.modalContent__item} key={index}>
                    <div className={styles.nameDetails}>
                      <p>{plan.headDescription}</p>
                      <p>{plan.title}</p>
                      <p>{plan.duration}</p>
                    </div>
                    <div className={styles.priceDetails}>
                      <div className={styles.priceDetails__price}>
                        <p>${plan.pricing}</p>
                        <p>Per minute</p>
                      </div>
                      <div className={styles.priceDetails__button}>
                        click to select
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
};

export default CheckoutPage;
