import React, {useState, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Level from "./pages/Level.jsx";
import SubmitScore from "./pages/SubmitScore.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import Header from "./components/Header.jsx";

import LoginContext from "./LoginContext.jsx";

const App = () => {
	const updateLogin = (data) => {
		setIsLoggedIn(data.isLoggedIn);
		setUser(data.user);
	};

	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Get user info upon app startup
	useEffect(() => {
		fetch("http://localhost:5555/api/users/profile",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
		.then(res => {
			if (!res.ok)
				throw new Error("No JWT cookie");
			return res.json();
		})
		.then(userData => {
			setIsLoggedIn(true);
			setUser({
				_id: userData._id,
				username: userData.username
			});
		})
		.catch(error => {});
	}, []);

	return (
	<LoginContext.Provider value={{isLoggedIn, user, updateLogin}}>
		<Header />
		<div className="flex justify-center bg-green-200">
			<div className="bg-slate-100 w-full mx-6 md:w-2/3 md:m-0">
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/submit" element={<SubmitScore />}/>
					<Route path="/user/:username" element={<User />}/>
					<Route path="/level/:level" element={<Level />}/>
					<Route path="/register" element={<Register />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="*" element={<Navigate to="/" />}/>
				</Routes>
			</div>
		</div>
	</LoginContext.Provider>
	)
};

export default App;
