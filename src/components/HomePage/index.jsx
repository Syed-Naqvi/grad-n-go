import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { logout } from "../../firebase/auth";
import firebase, { db } from "../../firebase/firebase";
import InputBlock from "../InputBlock";

const HomePage = () => {
	const [loginAction, setLoginAction] = useState(<></>);
	const [name, setName] = useState("");
	const [major, setMajor] = useState("");

	const updateLoginStatus = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				setLoginAction(<Redirect to="/login" />);
			}
		});
	};

	useEffect(() => {
		updateLoginStatus();
	}, []);

	return (
		<div>
			{loginAction}
			<button
				onClick={() => {
					logout();
					updateLoginStatus();
				}}
			>
				logout
			</button>
			<InputBlock
				label={"Name"}
				id="name"
				type="text"
				value={name}
				onChange={setName}
				placeholder={"Syed"}
			/>
			<InputBlock
				label={"Major"}
				id="major"
				type="text"
				value={major}
				onChange={setMajor}
				placeholder={"Example: Computer Science"}
			/>
			<button
				onClick={() => {
					firebase.auth().onAuthStateChanged(user => {
						db.collection("Profile")
							.doc(user.uid)
							.set({
								name: name,
								major: major,
								userID: user.uid
							});
					});
				}}
			>
				Save
			</button>
		</div>
	);
};

export default HomePage;
