import React, {useContext} from "react";

import LoginContext from "../LoginContext.jsx";

const Login = () => {
	const loginContext = useContext(LoginContext);

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
		}).then(userData => {
			loginContext.updateLogin({
				isLoggedIn: true,
				user: {
					_id: userData._id,
					username: userData.username
				}
			});
			console.log(loginContext);
		})
		.catch(error => {
			console.error(error.message);
		});
	};

	return <button onClick={logIn}>login</button>
};

export default Login;

