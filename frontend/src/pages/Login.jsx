import React, {useState, useContext} from "react";

import FormInput from "../components/FormInput.jsx"

import LoginContext from "../LoginContext.jsx";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const loginContext = useContext(LoginContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		logIn();
	}

	const logIn = () => {
		const reqBody = {
			username,
			password
		};
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
				throw new Error("Failed to log in");
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
		})
		.catch(error => {
			console.error(error.message);
		});
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
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
					password.length === 0
				}
			/>
		</form>
	)
};

export default Login;

