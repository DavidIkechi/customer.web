import React from "react";
import style from "../Modal.module.scss";
import layer from "../assets/layer.svg";

const DragAndDrop = ({
  setShowUploadProgress,
  setFile,
  setFirstName,
  setLastName,
  handleUpload,
  // isNamesValid,
}) => {
  const showUploadProgress = () => {
    setShowUploadProgress(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = Array.from(event.dataTransfer.files)[0];
    handleOnSelectFile(file);
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
};

export default DragAndDrop;
