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
import checkMarkIcon from "./images/checkMarkIcon.png";
import copyIcon from "./images/copyIcon.svg";

export function UploadModal() {
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showProgressList, setShowProgressList] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(true);
  const [closeModal, setCloseModal] = useState(true);
  const [file, setFile] = useState({ file: { name: "", progress: 0 } });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleUpload = (file) => {
    // handle upload
    // keep track of the prgress in a list
    const myData = new FormData();
    myData.append("first_name", firstName);
    myData.append("last_name", lastName);
    myData.append("file", file);
    console.log("file", file);
    setFile({ file, progress: 0 });
    const destinationUrl = "https://api.heed.hng.tech/upload_audio";
    axios
      .request({
        method: "post",
        url: destinationUrl,
        data: myData,
        onUploadProgress: (p) => {
          setFile({ file, progress: (p.loaded / p.total) * 100 });
          console.log(
            "progress",
            (p.loaded / p.total) * 100,
            p.loaded,
            p.total
          );
        },
      })
      .then((data) => {
        console.log("http response", data);
        setIsUploadComplete(true);
        // show completed phase
        //this.setState({
        //fileprogress: 1.0,
        //})
      });
  };

  return (
    <>
      {closeModal && (
        <div className={style["modal-background"]}>
          <div className={style["modal-container"]}>
            <div className={style["modal-header"]}>
              <h3>Upload audio files</h3>
              {!isUploadComplete ? (
                <p>Upload agent records to transcribe</p>
              ) : (
                <p>Agent call recording uploaded successfully</p>
              )}
              <div className={style.close}>
                <img
                  src={closecircle}
                  alt=""
                  onClick={() => setCloseModal(false)}
                />
              </div>
            </div>
            <div className={style["modal-body-container"]}>
              <div className={style["modal-body"]}>
                {!isUploadComplete && (
                  <DragAndDrop
                    setShowUploadProgress={setShowUploadProgress}
                    setFile={setFile}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    handleUpload={handleUpload}
                  />
                )}
                {showUploadProgress && !isUploadComplete && (
                  <UploadProgress file={file} />
                )}
                {/* {showUploadProgress && (
                  <DropDown
                    showDropDownIcon={showDropDownIcon}
                    setShowDropDownIcon={setShowDropDownIcon}
                    setShowProgressList={setShowProgressList}
                  />
                )} */}
                {showProgressList && !showDropDownIcon && (
                  <UploadProgressList />
                )}
                {isUploadComplete && <UploadComplete />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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

function DragAndDrop({
  setShowUploadProgress,
  setFile,
  setFirstName,
  setLastName,
  handleUpload,
}) {
  const showUploadProgress = () => {
    setShowUploadProgress(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // console.log(Array.from(event.dataTransfer.files));
    const file = Array.from(event.dataTransfer.files)[0];
    setFile({ file, progress: 0 });
    handleUpload(file);

    //upload code
    showUploadProgress();
  };

  const handleOnSelectFile = (file) => {
    setFile({ file: file, progress: 0 });
    handleUpload(file);

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
        <input
          type="text"
          id="firstName"
          required
          placeholder="First Name"
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          type="text"
          id="lastName"
          required
          placeholder="Last Name"
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
        />
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
        onChange={(event) =>
          handleOnSelectFile(Array.from(event.target.files)[0])
        }
      />
    </section>
  );
}

function UploadProgress({ file }) {
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

function UploadComplete() {
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
        <button className={style["cancel-btn"]}>Cancel</button>
        <button className={style["transcribe-btn"]}>Transcribe</button>
      </div>
      <label htmlFor="callback" className={style["callback-wrapper"]}>
        <input
          className={style["callback"]}
          type="text"
          placeholder="Callback Link"
        />
        <img src={copyIcon} alt="copy-icon" />
      </label>
    </>
  );
}
