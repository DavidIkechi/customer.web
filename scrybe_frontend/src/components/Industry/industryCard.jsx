import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Industry/industry.module.css";

import Image from "../../assets/Industry/industryImage.png";

function industryCard() {
  return (
    <div>
      <Link to="/industryarticle">
        <div className={styles.card}>
          <div className={styles.titleCard}>
            <img src={Image} alt="" />
          </div>
          <div className={styles.postDetails}>
            <h2>Industry</h2>
            <h4>
              <span>Munaike</span>Wednesday 18th Nov. 2022{" "}
            </h4>
            <h3>Why you should embrace Emotional AI - Analytics insights</h3>
            <p>
              We often feel that emotions have no place in business but it is
              thecore of what drives it. Humans are emotional and humans build
              andmakeup businesses. They&apos;re part of who we are, and
              it&apos;s important to be able to harness their potential.
              Emotions have a significant impact on business and your
              company&apos;s success
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default industryCard;
