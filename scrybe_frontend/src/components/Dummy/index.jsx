import React from "react";
import Proptypes from "prop-types";
import scrybeLogo from "../../assets/scrybe_logo_with_text.svg";

function Dummy({ someText }) {
  return (
    <div className="App" data-testid="app-container">
      <div
        style={{
          width: "100vw",
          height: "80vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src={scrybeLogo}
          alt="scrybeLogo"
          style={{ objectFit: "contain", width: "100%" }}
        />
        {someText}
      </div>
    </div>
  );
}

Dummy.propTypes = {
  someText: Proptypes.string.isRequired,
};

export default Dummy;
