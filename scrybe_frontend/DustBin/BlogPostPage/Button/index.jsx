// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import styles from "./styles.module.scss";

function Button({ component, href, children }) {
  if (component === "a") {
    return (
      <a
        href={href}
        className={`${styles.button__outlined} ${styles.button__icon}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.button__outlined} ${styles.button__icon}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  href: "#link",
  component: "button",
};

export default Button;
