import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import LoginContext from "../LoginContext.jsx";

const Header = () => {
	const loginContext = useContext(LoginContext);

	return (
		<header className="flex justify-center bg-red-100">
			<ul>
				<li className="inline">
					<NavLink to="/">
						<h1 className="inline text-xl font-bold">Leaderboard</h1>
					</NavLink>
				</li>

				<li className="inline">
					<NavLink to="/submit">
						<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Submit score</button>
					</NavLink>
				</li>

				<li className="inline">
					<NavLink to="/login">
						<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Log in</button>
					</NavLink>
				</li>

				<li className="inline">
					<NavLink to="/register">
						<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Sign up</button>
					</NavLink>
				</li>

				<li className="inline">
					<h2 className="inline">{loginContext.isLoggedIn ? loginContext.user.username : "No user"}</h2>
				</li>
			</ul>
		</header>
	)
};

export default Header;
