import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardCancha } from "../component/cardCancha";
import Select from "react-select";

export const Canchas = props => {
	const { store, actions } = useContext(Context);

	const [provincia, setProvincia] = useState("0");
	const [disableCanton, setDisableCanton] = useState(true);
	const [listadoCantones, setListadoCantones] = useState("");
	const [canton, setCanton] = useState("0");
	const [disableDistrito, setDisableDistrito] = useState(true);
	const [listadoDistrito, setListadoDistritos] = useState("");
	const [distrito, setDistrito] = useState("0");
	const [canchas, setCanchas] = useState(store.canchas);
	const canchasMap = canchas.map((cancha, index) => {
		return (
			<CardCancha
				img={cancha.img}
				nombre={cancha.nombre}
				costo={cancha.costo}
				ubicacion={cancha.ubicacion}
				provincia={cancha.provincia}
				canton={cancha.canton}
				distrito={cancha.distrito}
				id={cancha.id}
				key={index}
			/>
		);
	});

	// PROVINCIAS
	const provinciaChange = selectedOption => {
		if (selectedOption == null) {
			setProvincia("0");
		} else {
			setProvincia(selectedOption.value);
		}
	};

	useEffect(
		() => {
			if (provincia != "0") {
				setCanchas(
					store.canchas.filter(cancha => {
						return cancha.provincia == provincia;
					})
				);
				setDisableCanton(false);
				setListadoCantones(
					store.cantones.filter(canton => {
						return canton.provincia == provincia;
					})
				);
			} else {
				setCanchas(store.canchas);
				setDisableCanton(true);
			}
		},
		[provincia]
	);

	// CANTON
	const cantonChange = selectedOption => {
		if (selectedOption == null) {
			setCanton("0");
		} else {
			setCanton(selectedOption.value);
		}
	};

	useEffect(
		() => {
			if (canton != "0") {
				setCanchas(
					store.canchas.filter(cancha => {
						return cancha.provincia == provincia && cancha.canton == canton;
					})
				);
				setDisableDistrito(false);
				setListadoDistritos(
					store.distritos.filter(distrito => {
						return distrito.provincia == provincia && distrito.canton == canton;
					})
				);
			} else {
				if (provincia != "0") {
					setCanchas(
						store.canchas.filter(cancha => {
							return cancha.provincia == provincia;
						})
					);
				} else {
					setCanchas(store.canchas);
				}
				setDisableDistrito(true);
			}
		},
		[canton]
	);

	// Distrito
	const distritoChange = selectedOption => {
		if (selectedOption == null) {
			setDistrito("0");
		} else {
			setDistrito(selectedOption.value);
		}
	};

	useEffect(
		() => {
			if (distrito != "0") {
				setCanchas(
					store.canchas.filter(cancha => {
						return cancha.provincia == provincia && cancha.canton == canton && cancha.distrito == distrito;
					})
				);
			} else {
				if (canton != "0") {
					setCanchas(
						store.canchas.filter(cancha => {
							return cancha.canton == canton && cancha.provincia == provincia;
						})
					);
				} else {
					setCanchas(store.canchas);
				}
			}
		},
		[distrito]
	);

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
			<h1 className="text-verdePrincipal">Canchas Disponibles</h1>
			<hr />
			<div className="row d-flex justify-content-around">
				<div className="col-3">
					<Select
						options={store.provincias}
						placeholder="Selecciona Provincia"
						variant="success"
						isSearchable
						isClearable
						theme={customTheme}
						onChange={provinciaChange}
					/>
				</div>
				<div className="col-3">
					<Select
						options={listadoCantones}
						placeholder="Selecciona Canton"
						variant="success"
						isSearchable
						isClearable
						isDisabled={disableCanton}
						theme={customTheme}
						onChange={cantonChange}
					/>
				</div>
				<div className="col-3">
					<Select
						options={listadoDistrito}
						placeholder="Selecciona Distrito"
						variant="success"
						isSearchable
						isClearable
						isDisabled={disableDistrito}
						theme={customTheme}
						onChange={distritoChange}
					/>
				</div>
			</div>
			<hr />
			<div className="row d-flex justify-content-around">{canchasMap}</div>
		</div>
	);
};
