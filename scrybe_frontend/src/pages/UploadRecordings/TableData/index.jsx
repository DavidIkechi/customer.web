/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */

import axios from "axios";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IsLoadingSkeleton from "../../../components/LoadingSkeleton";
import { formatAudioLen } from "../../../helpers/formatAudioLen/index";
import { formatAudioSize } from "../../../helpers/formatAudioSize/index";
import { formatDate } from "../../../helpers/formatDate";
import { shortenfilename } from "../../../helpers/shortenFileLen";
import closeModalIcon from "./imgs/close-icon.svg";
import deleteIcon from "./imgs/delete-icon.svg";
import notfoundImg from "./imgs/notfound.svg";
import dropdownIcon from "./imgs/select-arrow.svg";
import soundwave from "./imgs/soundwave.svg";
import uploadBtn_icon from "./imgs/uploadBtnIcon.svg";
import styles from "./tabledata.module.scss";

const TableData = ({ searchKeyword }) => {
  const [allRecordings, setAllRecordings] = useState([]);
  const [recordCheckedList, setRecordCheckedList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [recordingsProcessed, setRecordingsProcessed] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // const timeLeft = 20;

  useEffect(() => {
    const newRecordings = fetchData("list-audios-by-user");
    setAllRecordings([newRecordings.data]);
  }, []);

  const getChecked = (e) => {
    let checkedList = [...recordCheckedList];
    if (e.target.checked) {
      checkedList = [...recordCheckedList, e.target.value];
    } else {
      checkedList = recordCheckedList.filter((item) => item !== e.target.value);
    }
    setRecordCheckedList(checkedList);
  };

  // fetch data from backend
  const token = localStorage.getItem("heedAccessToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    setIsFetching(true);
    try {
      await axios
        .get("list-audios-by-user", { headers })
        .then((res) => {
          if (res.status === 200) {
            setSessionExpired(false);
            setAllRecordings(res.data);
            setIsFetching(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setSessionExpired(true);
            setIsFetching(false);
          }
        });
    } catch (error) {
      console.log(error);
      setSessionExpired(true);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenDeletePopup(false);
    setRecordCheckedList([]);
    setOpenModal(false);
    fetchData();
  };

  const deleteBulkRecordings = async () => {
    const audioToInt = recordCheckedList.map((item) => parseInt(item, 10));
    await axios
      .delete(`audios/delete?audios=${[audioToInt]}`, {
        headers,
      })
      .then((res) => {
        if (res.status === 200) {
          setRecordCheckedList([]);
          fetchData();
        }
      });
    handleClose();
    setOpenDeletePopup(false);
  };

  const deleteRecording = async (id) => {
    await axios
      .delete(`audios/delete?audios=${[id]}`, {
        headers,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchData();
        }
      });
  };

  const allRecordingsProcessed = () => {
    const allProcessed = allRecordings.every(
      (item) =>
        item?.job_details?.job_status !== "Processing" &&
        item?.job_details?.job_status !== "Pending" &&
        item?.job_details?.job_status !== "queued"
    );
    if (allProcessed) {
      setRecordingsProcessed(true);
    } else {
      setRecordingsProcessed(false);
    }
  };

  const searchRecordings = (allrecords) => {
    return allrecords.filter((item) => {
      return JSON.stringify(item?.filename)
        ?.toLowerCase()
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
          {/* <h2 className={styles.est_time_left}>
            Estimated Time Left:{" "}
            <strong className={styles.est_time_left_num}>{timeLeft}</strong> Min
          </h2> */}
          <div className={styles.UploadedNavbarRec_btnwrap}>
            <img src={uploadBtn_icon} alt="" />
            <button className={styles.UploadedNavbarRec_btn}>Upload</button>
          </div>
        </div>
        <div className={styles.uploaded_table_wrap}>
          {isFetching ? (
            <IsLoadingSkeleton />
          ) : (
            <>
              {sessionExpired ? (
                <h1 className={styles.expired}>
                  <small>
                    Your Session has has expired, please signin again
                  </small>
                  <p>
                    <Link to="/signin">Signin</Link>
                  </p>
                </h1>
              ) : (
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
                  <>
                    {searchRecordings(allRecordings).length > 0 ? (
                      <tbody className={styles.uploaded_table_body}>
                        {searchRecordings(allRecordings).map((recording) => {
                          const job_status = recording?.job_details?.job_status;

                          return (
                            <tr key={recording?.id}>
                              <td
                                className={
                                  styles.uploaded_table_body_checkbox_img_wrap
                                }
                              >
                                <input
                                  type="checkbox"
                                  value={recording?.id}
                                  name="checkbox"
                                  onChange={getChecked}
                                  id="checkbox"
                                  className={
                                    styles.uploaded_table_body_checkbox
                                  }
                                />
                                <img
                                  src={soundwave}
                                  alt="soundwave-icon"
                                  className={
                                    styles.uploaded_table_body_cell_img
                                  }
                                />
                              </td>
                              <td>{shortenfilename(recording?.filename)}</td>
                              <td>{formatAudioLen(recording?.duration)}</td>
                              <td>{formatAudioSize(recording?.size)}</td>
                              <td>{formatDate(recording?.timestamp)}</td>
                              <td>
                                <strong
                                  style={{
                                    color:
                                      // eslint-disable-next-line no-nested-ternary
                                      job_status === "Processing" ||
                                      job_status === "queued"
                                        ? "#FFB800"
                                        : job_status === "Successful" ||
                                          job_status === "completed"
                                        ? "#3bb031"
                                        : "#ff291b",
                                  }}
                                >
                                  {job_status}{" "}
                                  {job_status === "completed" && (
                                    <Link
                                      to={`/transcriptions/${recording?.job_id}`}
                                      className={styles.retry}
                                    >
                                      result
                                    </Link>
                                  )}
                                </strong>
                              </td>
                              <td
                                className={
                                  styles["uploaded-table-body-cell delete-btn"]
                                }
                                onClick={() => deleteRecording(recording?.id)}
                              >
                                <img
                                  src={deleteIcon}
                                  alt="delete-icon "
                                  className={styles.delete_icon}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <div className={styles.not_found_wrap}>
                        <img src={notfoundImg} alt="not found" />
                        <p>Sorry, we couldn’t find any results</p>
                      </div>
                    )}
                  </>
                </table>
              )}
            </>
          )}
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
            </div>
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
