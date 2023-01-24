import React, { useEffect, useState } from "react";
import { dispatch } from "../../redux/store";
import { createResponse } from "../../redux/utils/UtilSlice";
import Alert from "../Alert";
import styles from "./SnackBar.module.scss";

const SnackBar = ({ response }) => {
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
        dispatch(createResponse({ type: "", message: "" }));
      }, 5000);
    }
  }, [response]);

  return (
    <div id="snackbar" className={className}>
      <Alert type={response.type} message={response.message} />
    </div>
  );
};

export default SnackBar;
