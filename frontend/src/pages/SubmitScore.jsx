import React, {useState, useContext} from "react";

import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

const SubmitScore = () => {
	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");

	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting, success
	const [status, setStatus] = useState("typing");
	const [errors, setErrors] = useState(["", "", ""]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus("submitting");

		trySubmit();

		setStatus("typing");
	}

	const trySubmit = () => {
		const reqBody = {
			username: loginContext.user.username,
			score: score,
			level: level
		};

		fetch("http://localhost:5555/api/scores/",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody),
			credentials: "include"
		})
		.then(res => {
			if (!res.ok)
				throw new Error("Failed to submit score");
			return res.json();
		})
		.then(data => {
			setStatus("success");
			setScore("");
			setLevel("");
			setErrors(["", "", ""]);
		})
		.catch(error => {
			setErrors(errors.map((e, i) => {
				if (i === 2) {
					return error.message;
				}
				return e;
			}));
			setStatus("typing");
		});
	};

	return (
		<>
			<h1>Handle user not logged in on frontend</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormInput
					type="text"
					label="Score"
					name="score"
					value={score}
					setter={setScore}
					disabled={false}
					error={errors[0]}
				/>
				<FormInput
					type="text"
					label="Level"
					name="level"
					value={level}
					setter={setLevel}
					disabled={false}
					error={errors[1]}
				/>
				<FormInput
					type="submit"
					label="Submit"
					disabled={
						score.length === 0 ||
						level.length === 0 ||
						status === "submitting"
					}
				/>
			</form>
			<p className="text-xs">{errors[2]}</p>
		</>
	)
}

export default SubmitScore;
