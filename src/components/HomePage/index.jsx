import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from "../../firebase/auth";
import firebase, { db } from "../../firebase/firebase";
import InputBlock from "../InputBlock";
import "./styles.css";
import Logo from "../../assets/logo.png";
const HomePage = () => {
	const [loginAction, setLoginAction] = useState(<></>);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [major, setMajor] = useState("");
	const [graduationDate, setGraduationDate] = useState("");
	const [location, setLocation] = useState("");
	
	
	const [showSettings, setShowSettings] = useState(false);
	const handleCloseSettings = () => setShowSettings(false);
	const handleShowSettings = () => setShowSettings(true);

	const [showSearch, setShowSearch] = useState(false);
	const handleCloseSearch = () => setShowSearch(false);
	const handleShowSearch= () => setShowSearch(true);

	const [showJobs, setShowJobs] = useState(false);
	const handleCloseJobs = () => setShowJobs(false);
	const handleShowJobs= () => setShowJobs(true);

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
		<div className= "theContainer">
		<div className='header'>
			<img src={Logo} className="headerImage" alt="Homepage Logo" /> 
		</div>
		<div className="homepageBody">
			<h1 className= "countdown"> 00:00:00:00:00</h1>
			<div className="buttonDiv">
				<Button className= "homepageButtons" onClick={handleShowSettings}>
				Edit Your Information
				</Button>
				<Button className= "homepageButtons" onClick={handleShowSearch}>
				Search for Jobs
				</Button>
				<Button className= "homepageButtons" onClick={handleShowJobs}>
				Check your Jobs
				</Button>
			</div>
		</div>






		<Modal show={showSearch} onHide={handleCloseSearch}>
			<Modal.Header closeButton>
			<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleCloseSearch}>
				Close
			</Button>
			<Button variant="primary" onClick={handleCloseSearch}>
				Save Changes
			</Button>
			</Modal.Footer>
      	</Modal>
		
		  <Modal show={showJobs} onHide={handleCloseJobs}>
			<Modal.Header closeButton>
			<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleCloseJobs}>
				Close
			</Button>
			<Button variant="primary" onClick={handleCloseJobs}>
				Save Changes
			</Button>
			</Modal.Footer>
      	</Modal>

		<Modal show={showSettings} onHide={handleCloseSettings}>
			<Modal.Header closeButton>
			<Modal.Title>Edit Your Information</Modal.Title>
			</Modal.Header>
			<Modal.Body>

			</Modal.Body>
			<div className="profile-component ">
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
								PhoneNumber: phoneNumber,
								major: major,
								GraduationDate: graduationDate,
								Location: location,
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
			
			<Modal.Footer>
			<Button variant="secondary" onClick={handleCloseSettings}>
				Close
			</Button>
			</Modal.Footer>
		</Modal>
		</div>

	);
};

export default HomePage;
