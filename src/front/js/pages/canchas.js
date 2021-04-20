import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardCancha } from "../component/cardCancha";

export const Canchas = props => {
	return (
		<div className="container">
			<h1>Hola soy Canchas</h1>
			<div className="row">
				<CardCancha num="1" />
			</div>
		</div>
	);
};
