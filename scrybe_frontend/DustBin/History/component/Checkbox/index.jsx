import { useState } from "react";
import styles from "./styles.module.scss";

export function Checkbox({ checked, ...props }) {
  const defaultChecked = checked || false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className={styles.checkbox}>
      <label>
        <input
          required
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          className={isChecked ? `${styles.checkbox__checked}` : ""}
          {...props}
        />
      </label>
    </div>
  );
}
