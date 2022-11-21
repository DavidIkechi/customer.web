/* eslint-disable react/react-in-jsx-scope */
import HelpSupportArticle from "../help-support-article/HelpSupportArticle";
import styles from "./General2.module.scss";
import illustration from "../assets/illustration.svg";

function General2() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.flex}>
          <HelpSupportArticle />
          <div className={styles.guide}>
            <h4> Guide: How to log in and sign up </h4>
            <div className={styles.image_container}>
              <img src={illustration} alt="dashboard illustration" />
            </div>
            <p>
              You can register on the Signup page of the web application Every
              user is entitled to limited free use of our application with just
              a quick registration. After entering the required data and
              accepting the Privacy Policy and Terms of Use, we automatically
              email you to confirm the registration. The account can be
              activated by clicking on the `Confirm registration` link in the
              e-mail. After the registration , each user has a free but limited
              Starter package. If registering with a Facebook account, no
              confirmation is required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General2;
