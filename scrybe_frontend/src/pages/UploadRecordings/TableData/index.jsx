/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import closeModalIcon from "./imgs/close-icon.svg";
import deleteIcon from "./imgs/delete-icon.svg";
import notfoundImg from "./imgs/notfound.svg";
import dropdownIcon from "./imgs/select-arrow.svg";
import soundwave from "./imgs/soundwave.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import styles from "./tabledata.module.scss";

// dummy recordings
const recordings = [
  {
    id: 1,
    fileName: "Ore Audio Recording.mp3",
    length: "05:23",
    size: "4.2 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Processing",
  },
  {
    id: 2,
    fileName: "Shullamite Audio Recording.mp3",
    length: "05:23",
    size: "3.4 MB",
    date: "13/11/22 (5:22 PM)",
    status: "Processing",
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

const TableData = ({ searchKeyword }) => {
  const [allRecordings, setAllRecordings] = useState(recordings);
  const [recordCheckedList, setRecordCheckedList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [recordingsProcessed, setRecordingsProcessed] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
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
    setOpenDeletePopup(false);
  };

  const deleteRecording = (id) => {
    const newRecordings = allRecordings.filter((item) => item.id !== id);
    setAllRecordings(newRecordings);
  };

  const allRecordingsProcessed = () => {
    const allProcessed = allRecordings.every(
      (item) => item.status !== "Processing"
    );
    if (allProcessed) {
      setRecordingsProcessed(true);
    } else {
      setRecordingsProcessed(false);
    }
  };

  const searchRecordings = (allrecords) => {
    return allrecords.filter((item) => {
      return JSON.stringify(item.fileName)
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });
  };

  useEffect(() => {
    allRecordingsProcessed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordings, searchKeyword]);
  return (
    <div
      className={`${styles.uploaded_recordings} ${
        searchRecordings(allRecordings).length < 1 ? styles.no_items_found : ""
      } ${recordingsProcessed ? styles.processed : ""}`}
    >
      <div className={styles.overall_table}>
        <div
          className={`${openModal ? styles.modal_open : styles.modal_close}`}
        >
          <div className={styles.uploaded_modal}>
            <div className={styles.modalbox}>
              <div className={styles.close_modal_icon} onClick={handleClose}>
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
            <strong className={styles.est_time_left_num}>{timeLeft}</strong> Min
          </h2>
          <div className={styles.UploadedNavbarRec_btnwrap}>
            <img src={uploadBtn_icon} alt="" />
            <button className={styles.UploadedNavbarRec_btn}>Upload</button>
          </div>
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
            {searchRecordings(allRecordings).length > 0 ? (
              <tbody className={styles.uploaded_table_body}>
                {searchRecordings(allRecordings).map((recording) => (
                  <tr key={recording.id}>
                    <td
                      className={styles.uploaded_table_body_checkbox_img_wrap}
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
                      className={styles["uploaded-table-body-cell delete-btn"]}
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
        {searchRecordings(allRecordings).length > 0 && (
          <div className={styles.uploaded_recordings_options}>
            <div className={styles.bulkbtn_calbackurl_wrap}>
              <div className={styles.bulkselect_wrap}>
                <div
                  className={`${styles.bulkselect} ${
                    recordCheckedList.length > 0 && styles.selectionActive
                  }`}
                >
                  <div>
                    {recordCheckedList.length > 0 ? (
                      <p className={styles.selectActive}>
                        {recordCheckedList.length} File(s) Selected
                      </p>
                    ) : (
                      " Bulk Actions"
                    )}
                  </div>
                  {recordCheckedList.length > 0 && (
                    <img
                      className={openDeletePopup ? styles.rotateIcon : ""}
                      src={dropdownIcon}
                      alt="down-arrow"
                      onClick={() => setOpenDeletePopup(!openDeletePopup)}
                    />
                  )}
                  {
                    <div
                      className={`${styles.bulkselect_children} ${
                        openDeletePopup && styles.openPopup
                      }`}
                    >
                      <p>
                        {recordCheckedList.length > 0
                          ? `${recordCheckedList.length} File(s) Selected`
                          : " Bulk Actions"}
                      </p>
                      <p onClick={handleOpen}>Delete</p>
                    </div>
                  }
                </div>
              </div>
              <div className={styles.calbackurl_wrap}>
                <p>This process might take up to 20 minutes. </p>
                <p className={styles.callback_url}>
                  Can’t wait? <span>Click here to copy your call back URL</span>{" "}
                </p>
              </div>
            </div>
            <div className={`${styles.view_resultbtn} `}>View Result</div>
          </div>
        )}
      </div>
    </div>
  );
};

TableData.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
};

export default TableData;
