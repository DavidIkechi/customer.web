/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable func-names */
import React, { useState } from "react";
import { termsData } from "./data";
import styles from "./style.module.scss";

function Checkbox({ label, checked, ...props }) {
  const defaultChecked = checked || false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className={`${styles.terms__checkbox} ${styles.terms__inputControl}`}>
      <label>
        <input
          required
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          className={isChecked ? `${styles.terms__checked}` : ""}
          {...props}
        />
      </label>
      <span>{label}</span>
    </div>
  );
}
function TermsAndCondition() {
  React.useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div className={styles.terms__wrapper}>
      <div className={styles.terms__title}>
        <h2>Terms And Conditions</h2>
      </div>
      <div className={styles.terms__details}>
        <h3>Effective date: 2022-11-16</h3>
        <h3>
          Please read these terms and conditions carefully before using Our
          Service.
        </h3>
      </div>

      <div className={styles.terms__list}>
        <ol>
          {termsData.map((term, i) => (
            <li key={i + 1}>
              {term.title}
              <p dangerouslySetInnerHTML={{ __html: term.content }} />
            </li>
          ))}
        </ol>
      </div>
      <form action="/">
        <Checkbox
          label={`I Agree to the Terms
          of Service`}
        />
        <div className={styles.terms__btn}>
          <input type="submit" value="AGREE" />
        </div>
      </form>
    </div>
  );
}

export default TermsAndCondition;
