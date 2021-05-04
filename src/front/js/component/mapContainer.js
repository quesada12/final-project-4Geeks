import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPlace: {
				name: "Prueba"
			}
		};
	}

	render() {
		console.log(this.props);
		return (
			<Map
				google={this.props.google}
				zoom={14}
				initialCenter={{
					lat: this.props.lat,
					lng: this.props.lng
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
	apiKey: "AIzaSyCzX1EtZCNZXoDZamxixCtKZyBUzrxv8ZU"
})(MapContainer);
