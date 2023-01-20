import React, { useEffect } from "react";
import style from "./Modal.module.scss";
import closecircle from "./assets/closecircle.png";
import { useState } from "react";
import axios from "axios";
import DragAndDrop from "./Components/DragAndDrop";
import UploadProgress from "./Components/UploadProgress";
import SubUploadProgress from "./Components/SubUploadProgress";
import UploadComplete from "./Components/UploadComplete";
import { dispatch } from "../../redux/store";
import { createResponse } from "../../redux/utils/UtilSlice";
import ErrorHandler from "../../redux/axios/Utils/ErrorHandler";
import { useNavigate } from "react-router";

const Modal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [showProgressList, setShowProgressList] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(true);
  const [file, setFile] = useState({ file: { name: "", progress: 0 } });
  const [firstName, setFirstName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [lastName, setLastName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (firstName === "") {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [firstName]);

  const handleUpload = (file) => {
    // handle upload
    // keep track of the prgress in a list
    const myData = new FormData();
    myData.append("first_name", firstName);
    myData.append("last_name", lastName);
    myData.append("files", file);
    setFile({ file, progress: 0 });

    const destinationUrl = "https://api.heed.cx/analyse/upload_audios";
    const token = sessionStorage.getItem("heedAccessToken");

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .request({
        method: "post",
        url: destinationUrl,
        data: myData,
        headers,
        onUploadProgress: (p) => {
          setFile({ file, progress: (p.loaded / p.total) * 100 });
        },
      })
      .then((response) => {
        ResetState();
        dispatch(
          createResponse({ type: "Success", message: response.data.detail })
        );

        setTimeout(() => navigate("/uploaded-recordings"), 4000);
      })
      .catch((err) => {
        setOpen(false);
        dispatch(createResponse(ErrorHandler(err)));
      });
  };

  const ResetState = () => {
    setOpen(false);
    setFile({ file: { name: "", progress: 0 } });
    setFirstName("");
    setLastName("");
  };

  return (
    <div id="modal" style={{ display: open ? "block" : "none", zIndex: "999" }}>
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
              <img src={closecircle} alt="" onClick={() => ResetState()} />
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
                  btnDisabled={btnDisabled}
                  // isNamesValid={isNamesValid}
                />
              )}
              {showUploadProgress && !isUploadComplete && (
                <UploadProgress file={file} />
              )}

              {showProgressList && !showDropDownIcon && <UploadProgressList />}
              {isUploadComplete && (
                <UploadComplete
                  link={`/transcriptions/${link}`}
                  transcript_id={link}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function UploadProgressList() {
  return (
    <section className={style["upload-progress-list"]}>
      {[1, 2].map((i) => (
        <SubUploadProgress key={i} />
      ))}
    </section>
  );
}

export default Modal;
