import { useState } from "react";
import styles from "./NotificationSubPage.module.scss";

export default function NotificationSubPage() {
  const [notificationStates, setNotificationStates] = useState({
    updates: true,
    newsletter: true,
    reports: false,
    summary: false,
    distributions: false,
  });

  const notificationData = [
    {
      title: "Stay Up-to-date",
      description: "Frequently send me App updates and new feature release.",
      name: "updates",
    },
    {
      title: "Sign up to newsletter",
      description:
        "Stay engaged with App news, updates and organisation events around you.",
      name: "newsletter",
    },
    {
      title: "Share a copy of reports",
      description:
        "Automatically send a copy of reports and summaries to officers within your organization via their organization’s email address.",
      name: "reports",
    },
    {
      title: "Get periodic summary",
      description:
        "Allow us to send you a weekly/monthly summary of all your activities including transcriptions and sentiment analysis conducted.",
      name: "summary",
    },
    {
      title: "Distribute report",
      description:
        "Automatically send reports and summaries to officers within your organization via their organization’s email address.",
      name: "distributions",
    },
  ];

  const handleToggle = (e) => {
    setNotificationStates((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.checked,
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Notification</div>
      <div className={styles.email__card}>
        <div>Your primary notification email is set to:</div>
        <div className={styles.email__card__email}>johndoe.admin@email.com</div>
        <div className={styles.change__email}>Change email</div>
      </div>
      <div className={styles.title}>Custom settings</div>
      <ul className={styles.custom__settings}>
        {notificationData.map((item, index) => {
          return (
            <li className={styles.setting} key={index}>
              <div className={styles.setting__info}>
                <div className={styles.setting__name}>{item.title}</div>
                <div className={styles.setting__description}>
                  {item.description}
                </div>
              </div>
              <div className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationStates[item.name]}
                  name={item.name}
                  onChange={handleToggle}
                />
                <div className={styles.circle}></div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.submission}>
        <button>Save changes</button>
      </div>
    </div>
  );
}
