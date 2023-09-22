import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
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
			</ul>
		</header>
	)
};

export default Header;
