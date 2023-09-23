import React, {useState, useContext} from "react";

import LoginContext from "../LoginContext.jsx";

const SubmitScore = () => {
	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");

	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting, success
	const [status, setStatus] = useState("typing");
	const [error, setError] = useState(null);

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
			setError(null);
		})
		.catch(error => {
			setError(error.message);
			console.error(error.message);
			setStatus("typing");
		});
	}

	return (
		<>
			<h1>Handle user not logged in on frontend</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="score">Score: </label>
				<input
					type="text"
					id="score"
					name="score"
					value={score}
					onChange={ (e)=>setScore(e.target.value) }
				/>
				<br/>

				<label htmlFor="level">Level: </label>
				<input
					type="text"
					id="level"
					name="level"
					value={level}
					onChange={ (e)=>setLevel(e.target.value) }
				/>
				<br/>

				<input
					type="submit"
					value="Submit score"
					disabled={
						score.length === 0 ||
						level.length === 0 ||
						status === "submitting"
					}
				/>
			</form>

			{/* TODO: improve error handling*/}
			{error ? <p>Error: {error}</p> : null}
		</>
	)
}

export default SubmitScore;
