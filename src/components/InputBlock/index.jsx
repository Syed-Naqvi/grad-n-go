import React, { useState, useEffect } from "react";

import "./styles.css";

const InputBlock = props => {
	const { label, value, id, type = "text",placeholder, onChange = () => {} } = props;


	const [val, setVal] = useState("");

	const changeHandler = e => {
		e.preventDefault();

		setVal(e.currentTarget.value);
	};

	useEffect(() => {
		onChange(val);
	}, [val, onChange]);

	return (
		<div className="input-container">
			<div className="label">
				<label htmlFor={id}>{label}</label>
			</div>
			<input className="input-element" placeholder={placeholder} type={type} value={value} onChange={e => changeHandler(e)} />
		</div>
	);
};

export default InputBlock;
