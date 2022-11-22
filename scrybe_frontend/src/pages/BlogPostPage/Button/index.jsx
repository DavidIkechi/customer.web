// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

function Button(props) {
  const { href, component, outlined, icon, children } = props;
  const className = classNames(styles.button, {
    [styles["button--outlined"]]: outlined,
    [styles["button--icon"]]: icon,
  });

  if (component === "a") {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  href: "#link",
  component: "button",
  outlined: false,
  icon: false,
};

Button.propTypes = {
  component: PropTypes.oneOf(["a", "button"]),
  href: PropTypes.string,
  outlined: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Button;
