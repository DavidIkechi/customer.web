import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./hooks";

//if user is not logged in, redirect to Signin page
const WithAuth = (props) => useAuth(props) && props.children;

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
export default withRouter(WithAuth);
