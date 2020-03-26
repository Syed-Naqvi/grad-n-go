import firebase from "./firebase";

const login = (email, password) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			console.log(`Login Successful as ${email}`);
		})
		.catch(error => {
			console.log("error logging in");
		});
};

const register = (email, password) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			console.log(`Created User as ${email}`);
		})
		.catch(error => {
			console.log("error registering", error);
		});
};
	

const logout = () => {
	firebase.auth().signOut();
};

export { login, register, logout };
