import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = props => {
	const random = () => {
		const items = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"a",
			"b",
			"c",
			"d",
			"e",
			"j",
			"z",
			"v",
			"y",
			"x",
			"g",
			"q"
		];
		let code = "";
		for (let i = 0; i < 7; i++) {
			code = code + items[Math.floor(Math.random() * items.length)];
		}
		return code;
	};

	return (
		<div className="container bg-white border rounded py-4 ">
			<h1 className="text-verdePrincipal">Registro de Usuario</h1>
			<hr />
		</div>
	);
};
