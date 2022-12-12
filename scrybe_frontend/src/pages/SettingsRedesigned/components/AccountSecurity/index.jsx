import styles from "./AccountSecurity.module.scss";

export default function PersonalInformation() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Account security</div>
      <div className={styles.subtitle}>Change passsword</div>
    </div>
  );
}
