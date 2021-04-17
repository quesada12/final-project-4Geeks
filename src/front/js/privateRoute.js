import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
	let login = true;

	return <Route {...rest}>{login ? <Component /> : <Redirect to="/login" />}</Route>;
}
