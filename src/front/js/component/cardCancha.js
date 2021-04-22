import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Cancha }   from "../pages/cancha";

const cardCancha = () => {
	return (
		<div className="row">
			<div className="col-3">
				<Card />
			</div>
			<div className="col-3">
				<Card />
			</div>
			<div className="col-3">
				<Card />
			</div>
			<div className="col-3">
				<Card />
			</div>
		</div>
	);
};
export default CardContainer;
