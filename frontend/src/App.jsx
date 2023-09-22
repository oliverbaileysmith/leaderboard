import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Level from "./pages/Level.jsx";
import SubmitScore from "./pages/SubmitScore.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import Header from "./components/Header.jsx";

import UserContext from "./UserContext.jsx";

const App = () => {
	const updateUser = (user) => {
		setUser(user);
	};

	const [user, setUser] = useState({
		username: "Oliver"
	});

	return (
	<UserContext.Provider value={{...user, updateUser}}>
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
				</Routes>
			</div>
		</div>
	</UserContext.Provider>
	)
};

export default App;
