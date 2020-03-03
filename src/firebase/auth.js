import firebase from "./firebase";

const login = (email, password) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			alert(`Login Successful as ${email}`);
		})
		.catch(error => {
			alert("error logging in");
		});
};

const register = (email, password) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			alert(`Created User as ${email}`);
		})
		.catch(error => {
			alert("error registering", error);
		});
};

export { login, register };
