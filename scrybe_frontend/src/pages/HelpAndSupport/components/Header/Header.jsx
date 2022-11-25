import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header_style}>
      <div className={styles.help_nav}>
        <a href="/">Help and support</a>
      </div>
      <div className={styles.help_header}>
        <h1>Hi! How can we help you?</h1>
        <p>Everything you need to get started on Scrybe</p>
      </div>
    </div>
  );
}

export default Header;
