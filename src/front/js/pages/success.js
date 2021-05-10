import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import successIMG from "../../img/paymen.png";
import { Context } from "../store/appContext";
import emailjs from "emailjs-com";

export const Success = props => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		fetch(store.api_url + "/api/user/" + sessionStorage.getItem("user"), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		})
			.then(res => res.json())
			.then(data => enviarCorreo(data.reservas, data.email, data.apellidos, data.nombre))
			.catch(err => console.error(err));
	}, []);

	const enviarCorreo = (reservas, email, lastname, name) => {
		const reserva = reservas[reservas.length - 1];
		const fecha = new Date(Date.parse(reserva.fecha));
		const fechaString = fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
		let params = {
			name: name,
			lastname: lastname,
			to_email: email,
			reserva_id: reserva.id,
			cancha_nombre: reserva.cancha_nombre,
			hora: reserva.hora,
			fecha: fechaString
		};
		emailjs.send("service_h217yzz", "template_z6wglfg", params, "user_y2hsW8byOtmtOC16Rr4eF").then(
			result => {
				console.log(result.text);
			},
			error => {
				console.log(error.text);
			}
		);
	};

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
