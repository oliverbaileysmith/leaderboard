import React from "react";

const FormInput = (props) => {
	return (
		<>
			<label htmlFor={props.name} className="block">{props.label}</label>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={ (e)=>props.setter(e.target.value) }
				className="block"
			/>
		</>
	)
};

export default FormInput;
