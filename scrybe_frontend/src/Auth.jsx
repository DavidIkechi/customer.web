import { useLocation, Navigate, Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import styles from "./pages/DashboardOverview/DashboardOverview.module.scss";
import NewDesignSideBar from "./components/NewDesignSidebar";
import { useState } from "react";

export const fetchToken = () => {
  return localStorage.getItem("heedAccessToken");
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isSearching, setIsSearching] = useState("");

  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} />;
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
