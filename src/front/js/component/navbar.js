import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<nav className="navbar navbar-light bg-verdeIntermedio mb-3 border-bottom ">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 text-white">Reservas Canchas</span>
			</Link>

			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<Link to="/template">
					<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">
							Template
						</a>
					</li>
				</Link>
			</ul>
			<div className="ml-auto pr-5">
				{store.login ? (
					<Dropdown isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle caret className="btn-verdeOscuro">
							Bienvenido
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								<Link to={"/canchas"}>
									<button type="button" className="btn btn-link text-dark ">
										Reservar
									</button>
								</Link>
							</DropdownItem>
							<DropdownItem>
								<Link to={"/reservas"}>
									<button type="button" className="btn btn-link text-dark ">
										Mis Reservas
									</button>
								</Link>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<Link to={"/canchas"}>
									<button
										type="button"
										className="btn btn-link text-dark "
										onClick={e => actions.salir()}>
										Cerrar Sesión
									</button>
								</Link>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<Link to="/login">
						<button className="btn btn-verdeOscuro text-white">Ingresar</button>
					</Link>
				)}
			</div>
		</nav>
	);
};
