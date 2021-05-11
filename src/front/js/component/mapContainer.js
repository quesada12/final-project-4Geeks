import React, { Component, useContext } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

export class MapContainer extends Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			selectedPlace: {
				name: "Prueba"
			},
			lat: "",
			lon: "",
			user: ""
		};
	}
	componentDidMount() {
		this.state.user = this.context;
	}

	render() {
		// const { store, actions } = useContext(Context);
		console.log(this.state.user);

		return (
			<Map
				google={this.props.google}
				zoom={14}
				initialCenter={{
					// lat: this.props.lat,
					// lng: this.props.lng
					lat: this.state.user.lat,
					lng: this.state.user.lon
				}}>
				<Marker onClick={this.onMarkerClick} name={"Current location"} />

				<InfoWindow onClose={this.onInfoWindowClose}>
					<div>
						<h1>{this.state.selectedPlace.name}</h1>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

MapContainer.propTypes = {
	google: PropTypes.any,
	lat: PropTypes.any,
	lng: PropTypes.any
};

export default GoogleApiWrapper({
	// apiKey: "AIzaSyCzX1EtZCNZXoDZamxixCtKZyBUzrxv8ZU"
})(MapContainer);
