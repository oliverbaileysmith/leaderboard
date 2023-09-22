import React, {useState} from "react";

const SubmitScore = () => {
	const [username, setUsername] = useState("");
	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");

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
			username: username,
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
				throw new Error("Network error.");
			return res.json();
		})
		.then(data => {
			setStatus("success");
			setUsername("");
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
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					onChange={ (e)=>setUsername(e.target.value) }
				/>
				<br/>

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
						username.length === 0 ||
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
