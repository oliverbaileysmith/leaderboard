import React from "react";

const FormInput = (props) => {
	if (props.type==="submit") {
		return (
			<input
				className="
					bg-sky-900
					enabled:hover:bg-slate-800
					enabled:hover:cursor-pointer
					disabled:hover:cursor-not-allowed
					rounded
					p-2
					text-white
					text-sm
					font-semibold
				"
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
					className="block mb-2"
				/>
				{props.error && <p className="text-xs text-pink-700">{props.error}</p>}
			</>
		)
	}
};

export default FormInput;
