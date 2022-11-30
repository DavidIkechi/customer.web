import { useAuth } from "./hooks";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const WithAuth = (props) => useAuth(props) && props.children;

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

export default withRouter(WithAuth);
