import React from "react";

const Button = (props) => {

	const colors = props.warn ? " bg-red-500 hover:bg-red-800" : " bg-sky-900 hover:bg-slate-800"

	return (
		<button
			className={`
				enabled:hover:cursor-pointer
				disabled:hover:cursor-not-allowed
				rounded
				p-2
				m-1
				text-white
				text-sm
				font-semibold
				${colors}
			`}
			type="button"
			onClick={() => {
				if (props.onClick)
					props.onClick();
			}}
		>
			<span className="px-1">{props.label}</span>
		</button>
	)
}

export default Button;
