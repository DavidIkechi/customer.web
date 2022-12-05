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
import { Link } from "react-router-dom";

export function UploadModal() {
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showProgressList, setShowProgressList] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(true);
  const [closeModal, setCloseModal] = useState(true);
  const [file, setFile] = useState({ file: { name: "", progress: 0 } });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [link, setLink] = useState("");

  // const isNamesValid = () => {
  //   console.log("isNamesValid");
  //   if(!firstName.length || !lastName.length){
  //     return false;
  //   }
  //   return true;
  // }

  const handleUpload = (file) => {
    // handle upload
    // keep track of the prgress in a list
    const myData = new FormData();
    myData.append("first_name", firstName);
    myData.append("last_name", lastName);
    myData.append("file", file);
    console.log("file", file);
    setFile({ file, progress: 0 });

    const destinationUrl = "https://api.heed.hng.tech/upload_audios";
    const token = localStorage.getItem("heedAccessToken");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b3Npbl9veWVsYW1pQHlhaG9vLmNvbSIsImV4cCI6MTY3MDE4NDM4NH0.owGrGZrgZ8fBy-B28uXuJQS7H0DKiP6X18S4HMgW4pw";
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .request({
        method: "post",
        url: destinationUrl,
        data: myData,
        headers,
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
      .then((response) => {
        console.log("http response", response.data);
        setIsUploadComplete(true);
        setLink(response.data.transcript_id);
        // show completed phase
        //this.setState({
        //fileprogress: 1.0,
        //})
      });

    // setFile({ file, progress: 100 });
    // setTimeout(() => {
    //   setIsUploadComplete(true);
    // }, 1000);
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
                    // isNamesValid={isNamesValid}
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
                {isUploadComplete && (
                  <UploadComplete
                    link={`https://heed.hng.tech/transcriptions/${link}`}
                    transcript_id={link}
                  />
                )}
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
  // isNamesValid,
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
    handleOnSelectFile(file);
  };

  const handleOnSelectFile = (file) => {
    // if (!isNamesValid()) {
    //   alert("Fill in your name");
    //   return;
    // }
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

function UploadComplete({ link, transcript_id }) {
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
}
