import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Alert from "../Alert";

const SnackBar = ({ response }) => {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("snackbar");

  useEffect(() => {
    if (response.message === "") {
      setOpen(false);
    } else {
      setOpen(true);
      setClassName("snackbar show");

      setTimeout(() => {
        setOpen(false);
        setClassName("snackbar");
      }, 6000);
    }
  }, [response]);

  return (
    <div id={className}>
      <Alert type={response.type} message={response.message} />
    </div>
  );
};

export default SnackBar;
