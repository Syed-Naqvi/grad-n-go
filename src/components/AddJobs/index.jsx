import React, { useState } from "react";
import InputBlock from "../InputBlock";
import { Modal, Button } from "react-bootstrap";
import firebase, { db } from "../../firebase/firebase";

const AddJobs = ({ show, onClose }) => {
	const [jobTitle, setJobTitle] = useState("");
	const [companyTitle, setCompanyTitle] = useState("");
	const [link, setLink] = useState("");

	const handleSave = () => {
		firebase.auth().onAuthStateChanged((user) => {
			db.collection("Jobs").doc(user.uid).collection("Jobs").add({
				jobTitle,
				companyTitle,
				link,
				status: 0,
				result: 0,
			});
    });
    onClose();
	};

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add a job</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputBlock
					label="Job Title"
					value={jobTitle}
					id="job-title"
					placeholder="Example: Software Engineer"
					onChange={setJobTitle}
				/>
				<InputBlock
					label="Company Title"
					value={companyTitle}
					id="job-title"
					placeholder="Example: Google"
					onChange={setCompanyTitle}
				/>
				<InputBlock
					label="link"
					value={link}
					id="job-title"
					placeholder="https://www.google.com"
					onChange={setLink}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
				<Button onClick={() => handleSave()}>Save Jobs</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddJobs;
