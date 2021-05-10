import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const CardCancha = props => {
	const { store, actions } = useContext(Context);
	const [distrito, setDistrito] = useState("Distrito");
	const [canton, setCanton] = useState("Canton");
	const [provincia, setProvincia] = useState("Provincia");

	useEffect(() => {
		setProvincia(actions.getProvinciaName(props.provincia));
		setCanton(actions.getCantonName(props.provincia, props.canton));
		setDistrito(actions.getDistritoName(props.provincia, props.canton, props.distrito));
	});

	return (
		<div className="col-lg-4 col-12">
			<div className="card m-2 text-dark ">
				<img src={props.img} height="250px" className="card-img-top" alt="..." />
				<div className="card-header">
					<h4 className="card-title text-verdeOscuro">{props.nombre}</h4>
				</div>
				<div className="card-body">
					<p className="card-text">
						<b className="text-naranjaContraste">Costo:</b> ₡ {props.costo}
					</p>
					<p className="card-text">
						<b className="text-naranjaContraste">Ubicación: </b>
						{props.ubicacion}
					</p>
					<p className="card-text">
						<b className="text-verdeOscuro">
							{provincia}, {canton}, {distrito}
						</b>
					</p>
					<div className=" d-flex justify-content-end">
						<Link to={"/cancha/" + props.id}>
							<a href="#" className="btn btn-verdeIntermedio">
								Reservar
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

CardCancha.propTypes = {
	nombre: PropTypes.string,
	img: PropTypes.string,
	costo: PropTypes.string,
	ubicacion: PropTypes.string,
	provincia: PropTypes.string,
	canton: PropTypes.string,
	distrito: PropTypes.string,
	id: PropTypes.number
};
