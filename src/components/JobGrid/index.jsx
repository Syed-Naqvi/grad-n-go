import React, { useState, useEffect } from "react";
import JobCard from "../JobCard";
import firebase, { db } from "../../firebase/firebase";
import { Modal, Button } from "react-bootstrap";

import "./styles.css";

const JobGrid = ({ show, onHide }) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			db.collection("Jobs")
				.doc(user.uid)
				.collection("Jobs")
				.get()
				.then((querySnapshot) => {
					const d = [];
					querySnapshot.forEach((doc) => {
						d.push({ id: doc.id, ...doc.data() });
					});
					setJobs(d);
				});
		});
	}, []);

	// useEffect(() => {
	//   console.log(jobs);
	// }, [jobs])

	const saveJobState = () => {
		firebase.auth().onAuthStateChanged((user) => {
			for (let job of jobs) {
				db.collection("Jobs").doc(user.uid).collection("Jobs").doc(job.id).set({
					jobTitle: job.jobTitle,
					companyTitle: job.companyTitle,
					link: job.link,
					status: job.status,
					result: job.result,
				});
			}
			onHide();
		});
	};

	return (
		<Modal show={show} onHide={onHide} size="xl">
			<Modal.Header closeButton>
				<Modal.Title> Edit Your Jobs </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="jobs-super-container">
					<div className="jobs-container jobs-container--wishlist">
						<div>WishList</div>
						<div>
							{jobs
								.filter((job) => job.status === 0)
								.map((job, idx) => {
									return (
										<JobCard
											jobTitle={job.jobTitle}
											companyTitle={job.companyTitle}
											link={job.link}
											key={job.id}
											changeStatus={(v) => {
												setJobs([
													...jobs.filter((a) => a.id !== job.id),
													{
														...job,
														status: v,
													},
												]);
											}}
										/>
									);
								})}
						</div>
					</div>
					<div className="jobs-container jobs-container--applied">
						<div>Applied</div>
						<div>
							{jobs
								.filter((job) => job.status === 1)
								.map((job, idx) => {
									return (
										<JobCard
											jobTitle={job.jobTitle}
											companyTitle={job.companyTitle}
											link={job.link}
											key={job.id}
											changeStatus={(v) => {
												setJobs([
													...jobs.filter((a) => a.id !== job.id),
													{
														...job,
														status: v,
													},
												]);
											}}
										/>
									);
								})}
						</div>
					</div>
					<div className="jobs-container jobs-container--phone">
						<div>Interview</div>
						<div>
							{jobs
								.filter((job) => job.status === 2)
								.map((job, idx) => {
									return (
										<JobCard
											jobTitle={job.jobTitle}
											companyTitle={job.companyTitle}
											link={job.link}
											key={job.id}
											changeStatus={(v) => {
												setJobs([
													...jobs.filter((a) => a.id !== job.id),
													{
														...job,
														status: v,
													},
												]);
											}}
										/>
									);
								})}
						</div>
					</div>
					<div className="jobs-container jobs-container--onsite">
						<div>Offer</div>
						<div>
							{jobs
								.filter((job) => job.status === 3)
								.map((job, idx) => {
									return (
										<JobCard
											jobTitle={job.jobTitle}
											companyTitle={job.companyTitle}
											link={job.link}
											key={job.id}
											changeStatus={(v) => {
												setJobs([
													...jobs.filter((a) => a.id !== job.id),
													{
														...job,
														status: v,
													},
												]);
											}}
										/>
									);
								})}
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
				<Button variant="primary" onClick={saveJobState}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default JobGrid;
