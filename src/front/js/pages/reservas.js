import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Select from "react-select";

export const Reservas = props => {
	const { store, actions } = useContext(Context);
	const [filtro, setFiltro] = useState("0");
	const [reservas, setReservas] = useState("0");

	const filtroChange = selectedOption => {
		if (selectedOption == null) {
			setFiltro("0");
		} else {
			setFiltro(selectedOption.value);
		}
	};

	const getReservas = async () => {
		let reservas = [];
		await fetch(store.api_url + "/api/user/" + sessionStorage.getItem("user") + "/reservas", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => (reservas = data))
			.catch(err => console.error(err));
		console.log(reservas);
		return reservas;
	};

	useEffect(
		() => {
			const hoy = new Date();
			if (filtro == 0) {
				setReservas("0");
			} else {
				if (filtro == 1) {
					setReservas(getReservas());
				} else {
					if (filtro == 2) {
						setReservas(
							store.reservas.filter(reserva => {
								return reserva.fecha < hoy;
							})
						);
					} else {
						if (filtro == 3) {
							setReservas(
								store.reservas.filter(reserva => {
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
					<td>{reserva.cancha_id}</td>
					<td>
						{reserva.fecha.getDate() +
							"/" +
							(reserva.fecha.getMonth() + 1) +
							"/" +
							reserva.fecha.getFullYear()}
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
					isSearchable
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
