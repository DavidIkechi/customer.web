import styles from "./SubPageSelector.module.scss";

export default function SubPageSelector() {
  console.log(styles);
  const cardDetails = [
    {
      path: "account-information",
      title: "Account information",
      description: "Change your account details and set your profile picture",
    },
    {
      path: "account-security",
      title: "Account security",
      description: "Change your password and manage your connected Apps",
    },
    {
      path: "notifications",
      title: "Notification",
      description:
        "Change how we send you updates, newsletters, periodic summaries, and other notifications",
    },
  ];
  return (
    <div className={styles.selector}>
      <div className={styles.card__option}>sd</div>
    </div>
  );
}
