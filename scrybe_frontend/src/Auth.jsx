import { Navigate, Outlet } from "react-router-dom";
import { localStorageUser } from "./helpers/localStorageUser";

export function RequireToken() {
  // let auth = localStorageUser();
  let auth = { username: "test", token: "test" };
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
