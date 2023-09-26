import React from "react";

const Form = (props) => {
	return (
		<form
			className="
				flex
				flex-col
				items-center
				mt-4
			"
			onSubmit={(e) => props.onSubmit(e)}
		>
			{props.children}
		</form>
	)
}

export default Form;
