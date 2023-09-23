import React, {useContext} from "react";

import LoginContext from "../LoginContext.jsx";

const Register = () => {
	const loginContext = useContext(LoginContext);

	const register = () => {
		const reqBody = {
			username: "gary",
			password: "snail"
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
		})
		.catch(error => {
			console.error(error.message);
		});
	};

	return <button onClick={register}>register</button>
};

export default Register;

