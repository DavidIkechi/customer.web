import React from "react";
import NotificationCss from "./NotificationSettings.module.scss";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import OverlayEmail from "../../Components/SettingsPageOverlay/SettingsPageOverlayEmail";
import Footer from "../../../../components/footer/index";

import { Link } from "react-router-dom";

const NotificationSettings = () => {
  const cardDetails = [
    {
      title: "Stay Up-to-date",
      description: "Send me updates about new features",
    },
    {
      title: "Sign up to our newsletter",
      description:
        "Become a Scrybe insider. Stay up-to-date with updates from us",
    },
    {
      title: "Get periodic summary",
      description:
        "Allow us to send you a weekly/monthly summary of all your activities on Scrybe, including a breakdown of transcriptions and sentiment analysis conducted",
      option1: "Get summary at the end of every week",
      option2: "Get summary at the end of every month",
    },
    {
      title: "Distribute report",
      mobileTitle: "Share a copy of reports",
      description:
        "Automatically send a copy of reports and summaries to officers within your organization via their work email address",
      emailTitle: "Enter recipient’s email address:",
    },
  ];

  const [showMessage, setShowMessage] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);

  const toggleMessage = (index) => {
    if (index === "Get periodic summary") {
      setShowMessage((prevState) => !prevState);
    }
    if (index === "Distribute report") {
      setShowEmail((prevState) => !prevState);
    } else {
      setShowMessage((prevState) => prevState);
      setShowEmail((prevState) => prevState);
    }
  };

  // form validation
  const [email, setEmail] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={NotificationCss.NotificationSettings_container}>
        <RedirectNav />
        <div className={NotificationCss.NotificationSettings_wrapper}>
          <h2>Notification</h2>
          <div className={NotificationCss.card}>
            <p>Your primary notification email is set to:</p>
            <h3>johndoe.admin@businessemail.com</h3>
            <Link to="" onClick={() => setShowModal((prevState) => !prevState)}>
              Change email
            </Link>
            {showModal && (
              <OverlayEmail
                setShowModal={() =>
                  setShowModal((prevState) => !prevState, window.scrollTo(0, 0))
                }
              />
            )}
          </div>
          <div className={NotificationCss.NotificationSettings_options}>
            <h3>Custom settings</h3>
            <form
              action=""
              onSubmit={handleEmailSubmit}
              className={NotificationCss.NotificationSettings_form}
            >
              <div className={NotificationCss.option}>
                {cardDetails.map((card, index) => (
                  <div
                    key={index}
                    className={NotificationCss.NotificationSettings_optionCard}
                  >
                    <div className={NotificationCss.header}>
                      <h3>{card.title}</h3>
                      <div className={NotificationCss.toggleBtn}>
                        <label
                          htmlFor={index}
                          className={NotificationCss.toggle}
                        >
                          <input
                            onClick={() => toggleMessage(card.title)}
                            id={index}
                            type="checkbox"
                            className={NotificationCss.toggleSwitch}
                          />
                          <span className={NotificationCss.slider}></span>
                        </label>
                      </div>
                    </div>
                    <div className={NotificationCss.optMessage}>
                      <p className={NotificationCss.messageDesc}>
                        {card.description}
                      </p>
                      {card.emailTitle && (
                        <div
                          style={{ display: showEmail ? "block" : "none" }}
                          className={NotificationCss.emailInput}
                        >
                          <label htmlFor="emailReport">{card.emailTitle}</label>
                          <input
                            className={NotificationCss.email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="emailReport"
                            id="emailReport"
                          />
                        </div>
                      )}
                      {card.option1 && (
                        <div
                          style={{ display: showMessage ? "block" : "none" }}
                          className={NotificationCss.message}
                        >
                          <label
                            style={{ display: card.option2 ? "flex" : "none" }}
                            htmlFor="weeklyMsg"
                          >
                            <p className={NotificationCss.optMessage}>
                              {card.option1}
                            </p>
                            {
                              <input
                                type="checkbox"
                                name="weeklyMsg"
                                id="weeklyMsg"
                              />
                            }
                          </label>
                        </div>
                      )}
                      {card.option2 && (
                        <div
                          style={{ display: showMessage ? "block" : "none" }}
                          className={NotificationCss.message}
                        >
                          {
                            <label
                              style={{
                                display: card.option2 ? "flex" : "none",
                              }}
                              htmlFor="monthlyMsg"
                            >
                              <p className={NotificationCss.optMessage}>
                                {card.option2}
                              </p>

                              <input
                                type="checkbox"
                                name="monthlyMsg"
                                id="monthlyMsg"
                              />
                            </label>
                          }
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit">Save changes</button>
            </form>
          </div>
        </div>
      </div>
      <div className={NotificationCss.subpages_footer}>
        <Footer />
      </div>
    </div>
  );
};

export default NotificationSettings;
