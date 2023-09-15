import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Level from "./pages/Level.jsx";
import SubmitScore from "./pages/SubmitScore.jsx";

import Header from "./components/Header.jsx";

const App = () => {
	return (
	<>
		<Header />
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/submit" element={<SubmitScore />}/>
			<Route path="/user/:username" element={<User />}/>
			<Route path="/level/:level" element={<Level />}/>
		</Routes>
	</>
	)
};

export default App;
