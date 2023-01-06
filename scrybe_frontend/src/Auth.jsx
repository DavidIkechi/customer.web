import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NewDesignSideBar from "./components/NewDesignSidebar";
import TopNav from "./components/TopNav";
import styles from "./pages/DashboardOverview/DashboardOverview.module.scss";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [setIsSearching] = useState("");

  const setterFn = (e) => {
    setIsSearching(e.target.value);
  };

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
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
  );
}

export function Authenticated() {
  const auth = useSelector((state) => state.user.token);

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
