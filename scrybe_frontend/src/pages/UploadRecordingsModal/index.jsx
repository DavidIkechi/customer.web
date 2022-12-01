import closecircle from "./images/closecircle.png";
import { useState } from "react";
import uploadIcon from "./images/folderIcon.png";
import layer from "./images/layer.svg";
import arrowDown from "./images/arrowdown.png";
import arrowUp from "./images/arrowup.png";
import style from "./UploadRecordingsModal.module.scss";
import PauseIcon from "./images/PauseCircle.png";
import SolidCloseIcon from "./images/solidcircle.png";
import axios from "axios";

export function UploadModal({ closeModal }) {
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showProgressList, setShowProgressList] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(true);
  const [fileList, setFileList] = useState([]);

  const handleUpload = (filesArray) => {
    // handle upload
    // keep track of the prgress in a list
    const myData = new FormData();
    myData.append("file", filesArray[0]);
    console.log("file", filesArray[0]);
    const destinationUrl = "http://localhost:5000/upload-files";
    axios
      .request({
        method: "post",
        url: destinationUrl,
        data: myData,
        onUploadProgress: (p) => {
          console.log("progress", p.loaded, p.total);
          //this.setState({
          //fileprogress: p.loaded / p.total
          //})
        },
      })
      .then((data) => {
        //this.setState({
        //fileprogress: 1.0,
        //})
      });
  };

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
            <DragAndDrop
              setShowUploadProgress={setShowUploadProgress}
              setFileList={setFileList}
              handleUpload={handleUpload}
            />
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
}

function DragAndDrop({ setShowUploadProgress, setFileList, handleUpload }) {
  const showUploadProgress = () => {
    setShowUploadProgress(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // console.log(Array.from(event.dataTransfer.files));
    const files = event.dataTransfer.files;
    setFileList(Array.from(files));
    handleUpload(files);

    //upload code
    showUploadProgress();
  };

  const handleOnSelectFile = (files) => {
    setFileList(Array.from(files));
    handleUpload(files);

    //upload code
    showUploadProgress();
  };

  return (
    <section
      className={style["drag-and-drop"]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img src={layer} alt="" />
      <label htmlFor="name" className={style["name-input"]}>
        <input type="text" name="" id="" placeholder="First Name" />
        <input type="text" name="" id="" placeholder="Last Name" />
      </label>
      <h3>Drag and drop agent audio call recordings</h3>
      <div className={style["or-wrapper"]}>
        <div className={style["left-or"]}></div>
        <div className={style["or"]}>
          <p>OR</p>
        </div>
        <div className={style["right-or"]}></div>
      </div>
      <p className={style["small-text"]}>
        Audio files must be smaller than 10mb
      </p>
      <button className={style["primary-button"]}>
        <label htmlFor="file">Browse Files</label>
      </button>
      <input
        type="file"
        id="file"
        name="file"
        hidden
        multiple
        accept="audio/*"
        onChange={(event) => handleOnSelectFile(Array.from(event.target.files))}
      />
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
        <div className={style["upload-progress-status1"]}>
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
}
