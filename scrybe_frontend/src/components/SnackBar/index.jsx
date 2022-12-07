import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import styles from "./SnackBar.module.scss";

const SnackBar = ({ response, setResponse }) => {
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (response.message === "") {
      setOpen(false);
      setClassName("");
    } else {
      setOpen(true);
      setClassName(styles.show);

      setTimeout(() => {
        setOpen(false);
        setClassName("");
        setResponse({ type: "", message: "" });
      }, 3000);
    }
  }, [response, setResponse]);

  return (
    <div id="snackbar" className={className}>
      <Alert type={response.type} message={response.message} />
    </div>
  );
};

export default SnackBar;
