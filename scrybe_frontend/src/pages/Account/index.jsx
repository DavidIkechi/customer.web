import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import dummyData from "./DummyData";
import accountStyles from "./account.module.scss";
import profileImage from "./assets/images/profile-image.png";
import chevronLeft from "./assets/icons/chevron-left.svg";
import plus from "./assets/icons/plus.svg";
import SideBar from "../../components/SideBar";
import Cookies from "js-cookie";

function Account() {
  const [accountModalIsActive, setAccountModalIsActive] = useState(false);
  const toggleAccountModal = () => {
    setAccountModalIsActive((current) => !current);
  };

  const [accountUser, setAccountUser] = useState();

  async function getUser() {
    await axios
      // Get user details from backend
      .get("https://api.heed.hng.tech/account", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("heedAccessToken")}`,
        },
      })
      .then((res) => {
        setAccountUser(res.data);
      })
      .catch((err) => {
        // In case of Error, display paceholder data (temp measure)
        /* TODO:
          - Create modal to be displyed to user if server does not respond
        */
        setAccountUser(dummyData);
        console.log("Server returned the following error:");
        console.log(err);
      });
  }

  useEffect(() => {
    getUser();
  });

  return (
    // Only render page if the axios request is sent
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
                <img
                  src={accountUser.company_logo_url || profileImage}
                  alt="User's profile"
                />
                <div>
                  <p>{accountUser.first_name + " " + accountUser.last_name}</p>
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
                    {accountUser.phone_number && (
                      <div>
                        <p>Phone Number</p>
                        <p>{accountUser.phone_number}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={accountStyles.company_info__div}>
                  <p>Company Information</p>
                  <div>
                    <div>
                      <p>Company name</p>
                      <p>{accountUser.company_name}</p>
                    </div>
                    {accountUser.company_address && (
                      <div>
                        <p>Address</p>
                        <p>{accountUser.company_address}</p>
                      </div>
                    )}
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
                      {accountUser.agents.map((agent, index) => {
                        return agent ? (
                          <li key={index}>
                            <p>{agent}</p>
                            <p>{agent.location}</p>
                          </li>
                        ) : (
                          <p>You have no agents yet.</p>
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
                      <p>{accountUser.api_key}</p>
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
