import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";

import FormInput from "../components/FormInput.jsx"
import Button from "../components/Button.jsx"

import LoginContext from "../LoginContext.jsx";

const SubmitScore = () => {
	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");

	useEffect(() => {
		// Ensure score input only contains numbers, set error if not
		let valid = true;

		for (let i = 0; i < score.length; i++) {
			const c = score.charCodeAt(i);
			if (c < 48 || c > 57)
				valid = false;
		}

		if (valid || score.length === 0)
			setScoreError("");
		else
			setScoreError("Score must consist of numbers only.");
	}, [score]);

	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting
	const [status, setStatus] = useState("typing");

	// Error for each input and overall form state
	const [scoreError, setScoreError] = useState("");
	const [levelError, setLevelError] = useState("");
	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus("submitting");

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
			setScore("");
			setLevel("");
			setScoreError("");
			setLevelError("");
			setFormError("");
		})
		.catch(error => {
			setFormError(error.message);
		});

		setStatus("typing");
	}

	if (!loginContext.isLoggedIn)
		return (
			<>
				<p>Please log in to submit a score.</p>
				<Link to="/login">
					<Button label="Log in"/>
				</Link>
				<Link to="/register">
					<Button label="Sign up"/>
				</Link>
			</>
		)

	return (
		<>
			<form className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
				<FormInput
					type="text"
					label="Score"
					name="score"
					value={score}
					setter={setScore}
					disabled={false}
					error={scoreError}
				/>
				<FormInput
					type="text"
					label="Level"
					name="level"
					value={level}
					setter={setLevel}
					disabled={false}
					error={levelError}
				/>
				<FormInput
					type="submit"
					label="Submit"
					disabled={
						score.length === 0 ||
						level.length === 0 ||
						status === "submitting" ||
						scoreError !== "" ||
						levelError !== ""
					}
				/>
			</form>
			{formError && <p className="text-xs text-pink-700">{formError}</p>}
		</>
	)
}

export default SubmitScore;
