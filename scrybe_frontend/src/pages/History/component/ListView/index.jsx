import React, { useEffect, useState } from "react";
import { analysisIcon } from "../../assets/images";
import styles from "./style.module.scss";
import { Checkbox } from "../../../TermsAndCondition";
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
          <div>
            <Checkbox
              style={{
                height: 30,
                width: 30,
                position: "absolute",
                top: "-4px",
                border: "1px solid #ccc",
              }}
            />
            {width >= 768 ? <img src={analysisIcon} alt="analysis icon" /> : ""}

            <h3>{title}</h3>
          </div>
          <p>{name}</p>

          <button type="button" style={{ backgroundColor: color }}>
            {review}
          </button>
          <span>{date}</span>
          <span>{length}</span>
        </div>
      </div>
    </div>
  );
}
