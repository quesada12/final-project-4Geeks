import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Select from "react-select";

export const Reservas = props => {
	const { store, actions } = useContext(Context);
	const [filtro, setFiltro] = useState("0");
	const [reservas, setReservas] = useState("0");
	const [reservasF, setReservasF] = useState([]);

	useEffect(() => {
		let reservas = [];
		fetch(store.api_url + "/api/user/" + sessionStorage.getItem("user") + "/reservas", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => formatJSON(data.reservas))
			.catch(err => console.error(err));
	}, []);

	const formatJSON = reservas => {
		let lista = [];
		reservas.forEach(reserva => {
			let r = {};
			r.id = reserva.id;
			r.cancha_nombre = reserva.cancha_nombre;
			r.cancha_id = reserva.cancha_id;
			r.hora = reserva.hora;
			r.fecha = new Date(Date.parse(reserva.fecha));
			lista.push(r);
			console.log(r);
		});
		setReservasF(lista);
	};

	const filtroChange = selectedOption => {
		if (selectedOption == null) {
			setFiltro("0");
		} else {
			setFiltro(selectedOption.value);
		}
	};

	useEffect(
		() => {
			const hoy = new Date();
			if (filtro == 0) {
				setReservas("0");
			} else {
				if (filtro == 1) {
					setReservas(reservasF);
				} else {
					if (filtro == 2) {
						setReservas(
							reservasF.filter(reserva => {
								return reserva.fecha <= hoy;
							})
						);
					} else {
						if (filtro == 3) {
							setReservas(
								reservasF.filter(reserva => {
									return reserva.fecha >= hoy;
								})
							);
						}
					}
				}
			}
		},
		[filtro]
	);

	let reservasMap = "";
	if (reservas != "0") {
		reservasMap = reservas.map((reserva, index) => {
			return (
				<tr key={index}>
					<th scope="row">{reserva.id}</th>
					<td>{reserva.cancha_nombre}</td>
					<td>
						{reserva.fecha.getDate() +
							1 +
							"/" +
							(reserva.fecha.getMonth() + 1) +
							"/" +
							reserva.fecha.getFullYear()}
						{/* {reserva.fecha} */}
					</td>
					<td>{reserva.hora}</td>
				</tr>
			);
		});
	}

	function customTheme(theme) {
		return {
			...theme,
			colors: {
				...theme.colors,
				primary25: "rgba(157, 209, 2, 0.66)",
				primary: "#036704"
			}
		};
	}

	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal">Mis Reservas</h1>
			<hr />
			<div className="d-flex justify-content-center">
				<h4 className="text-verdeIntermedio col-1">Ver: </h4>
				<Select
					options={[
						{ value: 1, label: "Todas" },
						{ value: 2, label: "Pasadas" },
						{ value: 3, label: "Próximas" }
					]}
					placeholder="Selecciona "
					variant="success"
					isClearable
					theme={customTheme}
					className="col-4"
					onChange={filtroChange}
				/>
			</div>
			<hr />
			{reservas != "0" ? (
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
			) : null}
		</div>
	);
};
