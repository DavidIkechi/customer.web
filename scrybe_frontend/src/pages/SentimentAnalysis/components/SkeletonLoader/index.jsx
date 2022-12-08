import React from "react";
import PropTypes from "prop-types";
import styles from "./SkeletonLoader.module.scss";

const SkeletonLoader = (props) => {
  const { type, numberOfLines, className, ...customProps } = props;
  if (type === "text") {
    const lineElements = [];
    for (let i = 0; i < numberOfLines; i++) {
      lineElements.push(
        <div
          className={`${styles.skeleton} ${styles.skeleton__text} ${className}`}
          key={i + Math.random()}
          {...customProps}
        ></div>
      );
    }
    return <>{lineElements}</>;
  } else {
    return (
      <>
        <div className={styles.skeleton__chart}></div>
      </>
    );
  }
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(["generic", "text", "image"]).isRequired,
  numberOfLines: PropTypes.number,
  className: PropTypes.string,
};

export default SkeletonLoader;
