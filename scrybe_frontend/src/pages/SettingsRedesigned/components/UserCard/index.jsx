import styles from "./UserCard.module.scss";
import dummyProfilePic from "./assets/images/Pic.png";

export default function UserCard() {
  return (
    <div className={styles.user__info}>
      <div className={styles.user__image}>
        <img src={dummyProfilePic} alt="profile picture" />
      </div>
      <div className={styles.user__info__text}>
        <div className={styles.user__name}>Bruno Doe</div>
        <div className={styles.role}>Administrator</div>
        <div className={styles.email}>johndoe.admin@email.com</div>
      </div>
    </div>
  );
}
