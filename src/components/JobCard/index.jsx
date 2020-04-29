import React, { useState } from "react";
import "./styles.css";

const JobCard = (props) => {
	const { jobTitle, companyTitle, status, link } = props;

	return (
		<div className="job-card-container">
			<div>{jobTitle}</div>
			<div>{companyTitle}</div>
			<div>
				Click{" "}
				<a href={link} target="blank" rel="noopener noreferrer">
					here
				</a> to view the link.
			</div>
      <div>
        Change Status <select><option>Not Applied</option>
        <option>Applied</option>
        <option>Phone Interview</option>
        <option>Onsite Interview</option></select>
      </div>
		</div>
	);
};

export default JobCard;
