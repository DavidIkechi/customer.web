import React from "react";
import style from "../Modal.module.scss";
import uploadIcon from "../assets/folderIcon.png";
import checkMarkIcon from "../assets/checkMarkIcon.png";
import copyIcon from "../assets/copyIcon.svg";
import { Link } from "react-router-dom";

const UploadComplete = ({ link, transcript_id }) => {
  return (
    <>
      <div className={style["upload-complete-wrapper"]}>
        <div className={style["upload-complete-text"]}>
          <img src={uploadIcon} alt="folder-icon" />
          <h3>Upload complete</h3>
        </div>
        <div>
          <img src={checkMarkIcon} alt="check-mark" />
        </div>
      </div>
      <div className={style["btn-wrapper"]}>
        <a href="upload-new-file">
          <button className={style["cancel-btn"]}>Cancel</button>
        </a>
        <Link className={style["link"]} to={`/transcriptions/${transcript_id}`}>
          <button className={style["transcribe-btn"]}>Transcribe</button>
        </Link>
      </div>
      <label htmlFor="callback" className={style["callback-wrapper"]}>
        <input
          className={style["callback"]}
          type="text"
          placeholder="Callback Link"
          value={link}
        />
        <img
          src={copyIcon}
          alt="copy-icon"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        />
      </label>
    </>
  );
};

export default UploadComplete;
