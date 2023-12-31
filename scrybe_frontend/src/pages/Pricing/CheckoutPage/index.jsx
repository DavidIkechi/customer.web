import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../../components/ButtonSpinner";
import { createPaymentEndpoint } from "../../../redux/features/orders/service";
import Check from "../assets/check.svg";
import fluterwave from "../assets/fluterwave_icon.png";
import selectArr from "../assets/select-arrow.svg";
import stripe from "../assets/stripe_icon.png";
import styles from "./checkout.module.scss";

const paymentProviders = [
  // {
  //   id: 1,
  //   name: "Paystack",
  //   icon: paystack,
  //   url: "",
  // },
  {
    id: 2,
    name: "Stripe",
    icon: stripe,
    url: "create-stripe-checkout-session",
  },
  {
    id: 3,
    name: "Flutterwave",
    icon: fluterwave,
    url: "create_flutter_order",
  },
];
const CheckoutPage = () => {
  const { isLoading: backendLoading } = useSelector((state) => state.util);
  const { plans } = useSelector((state) => state.plan);
  const selectedPlanKey = localStorage.getItem("selectedPlan");
  const [selectedPlan, setSelectedPlan] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPay, setTotalPay] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [mins, setMins] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(paymentProviders[0]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSelectedPlan = (planKey) => {
    if (selectedPlanKey) {
      let [object] = plans.filter((plan) => plan.additional === planKey);
      setSelectedPlan(object);
    }
  };

  const getMin = (min) => {
    const toPay = min * selectedPlan?.price;
    const rounded = Math.round(toPay * 10) / 10;
    setTotalPay(rounded);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", plan.additional);
    getSelectedPlan(plan.additional);
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

  useEffect(() => {
    if (!selectedPlanKey) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlan]);

  const handlePayment = (provider) => {
    setSelectedPayment(provider);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = selectedPayment.url;
    const data = {
      minutes: Number(mins),
      plan: selectedPlan.name,
    };
    setTimeout(() => {
      dispatch(createPaymentEndpoint(url, data));
      setMins("");
      setIsChecked(false);
      setLoading(false);
      localStorage.removeItem("selectedPlan");
    }, 3000);
  };
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutGrid}>
        <form
          className={styles.checkoutGrid__billing}
          onSubmit={handleCheckout}
        >
          <h1>Billing details</h1>
          <div className={styles.billingDropDown}>
            <h3>choose a different plan:</h3>
            <p>Click dropdown to switch between available plans</p>

            <div
              className={styles.billingDropDown__input}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {selectedPlan && (
                <div className={styles.inputItem}>
                  <div className={styles.nameDetails}>
                    <p>{selectedPlan.name} Plan</p>
                    <h2>{selectedPlan.title}</h2>
                    <p>{selectedPlan.duration}</p>
                  </div>
                  <div className={styles.priceDetails}>
                    <div className={styles.priceDetails__price}>
                      <h2>${selectedPlan.price}</h2>
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
                  {plans.map((plan, index) => (
                    <div
                      onClick={() => handleSelectPlan(plan)}
                      className={`${styles.modalContent__item} ${
                        plan.name === "enterprise plus" && styles.plus
                      }`}
                      key={index}
                    >
                      <div className={styles.nameDetails}>
                        <p>{plan.name}</p>
                        <h2>{plan.title}</h2>
                        <p>{plan.duration}</p>
                      </div>
                      <div className={styles.priceDetails}>
                        <div className={styles.priceDetails__price}>
                          <h2>${plan.price}</h2>
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
                  required
                  onChange={(e) => setMins(e.target.value)}
                />
                <p>minutes</p>
              </div>
              <p>X</p>
              <div className={styles.planPrice}>
                ${selectedPlan && selectedPlan.price}
              </div>
            </div>
            <div className={styles.hr} />
            <div className={styles.paymentCard__total}>
              <h3>Total to pay</h3>
              <h1 className={styles.paymentPrice}>${totalPay}</h1>
            </div>
          </div>
          <div className={styles.completePayment}>
            <div className={styles.selectPaymetProvider}>
              <p>Select your preferred payment method:</p>
              <div className={styles.paymentProvider}>
                {paymentProviders.map((item) => (
                  <div
                    className={styles.providers}
                    key={item.id}
                    onClick={() => handlePayment(item)}
                  >
                    <div
                      className={`${styles.provider} ${
                        selectedPayment.id === item.id && styles.selectedPayment
                      }`}
                    >
                      <img src={item.icon} alt={item.name} />
                      <p>{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.agreement}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.value)}
              />
              <p>
                We process payments through a trusted third party payment
                company. By clicking ‘proceed to checkout’ button below, you
                agree to be redirected to our processor’s payment page.
              </p>
            </div>
            <button
              type="submit"
              className={`${styles.payBtn} ${!isChecked && styles.disabled} ${
                isLoading && styles.disabled
              }`}
            >
              {isLoading ? (
                <Spinner />
              ) : backendLoading ? (
                <Spinner />
              ) : (
                <p>Proceed to checkout</p>
              )}
            </button>
            <p className={styles.cancelBtn}>
              <Link to="/">Exit payment</Link>
            </p>
          </div>
        </form>
        <div className={styles.selectedPlanDetails}>
          {selectedPlan && (
            <div className={styles.selectedPlanDetails__plan}>
              <h1>{selectedPlan.title}</h1>
              <h3>Features:</h3>
              {selectedPlan.features?.map((feature, index) => (
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
