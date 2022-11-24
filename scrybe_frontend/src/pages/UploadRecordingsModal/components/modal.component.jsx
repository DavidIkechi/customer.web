import closecircle from "../images/closecircle.png";
import { PrimaryButton } from "./button.component";
import { useState } from "react";
import uploadIcon from "../images/folderIcon.png";
import layer from "../images/layer.svg";
import arrowDown from "../images/arrowdown.png";
import arrowUp from "../images/arrowup.png";
import style from "../UploadRecordingsModal.module.scss";
import PauseIcon from "../images/PauseCircle.png";
import SolidCloseIcon from "../images/solidcircle.png";

export function UploadModal({ closeModal }) {
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showProgressList, setShowProgressList] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(true);

  return (
    <div className={style["modal-background"]}>
      <div className={style["modal-container"]}>
        <div className={style["modal-header"]}>
          <h3>Upload audio files</h3>
          <p>Upload agent records to transcribe</p>
          <div className={style.close}>
            <img src={closecircle} alt="" onClick={() => closeModal(false)} />
          </div>
        </div>
        <div className={style["modal-body-container"]}>
          <div className={style["modal-body"]}>
            <DragAndDrop setShowUploadProgress={setShowUploadProgress} />
            {showUploadProgress && showDropDownIcon && <UploadProgress />}
            {showUploadProgress && (
              <DropDown
                showDropDownIcon={showDropDownIcon}
                setShowDropDownIcon={setShowDropDownIcon}
                setShowProgressList={setShowProgressList}
              />
            )}
            {showProgressList && !showDropDownIcon && <UploadProgressList />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDown({
  setShowDropDownIcon,
  showDropDownIcon,
  setShowProgressList,
}) {
  const action = () => {
    setShowDropDownIcon(!showDropDownIcon);
    setShowProgressList(true);
  };

  return (
    <div className={style["files-toggle"]}>
      <p>All Files</p>
      <div>
        {showDropDownIcon && (
          <img src={arrowDown} alt="down-chevron" onClick={() => action()} />
        )}
        {!showDropDownIcon && (
          <img src={arrowUp} alt="up-chevron" onClick={() => action()} />
        )}
      </div>
    </div>
  );
}

function DragAndDrop({ setShowUploadProgress }) {
  const showUploadProgress = () => {
    setShowUploadProgress(true);
  };
  return (
    <section className={style["drag-and-drop"]}>
      <img src={layer} alt="" />
      <h3>
        Drag and drop agent audio call <br /> recordings
      </h3>
      <div className={style["or-wrapper"]}>
        <hr />
        <p className={style.or}>or</p>
      </div>
      <p className={style["small-text"]}>
        Audio files must be smaller than 10mb
      </p>
      {/* <button>Browse Files</button> */}
      <PrimaryButton text="Browse Files" onClick={showUploadProgress} />
    </section>
  );
}

function UploadProgress() {
  const progress = 80;
  return (
    <section className={style["upload-progress"]}>
      <div className={style["upload-progress-wrapper"]}>
        <div className={style["upload-icon"]}>
          <img src={uploadIcon} alt="folder-icon" />
          <p>12/30</p>
        </div>
        <div className={style["upload-progress-status"]}>
          <p>Uploading...</p>
          <p>File name</p>
          <div className={style["progress-wrapper"]}>
            <div
              className={style["progress-bar"]}
              style={{ width: progress + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadProgressList() {
  return (
    <section className={style["upload-progress-list"]}>
      {[1, 2].map((i) => (
        <SubUploadProgress key={i} />
      ))}
    </section>
  );
}

function SubUploadProgress() {
  return (
    <div className={style["upload-progress-wrapper"]}>
      <div className={style["upload-icon"]}>
        <img src={uploadIcon} alt="folder-icon" />
      </div>
      <div className={style["upload-progress-status"]}>
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
}
