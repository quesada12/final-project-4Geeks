import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="jumbotron big-banner mb-0" style={{ height: "500px", padding: "150px 0 0 0" }}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col">
							<div className="col-4">
								<h1 className="display-5">Reservá tu cancha al instante</h1>
								<p>Explorá las canchas disponibles en tu ciudad en tiempo real</p>
								<Link to="/login">
									<button className="btn btn-naranjaContraste btn-lg">¡Regístrate ya!</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid bg-white pt-3 pb-3">
				<div className="text-verdeOscuro">
					<h1 className="text-verdeOscuro mb-4">Alquilá tu Cancha en 3 pasos</h1>
				</div>

				<div className="card-deck text-justify">
					<div className="card">
						<img
							src="https://image.freepik.com/foto-gratis/deportista-feliz-sonriendo-mirando-su-telefono-movil_362480-384.jpg"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<h5 className="card-title">Buscá</h5>
							<p className="card-text">
								¡No llames más por teléfono! Conocé la disponibilidad de tus canchas preferidas o dejá
								que la app te recomiende el campo ideal por precio y ubicación.
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
								Compará precios, disponibilidad, servicios de la cancha. Tenés toda la información para
								hacer tu reserva instantánea, sin pagar nada por adelantado!
							</p>
						</div>
					</div>

					<div className="card">
						<img
							src="https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
							className="card-img-top"
							alt="..."
						/>
						<div className="card-body">
							<h5 className="card-title">Jugá</h5>
							<p className="card-text">
								Pagá el 100% de tu campo mediante la app y disfrutá en la cancha! Preocupate por jugar
								bien en el partido, nosotros nos ocupamos de tu reserva.
							</p>
						</div>
					</div>
				</div>
				<div>
					<h1 className="text-verdeOscuro mb-3 mt-3">Canchas cerca de ti</h1>
				</div>
			</div>

			<div className="jumbotron big-banner-map mb-0" style={{ height: "500px", padding: "150px 0 0 0" }}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col">
							<div className="col-6">
								<h1 className="display-5">Mirá las canchas dispobibles en tu localidad</h1>
								{/* <p>Explorá las canchas disponibles en tu ciudad en tiempo real</p> */}
								<Link to="/login">
									<button className="btn btn-naranjaContraste btn-lg">¡Haz tu reserva!</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
