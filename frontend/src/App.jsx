import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Level from "./pages/Level.jsx";

const App = () => {
	return (
	<Routes>
		<Route path="/" element={<Home />}/>
		<Route path="/user/:username" element={<User />}/>
		<Route path="/level/:level" element={<Level />}/>
	</Routes>
	)
};

export default App;
