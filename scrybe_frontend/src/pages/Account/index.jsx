import React, { useState, useEffect } from "react";
import axios from "axios";
import dummyData from "./DummyData";
import accountStyles from "./account.module.scss";
import profileImage from "./assets/images/profile-image.png";
import chevronLeft from "./assets/icons/chevron-left.svg";
import plus from "./assets/icons/plus.svg";
import SideBar from "../../components/SideBar";

function Account() {
  const [accountModalIsActive, setAccountModalIsActive] = useState(false);
  const toggleAccountModal = () => {
    setAccountModalIsActive((current) => !current);
  };

  const [accountUser, setAccountUser] = useState(null);

  async function getUser() {
    let user;
    try {
      const response = await axios.get("http://scrybe.hng.tech:5000/account");
      user = response;
    } catch (error) {
      user = dummyData;
    } finally {
      setAccountUser(user);
    }
  }

  useEffect(() => {
    getUser();
  });

  return (
    accountUser && (
      <SideBar>
        <div className={accountStyles.account__container}>
          <div
            className={
              accountModalIsActive
                ? `${accountStyles.active}
                ${accountStyles.add_agent__div}`
                : accountStyles.add_agent__div
            }
          >
            <div className={accountStyles.add_agent_modal__div}>
              <h2>Add new agent</h2>
              <p>
                Input the following information to add a new agent to your team
              </p>
              <form>
                <label htmlFor="full-name">
                  <span>Full name</span>
                  <input type="text" id="full-name" name="full-name" />
                </label>
                <label htmlFor="email">
                  <span>Email address</span>
                  <input type="email" id="email" name="email" />
                </label>
                <label htmlFor="location">
                  <span>Location</span>
                  <input type="text" id="location" name="location" />
                </label>
                <label htmlFor="consent-to-email">
                  <input
                    type="checkbox"
                    id="consent-to-email"
                    name="consent-to-email"
                    value="true"
                  />
                  <span>Send a welcome email</span>
                </label>
                <div />
                <div>
                  <label htmlFor="submit-btn">
                    <input
                      type="button"
                      id="submit-btn"
                      value="Submit"
                      name="submit-btn"
                      onClick={toggleAccountModal}
                    />
                  </label>
                  <label htmlFor="submit-btn">
                    <input
                      type="button"
                      id="cancel-btn"
                      value="Cancel"
                      name="cancel-btn"
                      onClick={toggleAccountModal}
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className={accountStyles.account__div}>
            <section className={accountStyles.mobile_head__section}>
              <span>
                <img src={chevronLeft} alt="left arrow" />
              </span>
              <h1>Profile</h1>
            </section>
            <h1 className={accountStyles.salutation}>Hi Scryber</h1>
            <div className={accountStyles.main_content__div}>
              <section className={accountStyles.profile__section}>
                <img src={profileImage} alt="User's profile" />
                <div>
                  <p>{accountUser.name}</p>
                  {accountUser.is_admin && <p>Administrator</p>}
                </div>
              </section>
              <section className={accountStyles.body__section}>
                <div className={accountStyles.personal_info__div}>
                  <p>Personal Information</p>
                  <div>
                    <div>
                      <p>Email address</p>
                      <p>{accountUser.email}</p>
                    </div>
                    <div>
                      <p>Phone Number</p>
                      <p>{accountUser.phone_number}</p>
                    </div>
                  </div>
                </div>
                <div className={accountStyles.company_info__div}>
                  <p>Company Information</p>
                  <div>
                    <div>
                      <p>Company name</p>
                      <p>{accountUser.company.name}</p>
                    </div>
                    <div>
                      <p>Address</p>
                      <p>{accountUser.company.address}</p>
                    </div>
                  </div>
                </div>
                <div className={accountStyles.agents__div}>
                  <span>
                    <p>Agents</p>
                    <button type="button" onClick={toggleAccountModal}>
                      <span>Add new</span>
                      <span>
                        <img src={plus} alt="plus icon" />
                      </span>
                      &nbsp;
                    </button>
                  </span>
                  <div>
                    <ul>
                      {accountUser.company.agents.map((agent, index) => {
                        return (
                          <li key={index}>
                            <p>{agent.name}</p>
                            <p>{agent.location}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className={accountStyles.developer_tools__div}>
                  <p>Developer tools</p>
                  <div>
                    <p>API Key</p>
                    <div>
                      <p>0123456789AC</p>
                      <button type="button">Refresh</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={accountStyles.plan_info__div}>
              <p>You are using the limited free plan.</p>
              <p>Go unlimited with Pro version</p>
            </div>
          </div>
        </div>
      </SideBar>
    )
  );
}

export default Account;
