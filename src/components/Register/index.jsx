import React, { useState, useEffect } from "react";
import InputBlock from "../InputBlock";
import { register } from "../../firebase/auth";
import {Link} from "react-router-dom";

import "./styles.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		console.log("email ==> ", email);
		console.log("password ==> ", password);
	});

	return (
		<div className="register-component">
      <div className="register-sub-component">
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
        <button className="submit" onClick={() => register(email, password)}>Register</button>
        <div>
					Already have an account? Login <Link to="/register">here</Link>.
				</div>
      </div>
		</div>
	);
};

export default Register;
