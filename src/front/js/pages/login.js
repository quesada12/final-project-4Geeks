import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = props => {
	return (
		<div className="jumbotron mx-5 bg-white border py-4 ">
			<h1 className="text-verdePrincipal">Hola soy Login</h1>
			<div className="card">
				<h5 className="card-header ">Featured</h5>
				<div className="card-body">
					<h5 className="card-title text-danger">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
			<div className="card">
				<h5 className="card-header ">Featured</h5>
				<div className="card-body">
					<h5 className="card-title text-danger">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
			<div className="card">
				<h5 className="card-header ">Featured</h5>
				<div className="card-body">
					<h5 className="card-title text-danger">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
			<div className="card">
				<h5 className="card-header ">Featured</h5>
				<div className="card-body">
					<h5 className="card-title text-danger">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
			<div className="card">
				<h5 className="card-header ">Featured</h5>
				<div className="card-body">
					<h5 className="card-title text-danger">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
		</div>
	);
};
