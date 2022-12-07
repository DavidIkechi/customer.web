import React, { useEffect } from "react";
import styles from "./AudioCard.module.scss";
import audioIcon from "../../assets/icons/audio_icon.svg";
import AsideCard from "../AsideCard";
import Proptypes from "prop-types";
import SkeletonLoader from "../SkeletonLoader";

function AudioCard({ sentimentData }) {
  return (
    <AsideCard classtype={styles.audio__file}>
      <div className={styles.audio__icon__container}>
        <img src={audioIcon} alt="audio icon" />
      </div>
      <div className={styles.audio__text}>
        {sentimentData.audio_filename ? (
          <div className={styles.audio__name}>
            {(() => {
              let firstPart = sentimentData.audio_filename.substring(0, 20);
              let secondPart = sentimentData.audio_filename.substring(
                sentimentData.audio_filename.length - 4
              );
              let result = firstPart + "..." + secondPart;
              return result;
            })()}
          </div>
        ) : (
          <SkeletonLoader type="text" numberOfLines={1} />
        )}
        {sentimentData ? (
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
