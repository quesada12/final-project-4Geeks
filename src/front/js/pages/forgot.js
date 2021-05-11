import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Context } from "../store/appContext";

export const Forgot = props => {
	const [code, setCode] = useState("");
	const [pass1, setPass1] = useState("");
	const [pass2, setPass2] = useState("");
	const [modal, setModal] = useState(false);
	const [modalB, setModalB] = useState(false);
	const toggle = () => setModal(!modal);
	const toggleB = () => setModalB(!modalB);
	const params = useParams();
	const { store, actions } = useContext(Context);

	const handleSubmit = e => {
		e.preventDefault();
		if (pass1 === pass2) {
			const body = {
				user_id: params.id,
				codigoVerificacion: code,
				password: pass1
			};
			fetch(store.api_url + "/api/update", {
				method: "PUT",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => (res.ok ? toggleB() : toggle()))
				.catch(err => console.error(err));
		} else {
			toggle();
		}
	};
	return (
		<div className="container bg-white border rounded py-4 ">
			<h1 className="text-verdePrincipal">Reestablecer Contraseña</h1>
			<hr />
			<div className="alert alert-naranjaContraste text-center" role="alert">
				Favor revisar la bandeja de entrada del correo electrónico registrado para obtener el código de
				validación
			</div>
			<form onSubmit={e => handleSubmit(e)}>
				<div className="mb-3">
					<label htmlFor="codigo" className="form-label">
						Código de Validación:{" "}
					</label>
					<input type="password" className="form-control" onChange={e => setCode(e.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="pass1" className="form-label">
						Nueva Contraseña:{" "}
					</label>
					<input type="password" className="form-control" onChange={e => setPass1(e.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="pass2" className="form-label">
						Confirmar Contraseña:{" "}
					</label>
					<input type="password" className="form-control" onChange={e => setPass2(e.target.value)} />
				</div>
				<div className="mb-3 text-center">
					<button type="submit" className="btn btn-verdeOscuro mb-3">
						Reestablecer Contraseña
					</button>
				</div>
			</form>

			{/* MODAL */}
			<div>
				<Modal isOpen={modal} toggle={toggle}>
					<ModalHeader toggle={toggle}>Error</ModalHeader>
					<ModalBody>
						<div className="alert alert-naranjaContraste text-center" role="alert">
							<p>Código de Validación o Confirmación de Contraseña incorrecta</p>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="verdeIntermedio" onClick={toggle}>
							Cerrar
						</Button>
					</ModalFooter>
				</Modal>
			</div>

			<div>
				<Modal isOpen={modalB} toggle={toggleB}>
					<ModalHeader toggle={toggleB}>Actualización</ModalHeader>
					<ModalBody>
						<div className="alert alert-verdePrincipal text-center" role="alert">
							<p>Contraseña actualizada exitosamente</p>
						</div>
					</ModalBody>
					<ModalFooter>
						<Link to="/login">
							<Button color="verdeIntermedio">Ir a Login</Button>
						</Link>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
};
