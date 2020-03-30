import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { logout } from "../../firebase/auth";
import firebase, { db } from "../../firebase/firebase";
import InputBlock from "../InputBlock";
import "./styles.css";

const HomePage = () => {
	const [loginAction, setLoginAction] = useState(<></>);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [major, setMajor] = useState("");
	const [graduationDate, setGraduationDate] = useState("");
	const [location, setLocation] = useState("");

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
		<div className="profile-component">
		<div className="profile-sub-component">
		<div className="profile-title">Profile</div>


			<InputBlock
				label={"Name"}
				id="name"
				type="text"
				value={name}
				onChange={setName}
				placeholder={"Syed"}
			/>
			<InputBlock
				label={"Phone Number"}
				id="phonenumber"
				type="text"
				value={phoneNumber}
				onChange={setPhoneNumber}
				placeholder={"Example: 585-313-2014"}
			/>
			<InputBlock
				label={"Major"}
				id="major"
				type="text"
				value={major}
				onChange={setMajor}
				placeholder={"Example: Computer Science"}
			/>
			<InputBlock
				label={"Graduation Date"}
				id="graduation"
				type="text"
				value={graduationDate}
				onChange={setGraduationDate}
				placeholder={"Example: May 2020"}
			/>
			<InputBlock
				label={"Location"}
				id="location"
				type="text"
				value={location}
				onChange={setLocation}
				placeholder={"Example: Plattsburgh, New York"}
			/>
			<button
				className = "save"
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
			<div>
				{loginAction}
				<button
					className = "logout"
					onClick={() => {
						logout();
						updateLoginStatus();
					}}
				>
					logout
				</button>
		</div>
		</div>
		</div>

	);
};

export default HomePage;
