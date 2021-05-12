const getState = ({ getStore, getActions, setStore }) => {
	const api_url = "https://api-rent-sports.herokuapp.com/";
	return {
		store: {
			api_url: "https://api-rent-sports.herokuapp.com/",
			login: false,
			message: null,
			provincias: [],
			cantones: [],
			distritos: [],
			canchas: [],
			reservas: [],

			usuarios: [
				{
					id: 1,
					correo: "josue.qu12@gmail.com",
					password: "pruebaprueba"
				}
			],
			lat: "9.893063",
			lon: "-83.995566"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			createInitialVars: () => {
				sessionStorage.setItem("login", "false");
				sessionStorage.setItem("user", "0");
			},

			ingresar: (user, token) => {
				let login = true;
				sessionStorage.setItem("login", "true");
				sessionStorage.setItem("user", user);
				sessionStorage.setItem("token", token);
				setStore({ login: login });
			},

			salir: () => {
				let login = false;
				sessionStorage.setItem("login", "false");
				sessionStorage.setItem("user", "0");
				sessionStorage.setItem("token", "0");
				setStore({ login: login });
			},

			login: (correo, password) => {
				const store = getStore();
				let res = false;
				let usuarios = store.usuarios;
				usuarios.forEach(usuario => {
					res = usuario.correo === correo && usuario.password === password ? true : false;
				});
				return res;
			},
			getProvincias: async () => {
				let respuesta = {};
				let provincias = [];
				await fetch("https://ubicaciones.paginasweb.cr/provincias.json")
					.then(resp => resp.json())
					.then(data => (respuesta = data))
					.catch(error => console.log("Error loading provincias", error));
				let element = {};
				for (const key in respuesta) {
					element = {
						label: respuesta[key],
						value: key
					};
					provincias.push(element);
				}

				setStore({ provincias: provincias });
				const actions = getActions();
				actions.getCantones();
			},
			getCantones: async () => {
				const store = getStore();
				const provincias = store.provincias;
				let respuestaC = {};
				let cantones = [];
				for (let i = 1; i <= provincias.length; i++) {
					await fetch("https://ubicaciones.paginasweb.cr/provincia/" + i + "/cantones.json")
						.then(resp => resp.json())
						.then(data => (respuestaC = data))
						.catch(error => console.log("Error loading cantones de " + i, error));
					let element = {};
					for (const key in respuestaC) {
						element = {
							label: respuestaC[key],
							value: key,
							provincia: i
						};

						cantones.push(element);
					}
				}
				setStore({ cantones: cantones });
				const actions = getActions();
				actions.getDistritos();
			},
			getDistritos: async (provinciaID, cantonID) => {
				const store = getStore();
				const cantones = store.cantones;
				const provincias = store.provincias;
				let respuestaD = {};
				let distritos = [];
				for (let i = 1; i <= provincias.length; i++) {
					let cantidadCantones = 0;
					for (let j = 0; j < cantones.length; j++) {
						if (cantones[j].provincia == i) {
							cantidadCantones++;
						}
					}
					for (let k = 1; k <= cantidadCantones; k++) {
						await fetch(
							"https://ubicaciones.paginasweb.cr/provincia/" + i + "/canton/" + k + "/distritos.json"
						)
							.then(resp => resp.json())
							.then(data => (respuestaD = data))
							.catch(error => console.log("Error loading distritos de " + i, error));
						let element = {};
						for (const key in respuestaD) {
							element = {
								label: respuestaD[key],
								value: key,
								provincia: i,
								canton: k
							};
							distritos.push(element);
						}
					}
				}
				setStore({ distritos: distritos });
			},
			getProvinciaName: id => {
				const store = getStore();
				const provincias = store.provincias;
				let result = "";
				provincias.forEach(provincia => {
					if (provincia.value == id) {
						result = provincia.label;
					}
				});
				return result;
			},
			getCantonName: (provinciaId, cantonId) => {
				const store = getStore();
				const cantones = store.cantones;
				let result = "";
				cantones.forEach(canton => {
					if (canton.value == cantonId && canton.provincia == provinciaId) {
						result = canton.label;
					}
				});
				return result;
			},
			getDistritoName: (provinciaId, cantonId, distritoId) => {
				const store = getStore();
				const distritos = store.distritos;
				let result = "";
				distritos.forEach(distrito => {
					if (
						distrito.value == distritoId &&
						distrito.provincia == provinciaId &&
						distrito.canton == cantonId
					) {
						result = distrito.label;
					}
				});
				return result;
			},
			getUserID: email => {
				const store = getStore();
				const usuarios = store.usuarios;
				usuarios.forEach(usuario => {
					if (usuario.correo === email) {
						return usuario.id;
					}
				});
				return null;
			},
			addReserva: reserva => {
				const store = getStore();
				const reservas = store.reservas;
				reservas.push(reserva);
				setStore({ reservas: reservas });
			},
			addCoordenadas: (lat, lon) => {
				const store = getStore();
				setStore({ lat: lat });
				setStore({ lon: lon });
			},
			getMessage: () => {
				// fetching data from the backend
				fetch(api_url + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getCanchas: () => {
				fetch(api_url + "/api/cancha")
					.then(resp => resp.json())
					.then(data => setStore({ canchas: data }))
					.catch(error => console.log("Error loading canchas from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
