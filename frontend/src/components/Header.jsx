import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import LoginContext from "../LoginContext.jsx";

import HeaderItem from "./HeaderItem.jsx"
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
			<div className="md:w-2/3">
				<ul className="flex items-center my-1.5">
					<HeaderItem link="/">
						<h1 className="inline text-xl font-bold">Leaderboard</h1>
					</HeaderItem>

					<HeaderItem link="/submit">
						<Button label="+"/>
					</HeaderItem>

					{loginContext.isLoggedIn ? (
						<HeaderItem link="/submit">
							<Button label="Log out" onClick={logOut}/>
						</HeaderItem>
					) : (
						<>
							<HeaderItem link="/login">
								<Button label="Log in"/>
							</HeaderItem>

							<HeaderItem link="/register">
								<Button label="Sign up"/>
							</HeaderItem>
						</>
					)}

					<HeaderItem>
						<p className="inline">{loginContext.isLoggedIn && loginContext.user.username}</p>
					</HeaderItem>
				</ul>
			</div>
		</header>
	)
};

export default Header;
