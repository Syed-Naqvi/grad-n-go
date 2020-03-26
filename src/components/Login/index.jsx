import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import InputBlock from "../InputBlock";
import { login } from "../../firebase/auth";
import firebase from "../../firebase/firebase";
import Logo from "../../assets/logo.png";

import "./styles.css";

const Login = () => {
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

	return (
		<div className="login-component">
			<div className="login-sub-component">
				<img src={Logo} className="homepageImage" alt="Homepage Logo" />
				<div className="login-title">Login</div>
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
				<button
					className="submit"
					onClick={() => {
						login(email, password);
						updateLoginStatus();
					}}
				>
					Login
				</button>
				<div>
					No account? Create <Link to="/register">here</Link>.
				</div>
			</div>
			{loginAction}
		</div>
	);
};

export default Login;
