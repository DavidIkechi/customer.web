import React from "react";
import { Link } from "react-router-dom";
import styles from "./yearplans.module.scss";
import currency from "../../assets/dollar.svg";
import startUpIcon from "../../assets/star.svg";
import growingIcon from "../../assets/auto_graph.svg";
import enterpriseIcon from "../../assets/corporate_fare.svg";
import checkIcon from "../../assets/check.svg";

function YearPlans({ yearState }) {
  return (
    <div className={`${styles.year}`}>
      <div className={`${styles.plans}`}>
        {/* --------------Startup --------- */}
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
              <h4>15</h4>
            </div>
            <p>per month</p>
          </div>
          <div className={styles.FtnBtn}>
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
            <Link to="/create-account">Get Started</Link>
          </div>
        </div>
        {/* --------------Grouwing --------- */}
        <div className={`${styles.plansCard} ${styles.growing}`}>
          <div className={styles.plansCardHeading}>
            <div className={styles.plansCardTitle}>
              <div className={styles.plansCardIcon}>
                <img src={growingIcon} alt="star icon" />
              </div>
              <h3>Growing</h3>
            </div>
            <p>Make individual products</p>
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
          <div className={styles.FtnBtn}>
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
                <p>Custom Workflows</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Dedicated Account Manager</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Priority Support</p>
              </div>
            </div>
            <Link to="/create-account">Get Started</Link>
          </div>
        </div>
        {/* --------------Enterprise --------- */}
        <div className={`${styles.plansCard} ${styles.enterprise}`}>
          <div className={styles.plansCardHeading}>
            <div className={styles.plansCardTitle}>
              <div className={styles.plansCardIcon}>
                <img src={enterpriseIcon} alt="star icon" />
              </div>
              <h3>Enterprise</h3>
            </div>
            <p>For big companies</p>
          </div>
          <div className={styles.plansPricing}>
            <div className={styles.plansPricingFigure}>
              <div className={styles.plansPricingCurrency}>
                <img src={currency} alt="currency symbol" />
              </div>
              <h4>47</h4>
            </div>
            <p>per month</p>
          </div>
          <div className={styles.FtnBtn}>
            <div className={styles.pricingFeatures}>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Everything in Growing, plus:</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Agent Assist</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Professional Services</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Custom Analytics & Reports</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Personalized Onboarding Support</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p>Agent Coaching & Call Scoring</p>
              </div>
              <div className={styles.pricingFeaturesItem}>
                <img src={checkIcon} alt="check-mark icon" />
                <p> Dedicated Technical Support</p>
              </div>
            </div>
            <Link to="/create-account">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearPlans;
