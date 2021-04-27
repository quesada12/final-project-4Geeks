import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Cancha = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [valueDate, onChangeD] = useState(new Date());
	const [valueHour, onChangeH] = useState("");
	const [modal, setModal] = useState(false);

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
			"Cancha de Fut5 y Fut7 con amplío parqueo, cumplimos con todos los requerimientos del Ministerio de Salud"
	};

	const horas = [{ label: "19:00", value: "19:00" }, { label: "20:00", value: "20:00" }];

	const hourChange = selectedOption => {
		if (selectedOption == null) {
			onChangeH("0");
		} else {
			onChangeH(selectedOption.value);
		}
	};

	const handleReservar = e => {
		toggle();
		//alert(valueDate + valueHour);
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
				<div className="col-12 col-lg-6">
					<h1>MAPA</h1>
				</div>
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
							options={horas}
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
								Fecha:{" "}
								{valueDate.getDate() + "/" + valueDate.getMonth() + "/" + valueDate.getFullYear()} Hora:{" "}
								{valueHour}{" "}
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
