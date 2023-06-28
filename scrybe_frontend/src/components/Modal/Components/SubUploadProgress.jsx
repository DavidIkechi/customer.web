import React from "react";
import style from "../Modal.module.scss";
import uploadIcon from "../assets/folderIcon.png";
import PauseIcon from "../assets/PauseCircle.png";
import SolidCloseIcon from "../assets/solidcircle.png";

const SubUploadProgress = () => {
  return (
    <div className={style["upload-progress-wrapper"]}>
      <div className={style["upload-icon"]}>
        <img src={uploadIcon} alt="folder-icon" />
      </div>
      <div className={style["upload-progress-status2"]}>
        <p className={style["text-bold"]}>ALICE AUDIO RECORDING</p>
        <p className={style["small-text-light"]}>
          12 June 2022 at 12:00 pm. 1.4 Mb / 4.2 Mb
        </p>
      </div>
      <div className={style["action-wrapper"]}>
        <img src={PauseIcon} alt="pause-icon-button" />
        <img src={SolidCloseIcon} alt="close-icon-button" />
      </div>
    </div>
  );
};

export default SubUploadProgress;
