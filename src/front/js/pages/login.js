import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import loginIMG from "../../img/loginback.jpeg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emailjs from "emailjs-com";

export const Login = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [login, setLogin] = useState(false);
	const [modal, setModal] = useState(false);
	const [emailRecovery, setEmailRecovery] = useState(false);
	const [recoveryValidation, setRecoveryValidation] = useState(true);
	const toggle = () => setModal(!modal);
	let history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: email,
			password: password
		};

		fetch(store.api_url + "/api/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => (res.ok ? successfulLogin() : setError(true)))
			.catch(err => console.error(err));
	};

	const successfulLogin = () => {
		const body = {
			email: email,
			password: password
		};

		fetch(store.api_url + "/api/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				actions.ingresar(data.user, data.token);
				setLogin(true);
			})
			.catch(err => console.error(err));
	};

	const toggleRec = e => {
		setRecoveryValidation(true);
		toggle();
	};

	const recuperar = e => {
		fetch(store.api_url + "/api/user/" + emailRecovery, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => (res.ok ? forgetPage() : setRecoveryValidation(false)))
			.catch(err => console.error(err));
	};

	const forgetPage = () => {
		fetch(store.api_url + "/api/user/" + emailRecovery, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				enviarCodigo(data.codigoVerificacion);
				history.push("/forgot/" + data.id);
			})
			.catch(err => console.error(err));
	};

	const enviarCodigo = codigo => {
		let params = {
			code: codigo,
			to_email: emailRecovery
		};
		emailjs.send("service_h217yzz", "template_skimzoe", params, "user_y2hsW8byOtmtOC16Rr4eF").then(
			result => {
				console.log(result.text);
			},
			error => {
				console.log(error.text);
			}
		);
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

							<Link>
								<h6 className="text-verdeIntermedio" onClick={e => toggleRec(e)}>
									¿Perdiste la contraseña?
								</h6>
							</Link>
							<Link to="/register">
								<h6 className="text-verdeIntermedio">¿No tienes una cuenta? Regístrate</h6>
							</Link>
						</div>
					</form>
				</div>
				<div className="col-lg-7 col-12">
					<img src={loginIMG} className="img-fluid" alt="login" />
				</div>
			</div>

			{/* MODAL */}
			<div>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>¿Perdiste la contraseña?</ModalHeader>
					<ModalBody>
						<div>
							{!recoveryValidation ? (
								<div className="alert alert-danger text-center" role="alert">
									Usuario no registrado
								</div>
							) : null}

							<label htmlFor="correoElectronico" className="form-label">
								Correo Electrónico:{" "}
							</label>
							<input
								type="email"
								className="form-control"
								aria-describedby="emailHelp"
								onChange={e => setEmailRecovery(e.target.value)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
						<Button color="danger" onClick={toggle}>
							Cancelar
						</Button>
						<Button color="verdeIntermedio" onClick={e => recuperar(e)}>
							Recuperar
						</Button>
					</ModalFooter>
				</Modal>
			</div>

			{login ? <Redirect to="/canchas" /> : null}
		</div>
	);
};
