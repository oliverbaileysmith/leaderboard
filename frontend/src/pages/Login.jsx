import React from "react";

const Login = () => {

	const logIn = () => {
		const reqBody = {
			username: "oliver",
			password: "123456"
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
			console.log(res.json());
		}).catch(error => {
			console.error(error.message);
		});
	};

	const getProfile = () => {
		fetch("http://localhost:5555/api/users/profile",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		}).then(res => {
			if (!res.ok)
				throw new Error("Failed to get profile");
			console.log(res.json());
		}).catch(error => {
			console.error(error.message);
		});
	};

	return (
		<>
			<button onClick={logIn}>login</button>
			<button onClick={getProfile}>profile</button>
		</>
	)
};

export default Login;

