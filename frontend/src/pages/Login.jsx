import React, {useState, useContext} from "react";
import {Navigate} from "react-router-dom"

import Form from "../components/Form.jsx"
import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting
	const [status, setStatus] = useState("typing");

	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus("submitting");

		const reqBody = {
			username,
			password
		};

		let resOk = true;
		fetch("http://localhost:5555/api/users/login",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody),
			credentials: "include"
		}).then(res => {
			if (!res.ok)
				resOk = false;
			return res.json();
		}).then(res => {
			if (!resOk)
				throw new Error (res.message);
			loginContext.updateLogin({
				isLoggedIn: true,
				user: {
					_id: res._id,
					username: res.username
				}
			});
			setUsername("");
			setPassword("");
			setFormError("");
		})
		.catch(error => {
			setFormError(error.message);
		});

		setStatus("typing");
	}

	if (loginContext.isLoggedIn)
		return <Navigate to="/" />

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					label="Username"
					name="username"
					value={username}
					setter={setUsername}
					disabled={false}
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					value={password}
					setter={setPassword}
					disabled={false}
				/>
				<FormInput
					type="submit"
					label="Log in"
					disabled={
						username.length === 0 ||
						password.length === 0 ||
						status === "submitting"
					}
				/>
				{formError && <p className="text-xs text-pink-700">{formError}</p>}
			</Form>
		</>
	)
};

export default Login;

