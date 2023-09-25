import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import LoginContext from "../LoginContext.jsx";

import Button from "./Button.jsx";

const Header = () => {
	const loginContext = useContext(LoginContext);

	const logOut = () => {
		fetch("http://localhost:5555/api/users/logout",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		}).then(res => {
			if (!res.ok)
				throw new Error("Failed to log out");
		}).then(() => {
			loginContext.updateLogin({
				isLoggedIn: false,
				user: {}
			});
		})
		.catch(error => {});
	};

	return (
		<header className="flex justify-center bg-sky-600 text-white">
			<ul className="my-1.5">
				<li className="inline">
					<NavLink to="/">
						<h1 className="inline text-xl font-bold">Leaderboard</h1>
					</NavLink>
				</li>

				<li className="inline">
				</li>

				<li className="inline">
					<NavLink to="/submit">
						<Button label="+"/>
					</NavLink>
				</li>

				{loginContext.isLoggedIn ? (
					<li className="inline">
						<Button label="Log out" onClick={logOut}/>
					</li>
				) : (
					<>
						<li className="inline">
							<NavLink to="/login">
								<Button label="Log in"/>
							</NavLink>
						</li>

						<li className="inline">
							<NavLink to="/register">
								<Button label="Sign up"/>
							</NavLink>
						</li>
					</>
				)}

				<li className="inline">
					<p className="inline">{loginContext.isLoggedIn && loginContext.user.username}</p>
				</li>
			</ul>
		</header>
	)
};

export default Header;
