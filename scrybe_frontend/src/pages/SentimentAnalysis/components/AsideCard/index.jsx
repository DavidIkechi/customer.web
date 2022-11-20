import React from "react";
import PropTypes from "prop-types";
import styles from "./AsideCard.module.scss";

function AsideCard({ children, classType }) {
  return (
    <div className={`${classType} ${styles.inner__container}`}>{children}</div>
  );
}

AsideCard.propTypes = {
  children: PropTypes.node.isRequired,
  classType: PropTypes.string.isRequired,
};

export default AsideCard;
