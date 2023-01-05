import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function Authenticated() {
  const auth = useSelector((state) => state.user.token);

  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
