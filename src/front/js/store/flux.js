const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login: true,
			message: null,
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
