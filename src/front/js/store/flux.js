const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login: true,
			message: null,
			provincias: [],
			cantones: [],
			distritos: [],
			canchas: [
				{
					id: "1",
					nombre: "Cancha React SJ",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "1",
					canton: "1",
					distrito: "1"
				},
				{
					id: "2",
					nombre: "Cancha React Alajuela",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "2",
					canton: "2",
					distrito: "1"
				},
				{
					id: "3",
					nombre: "Cancha React Cartago",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "3",
					canton: "4",
					distrito: "1"
				},
				{
					id: "4",
					nombre: "Cancha React San Diego",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "3",
					canton: "3",
					distrito: "2"
				},
				{
					id: "5",
					nombre: "Cancha React San Juan1",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "3",
					canton: "3",
					distrito: "3"
				},
				{
					id: "6",
					nombre: "Cancha React San Juan2",
					img: "https://www.larepublica.net/storage/images/2020/10/19/20201019133032.cancha.jpg",
					costo: "14000",
					ubicacion: "100 m O de la Iglesia",
					provincia: "3",
					canton: "3",
					distrito: "3"
				}
			],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			usuarios: [
				{
					correo: "prueba@prueba.com",
					password: "pruebaprueba"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			createInitialVars: () => {
				sessionStorage.setItem("login", "false");
			},

			ingresar: () => {
				let login = true;
				sessionStorage.setItem("login", "true");
				setStore({ login: login });
			},

			salir: () => {
				let login = false;
				sessionStorage.setItem("login", "false");
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
			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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
