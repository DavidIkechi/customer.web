import { useLocation, Navigate, Outlet } from "react-router-dom";

// export const setToken = (token) => {
//   localStorage.setItem("von", token); // make up your own token
// };

export const fetchToken = () => {
  return localStorage.getItem("accessToken");
};

export function RequireToken() {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
}
