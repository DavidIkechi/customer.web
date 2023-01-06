import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NewDesignSideBar from "./components/NewDesignSidebar";
import TopNav from "./components/TopNav";
import styles from "./pages/DashboardOverview/DashboardOverview.module.scss";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);
  const { searchQuery } = useSelector((state) => state.util);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`${styles.dashboard_overviewParent} `}>
      <NewDesignSideBar
        toggleSidebar={toggleSidebar}
        needSearchMobile="needSearchMobile"
        search={searchQuery}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className={styles.dashboard_overviewCol}>
          <div className={styles.uploadedRecordingsSideBar}>
            <TopNav
              openSidebar={() => {
                setToggleSidebar(!toggleSidebar);
              }}
              search={searchQuery}
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
