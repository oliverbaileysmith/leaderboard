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
					onBlur={() => {
						if (props.onBlur && (props.value !== ""))
							props.onBlur();
					}}
					disabled={props.disabled}
					className="block"
				/>
				<p className="text-xs text-pink-700">{props.error}</p>
			</>
		)
	}
};

export default FormInput;
