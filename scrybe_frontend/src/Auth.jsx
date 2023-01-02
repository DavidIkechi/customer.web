import { Navigate, Outlet } from "react-router-dom";

export function RequireToken() {
  const auth = sessionStorage.getItem("heedAccessToken");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function Authenticated() {
  const auth = sessionStorage.getItem("heedAccessToken");

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
