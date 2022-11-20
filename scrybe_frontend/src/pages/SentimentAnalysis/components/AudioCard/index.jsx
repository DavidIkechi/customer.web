import React from "react";
import styles from "./AudioCard.module.scss";
import audioIcon from "../../icons/audio_icon.svg";
import AsideCard from "../AsideCard";

function AudioCard() {
  return (
    <AsideCard classType={styles.audio__file}>
      <div className={styles.audio__icon__container}>
        <img src={audioIcon} alt="audio icon" />
      </div>
      <div className={styles.audio__text}>
        <div className={styles.audio__name}>Recording.mp3</div>
        <div className={styles.audio__size}>4.0 mb</div>
      </div>
    </AsideCard>
  );
}

export default AudioCard;
