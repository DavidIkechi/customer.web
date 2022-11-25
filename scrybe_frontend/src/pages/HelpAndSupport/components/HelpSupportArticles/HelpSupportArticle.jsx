import styles from "./HelpSupportArticle.module.scss";

function HelpSupportArticle() {
  return (
    <div className={styles.articles_cont}>
      <h4>Articles</h4>
      <div className={styles.articles_wrapper}>
        <h3>Guide: How to log in and sign up</h3>
        <h3>Guide: Who can use scrybe</h3>
        <h3>Guide: How Accurate is the Transcriptor? </h3>
        <h3>Guide: Monitoring your employees data </h3>
        <h3>Article: How to get your downloads in real time</h3>
      </div>
    </div>
  );
}

export default HelpSupportArticle;
