import { Navigate, Outlet, useLocation } from "react-router-dom";
import { localStorageUser } from "./helpers/localStorageUser";

export function RequireToken() {
  //let auth =   localStorageUser() {name: "user", token: "token"}};
  let auth = { name: "user", token: "token" };
  let location = useLocation();
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function Authenticated() {
  let auth = localStorageUser();
  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
