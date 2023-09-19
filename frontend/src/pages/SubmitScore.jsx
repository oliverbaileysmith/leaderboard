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

		console.log(username);
		console.log(score);
		console.log(level);

		trySubmit();

		setStatus("typing");
	}

	const trySubmit = () => {
		const reqBody = {
			username: username,
			score: score,
			level: level
		};

		fetch("http://localhost:5555/scores/",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody)
		})
		.then(res => {
			if (!res.ok)
				throw new Error("Network error.");
			return res.json();
		})
		.then(data => {
			console.log(data);
			setStatus("success");
			setError(null);
		})
		.catch(error => {
			setError(error.message);
			console.error(error.message);
			setStatus("typing");
		});
	}

	return (
		<div className="flex justify-center">
			<div className="bg-slate-100 w-full mx-6 md:w-2/3 md:m-0">

				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						id="username"
						name="username"
						onChange={ (e)=>setUsername(e.target.value) }
					/>
					<br/>

					<label htmlFor="score">Score: </label>
					<input
						type="text"
						id="score"
						name="score"
						onChange={ (e)=>setScore(e.target.value) }
					/>
					<br/>

					<label htmlFor="level">Level: </label>
					<input
						type="text"
						id="level"
						name="level"
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

				{error ? <p>Error: {error}</p> : null}

			</div>
		</div>
	)
}

export default SubmitScore;
