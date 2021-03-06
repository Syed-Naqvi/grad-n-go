import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import moment from "moment";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Button, Col, Row, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../../firebase/auth";
import firebase, { db } from "../../firebase/firebase";
import InputBlock from "../InputBlock";
import "./styles.css";
import Logo from "../../assets/logo.png";
import LinkedIn from "../../assets/linkedin.png";
import Glassdoor from "../../assets/glassdoor.png";
import Check from "./check.png";
import Search from "./search.png";
import Edit from "./edit.png";
import New from "./new.png";
import ApplicationImg from "../../assets/application.svg";
import JobGrid from "../JobGrid";
import AddJobs from "../AddJobs";

const HomePage = () => {
	const [loginAction, setLoginAction] = useState(<></>);
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [major, setMajor] = useState("");
	const [graduationDate, setGraduationDate] = useState(new Date());
	const [location, setLocation] = useState("");
	const [searchLocation, setSearchLocation] = useState("");
	const [searchId, setSearchId] = useState("");
	const [jobType, setJobType] = useState("");
	const [showSettings, setShowSettings] = useState(false);
	const handleCloseSettings = () => setShowSettings(false);
	const handleShowSettings = () => setShowSettings(true);
	const [showSearch, setShowSearch] = useState(false);
	const handleCloseSearch = () => setShowSearch(false);
	const handleShowSearch = () => setShowSearch(true);
	const [showJobs, setShowJobs] = useState(false);
	const handleCloseJobs = () => setShowJobs(false);
	const handleShowJobs = () => setShowJobs(true);
	const [showAddJobs, setShowAddJobs] = useState(false);
	const handleCloseAddJobs = () => setShowAddJobs(false);
	const handleShowAddJobs = () => setShowAddJobs(true);
	const handleChangeLocation = (searchLocation) =>
		setSearchLocation(searchLocation);
	const handleChangeId = (searchId) => setSearchId(searchId);
	const handleChangeJobType = (jobType) => {
		setJobType(jobType.split(" ").join("+"));
	};
	const updateLoginStatus = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				setLoginAction(<Redirect to="/login" />);
			}
		});
	};
	useEffect(() => {
		updateLoginStatus();
	}, []);

	class Countdown extends React.Component {
		state = {
			months: undefined,
			days: undefined,
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
		};

		componentDidMount() {
			this.interval = setInterval(() => {
				const { DatePicker } = this.props;
				const then = moment(graduationDate);
				const now = moment();
				const countdown = moment(then - now);
				const months = countdown.format("MM");
				const days = countdown.format("D");
				const hours = countdown.format("HH");
				const minutes = countdown.format("mm");
				const seconds = countdown.format("ss");
				this.setState({ months, days, hours, minutes, seconds });
			}, 1000);
		}

		componentWillUnmount() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}
		render() {
			const { months, days, hours, minutes, seconds } = this.state;
			return (
				<div>
					{loginAction}
					<h1>Countdown</h1>
					<div className="countdown-wrapper">
						<div className="countdown-item">
							{months - 1}
							<span>months</span>
						</div>
						<div className="countdown-item">
							{days - 1}
							<span>days</span>
						</div>
						<div className="countdown-item">
							{hours}
							<span>hours</span>
						</div>
						<div className="countdown-item">
							{minutes}
							<span>minutes</span>
						</div>
						<div className="countdown-item">
							{seconds}
							<span>seconds</span>
						</div>
					</div>
				</div>
			);
		}
	}
	return (
		<div className="theContainer">
			<div className="header">
				<img src={Logo} className="headerImage" alt="Homepage Logo" />
			</div>
			<button
				className="logout"
				onClick={() => {
					logout();
					updateLoginStatus();
				}}
			>
				logout
			</button>
			<div className="homepageBody">
				<h1 className="countdown">
					<Countdown date />
				</h1>
				<div className="buttonDiv">
					<Button className="homepageButtons" onClick={handleShowSettings}>
						<img
							src={Edit}
							className="homepageImages"
							alt="Edit Your Profile"
						/>
					</Button>
					<Button className="homepageButtons" onClick={handleShowSearch}>
						<img
							src={Search}
							className="homepageImages"
							alt="Search for Jobs"
						/>
					</Button>
					<Button className="homepageButtons" onClick={handleShowJobs}>
						<img src={Check} className="homepageImages" alt="Check your Jobs" />
					</Button>
					<Button className="homepageButtons" onClick={handleShowAddJobs}>
						<img
							src={New}
							className="homepageImages"
							alt="Add a Job"
						/>
					</Button>
				</div>
			</div>
			<Modal show={showSearch} onHide={handleCloseSearch}>
				<Modal.Header closeButton>
					<Modal.Title>Search For Jobs</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="job-board-container">
							<div className="homeGlass">
								<div><img className="job-board-logo" src={Glassdoor} alt="" />
								Search on Glassdoor</div>
							</div>
						<Row>
							<Col>
								<InputBlock
									className="homeInput"
									type="text"
									placeholder="Job Title"
									value={jobType}
									name="jobType"
									onChange={setJobType}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Row className="jobHeader">
									<p className="jobHeader">
										{" "}
										Looking for jobs in{" "}
										<span className="jobLocation">{searchLocation}</span>
									</p>
								</Row>
								<Row className="jobRows">
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("New York City");
											handleChangeId("1132348");
										}}
									>
										New York City
									</Button>
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("Boston");
											handleChangeId("1154532");
										}}
									>
										Boston
									</Button>
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("San Francisco");
											handleChangeId("1147401");
										}}
									>
										San Francisco
									</Button>
								</Row>
								<Row className="jobRows">
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("Los Angeles");
											handleChangeId("1146821");
										}}
									>
										Los Angeles
									</Button>
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("Seattle");
											handleChangeId("1150505");
										}}
									>
										Seattle
									</Button>
									<Button
										className="jobButtons"
										onClick={() => {
											handleChangeLocation("Portland");
											handleChangeId("1151614");
										}}
									>
										Portland
									</Button>
								</Row>
							</Col>
						</Row>
						<Row className="jobRows">
							<Button
								size="lg"
								variant="outline-danger"
								onClick={() =>
									window.location.assign(
										"https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=&sc.keyword=" +
											jobType.split(" ").join("+") +
											"&locT=C&locId=" +
											searchId +
											"&jobType="
									)
								}
							>
								{" "}
								Search{" "}
							</Button>
						</Row>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSearch}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<JobGrid show={showJobs} onHide={handleCloseJobs} />

			<Modal show={showSettings} onHide={handleCloseSettings}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Your Information</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
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
						<DatePicker
							selected={graduationDate}
							onChange={(date) => setGraduationDate(date)}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
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
							className="save"
							onClick={() => {
								firebase.auth().onAuthStateChanged((user) => {
									db.collection("Profile").doc(user.uid).set({
										name: name,
										PhoneNumber: phoneNumber,
										major: major,
										GraduationDate: graduationDate,
										Location: location,
										userID: user.uid,
									});
								});
							}}
						>
							Save
						</button>
					</div>
				</div>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSettings}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<AddJobs show={showAddJobs} onClose={handleCloseAddJobs} />
		</div>
	);
};
export default HomePage;
