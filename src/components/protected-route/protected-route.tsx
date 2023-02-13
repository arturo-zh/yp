import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import {RootState} from "../../services/types/store";

type TProtectedRouteProps = {
	onlyForAuth: boolean;
	children?: React.ReactNode;
	[name: string]: any;
};
const getAuth = (state: RootState) => state.auth;

const ProtectedRoute = ({onlyForAuth, children, ...rest}: TProtectedRouteProps): JSX.Element => {
	const {user} = useSelector(getAuth);
	const location = useLocation<{ from: { pathname: string } }>();
	
	
	if (!onlyForAuth && user) {
		const {from} = location.state || {from: {pathname: "/"}};
		return (
			<Route {...rest}>
				<Redirect to={from}/>
			</Route>
		)
	}
	
	if (onlyForAuth && !user) {
		return (
			<Route {...rest}>
				<Redirect to={{pathname: "/login", state: {from: location}}}/>
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