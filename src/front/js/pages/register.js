import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = props => {
	return (
		<div className="container bg-white border rounded py-4 ">
			<h1 className="text-verdePrincipal">Registro de Usuario</h1>
			<hr />
		</div>
	);
};
