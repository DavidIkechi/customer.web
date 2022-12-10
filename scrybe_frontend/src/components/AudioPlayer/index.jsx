import ReactDOM from "react-dom";
import styles from "./AudioPlayer.module.scss";

export default function AudioPlayer() {
  return ReactDOM.createPortal(
    <div className={styles.background__container}></div>,
    document.getElementById("root")
  );
}
