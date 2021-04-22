import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Template = props => {
	return (
		<div>
			<div className="container-fluid bg-white border rounded py-4 ">
				<h1>Contenedor #1</h1>
				<hr />
				<div className="alert alert-verdePrincipal" role="alert">
					Alert verdePrincipal
				</div>
				<div className="alert alert-verdeOscuro" role="alert">
					Alert verdeOscuro
				</div>
				<div className="alert alert-verdeIntermedio" role="alert">
					Alert verdeIntermedio
				</div>
				<div className="alert alert-verdeClaro" role="alert">
					Alert verdeClaro
				</div>
				<div className="alert alert-naranjaContraste" role="alert">
					Alert naranjaContraste
				</div>
			</div>
			<br />
			<div className="jumbotron mx-5 bg-white border py-4 ">
				<h1>Contenedor #2</h1>
				<hr />
				<h1 className="text-verdePrincipal">Color: verdePrincipal</h1>
				<h2 className="text-verdeOscuro">Color: verdeOscuro</h2>
				<h3 className="text-verdeIntermedio">Color: verdeIntermedio</h3>
				<h4 className="text-verdeClaro">Color: verdeClaro</h4>
				<h4 className="text-naranjaContraste">Color: naranjaContraste</h4>
			</div>

			<div className="container bg-white border rounded py-4 ">
				<h1>Contenedor #3</h1>
				<hr />
				<button type="button" className="btn btn-verdePrincipal text-white">
					verdePrincipal
				</button>
				<button type="button" className="btn btn-verdeOscuro text-white">
					verdeOscuro
				</button>
				<button type="button" className="btn btn-verdeIntermedio text-white">
					verdeIntermedio
				</button>

				<button type="button" className="btn btn-verdeClaro text-dark">
					verdeClaro
				</button>
				<button type="button" className="btn btn-naranjaContraste text-white">
					naranjaContraste
				</button>
			</div>
		</div>
	);
};
