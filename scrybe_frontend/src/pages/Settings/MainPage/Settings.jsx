import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewDesignSidebar from "../../../components/NewDesignSidebar";
import ChevronRight from "../assets/icons/chevron-right.svg";
// import ProfilePic from "../assets/images/Pic.png";
import Overlay from "../Components/SettingsPageOverlay/SettingsPageOverlay";
import AccountSetting from "../SettingsPageSubPages/AccountSettings/AccountSettings";
import Notification from "../SettingsPageSubPages/Notifications/NotificationSettings";
import PersonalInformation from "../SettingsPageSubPages/PersonalInformation/PersonalInformationSettings";
import MainPageCss from "./Settings.module.scss";
import TopNav from "../../../components/TopNav";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
  const cardDetails = [
    {
      path: "personal-information",
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
  const { user } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isPage, setPage] = React.useState(true);
  const [isAccountPage, setIsAccountPage] = React.useState(false);
  const [isNotificationPage, setIsNotificationPage] = React.useState(false);
  const [accountUser, setAccountUser] = React.useState();

  const [showModal, setShowModal] = React.useState(false);
  const [toggleSidebar, setToggleSidebar] = React.useState(false);

  const navigate = useNavigate();

  const togglePage = (page) => {
    if (page === "Personal information") {
      setPage(true);
      setIsAccountPage(false);
      setIsNotificationPage(false);
    }
    if (page === "Account security") {
      setIsAccountPage(true);
      setPage(false);
      setIsNotificationPage(false);
    }
    if (page === "Notification") {
      setIsNotificationPage(true);
      setIsAccountPage(false);
      setPage(false);
    }
  };

  useEffect(() => {
    if (user) {
      setAccountUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <div className={MainPageCss.mainpage__wrapper}>
        <NewDesignSidebar
          toggleSidebar={toggleSidebar}
          needSearchMobile="needSearchMobile"
          closeSidebar={() => setToggleSidebar(!toggleSidebar)}
        >
          <div className={MainPageCss.mainpage__container}>
            <TopNav
              openSidebar={() => {
                setToggleSidebar(!toggleSidebar);
              }}
            />
            <div className={MainPageCss.mainpage_container}>
              <div className={MainPageCss.mainpage_wrapper}>
                <div className={MainPageCss.mainpage_header}>
                  <h1>Settings</h1>
                </div>
                <div className={MainPageCss.mainpage_profileCard}>
                  <div className={MainPageCss.image}>
                    {accountUser &&
                      (accountUser?.company_logo_url ? (
                        <img
                          src={accountUser?.company_logo_url}
                          alt="User's profile"
                        />
                      ) : (
                        accountUser?.first_name[0] +
                        "" +
                        accountUser?.last_name[0]
                      ))}
                  </div>
                  <div className={MainPageCss.mainpage_textContent}>
                    <h2>
                      {accountUser?.first_name &&
                        accountUser?.first_name + " " + accountUser?.last_name}
                    </h2>
                    {accountUser?.is_admin && (
                      <p className={MainPageCss.title}>Administrator</p>
                    )}
                    <p className={MainPageCss.email}>{accountUser?.email}</p>
                  </div>
                </div>
                <section className={MainPageCss.mainpage_options}>
                  <Link
                    onClick={() => togglePage(cardDetails[0].title)}
                    to={window.innerWidth <= 768 ? cardDetails[0].path : ""}
                  >
                    <div
                      className={MainPageCss.optionsCard}
                      style={{
                        backgroundColor: isPage && !isMobile ? "#e6f0ff" : "",
                      }}
                    >
                      <div className={MainPageCss.header}>
                        <h2 className={MainPageCss.heading}>
                          {cardDetails[0].title}
                        </h2>
                        <img src={ChevronRight} alt="" />
                      </div>
                      <p
                        style={{
                          color: isPage && !isMobile ? "#002D6B" : "",
                        }}
                      >
                        {cardDetails[0].description}
                      </p>
                    </div>
                  </Link>
                  <Link
                    onClick={() => togglePage(cardDetails[1].title)}
                    to={window.innerWidth <= 768 ? cardDetails[1].path : ""}
                  >
                    <div
                      className={MainPageCss.optionsCard}
                      style={{
                        backgroundColor: isAccountPage ? "#e6f0ff" : "",
                      }}
                    >
                      <div className={MainPageCss.header}>
                        <h2 className={MainPageCss.heading}>
                          {cardDetails[1].title}
                        </h2>
                        <img src={ChevronRight} alt="" />
                      </div>
                      <p style={{ color: isAccountPage ? "#002D6B" : "" }}>
                        {cardDetails[1].description}
                      </p>
                    </div>
                  </Link>
                  <Link
                    onClick={() => togglePage(cardDetails[2].title)}
                    to={window.innerWidth <= 768 ? cardDetails[2].path : ""}
                  >
                    <div
                      className={MainPageCss.optionsCard}
                      style={{
                        backgroundColor: isNotificationPage ? "#e6f0ff" : "",
                      }}
                    >
                      <div className={MainPageCss.header}>
                        <h2 className={MainPageCss.heading}>
                          {cardDetails[2].title}
                        </h2>
                        <img src={ChevronRight} alt="" />
                      </div>
                      <p style={{ color: isNotificationPage ? "#002D6B" : "" }}>
                        {cardDetails[2].description}
                      </p>
                    </div>
                  </Link>
                </section>
                <div
                  className={MainPageCss.error}
                  onClick={() => setShowModal((prevState) => !prevState)}
                >
                  <Link to="" className={MainPageCss.errorBtn}>
                    Delete Account
                  </Link>
                </div>
              </div>
              {showModal && (
                <Overlay
                  setShowModal={() =>
                    setShowModal(
                      (prevState) => !prevState,
                      window.scrollTo(0, 0)
                    )
                  }
                />
              )}
              {window.innerWidth > 768 && isPage && !isMobile && (
                <div
                  style={{ display: !isPage ? "none" : "block" }}
                  className={MainPageCss.external}
                >
                  {isPage && !isMobile && <PersonalInformation />}
                </div>
              )}
              <div
                style={{ display: !isAccountPage ? "none" : "block" }}
                className={MainPageCss.external}
              >
                {isAccountPage && !isMobile && <AccountSetting />}
              </div>
              <div
                style={{ display: !isNotificationPage ? "none" : "block" }}
                className={MainPageCss.external}
              >
                {isNotificationPage && !isMobile && <Notification />}
              </div>
            </div>
          </div>
        </NewDesignSidebar>
      </div>
    </>
  );
};

export default MainPage;
