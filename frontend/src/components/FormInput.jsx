import React from "react";

const FormInput = (props) => {
	if (props.type==="submit") {
		return (
			<input
				type={props.type}
				value={props.label}
				disabled={props.disabled}
			/>
		)
	} else {
		return (
			<>
				<label htmlFor={props.name} className="block">{props.label}</label>
				<input
					type={props.type}
					id={props.name}
					name={props.name}
					value={props.value}
					onChange={ (e)=>props.setter(e.target.value) }
					disabled={props.disabled}
					className="block"
				/>
				<p className="inline text-xs">{props.error}</p>
			</>
		)
	}
};

export default FormInput;
