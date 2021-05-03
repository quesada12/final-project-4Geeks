import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid bg-white border rounded py-4 ">
			<div className="jumbotron">
				<h1>Hello World here i am</h1>
			</div>

			<div>
				<h1>Alquilá tu Cancha en 3 pasos</h1>
			</div>

			<div className="card-deck">
				<div className="card">
					<img
						src="https://image.freepik.com/foto-gratis/deportista-feliz-sonriendo-mirando-su-telefono-movil_362480-384.jpg"
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">Busca</h5>
						<p className="card-text">
							No llames más por teléfono! Conocé la disponibilidad de tus canchas preferidas o deja que la
							app te recomiende el turno ideal por precio y ubicación.
						</p>
					</div>
				</div>

				<div className="card">
					<img
						src="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">Reservá</h5>
						<p className="card-text">
							Compará precios, turnos, servicios del club. Tenés toda la información para hacer tu reserva
							instantánea, sin pagar nada por adelantado!
						</p>
					</div>
				</div>

				<div className="card">
					<img
						src="https://images.pexels.com/photos/5886522/pexels-photo-5886522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						className="card-img-top"
						alt="..."
					/>
					<div className="card-body">
						<h5 className="card-title">Jugá</h5>
						<p className="card-text">
							Pagá el 100% del turno en el club y disfrutá en la cancha! Vos preocupate por romperla en el
							partido, nosotros nos ocupamos de la reserva ;)
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
