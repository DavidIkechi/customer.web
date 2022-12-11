import styles from "./SubPages.module.scss";
import rightChevron from "./images/right_chevron.png";

export default function SubPageSelector() {
  console.log(styles);
  const cardDetails = [
    {
      path: "personal-information",
      title: "Personal information",
      description:
        "Change/Verify your account details and set your profile picture",
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
      {cardDetails.map((card, index) => {
        return (
          <div className={styles.card__option__container}>
            {index === 0 ? (
              <input
                type="radio"
                name="subpage"
                value={card.path}
                defaultChecked
              />
            ) : (
              <input type="radio" name="subpage" value={card.path} />
            )}
            <div className={styles.card__option}>
              <div className={styles.card__title}>
                {card.title}
                <img src={rightChevron} alt="chevron right" />
              </div>
              <div className={styles.card__description}>{card.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
