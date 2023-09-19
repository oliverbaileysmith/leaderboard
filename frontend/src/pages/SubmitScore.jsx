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

		setStatus("typing");
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

			</div>
		</div>
	)
}

export default SubmitScore;
