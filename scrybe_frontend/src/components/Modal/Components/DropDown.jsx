import React from "react";
import style from "../Modal.module.scss";
import arrowDown from "../assets/arrowdown.png";
import arrowUp from "../assets/arrowup.png";

const DropDown = ({
  setShowDropDownIcon,
  showDropDownIcon,
  setShowProgressList,
}) => {
  const action = () => {
    setShowDropDownIcon(!showDropDownIcon);
    setShowProgressList(true);
  };
  return (
    <div className={style["files-toggle"]}>
      <p>All Files</p>
      <div className={style["arrow-down"]}>
        {showDropDownIcon && (
          <img src={arrowDown} alt="down-chevron" onClick={() => action()} />
        )}
        {!showDropDownIcon && (
          <img src={arrowUp} alt="up-chevron" onClick={() => action()} />
        )}
      </div>
    </div>
  );
};

export default DropDown;
