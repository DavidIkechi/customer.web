import React, { useEffect, useState } from "react";
import { analysisIcon } from "../../assets/images";
import styles from "./style.module.scss";
import { Checkbox } from "../Checkbox";
export default function ListView({ title, name, review, date, color, length }) {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <div className={styles.list}>
      <div className={styles.list__wrapper}>
        <div className={styles.list__container}>
          <div className={styles.list__filenames}>
            <div className={styles.list__input}>
              <Checkbox />
            </div>
            <div className={styles.list__filename}>
              {width >= 790 ? (
                <img src={analysisIcon} alt="analysis icon" />
              ) : (
                ""
              )}

              <h3 className={styles.list__title}>{title}</h3>
            </div>
          </div>

          <div className={styles.list__names}>
            <p className={styles.list__name}>{name}</p>
          </div>
          <div className={styles.list__btns}>
            <button
              className={styles.list__btn}
              type="button"
              style={{ backgroundColor: color }}
            >
              {review}
            </button>
          </div>
          <div className={styles.list__dates}>
            <span className={styles.list__date}>{date}</span>
          </div>
          <span className={styles.list__time}>{length}</span>
        </div>
      </div>
    </div>
  );
}
