import React from "react";
import "./index.css";

const Alert = ({ type, message }) => {
  let className = "alert alert-dismissible";
  switch (type) {
    case "Error":
      className = "alert alert-error alert-dismissible";
      break;
    case "Warning":
      className = "alert alert-warning alert-dismissible";
      break;
    case "Info":
      className = "alert alert-info alert-dismissible";
      break;
    case "Success":
      className = "alert alert-success alert-dismissible";
      break;
    default:
      className = "alert alert-dismissible";
  }

  return (
    <div className={className} role="alert">
      <div className="title">
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
