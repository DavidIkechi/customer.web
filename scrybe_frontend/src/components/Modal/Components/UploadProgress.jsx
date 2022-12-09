import React from "react";
import style from "../Modal.module.scss";
import uploadIcon from "../assets/folderIcon.png";

const UploadProgress = ({ file }) => {
  return (
    <section className={style["upload-progress"]}>
      <div className={style["upload-progress-wrapper"]}>
        <div className={style["upload-icon"]}>
          <img src={uploadIcon} alt="folder-icon" />
          {/* <p>12/30</p> */}
        </div>
        <div className={style["upload-progress-status1"]}>
          <p>Uploading...</p>
          <p>{file.file?.name}</p>
          <div className={style["progress-wrapper"]}>
            <div
              className={style["progress-bar"]}
              style={{ width: file?.progress + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadProgress;
