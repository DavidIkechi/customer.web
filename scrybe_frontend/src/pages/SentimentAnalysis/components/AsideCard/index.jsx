import React from "react";
import PropTypes from "prop-types";
import styles from "./AsideCard.module.scss";

function AsideCard(props) {
  const { children, classtype } = props;
  return (
    <div className={`${classtype} ${styles.inner__container}`} {...props}>
      {children}
    </div>
  );
}

AsideCard.propTypes = {
  children: PropTypes.node.isRequired,
  classtype: PropTypes.string.isRequired,
};

export default AsideCard;
