import React from "react";
import { Link } from "react-router-dom";
import successIMG from "../../img/paymen.png";

export const Success = props => {
	return (
		<div className="container bg-white border rounded py-4 d-flex flex-column align-items-center">
			<img src={successIMG} className="img-fluid pt-5" width="100" />
			<h1 className="text-verdePrincipal pb-5">Reserva realizada exitosamente</h1>
			<Link to="/reservas">
				<a href="#" className="btn btn-outline-verdeIntermedio btn-lg">
					Ir a mis reservas
				</a>
			</Link>
		</div>
	);
};
