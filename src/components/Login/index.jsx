import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import InputBlock from "../InputBlock";
import { login } from "../../firebase/auth";

import "./styles.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		console.log("email ==> ", email);
		console.log("password ==> ", password);
	});

	return (
		<div className="login-component">
			<div className="login-sub-component">
        <div className="login-title">
          Login
        </div>
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
				<button className="submit" onClick={() => login(email, password)}>
					Login
				</button>
				<div>
					No account? Create <Link to="/register">here</Link>.
				</div>
			</div>
		</div>
	);
};

export default Login;
