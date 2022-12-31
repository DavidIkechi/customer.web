import { Navigate, Outlet } from "react-router-dom";
// import { localStorageUser } from "./helpers/localStorageUser";
import { useCachedUserData } from "./helpers/cachedUserData/index";

export function RequireToken() {
  const { activeUser } = useCachedUserData();

  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function Authenticated() {
  // let auth = localStorageUser();
  const { activeUser } = useCachedUserData();

  if (activeUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
