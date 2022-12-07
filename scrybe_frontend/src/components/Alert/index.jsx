import React from "react";

const Alert = ({ type, message }) => {
  return (
    <>
      {type === "error" ? (
        <div class="alert alert-error alert-dismissible" role="alert">
          <p>
            <strong>Error!</strong> {message}
          </p>
          <button
            type="button"
            class="btn-close"
            data-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        <div class="alert alert-success alert-dismissible" role="alert">
          <p>
            <strong>Success!</strong> {message}
          </p>
          <button
            type="button"
            class="btn-close"
            data-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Alert;
