import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-verdeIntermedio mb-3 border-bottom ">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 text-white">Reservas Canchas</span>
			</Link>
			<div className="ml-auto">
				<Link to="/template" className="mr-2">
					<button className="btn btn-verdeOscuro text-white">Template :)</button>
				</Link>
				<Link to="/login">
					<button className="btn btn-verdeOscuro text-white">Ingresar</button>
				</Link>
			</div>
		</nav>
	);
};
