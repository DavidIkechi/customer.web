import { useLocation, Navigate, Outlet } from "react-router-dom";
export const fetchToken = () => {
  return localStorage.getItem("heedAccessToken");
};

export function RequireToken() {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
}
