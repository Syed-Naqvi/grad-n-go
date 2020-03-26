import React, { useState, useEffect } from "react";
import InputBlock from "../InputBlock";
import { register } from "../../firebase/auth";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../assets/logo.png";
import firebase from "../../firebase/firebase";

import "./styles.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginAction, setLoginAction] = useState(<></>);

	useEffect(() => {
		updateLoginStatus();
	}, []);

	const updateLoginStatus = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setLoginAction(<Redirect to="/" />);
			}
		});
	};

	useEffect(() => {
		console.log("email ==> ", email);
		console.log("password ==> ", password);
	});

	return (
		<div className="register-component">
			<div className="register-sub-component">
				<img src={Logo} className="homepageImage" alt="Homepage Logo" />
				<div className="register-title">Register</div>
				<InputBlock
					label={"Email"}
					id="email"
					type="email"
					value={email}
					onChange={setEmail}
					placeholder={"someone@example.com"}
				/>
				<InputBlock
					label={"Password"}
					id="password"
					type="password"
					value={password}
					onChange={setPassword}
					placeholder={"**********"}
				/>
				<button className="submit" onClick={() => register(email, password)}>
					Register
				</button>
				<div>
					Already have an account? Login <Link to="/login">here</Link>.
				</div>
			</div>
			{loginAction}
		</div>
	);
};

export default Register;
