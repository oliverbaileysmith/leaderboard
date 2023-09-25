import React, {useState, useEffect, useContext} from "react";

import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		// Ensure username 8-32 characters
		// Ensure username is alphanumeric only
		// Set error otherwise
		let usernameValid = true;

		for (let i = 0; i < username.length; i++) {
			const c = username.charCodeAt(i);
			if (c > 122 || (c < 97 && c > 90) || (c < 65 && c > 57) || c < 48)
				usernameValid = false;
		}

		if (usernameValid && (username.length > 7 && username.length < 33) || username.length === 0)
			setUsernameError("");
		else
			setUsernameError("Username must be 8-32 characters, letters/numbers only.");

		// Ensure password 8-32 characters
		// Ensure username is alphanumeric only
		// Set error otherwise
		let passwordValid = true;

		for (let i = 0; i < password.length; i++) {
			const c = password.charCodeAt(i);
			if (c > 122 || (c < 97 && c > 90) || (c < 65 && c > 57) || c < 48)
				passwordValid = false;
		}

		if (passwordValid && (password.length > 7 && password.length < 33) || password.length === 0)
			setPasswordError("");
		else
			setPasswordError("Password must be 8-32 characters, letters/numbers only.");

		// Ensure confirm password matches password
		// Set error otherwise
		let passwordsMatch = true;

		if (password !== confirmPassword)
			passwordsMatch = false;

		if (confirmPassword.length === 0 || passwordsMatch)
			setConfirmPasswordError("");
		else
			setConfirmPasswordError("Passwords do not match.");
	}, [username, password, confirmPassword]);
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

		fetch("http://localhost:5555/api/users",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(reqBody),
			credentials: "include"
		}).then(res => {
			if (!res.ok)
				throw new Error("Failed to register");
			return res.json();
		}).then(userData => {
			loginContext.updateLogin({
				isLoggedIn: true,
				user: {
					_id: userData._id,
					username: userData.username
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

	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormInput
					type="text"
					label="Username"
					name="username"
					value={username}
					setter={setUsername}
					disabled={false}
					error={usernameError}
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					value={password}
					setter={setPassword}
					disabled={false}
					error={passwordError}
				/>
				<FormInput
					type="password"
					label="Confirm Password"
					name="confirmPassword"
					value={confirmPassword}
					setter={setConfirmPassword}
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
			</form>
			<p className="text-xs text-pink-700">{formError}</p>
		</>
	)
};

export default Register;

