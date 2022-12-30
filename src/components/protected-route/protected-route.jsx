import {useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";

const ProtectedRoute = ({onlyForAuth, children, ...rest}) => {
  const { user } = useSelector((store) => store.auth)
  const location = useLocation();


  if(!onlyForAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
        <Route {...rest}>
          <Redirect to={from} />
        </Route>
    )
  }

  if (onlyForAuth && !user) {
    return (
        <Route {...rest}>
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        </Route>
    )
  }

  return (
      <Route {...rest}>
        {children}
      </Route>
  )
};

export default ProtectedRoute;