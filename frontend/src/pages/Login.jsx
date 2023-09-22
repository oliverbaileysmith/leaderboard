import React, {useContext} from "react";

import UserContext from "../UserContext.jsx";

const Login = () => {
	const userContext = useContext(UserContext);

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
			return res.json();
			console.log(res.json());
		}).then(userData => {
			userContext.updateUser({
				_id: userData._id,
				username: userData.username
			});
		})
		.catch(error => {
			console.error(error.message);
		});
	};

	return <button onClick={logIn}>login</button>
};

export default Login;

