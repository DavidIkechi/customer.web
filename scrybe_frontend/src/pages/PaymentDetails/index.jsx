import jsPDF from "jspdf";
import React from "react";
import indicatorImg from "./assets/indicator.png";
import pdf from "./assets/pdf.png";
import styles from "./paymentDetails.module.scss";

const PaymentDetails = () => {
  // const { order } = useSelector((state) => state.order);
  const order = JSON.parse(localStorage.getItem("order"));
  const [timedown, setTimedown] = React.useState(false);
  console.log(order);
  let minutes = order?.minutes;
  let plan = order?.plan;
  let total = order?.total;
  let planPrice = order?.planPrice;
  let paymentMethod = order?.paymentMethod;
  let date = order?.date;

  React.useEffect(() => {
    setTimeout(() => {
      setTimedown(true);
    }, 10000);
  }, []);

  // prepare json to pdf file conversion for download
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Set the font size and style for the table
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Define the columns for the table
    var columns = ["Plan", "Minutes", "Total", "Plan Price", "Payment Method"];
    let rows = [plan, minutes, total, planPrice, paymentMethod];
    // Draw the table
    doc.autoTable(columns, rows);
    doc.save("paymentDetails.pdf");
  };
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
          <div className={styles.actionBtns}>
            <div className={styles.actionBtns__account}>
              <a href="/account">Go to your Account page</a>
            </div>
            <div className={styles.actionBtns__pdf}>
              <div className={styles.flex}>
                <img src={pdf} alt="pdf" />
                <div onClick={downloadPDF} className={styles.download}>
                  Download as PDF
                </div>
              </div>
            </div>
          </div>
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