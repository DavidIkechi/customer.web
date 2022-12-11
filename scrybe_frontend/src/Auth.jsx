import { useLocation, Navigate, Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import styles from "./pages/DashboardOverview/DashboardOverview.module.scss";
import NewDesignSideBar from "./components/NewDesignSidebar";
import { useState } from "react";

export const fetchToken = () => {
  return {
    token: localStorage.getItem("heedAccessToken"),
    activationTime: localStorage.getItem("accessTokenActivationTime"),
  };
};

export function RequireToken() {
  let auth = fetchToken();
  let location = useLocation();
  const tokenExpirationTime = 120; //in minutes

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isSearching, setIsSearching] = useState("");

  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };

  if (
    // if there is no token or no activation time or (there is an activationTime but it is greater than 120 mins) then redirect to login page
    (!auth.token || !auth.activationTime) &&
    (auth.activationTime
      ? (new Date().getTime() - auth.activationTime) / 60000 >=
        tokenExpirationTime
      : 0)
  ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <>
      <div className={`${styles.dashboard_overviewParent} `}>
        <NewDesignSideBar
          toggleSidebar={toggleSidebar}
          needSearchMobile="needSearchMobile"
          getValue={(e) => setterFn(e)}
          closeSidebar={() => setToggleSidebar(!toggleSidebar)}
        >
          <div className={styles.dashboard_overviewCol}>
            <div className={styles.uploadedRecordingsSideBar}>
              <TopNav
                openSidebar={() => {
                  setToggleSidebar(!toggleSidebar);
                }}
                search={(e) => setterFn(e)}
              />
            </div>

            <Outlet />
          </div>
        </NewDesignSideBar>
      </div>
    </>
  );
}
