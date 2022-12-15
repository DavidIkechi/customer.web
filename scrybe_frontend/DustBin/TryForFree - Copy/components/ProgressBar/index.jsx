import React from "react";

const Progress_bar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    border: "0.5px solid #8AB1C6",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "center",
  };

  const progresstext = {
    padding: 10,
    color: "#1D1D1D",
    fontWeight: 400,
    fontSize: 14,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default Progress_bar;
