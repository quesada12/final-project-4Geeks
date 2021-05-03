import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
	// const login = sessionStorage.getItem("login");
	const login = "true";

	return <Route {...rest}>{login == "true" ? <Component /> : <Redirect to="/login" />}</Route>;
}
