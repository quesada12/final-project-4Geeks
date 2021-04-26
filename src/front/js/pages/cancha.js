import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cancha = props => {
	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal">Soy una Cancha</h1>
			<Link to="/canchas">
				<a href="#" className="btn btn-verdeIntermedio">
					Regresar
				</a>
			</Link>
		</div>
	);
};
