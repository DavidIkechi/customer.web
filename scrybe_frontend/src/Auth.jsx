import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NewDesignSideBar from "./components/NewDesignSidebar";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);
  const { searchQuery } = useSelector((state) => state.util);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <NewDesignSideBar
      toggleSidebar={toggleSidebar}
      needSearchMobile="needSearchMobile"
      search={searchQuery}
      closeSidebar={() => setToggleSidebar(!toggleSidebar)}
    >
      <Outlet />
    </NewDesignSideBar>
  );
}

export function Authenticated() {
  const auth = useSelector((state) => state.user.token);

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
