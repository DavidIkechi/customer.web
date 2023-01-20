import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./components/Loading";
import NewDesignSideBar from "./components/NewDesignSidebar";
import { setToken } from "./redux/features/users/userSlice";
import { dispatch } from "./redux/store";

export function RequireToken() {
  const auth = useSelector((state) => state.user.token);
  const { isLoading } = useSelector((state) => state.util);

  if (!auth) {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      const token = localStorage.getItem("heedAccessToken");
      if (!token) {
        return <Navigate to="/login" replace />;
      } else {
        dispatch(setToken(token));
      }
    } else {
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
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
