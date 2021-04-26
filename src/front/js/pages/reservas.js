import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Reservas = props => {
	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal">Soy las Reservas</h1>
		</div>
	);
};
