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
			<div className="w-64">
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
					className="block mb-2 rounded shadow-inner w-full drop-shadow"
				/>
				{props.error && <p className="text-xs text-pink-700 w-full">{props.error}</p>}
			</div>
		)
	}
};

export default FormInput;
