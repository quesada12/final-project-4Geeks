import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emailjs from "emailjs-com";

export const Reservas = props => {
	const { store, actions } = useContext(Context);
	const [filtro, setFiltro] = useState("0");
	const [reservas, setReservas] = useState("0");
	const [reservasF, setReservasF] = useState([]);

	const [id, setId] = useState("");
	const [cancha, setCancha] = useState("");
	const [fecha, setFecha] = useState("");
	const [hora, setHora] = useState("");
	const [modal, setModal] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
	const toggle = () => setModal(!modal);

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
					<th scope="row" className="text-center">
						{reserva.id}
					</th>
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
					<td className="text-center">
						<button
							className="btn btn-verdeIntermedio"
							onClick={e =>
								compartirReserva(e, reserva.id, reserva.cancha_nombre, reserva.fecha, reserva.hora)
							}>
							Compartir Reserva
						</button>
					</td>
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

	const compartirReserva = (e, id, cancha, fecha, hora) => {
		setId(id);
		setCancha(cancha);
		setFecha(fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
		setHora(hora);
		toggle();
	};

	const enviarCorreo = e => {
		if (email == "") {
			setError(true);
		} else {
			setError(false);
			let params = {
				to_email: email,
				reserva_id: id,
				cancha_nombre: cancha,
				fecha: fecha,
				hora: hora
			};
			emailjs.send("service_h217yzz", "template_mp40jvr", params, "user_y2hsW8byOtmtOC16Rr4eF").then(
				result => {
					console.log(result.text);
					toggle();
				},
				error => {
					console.log(error.text);
					toggle();
				}
			);
		}
	};

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
							<th scope="col" className="text-center">
								Reserva ID
							</th>
							<th scope="col">Cancha</th>
							<th scope="col">Fecha</th>
							<th scope="col">Hora</th>
							<th scope="col" />
						</tr>
					</thead>
					<tbody>{reservasMap}</tbody>
				</table>
			) : null}

			{/* MODAL */}
			<div>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>Compartir Reserva</ModalHeader>
					<ModalBody>
						{error ? (
							<div className="alert alert-naranjaContraste text-center" role="alert">
								Correo Electrónico erróneo
							</div>
						) : null}

						<div className="mb-3">
							<label htmlFor="correoElectronico" className="form-label">
								Correo Electrónico:{" "}
							</label>
							<input
								type="email"
								className="form-control"
								aria-describedby="emailHelp"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={toggle}>
							Cancelar
						</Button>{" "}
						<Button color="verdeIntermedio" onClick={e => enviarCorreo(e)}>
							Enviar
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
};
