/* eslint-disable */
import customer from "./assets/Frame 30781.webp";
import styles from "./slide.module.scss";

function CustomerSay() {
  return (
    <div className={styles.customerFeed}>
      <svg
        className={styles.customerFeed__left}
        width="3.8rem"
        height="3.7rem"
        viewBox="0 0 61 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="60" height="60" rx="30" fill="#0077FF" />
        <path
          d="M34.25 37.5L26.75 30L34.25 22.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={`container ${styles.customer}`}>
        <div className={styles.customer__img}>
          <img src={customer} alt="" srcSet="" />
        </div>
        <div className={styles.customer__details}>
          <p className={styles.customer__details__msg}>
            Scrybe is half the price and twice the speed. We looked for a more
            reliable and flexible platform for our calls analysis, then we found
            Scrybe. ever since then, its been a wonderful experience being their
            client
          </p>
          <p className={styles.customer__details__author}> David West</p>
          <p className={styles.customer__details__role}> CEO Hotelsng</p>
          <div className={styles.indicators}>
            <div className={styles.indicators__active} />
            <div className="" />
            <div className="" />
            <div className="" />
          </div>
        </div>
      </div>

      <svg
        className={styles.customerFeed__right}
        width="3.8rem"
        height="3.7rem"
        viewBox="0 0 61 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="60" height="60" rx="30" fill="#0077FF" />
        <path
          d="M34.25 37.5L26.75 30L34.25 22.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default CustomerSay;
