import React, {useState, useEffect, useContext} from "react";
import {Navigate} from "react-router-dom"

import Form from "../components/Form.jsx"
import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

import BACKEND_URL from "../URL.js";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Records whether input has been focused and unfocused at least once
	const [usernameBlurred, setUsernameBlurred] = useState(false);
	const [passwordBlurred, setPasswordBlurred] = useState(false);
	const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

	useEffect(() => {
		// Ensure username 8-32 characters
		// Ensure username is alphanumeric only
		// Set error otherwise
		if (usernameBlurred) {
			let usernameValid = true;

			for (let i = 0; i < username.length; i++) {
				const c = username.charCodeAt(i);
				if (c > 122 || (c < 97 && c > 90) || (c < 65 && c > 57) || c < 48)
					usernameValid = false;
			}

			if (usernameValid && (username.length > 7 && username.length < 33) || username.length === 0)
				setUsernameError("");
			else
				setUsernameError("Username must be 8-32 characters, letters and numbers only.");
		}

		// Ensure password 8-32 characters
		// Ensure username is alphanumeric only
		// Set error otherwise
		if (passwordBlurred) {
			let passwordValid = true;

			for (let i = 0; i < password.length; i++) {
				const c = password.charCodeAt(i);
				if (c > 122 || (c < 97 && c > 90) || (c < 65 && c > 57) || c < 48)
					passwordValid = false;
			}

			if (passwordValid && (password.length > 7 && password.length < 33) || password.length === 0)
				setPasswordError("");
			else
				setPasswordError("Password must be 8-32 characters, letters and numbers only.");
		}

		// Ensure confirm password matches password
		// Set error otherwise
		if (confirmPasswordBlurred) {
			let passwordsMatch = true;

			if (password !== confirmPassword)
				passwordsMatch = false;

			if (confirmPassword.length === 0 || passwordsMatch)
				setConfirmPasswordError("");
			else
				setConfirmPasswordError("Passwords do not match.");
		}
	}, [username, password, confirmPassword, usernameBlurred, passwordBlurred, confirmPasswordBlurred]);
	const loginContext = useContext(LoginContext);

	// Status options are typing, submitting
	const [status, setStatus] = useState("typing");

	// Error for each input and overall form state
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus("submitting");

		if (password !== confirmPassword)
			throw new Error("Passwords don't match");

		const reqBody = {
			username,
			password
		};

		let resOk = true;

		fetch(`${BACKEND_URL}/api/users`,
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
			setConfirmPassword("");
			setUsernameError("");
			setPasswordError("");
			setConfirmPasswordError("");
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
					onBlur={() => setUsernameBlurred(true)}
					disabled={false}
					error={usernameError}
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					value={password}
					setter={setPassword}
					onBlur={() => setPasswordBlurred(true)}
					disabled={false}
					error={passwordError}
				/>
				<FormInput
					type="password"
					label="Confirm Password"
					name="confirmPassword"
					value={confirmPassword}
					setter={setConfirmPassword}
					onBlur={() => setConfirmPasswordBlurred(true)}
					disabled={false}
					error={confirmPasswordError}
				/>
				<FormInput
					type="submit"
					label="Sign up"
					disabled={
						username.length === 0 ||
						password.length === 0 ||
						confirmPassword.length === 0 ||
						status === "submitting" ||
						usernameError !== "" ||
						passwordError !== "" ||
						confirmPasswordError !== ""
					}
				/>
				{formError && <p className="text-xs text-pink-700">{formError}</p>}
			</Form>
		</>
	)
};

export default Register;

