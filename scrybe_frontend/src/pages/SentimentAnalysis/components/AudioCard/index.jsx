import React, { useEffect } from "react";
import styles from "./AudioCard.module.scss";
import audioIcon from "../../assets/icons/audio_icon.svg";
import AsideCard from "../AsideCard";
import Proptypes from "prop-types";
import SkeletonLoader from "../SkeletonLoader";

function AudioCard({ sentimentData }) {
  const fileNameEllipsis = (filename) => {
    if (filename.length > 15) {
      let firstPart = filename.substring(
        0,
        Math.min(15, parseInt(filename.length / 2))
      );
      let secondPart = filename.substring(
        Math.max(parseInt(filename.length / 2) + 2, filename.length - 6)
      );
      let result = firstPart + "..." + secondPart;
      return result;
    } else {
      return filename;
    }
  };
  return (
    <AsideCard classtype={styles.audio__file}>
      <div className={styles.audio__icon__container}>
        <img src={audioIcon} alt="audio icon" />
      </div>
      <div className={styles.audio__text}>
        {sentimentData.audio_filename ? (
          <div className={styles.audio__name}>
            {fileNameEllipsis(sentimentData.audio_filename)}
          </div>
        ) : (
          <SkeletonLoader type="text" numberOfLines={1} />
        )}
        {sentimentData.audio_size ? (
          <div className={styles.audio__size}>
            {sentimentData.audio_size} mb
          </div>
        ) : (
          <SkeletonLoader type="text" numberOfLines={1} />
        )}
      </div>
    </AsideCard>
  );
}

AudioCard.propTypes = {
  sentimentData: Proptypes.object.isRequired,
};

export default AudioCard;
