import React from "react";
import PropTypes from "prop-types";
import styles from "./AsideCard.module.scss";

function AsideCard(props) {
  const { children, classType } = props;
  return (
    <div className={`${classType} ${styles.inner__container}`} {...props}>
      {children}
    </div>
  );
}

AsideCard.propTypes = {
  children: PropTypes.node.isRequired,
  classType: PropTypes.string.isRequired,
};

export default AsideCard;
