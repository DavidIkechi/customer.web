import React from "react";
import OverlayCss from "./SettingsPageOverlayEmail.module.scss";

const OverlayEmail = ({ setShowModal }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className={OverlayCss.OverlayEmail_wrapper}>
      <div className={OverlayCss.overlay}>
        <div className={OverlayCss.overlayContent}>
          <div className={OverlayCss.overlayHeader}>
            <h2>Change notification email address</h2>
            <p>
              Receive notifications in a new email address different from your
              existing email address
              <strong>“johndoe.admin@businessemail.com”</strong>
            </p>
          </div>

          <form className={OverlayCss.OverlayEmail_form} action="">
            <div className={OverlayCss.inputGroup}>
              <span className={OverlayCss.inputError}></span>
              <label htmlFor="email">Enter new email address:</label>
              <input type="email" id="email" className={OverlayCss.input} />
            </div>
            <p className={OverlayCss.caution}>
              We’ll send a email with a verification link for us to confirm it’s
              yours
            </p>
            <div className={OverlayCss.OverlayEmail_submit}>
              <button formAction="" onClick={() => handleSubmit} type="submit">
                Send verification email
              </button>
              <p className={OverlayCss.redirect} onClick={setShowModal}>
                Don’t change my notification email address!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverlayEmail;
