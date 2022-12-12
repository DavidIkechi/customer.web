import styles from "./PersonalInformation.module.scss";
import dummyPic from "../../../../assets/dummy.png";
import pencilIcon from "./assets/pencil.svg";
import { useRef } from "react";

export default function PersonalInformation() {
  const imageChanger = useRef(null);
  const profileImage = useRef(null);
  const handleClick = () => {
    imageChanger.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.current.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUnlock = (e) => {
    console.log(e.currentTarget.parentElement);
    e.currentTarget.parentElement.parentElement.querySelector(
      "input"
    ).disabled = false;
    e.currentTarget.parentElement.parentElement.querySelector("input").focus();
    e.currentTarget.hidden = true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Personal information</div>
      <div className={styles.change__picture}>
        <div className={styles.picture__container}>
          <img
            className={styles.profile__img}
            src={dummyPic}
            alt="profile image"
            ref={profileImage}
          />
          <div className={styles.changer} onClick={handleClick}>
            <div className={styles.pencil__container}>
              <img src={pencilIcon} alt="change profile-picture icon" />
            </div>
            Change profile picture
            <input
              type="file"
              accept="image/*"
              ref={imageChanger}
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>
      </div>
      <form className={styles.personal__form}>
        <div className={styles.personal__user__name}>
          <label htmlFor="first_name">
            First name:
            <input type="text" placeholder="John" name="first_name" disabled />
          </label>
          <label htmlFor="first_name">
            Last name:
            <input type="text" placeholder="Doe" name="first_name" disabled />
          </label>
        </div>
        <label htmlFor="phone_number">
          Phone number:
          <input type="tel" placeholder="+234949595874" disabled />
          <div className={styles.input__info}>
            <div className={styles.unlock__edit} onClick={handleUnlock}>
              <img src={pencilIcon} alt="edit email" />
              EDIT
            </div>
          </div>
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" placeholder="johndoe.admin@email.com" disabled />
          <div className={styles.input__info}>
            <div className={styles.email__unverified}>Unverified</div>
            <div className={styles.unlock__edit} onClick={handleUnlock}>
              <img src={pencilIcon} alt="edit email" />
              EDIT
            </div>
          </div>
        </label>
        <div className={styles.submission}>
          <button type="submit" className={styles.submit__button}>
            Save changes
          </button>
          <button type="button" className={styles.verify__email__button}>
            Verify email
          </button>
        </div>
      </form>
    </div>
  );
}
