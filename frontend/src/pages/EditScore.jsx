import React, {useState, useEffect, useContext} from "react";
import {useLocation, Navigate} from "react-router-dom";

import Form from "../components/Form.jsx"
import FormInput from "../components/FormInput.jsx"
import Button from "../components/Button.jsx"

import LoginContext from "../LoginContext.jsx";

const EditScore = () => {
	const [scoreDocument, setScoreDocument] = useState({});

	const [score, setScore] = useState("");
	const [level, setLevel] = useState("");
	const [loading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(false);

	// Status options are typing, submitting
	const [status, setStatus] = useState("typing");

	// Error for each input and overall form state
	const [scoreError, setScoreError] = useState("");
	const [levelError, setLevelError] = useState("");
	const [formError, setFormError] = useState("");
	const [deleteError, setDeleteError] = useState("");

	const location = useLocation();
	const loginContext = useContext(LoginContext);

	// Fetch score on page setup
	useEffect(() => {
		fetch(`http://localhost:5555/api/scores${location.pathname.substr(5, location.pathname.length)}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
		.then(res => {
			if (!res.ok) {
				setRedirect(true);
				throw new Error("Network error.");
			}
			return res.json();
		})
		.then(res => {
			setScoreDocument(res.data);
			setScore(res.data.score);
			setLevel(res.data.level);
		})
		.catch(error => setFormError(error.message))
		.finally(() => {
			setLoading(false);
		});
	}, []);

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

	// Update score
	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus("submitting");

		const reqBody = {
			username: loginContext.user.username,
			score: score,
			level: level
		};

		fetch(`http://localhost:5555/api/scores/${scoreDocument._id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody),
			credentials: "include"
		})
		.then(res => {
			if (!res.ok)
				throw new Error("Failed to update score. Please try again.");
			return res.json();
		})
		.then(data => {
			setRedirect(true);
			setFormError("");
		})
		.catch(error => {
			setFormError(error.message);
		});
		setStatus("typing");
	}

	// Delete score
	const handleDelete = () => {
		fetch(`http://localhost:5555/api/scores/${scoreDocument._id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
		.then(res => {
			if (!res.ok)
				throw new Error("Failed to delete score. Please try again.");
			setRedirect(true);
		})
		.catch(error => setDeleteError(error.message));
	}

	if (loading)
		return <div>Loading...</div>

	if (redirect ||
		((loginContext.user.username !== scoreDocument.username))
	)
		return <Navigate to="/" />


	return (
		<>
			<Form onSubmit={handleSubmit}>
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
					label="Update"
					disabled={
						score.length === 0 ||
						level.length === 0 ||
						status === "submitting" ||
						scoreError !== "" ||
						levelError !== ""
					}
				/>
				{formError && <p className="text-xs text-pink-700">{formError}</p>}
				<Button
					label="Delete"
					onClick={handleDelete}
					warn={true}
				/>
				{deleteError && <p className="text-xs text-pink-700">{deleteError}</p>}
			</Form>
		</>
	)
}

export default EditScore;
