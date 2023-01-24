import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import NewDesignSideBar from "./components/NewDesignSidebar";
import { setToken } from "./redux/features/users/userSlice";
import { dispatch } from "./redux/store";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);
  const { isLoading } = useSelector((state) => state.util);
  const { pathname } = useLocation();

  if (!auth) {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      const token = localStorage.getItem("heedAccessToken");
      console.log(!token);
      if (!token) {
        localStorage.setItem("redirect", true);
        localStorage.setItem("redirect_link", pathname);
        return <Navigate to="/login" replace />;
      } else {
        dispatch(setToken(token));
      }
    } else {
      localStorage.setItem("redirect", true);
      localStorage.setItem("redirect_link", pathname);
      return <Navigate to="/login" replace />;
    }
  }

  return (
    <>
      {!isLoading ? (
        <NewDesignSideBar needSearchMobile="needSearchMobile">
          <Outlet />
        </NewDesignSideBar>
      ) : (
        <Loading />
      )}
    </>
  );
}

export function Authenticated() {
  const auth = useSelector((state) => state.user.token);

  if (auth) {
    let redirect = localStorage.getItem("redirect");
    if (redirect) {
      let link = localStorage.getItem("redirect_link");
      return <Navigate to={link} replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}
