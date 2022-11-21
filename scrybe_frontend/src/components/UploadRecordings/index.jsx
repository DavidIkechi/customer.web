/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import closeModalIcon from "./imgs/close-icon.svg";
import deleteIcon from "./imgs/delete-icon.svg";
import notfoundImg from "./imgs/notfound.svg";
import soundwave from "./imgs/soundwave.svg";
import styles from "./uploadedRecordings.module.scss";
// dummy recordings
const recordings = [
  {
    id: 1,
    fileName: "Ore Audio Recording.mp3",
    length: "05:23",
    size: "4.2 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },
  {
    id: 2,
    fileName: "Shullamite Audio Recording.mp3",
    length: "05:23",
    size: "3.4 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },
  {
    id: 3,
    fileName: "Bright Audio Recording.mp3",
    length: "05:23",
    size: "6.8 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },
  {
    id: 4,
    fileName: "Sim Sim Audio Recording.mp3",
    length: "05:23",
    size: "6.8 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },

  {
    id: 5,
    fileName: "Alice Audio Recording.mp3",
    length: "05:23",
    size: "8.6 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Failed",
  },
  {
    id: 6,
    fileName: "Alice Audio Recording. mp3",
    length: "05:23",
    size: "5.4 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Failed",
  },
  {
    id: 7,
    fileName: "Valerie Audio Recording. mp3",
    length: "05:23",
    size: "9.8 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },
  {
    id: 8,
    fileName: "David Audio Recording. mp3",
    length: "05:23",
    size: "6.8 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Successful",
  },
];

function UploadedRecordings() {
  const [allRecordings, setAllRecordings] = useState(recordings);
  const [recordCheckedList, setRecordCheckedList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    window.location.reload();
  };
  const timeLeft = 20;

  const getChecked = (e) => {
    let checkedList = [...recordCheckedList];
    if (e.target.checked) {
      checkedList = [...recordCheckedList, e.target.value];
    } else {
      checkedList = recordCheckedList.filter((item) => item !== e.target.value);
    }
    setRecordCheckedList(checkedList);
  };

  const deleteBulkRecordings = () => {
    const newRecordings = allRecordings.filter(
      (item) => !recordCheckedList.includes(item.id.toString())
    );
    setAllRecordings(newRecordings);
    setRecordCheckedList([]);
    handleClose();
    window.location.reload();
  };

  const deleteRecording = (id) => {
    const newRecordings = allRecordings.filter((item) => item.id !== id);
    setAllRecordings(newRecordings);
  };

  // returns true if all recordings dont have the Processing status
  const allRecordingsProcessed = () => {
    const allProcessed = allRecordings.every(
      (item) => item.status !== "Processing"
    );
    return allProcessed;
  };

  useEffect(() => {
    allRecordingsProcessed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordings]);

  return (
    <div className={styles.uploadedRecordingsParent}>
      <NavBar />
      <div className={styles.uploadedRecordingsGrid}>
        <div className={styles.uploadedRecordingsSideBar}>Sidebar</div>
        <div
          className={`${styles.uploaded_recordings} ${
            allRecordings.length < 1 ? styles.no_items_found : ""
          } `}
        >
          <div className={styles.overall_table}>
            <div
              className={`${
                openModal ? styles.modal_open : styles.modal_close
              }`}
            >
              <div className={styles.modal}>
                <div className={styles.modalbox}>
                  <div
                    className={styles.close_modal_icon}
                    onClick={handleClose}
                  >
                    <img src={closeModalIcon} alt="close modal icon" />
                  </div>
                  <div className={styles.delete_files_options_wrap}>
                    <p>Delete file(s)?</p>
                    <div className={styles.delete_files_btn_options}>
                      <button
                        type="button"
                        className={styles.cancel_delete}
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={styles.confirm_delete}
                        onClick={deleteBulkRecordings}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.uploaded_header}>
              <h1>Transcription Status </h1>
              <h2 className={styles.est_time_left}>
                Estimated Time Left:{" "}
                <strong className={styles.est_time_left_num}>{timeLeft}</strong>{" "}
                Min
              </h2>
            </div>
            <div className={styles.uploaded_table_wrap}>
              <table className={styles.uploaded_table}>
                <thead className={styles.uploaded_table_header}>
                  <tr className={styles.uploaded_table_row}>
                    <th />
                    <th>Filename</th>
                    <th>Length</th>
                    <th>Size</th>
                    <th>Date (Time)</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                {allRecordings.length > 0 ? (
                  <tbody className={styles.uploaded_table_body}>
                    {allRecordings.map((recording) => (
                      <tr key={recording.id}>
                        <td
                          className={
                            styles.uploaded_table_body_checkbox_img_wrap
                          }
                        >
                          <input
                            type="checkbox"
                            value={recording.id}
                            name="checkbox"
                            onChange={getChecked}
                            id="checkbox"
                            className={styles.uploaded_table_body_checkbox}
                          />
                          <img
                            src={soundwave}
                            alt="soundwave-icon"
                            className={styles.uploaded_table_body_cell_img}
                          />
                        </td>
                        <td>{recording.fileName}</td>
                        <td>{recording.length}</td>
                        <td>{recording.size}</td>
                        <td>{recording.date}</td>
                        <td>
                          <strong
                            style={{
                              color:
                                // eslint-disable-next-line no-nested-ternary
                                recording.status === "Processing"
                                  ? "#FFB800"
                                  : recording.status === "Successful"
                                  ? "#3bb031"
                                  : "#ff291b",
                            }}
                          >
                            {recording.status}{" "}
                            {recording.status === "Failed" && (
                              <a href="!" className={styles.retry}>
                                retry
                              </a>
                            )}
                          </strong>
                        </td>
                        <td
                          className={
                            styles["uploaded-table-body-cell delete-btn"]
                          }
                          onClick={() => deleteRecording(recording.id)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete-icon "
                            className={styles.delete_icon}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <div className={styles.not_found_wrap}>
                    <img src={notfoundImg} alt="not found" />
                    <p>Sorry, we couldn’t find any results</p>
                  </div>
                )}
              </table>
            </div>
            {allRecordings.length > 0 && (
              <div className={styles.uploaded_recordings_options}>
                <div className={styles.bulkbtn_calbackurl_wrap}>
                  <div className={styles.bulkselect_wrap}>
                    <select
                      name=""
                      id=""
                      className={styles.bulkselect}
                      onChange={handleOpen}
                    >
                      <option value="">
                        {recordCheckedList.length > 0
                          ? `${recordCheckedList.length} Files Selected`
                          : " Bulk Actions"}
                      </option>
                      {allRecordings.length > 2 && (
                        <option value="">Delete</option>
                      )}
                    </select>
                  </div>
                  <div className={styles.calbackurl_wrap}>
                    <p>This process might take up to 20 minutes. </p>
                    <p className={styles.callback_url}>
                      Can’t wait?{" "}
                      <span>Click here to copy your call back URL</span>{" "}
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles.view_resultbtn} ${
                    allRecordingsProcessed === true
                      ? styles.processed
                      : styles.processing
                  }`}
                >
                  View Result
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadedRecordings;
