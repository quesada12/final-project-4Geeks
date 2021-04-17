import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const CardCancha = props => {
	return <h1>Soy la cancha {props.num}</h1>;
};

CardCancha.propTypes = {
	num: PropTypes.string
};
