import React, {useState, useEffect, useContext} from "react";

import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

const SubmitScore = () => {
	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");

	useEffect(() => {
		// Ensure score input only contains numbers, set error if not
		let containsOnlyNumbers = true;

		for (let i = 0; i < score.length; i++) {
			const c = score.charCodeAt(i);
			if (c < 48 || c > 57)
				containsOnlyNumbers = false;
		}

		if (containsOnlyNumbers || score.length === 0)
			setError("", 0);
		else
			setError("Score must consist of numbers only.", 0);
	}, [score]);

	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting, success
	const [status, setStatus] = useState("typing");
	const [errors, setErrors] = useState(["", "", ""]);

	const setError = (errorText, index) => {
		setErrors(errors.map((e, i) => {
			if (i === index)
				return errorText;
			return e;
		}));
	}

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
				throw new Error("Failed to submit score. Please try again.");
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
						status === "submitting" ||
						errors[0] !== "" ||
						errors[1] !== ""
					}
				/>
			</form>
			<p className="text-xs text-pink-700">{errors[2]}</p>
		</>
	)
}

export default SubmitScore;
