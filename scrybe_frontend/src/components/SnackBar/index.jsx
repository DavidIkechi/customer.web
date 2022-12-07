import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import "./index.css";

const SnackBar = ({ response }) => {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("r");

  useEffect(() => {
    if (response.message === "") {
      setOpen(false);
    } else {
      setOpen(true);
      setClassName("show");

      setTimeout(() => {
        setOpen(false);
        setClassName("");
      }, 4000);
    }
  }, [response]);

  return (
    <div id="snackbar" className={className}>
      <Alert type={response.type} message={response.message} />
    </div>
  );
};

export default SnackBar;
