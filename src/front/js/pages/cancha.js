import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MapContainer from "../component/mapContainer";

export const Cancha = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [valueDate, onChangeD] = useState(new Date());
	const [valueHour, onChangeH] = useState("");
	const [modal, setModal] = useState(false);
	const [horasSelect, setHorasSelect] = useState([]);
	const toggle = () => setModal(!modal);

	const cancha = {
		id: "1",
		nombre: "Cancha React SJ",
		img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
		costo: "14000",
		ubicacion: "100 m O de la Iglesia",
		provincia: "1",
		canton: "1",
		distrito: "1",
		capacidad: "20 personas max",
		descripcion:
			"Cancha de Fut5 y Fut7 con amplío parqueo, cumplimos con todos los requerimientos del Ministerio de Salud",
		lat: 9.916875,
		lng: -84.074835,
		horaInicio: 9,
		horaFin: 21,
		duracion: 2
	};

	useEffect(() => {
		calcularHorasCancha();
	}, []);

	const calcularHorasCancha = () => {
		const horas = [];
		for (let i = cancha.horaInicio; i <= cancha.horaFin; i = i + cancha.duracion) {
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
		const reserva = {
			id: 12,
			cancha: cancha.nombre,
			fecha: valueDate,
			hora: valueHour
		};
		actions.addReserva(reserva);
		toggle();
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

	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal text-center">{cancha.nombre}</h1>
			<hr />
			<div className="row mb-4">
				<div className="col-12 col-lg-6">
					<img className="img-fluid" src={cancha.img} />
				</div>
				<div className="col-12 col-lg-6">{/* <MapContainer lat={cancha.lat} lng={cancha.lng} /> */}</div>
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
						<b>Costo: </b>
						{cancha.costo}
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
							isSearchable
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
							Reservar
						</button>
					</div>
					<div>
						<Modal isOpen={modal} toggle={toggle}>
							<ModalHeader toggle={toggle}>Resultado</ModalHeader>
							<ModalBody>
								Reserva Realizada <br />
								{valueDate != null
									? "Fecha: " +
									  valueDate.getDate() +
									  "/" +
									  (valueDate.getMonth() + 1) +
									  "/" +
									  valueDate.getFullYear()
									: null}
								Hora: {valueHour}{" "}
							</ModalBody>
							<ModalFooter>
								{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
								<Button color="verdeIntermedio" onClick={toggle}>
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
