// eslint-disable-next-line no-warning-comments
// TODO disable eslint warning for this todo ;)
import React, { useState, useRef } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import styles from "./try_state_1.module.scss";
// import RecordingLogo from "../../assets/Recording-logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Processing from "../Try_state_3/index";
// import { object } from "prop-types";

export default function TryState1() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcribeId, setTranscribeId] = useState("");
  // const [hasError, setError] = useState(true);
  // const [display, setDisplay] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputRef = useRef();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(handleFileSelect);
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (processing) {
  //     navigate("/try-processing");
  //   }
  // }, [processing, navigate]);

  useEffect(() => {
    if (uploadSuccess) {
      setUploadSuccess(false);
      navigate(`/try-results/${transcribeId}`);
    }
  }, [uploadSuccess, transcribeId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "https://api.heed.hng.tech/tryForFree",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadSuccess(true);
      setTranscribeId(response.data.transcript_id);
    } catch (error) {
      console.log(error);
      setUploadSuccess(false);
    }
  };
  if (processing) return <Processing />;

  if (selectedFile)
    return (
      <div className={styles.recordingSection}>
        <div
          className={styles.recordingDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={styles.recordingContent}>
            <div className={styles.recordingImageContainer}>
              <img
                src="https://res.cloudinary.com/djufngoed/image/upload/v1670423929/Recording-logo_hgu6yo.webp"
                alt="some"
              />
            </div>
            <div>
              <h4>{selectedFile.name}</h4>
            </div>
            <div className={styles.Or}>
              <div className={styles.orLeft} />
              <div className={styles.pDiv}>
                <p>OR</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                hidden
                ref={inputRef}
                onChange={handleFileSelect}
              />
              <p
                className={styles.Upload}
                onClick={() => inputRef.current.click()}
              >
                Select another file from your computer
              </p>
              <input
                onClick={() => {
                  // setProcessing(true);
                  // console.log("nice");
                }}
                type="submit"
                className={styles.selectButton2}
                value="Transcribe"
              />
            </form>
          </div>
        </div>

        <div className={styles.tryNote}>
          <p>Please note;</p>
          <ul>
            <li>
              You may upload, transcribe and analyse only one recording at a
              time.
            </li>
            <li>File must not be larger than 5mb.</li>
            <li>
              Transcription may take up to 3 minutes, kindly wait or sign up to
              use the job ID feature.
            </li>
            <li>
              Downloading sentiment anlysis is currently only available on the
              webapp.
            </li>
            <li>
              Tracking sentiment anlysis records is currently only available on
              the webapp.
            </li>
          </ul>
        </div>
      </div>
    );

  return (
    <div className={styles.recordingSection}>
      {!selectedFile && (
        <div
          className={styles.recordingDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={styles.recordingContent}>
            <div className={styles.recordingImageContainer}>
              <img
                src="https://res.cloudinary.com/duzj8zjj5/image/upload/v1670418381/Recording-logo_f8dz9t.webp"
                alt="recording_image"
              />
            </div>

            <h4>Drag and drop agent audio call recordings</h4>

            <div className={styles.Or}>
              <div className={styles.orLeft} />
              <div className={styles.pDiv}>
                <p>OR</p>
              </div>
              <div className={styles.orRight} />
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                hidden
                ref={inputRef}
                onChange={handleFileSelect}
              />
              <p
                className={styles.Upload}
                onClick={() => inputRef.current.click()}
              >
                Browse from your computer
              </p>
              <input
                type="submit"
                className={styles.selectButton1}
                value="Transcribe"
              />
            </form>
          </div>
        </div>
      )}

      <div className={styles.tryNote}>
        <p>Please note;</p>
        <ul>
          <li>
            You may upload, transcribe and analyse only one recording at a time.
          </li>
          <li>File must not be larger than 5mb.</li>
          <li>
            Transcription may take up to 3 minutes, kindly wait or sign up to
            use the job ID feature.
          </li>
          <li>
            Downloading sentiment anlysis is currently only available on the
            webapp.
          </li>
          <li>
            Tracking sentiment anlysis records is currently only available on
            the webapp.
          </li>
        </ul>
      </div>
    </div>
  );
}
