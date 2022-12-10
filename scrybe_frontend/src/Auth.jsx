import { useLocation, Navigate, Outlet } from "react-router-dom";

export const fetchToken = () => {
  return {
    token: localStorage.getItem("heedAccessToken"),
    activationTime: localStorage.getItem("accessTokenActivationTime"),
  };
};

export function RequireToken() {
  let auth = fetchToken();
  let location = useLocation();
  const tokenExpirationTime = 120; //in minutes

  if (
    // if there is no token or no activation time or (there is an activationTime but it is greater than 120 mins) then redirect to login page
    !auth.token ||
    !auth.activationTime ||
    (auth.activationTime
      ? (new Date().getTime() - auth.activationTime) / 60000 >=
        tokenExpirationTime
      : 0)
  ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
