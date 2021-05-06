import React, { Component, useContext } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const MapContenedor = props => {
	const { store, actions } = useContext(Context);
	console.log(store.lat);
	console.log(store.lon);
	return (
		<div>
			<Map
				google={props.google}
				zoom={14}
				initialCenter={{
					lat: store.lat,
					lng: store.lon
				}}>
				<Marker name={"Current location"} />

				<InfoWindow>
					<div>
						<h1 />
					</div>
				</InfoWindow>
			</Map>
		</div>
	);
};

MapContenedor.propTypes = {
	google: PropTypes.any,
	lat: PropTypes.any,
	lng: PropTypes.any
};

export default GoogleApiWrapper({
	apiKey: "AIzaSyCzX1EtZCNZXoDZamxixCtKZyBUzrxv8ZU"
})(MapContenedor);
