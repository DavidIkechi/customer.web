import styles from "./SubPages.module.scss";
import rightChevron from "./images/right_chevron.png";
import PropTypes from "prop-types";
import { useState } from "react";

function SubPageSelector({ setCurrentSubPage }) {
  const [selectedOption, setSelectedOption] = useState("personal-information");
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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setCurrentSubPage(e.target.value);
  };

  return (
    <div className={styles.selector}>
      {cardDetails.map((card, index) => {
        return (
          <div
            className={styles.card__option__container}
            key={index + Math.random()}
          >
            <input
              type="radio"
              name="subpage"
              value={card.path}
              checked={selectedOption === card.path}
              onChange={handleOptionChange}
            />
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

SubPageSelector.propTypes = {
  setCurrentSubPage: PropTypes.func.isRequired,
};

export default SubPageSelector;
