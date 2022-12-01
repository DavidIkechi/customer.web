import React from "react";
import styles from "./AudioControl.module.scss";

function AudioControl({
  audioElem,
  setIsPlaying,
  isPlaying,
  audioDuration,
  currentTime,
}) {
  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const SkipForward = () => {
    audioElem.current.currentTime = audioElem.current.currentTime + 4;
  };
  const SkipBackward = () => {
    audioElem.current.currentTime = audioElem.current.currentTime - 4;
  };

  const timeFormatter = (num) => {
    if (num === 0 || isNaN(num)) return `00:00`;
    const divisor_for_minutes = num % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const formatedTime = `${minutes}:${seconds}`;
    if (formatedTime.length === 3 && minutes < 1)
      return `0${minutes}:0${seconds}`;
    if (formatedTime.length === 4) return `0${minutes}:${seconds}`;
    if (formatedTime.length === 3 && minutes > 0)
      return `0${minutes}:${seconds}0`;
  };
  return (
    <div className={styles.AudioControl}>
      {/* Audio Info Details */}
      <div className={styles.AudioInfo}>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="52" height="52" rx="26" fill="#E6F0FF" />
          {/* <mask id="mask0_1919_29315" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="14" width="24" height="24">
          <rect x="14" y="14" width="24" height="24" fill="#D9D9D9"/>
          </mask> */}
          <g mask="url(#mask0_1919_29315)">
            <path
              d="M21.5 31.5V20.5H22.5V31.5H21.5ZM25.5 35.5V16.5H26.5V35.5H25.5ZM17.5 27.5V24.5H18.5V27.5H17.5ZM29.5 31.5V20.5H30.5V31.5H29.5ZM33.5 27.5V24.5H34.5V27.5H33.5Z"
              fill="#002D6B"
            />
          </g>
        </svg>
        <div className={styles.AudioName}>
          <h2>Recording mp3</h2>
          <p>4.0 mb</p>
        </div>
      </div>

      {/* AudioControlButtons */}
      <div className={styles.ControlButtons}>
        <div className={styles.RewindButton} onClick={SkipBackward}>
          <svg
            width="17"
            height="10"
            viewBox="0 0 17 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3996 9.625L9.47461 5L16.3996 0.375V9.625ZM7.52461 9.625L0.599609 5L7.52461 0.375V9.625ZM6.52461 7.75V2.25L2.39961 5L6.52461 7.75ZM15.3996 7.75V2.25L11.2746 5L15.3996 7.75Z"
              fill="#6A6A6A"
            />
          </svg>
        </div>
        <div className={styles.PlayButton} onClick={PlayPause}>
          {/* pause */}
          {isPlaying && (
            <svg
              width="9"
              height="11"
              viewBox="0 0 9 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18569 10.4V0H8.43333V10.4H6.18569ZM0.283333 10.4V0H2.53098V10.4H0.283333Z"
                fill="#6A6A6A"
              />
            </svg>
          )}
          {/* play */}
          {!isPlaying && (
            <svg
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 11.1998V0.799805L8.65 5.9998L0.5 11.1998ZM1.5 9.3498L6.8 5.9998L1.5 2.6498V9.3498Z"
                fill="#6A6A6A"
              />
            </svg>
          )}
        </div>
        <div className={styles.ForwardButton} onClick={SkipForward}>
          <svg
            width="17"
            height="10"
            viewBox="0 0 17 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.599609 9.625V0.375L7.52461 5L0.599609 9.625ZM9.47461 9.625V0.375L16.3996 5L9.47461 9.625ZM1.59961 7.75L5.72461 5L1.59961 2.25V7.75ZM10.4746 7.75L14.5996 5L10.4746 2.25V7.75Z"
              fill="#6A6A6A"
            />
          </svg>
        </div>
      </div>

      {/* Audio Timer */}
      <div className={styles.AudioTimer}>
        <p>{timeFormatter(currentTime)}</p>
        <div className={styles.AudioSlider}>
          <div className={styles.AudioFull} />
          <div className={styles.AudioIndicator} />
        </div>
        <p>{timeFormatter(audioDuration)}</p>
      </div>
    </div>
  );
}

export default AudioControl;
