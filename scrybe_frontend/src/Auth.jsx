import { Navigate, Outlet, useLocation } from "react-router-dom";
import { localStorageUser } from "./helpers/localStorageUser";

export function RequireToken() {
  let auth = localStorageUser();
  let location = useLocation();
  const tokenExpirationTime = 120; //in minutes

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
