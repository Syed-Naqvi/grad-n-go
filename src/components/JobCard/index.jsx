import React, { useState, useEffect } from "react";
import "./styles.css";

const JobCard = (props) => {
	const { jobTitle, companyTitle, status, link, changeStatus } = props;

	const [st, setSt] = useState(status);

	return (
		<div className="job-card-container">
			<div>{jobTitle}</div>
			<div>{companyTitle}</div>
			<div>
				Click{" "}
				<a href={link} target="blank" rel="noopener noreferrer">
					here
				</a>{" "}
				to view the link.
			</div>
			<div>
				Change Status{" "}
				<select
					value={st}
					onChange={(e) => {
            setSt(parseInt(e.target.value));
            changeStatus(parseInt(e.target.value));
					}}
				>
					<option value={0}>Not Applied</option>
					<option value={1}>Applied</option>
					<option value={2}>Interview</option>
					<option value={3}>Offers</option>
				</select>
			</div>
		</div>
	);
};

export default JobCard;
