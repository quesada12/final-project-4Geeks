import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import PrivateRoute from "./privateRoute";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { Register } from "./pages/register";
import { Canchas } from "./pages/canchas";
import { Cancha } from "./pages/cancha";
import { Template } from "./pages/template";
import { Reservas } from "./pages/reservas";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/forgot/:id" component={Forgot} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/home" component={Home} />
						{/* <PrivateRoute exact path="/" component={Canchas} /> */}
						<Route exact path="/template" component={Template} />
						<PrivateRoute exact path="/canchas" component={Canchas} />
						<PrivateRoute exact path="/cancha/:id" component={Cancha} />
						<PrivateRoute exact path="/reservas" component={Reservas} />
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
