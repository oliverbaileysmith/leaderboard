import React from "react";

const Button = (props) => {
	return (
		<button
			className="
				bg-sky-900
				hover:bg-slate-800
				enabled:hover:cursor-pointer
				disabled:hover:cursor-not-allowed
				rounded
				p-2
				text-white
				text-sm
				font-semibold
			"
			type="button"
			onClick={() => {
				if (props.onClick)
					props.onClick();
			}}
		>
			{props.label}
		</button>
	)
}

export default Button;
