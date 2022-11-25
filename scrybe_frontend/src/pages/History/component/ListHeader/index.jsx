import React from "react";
import styles from "./style.module.scss";
import { searchIcon, profileUpload, uploadIcon } from "../../assets/images";
export default function ListHeader() {
  return (
    <div className={styles.right_section_top}>
      <div className={styles.InputWithIcon}>
        <img src={searchIcon} className="" alt="hero img" />
        <input
          type="text"
          name=""
          id="search-bar"
          placeholder="  &nbsp; &nbsp; &nbsp; search again"
          required
        />
      </div>

      <div className={styles.upload_profile_container}>
        <img src={profileUpload} className="" alt="hero img" />
        <button className={styles.Upload_button}>
          <img src={uploadIcon} className="" alt="hero img" /> &nbsp; &nbsp;
          upload
        </button>
      </div>
    </div>
  );
}
