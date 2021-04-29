import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Reservas = props => {
	const reservas = [
		{
			id: 1,
			cancha: "React Cancha",
			fecha: "29/04/2021",
			hora: "16:00"
		},
		{
			id: 2,
			cancha: "React Cancha",
			fecha: "29/04/2021",
			hora: "16:00"
		},
		{
			id: 3,
			cancha: "React Cancha",
			fecha: "29/04/2021",
			hora: "16:00"
		}
	];

	const reservasMap = reservas.map((reserva, index) => {
		return (
			<tr key={index}>
				<th scope="row">{reserva.id}</th>
				<td>{reserva.cancha}</td>
				<td>{reserva.fecha}</td>
				<td>{reserva.hora}</td>
			</tr>
		);
	});

	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal">Mis Reservas</h1>
			<hr />
			<table className="table table-hover">
				<thead>
					<tr className="table-verdePrincipal">
						<th scope="col">Reserva ID</th>
						<th scope="col">Cancha</th>
						<th scope="col">Fecha</th>
						<th scope="col">Hora</th>
					</tr>
				</thead>
				<tbody>{reservasMap}</tbody>
			</table>
		</div>
	);
};
