import React from "react";
import { Link } from "react-router-dom";
import styles from "./pricing.module.scss";
import heroImage from "./assets/heroimage.svg";
import startUpIcon from "./assets/star.svg";
import growingIcon from "./assets/auto_graph.svg";
import enterpriseIcon from "./assets/corporate_fare.svg";
import checkIcon from "./assets/check.svg";
import currency from "./assets/naira.svg";

function Pricing() {
  return (
    <div className={styles.pricing}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.heroH1}>
              Plans for every stage of your customer{" "}
              <span className={styles.heroAccent}>
                success team <wbr />
              </span>
            </h1>
            <p className={styles.heroText}>
              We help businesses unlock insights and extract meaningful data
              from your customer support conversations{" "}
            </p>
          </div>
          <div className={styles.heroImage}>
            <img src={heroImage} alt="" srcSet="" />
          </div>
        </div>
      </section>
      <section className={styles.CTA}>
        <h2 className={styles.CTAtitle}>Choose a plan that fits your needs</h2>
        <div className={styles.CTAs}>
          <a href="/dashboard" className={styles.ctaDemo}>
            Monthly
          </a>
          <a href="/transcriptions" className={styles.ctaStarter}>
            Yearly
          </a>
        </div>
        <div className={styles.plans}>
          <div className={`${styles.plansCard} ${styles.startUp}`}>
            <div className={styles.plansCardHeading}>
              <div className={styles.plansCardTitle}>
                <div className={styles.plansCardIcon}>
                  <img src={startUpIcon} alt="star icon" />
                </div>
                <h3>Startup</h3>
              </div>
              <p>Perfect to get started</p>
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
            </div>
            <Link href="/try"></Link>
          </div>
          <div className={`${styles.plansCard} ${styles.growing}`}>
            <div className={styles.plansCardHeading}>
              <div className={styles.plansCardTitle}>
                <div className={styles.plansCardIcon}>
                  <img src={growingIcon} alt="star icon" />
                </div>
                <h3>Growing</h3>
              </div>
              <p>Perfect to get started</p>
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
            </div>
            <Link href="/try"></Link>
          </div>
          <div className={`${styles.plansCard} ${styles.enterprise}`}>
            <div className={styles.plansCardHeading}>
              <div className={styles.plansCardTitle}>
                <div className={styles.plansCardIcon}>
                  <img src={enterpriseIcon} alt="star icon" />
                </div>
                <h3>Startup</h3>
              </div>
              <p>Perfect to get started</p>
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
            </div>
            <Link href="/try"></Link>
          </div>

          <div className={`${styles.plansCard} ${styles.growing}`}></div>
          <div className={`${styles.plansCard} ${styles.enterprise}`}></div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
