import React from "react";
import styles from "./Alert.module.scss";

const Alert = ({ type, message }) => {
  let className = styles.alert;
  switch (type) {
    case "Error":
      className = styles.alert_error;
      break;
    case "Warning":
      className = styles.alert_warning;
      break;
    case "Info":
      className = styles.alert_info;
      break;
    case "Success":
      className = styles.alert_success;
      break;
    default:
      className = styles.alert;
  }

  return (
    <div className={className} role="alert">
      <div className={styles.title}>
        <h4>{type}</h4>
        {/* <button
          onClick={() => setState(false)}
          type="button"
          className="btn-close"
          data-dismiss="alert"
          aria-label="Close"
        ></button> */}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
