import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MapContenedor from "../component/mapContenedor";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export const Cancha = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [valueDate, onChangeD] = useState(new Date());
	const [valueHour, onChangeH] = useState("0");
	const [modal, setModal] = useState(false);
	const [modalB, setModalB] = useState(false);
	const [modalC, setModalC] = useState(false);
	const [horasSelect, setHorasSelect] = useState([]);
	const toggle = () => setModal(!modal);
	const toggleB = () => setModalB(!modalB);
	const toggleC = () => setModalC(!modalC);
	const [cancha, setCancha] = useState({});
	const [mapa, setMapa] = useState("cargando...");
	let history = useHistory();

	useEffect(() => {
		carga();
	}, []);

	const carga = async () => {
		await fetch(store.api_url + "/api/cancha/" + params.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		})
			.then(res => res.json())
			.then(data => {
				setCancha(data);
				calcularHorasCancha(data.horaInicio, data.horaFin, data.duracion);
				actions.addCoordenadas(data.lat, data.lng);
			})
			.catch(err => console.error(err));
		setMapa(dibujarMapa());
	};

	const dibujarMapa = () => {
		return <MapContenedor />;
	};

	const calcularHorasCancha = (horaInicio, horaFin, duracion) => {
		const horas = [];
		for (let i = horaInicio; i <= horaFin; i = i + duracion) {
			const hora = {
				label: i + ":00",
				value: i + ":00"
			};
			horas.push(hora);
		}
		setHorasSelect(horas);
	};

	const hourChange = selectedOption => {
		if (selectedOption == null) {
			onChangeH("0");
		} else {
			onChangeH(selectedOption.value);
		}
	};

	const handleReservar = e => {
		if (valueDate != null && valueHour != "0") {
			const reserva = {
				cancha_id: params.id,
				fecha: valueDate,
				hora: valueHour
			};
			fetch(store.api_url + "/api/reserva", {
				method: "POST",
				body: JSON.stringify(reserva),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + sessionStorage.getItem("token")
				}
			})
				.then(res => (res.ok ? toggle() : toggleB()))
				.catch(err => console.error(err));
		} else {
			toggleC();
		}
	};

	const guardarReserva = e => {
		const reserva = {
			cancha_id: params.id,
			fecha: valueDate,
			hora: valueHour,
			cancha_nombre: cancha.nombre
		};
		fetch(store.api_url + "/api/user/" + sessionStorage.getItem("user") + "/reservas", {
			method: "POST",
			body: JSON.stringify(reserva),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		})
			.then(res => (res.ok ? history.push("/success") : null))
			.catch(err => console.error(err));
	};

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

	//TARJETA

	const [state, setState] = useState({
		number: "",
		name: "",
		expiry: "",
		cvc: "",
		focus: ""
	});

	const handleInputChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleFocusChange = e => {
		setState({
			...state,
			focus: e.target.name
		});
	};

	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal text-center">{cancha.nombre}</h1>
			<hr />
			<div className="row mb-4">
				<div className="col-12 col-lg-6">
					<img className="img-fluid" src={cancha.img} />
				</div>
				<div className="col-12 col-lg-6">{mapa}</div>
			</div>
			<div className="row">
				<div className="col-12 col-lg-8">
					<h3 className="text-verdeOscuro">Información General</h3>
					<hr />
					<p>
						<b>Descripción: </b>
						{cancha.descripcion}
					</p>
					<p>
						<b>Capacidad: </b>
						{cancha.capacidad}
					</p>
					<p>
						<b>Costo: </b>₡{cancha.costo}
					</p>
				</div>
				<div className="col-12 col-lg-4">
					<h3 className="text-verdeOscuro">Reservar:</h3>
					<hr />
					<div className="d-flex mb-3">
						<h5 className="pt-1 col-3">Fecha: </h5>
						<DatePicker
							onChange={onChangeD}
							value={valueDate}
							className="col-8"
							minDate={new Date()}
							format="dd-MM-y"
						/>
					</div>
					<div className="d-flex mb-3">
						<h5 className="pt-1 col-3">Hora: </h5>
						<Select
							options={horasSelect}
							placeholder="Selecciona Hora"
							variant="success"
							isClearable
							theme={customTheme}
							className="col-8"
							onChange={hourChange}
						/>
					</div>
					<div className="d-flex justify-content-around">
						<Link to="/canchas">
							<a href="#" className="btn btn-danger">
								Regresar
							</a>
						</Link>

						<button className="btn btn-verdeIntermedio" onClick={e => handleReservar(e)}>
							Continuar
						</button>
					</div>
					<div>
						<Modal isOpen={modal} toggle={toggle}>
							<ModalHeader toggle={toggle}>Realizar Reserva</ModalHeader>
							<ModalBody>
								<div className="card mb-1">
									<div className="card-header">
										<h6 className="text-verdeOscuro">Detalle de la Reserva: </h6>
									</div>
									<div className="card-body">
										<table className="table text-center">
											<thead>
												<tr className="table-verdePrincipal">
													<th scope="col">Fecha</th>
													<th scope="col">Hora</th>
													<th scope="col">Monto</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														{valueDate != null
															? valueDate.getDate() +
															  "/" +
															  (valueDate.getMonth() + 1) +
															  "/" +
															  valueDate.getFullYear()
															: null}
													</td>
													<td>{valueHour}</td>
													<td>₡{cancha.costo}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div className="card">
									<div className="card-header">
										<h6 className="text-verdeOscuro">Datos de Pago: </h6>
									</div>
									<div className="card-body">
										<Cards
											number={state.number}
											name={state.name}
											expiry={state.expiry}
											cvc={state.cvc}
											focused={state.focus}
										/>
										<form className="mt-2">
											<div className="form-group">
												<label htmlFor="number">Número de la tarjeta</label>
												<input
													type="text"
													name="number"
													id="number"
													maxLength="16"
													className="form-control"
													onChange={handleInputChange}
													onFocus={handleFocusChange}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="name">Nombre</label>
												<input
													type="text"
													name="name"
													id="name"
													maxLength="30"
													className="form-control"
													onChange={handleInputChange}
													onFocus={handleFocusChange}
												/>
											</div>
											<div className="form-row">
												<div className="form-group col-md-6">
													<label htmlFor="expiry">Fecha de expiración</label>
													<input
														type="text"
														name="expiry"
														id="expiry"
														maxLength="4"
														className="form-control"
														onChange={handleInputChange}
														onFocus={handleFocusChange}
													/>
												</div>
												<div className="form-group col-md-6">
													<label htmlFor="cvc">CVV</label>
													<input
														type="text"
														name="cvc"
														id="cvc"
														maxLength="4"
														className="form-control"
														onChange={handleInputChange}
														onFocus={handleFocusChange}
													/>
												</div>
											</div>

											<button
												type="button"
												className="btn btn-success btn-block btn-lg"
												onClick={e => guardarReserva(e)}>
												Pagar y Reservar
											</button>
										</form>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
								<Button color="danger" onClick={toggle}>
									Cancelar
								</Button>
							</ModalFooter>
						</Modal>
					</div>

					<div>
						<Modal isOpen={modalB} toggle={toggleB}>
							<ModalHeader toggle={toggleB}>Realizar Reserva</ModalHeader>
							<ModalBody>
								<div className="alert alert-naranjaContraste" role="alert">
									La reserva ya existe, favor seleccione otra fecha y hora
								</div>
							</ModalBody>
							<ModalFooter>
								{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
								<Button color="danger" onClick={toggleB}>
									Cerrar
								</Button>
							</ModalFooter>
						</Modal>
					</div>

					<div>
						<Modal isOpen={modalC} toggle={toggleC}>
							<ModalHeader toggle={toggleC}>Realizar Reserva</ModalHeader>
							<ModalBody>
								<div className="alert alert-naranjaContraste" role="alert">
									Favor complete todos los campos para realizar la reserva
								</div>
							</ModalBody>
							<ModalFooter>
								{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
								<Button color="danger" onClick={toggleC}>
									Cerrar
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};
