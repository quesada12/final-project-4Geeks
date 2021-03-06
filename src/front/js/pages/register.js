import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import loginIMG from "../../img/backregister.jpeg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emailjs from "emailjs-com";

export const Register = props => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [lastname, setLastName] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const [modalB, setModalB] = useState(false);
	const toggleB = () => setModalB(!modalB);
	const [modalC, setModalC] = useState(false);
	const toggleC = () => setModalC(!modalC);
	const [alert, setAlert] = useState(false);

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

	const handleSubmit = e => {
		e.preventDefault();
		setAlert(false);
		if (name == "" && lastname == "" && birthdate == "" && password == "" && password2 == "") {
			toggle();
		} else {
			if (password === password2) {
				let body = {
					email: email,
					password: password,
					codigoVerificacion: random(),
					nombre: name,
					apellidos: lastname
				};
				fetch(store.api_url + "/api/user", {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => (res.ok ? successReg() : toggleC()))
					.catch(err => console.error(err));
			} else {
				setAlert(true);
			}
		}
	};

	const successReg = () => {
		correoBienvenida();
		toggleB();
	};

	const correoBienvenida = () => {
		let params = {
			to_email: email
		};
		emailjs.send("service_h217yzz", "template_5x21yjk", params, "user_y2hsW8byOtmtOC16Rr4eF").then(
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
				<div className="col-lg-7 col-12">
					<img src={loginIMG} className="img-fluid" alt="login" />
				</div>
				<div className="col-12 col-lg-5">
					<h1 className="text-naranjaContraste">Registro de Usuario</h1>
					<hr />

					<form onSubmit={e => handleSubmit(e)}>
						<div className="form-row">
							<div className="form-group col-md-4">
								<label htmlFor="name">Nombre:</label>
								<input
									type="text"
									name="expiry"
									id="name"
									className="form-control"
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className="form-group col-md-8">
								<label htmlFor="lastname">Apellidos:</label>
								<input
									type="text"
									name="cvc"
									id="lastname"
									className="form-control"
									onChange={e => setLastName(e.target.value)}
								/>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="fechaNacimiento" className="form-label">
								Fecha de Nacimiento:{" "}
							</label>
							<input
								type="date"
								className="form-control"
								aria-describedby="emailHelp"
								// onChange={e => setEmail(e.target.value)}
								onChange={e => setBirthdate(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="correoElectronico" className="form-label">
								Correo Electr??nico:{" "}
							</label>
							<input
								type="email"
								className="form-control"
								aria-describedby="emailHelp"
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						{alert ? (
							<div className="alert alert-naranjaContraste text-center" role="alert">
								Contrase??as no coinciden, favor revisar
							</div>
						) : null}
						<div className="form-row">
							<div className="form-group col-md-6">
								<label className="form-label " htmlFor="password">
									Contrase??a:
								</label>
								<input
									type="password"
									className="form-control"
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className="form-group col-md-6">
								<label className="form-label " htmlFor="password">
									Confirmar contrase??a:
								</label>
								<input
									type="password"
									className="form-control"
									onChange={e => setPassword2(e.target.value)}
								/>
							</div>
						</div>

						<div className="mb-3 text-center">
							<button type="submit" className="btn btn-naranjaContraste mb-3 ">
								Registrarme
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* MODAL */}
			<div>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>Registro de Usuario</ModalHeader>
					<ModalBody>
						<div className="alert alert-naranjaContraste" role="alert">
							Favor complete todos los campos para realizar el registro de usuario
						</div>
					</ModalBody>
					<ModalFooter>
						{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
						<Button color="danger" onClick={toggle}>
							Cerrar
						</Button>
					</ModalFooter>
				</Modal>
			</div>

			<div>
				<Modal isOpen={modalB} toggle={toggleB}>
					<ModalHeader toggle={toggleB}>Registro de Usuario</ModalHeader>
					<ModalBody>
						<div className="alert alert-verdePrincipal" role="alert">
							El registro de usuario ha sido exitoso
						</div>
					</ModalBody>
					<ModalFooter>
						{/* <Button color="primary" onClick={toggle}>
									Do Something
								</Button>{" "} */}
						<Link to="/login">
							<Button color="verdeIntermedio text-white" onClick={toggleB}>
								Ir a Login
							</Button>
						</Link>
					</ModalFooter>
				</Modal>
			</div>

			<div>
				<Modal isOpen={modalC} toggle={toggleC}>
					<ModalHeader toggle={toggleC}>Registro de Usuario</ModalHeader>
					<ModalBody>
						<div className="alert alert-naranjaContraste" role="alert">
							El correo electr??nico ya se encuentra registrado
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
	);
};
