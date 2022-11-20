import React from "react";
import CustomerSay from "../../components/customersSay";
import Hero from "../../components/heroSection";
import OurClient from "../../components/our-client";
import styles from "./pageB.module.scss";

function PageB() {
  return (
    <>
      <Hero />
      <OurClient />
      <section className={styles.customer}>
        <h2 className={styles.customer__h2}>
          See what our clients are<span> saying</span>{" "}
        </h2>
        <CustomerSay />
      </section>
    </>
  );
}

export default PageB;
