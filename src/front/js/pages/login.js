import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import loginIMG from "../../img/loginback.jpeg";

export const Login = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [login, setLogin] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (actions.login(email, password)) {
			actions.ingresar();
			setLogin(true);
		} else {
			setError(true);
		}
	};

	return (
		<div className="jumbotron mx-5 bg-white border py-6">
			<div className="row d-flex flex-row align-items-center">
				<div className="col-12 col-lg-5">
					<h1 className="text-verdePrincipal">Bienvenidos!</h1>
					<hr />
					{error ? (
						<div className="alert alert-naranjaContraste text-center" role="alert">
							Correo Electrónico o Contraseña erróneos
						</div>
					) : null}
					<form onSubmit={e => handleSubmit(e)}>
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
						<div className="mb-3">
							<label className="form-label " htmlFor="password">
								Contraseña:
							</label>
							<input
								type="password"
								className="form-control"
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-3 text-center">
							<button type="submit" className="btn btn-verdeOscuro mb-3">
								Ingresar
							</button>

							<h6 className="text-verdeIntermedio">¿Perdiste la contraseña?</h6>
							<h6 className="text-verdeIntermedio">¿No tienes una cuenta? Regístrate</h6>
						</div>
					</form>
				</div>
				<div className="col-lg-7 col-12">
					<img src={loginIMG} className="img-fluid" alt="login" />
				</div>
			</div>
			{login ? <Redirect to="/canchas" /> : null}
		</div>
	);
};
