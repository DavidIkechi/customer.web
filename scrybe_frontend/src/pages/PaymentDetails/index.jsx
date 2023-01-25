import React from "react";
import indicatorImg from "./assets/indicator.png";
import styles from "./paymentDetails.module.scss";

const PaymentDetails = () => {
  const [timedown, setTimedown] = React.useState(false);
  let minutes = 2000;
  let plan = "starter";
  let total = 20;
  let planPrice = "0.2";
  let paymentMethod = "Stripe";
  let date = new Date().toDateString();

  React.useEffect(() => {
    setTimeout(() => {
      setTimedown(true);
    }, 10000);
  }, []);
  return (
    <div
      className={`${styles.paymentContainer} ${timedown && styles.hideAlert}`}
    >
      <div className={styles.centered}>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentDetails__modalAlert}>
            <img src={indicatorImg} alt="success" />
            <h3>Your payment is successful</h3>
            <p>
              we received your payment of <span>${total}</span>. A payment
              receipt with the following breakdown has been sent to your email{" "}
              <span className={styles.mail}>username@yourmail.com</span>
            </p>
            <p className={styles.trsnID}>Transaction ID: 792HDK029J4A627</p>
          </div>
          <div className={styles.paymentDetails__summary}>
            <h2>Summary</h2>
            <div className={styles.section}>
              <div className={styles.flex}>
                <h3>
                  Price/plan<span>:</span>
                </h3>
                <div className={styles.hr} />
                <p>${planPrice} per minutes</p>
              </div>
              <div className={styles.flex}>
                <h3>
                  Plan<span>:</span>
                </h3>
                <div className={styles.hr} />
                <p>{plan}</p>
              </div>
            </div>
            <div className={`${styles.section} ${styles.paymentSection}`}>
              <div className={styles.flex}>
                <h3>
                  Payment method<span>:</span>
                </h3>
                <div className={styles.hr} />
                <p>{paymentMethod}</p>
              </div>
              <div className={styles.flex}>
                <h3>
                  Start date<span>:</span>
                </h3>
                <div className={styles.hr} />
                <p>{date}</p>
              </div>
            </div>
            <div className={`${styles.section} ${styles.totalSection}`}>
              <div className={styles.flex}>
                <h3>
                  Total minutes purchased
                  <span>:</span>
                </h3>
                <div className={styles.hr} />
                <p>{minutes} minutes</p>
              </div>
              <div className={styles.flex}>
                <h3>
                  Total amount paid <span>:</span>
                </h3>
                <div className={styles.hr} />
                <p className={styles.total}>${total}</p>
              </div>
            </div>
          </div>
          <div className={styles.actionBtns}></div>
        </div>
        <div className={styles.complaintBox}>
          <div className={styles.complaintBox__header}>
            <h3>Having any issue or complaint?</h3>
            <p>
              You can reach out to our sales and support team for any inquiries
              or complaint on any issue.
            </p>
            <p className={styles.respondsTime}>
              Typically responds within 12 hours of receipt.
            </p>
          </div>
          <div className={styles.complaintBox__link}>
            <a href="mailto:info@heed.cx">Contact support team</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
