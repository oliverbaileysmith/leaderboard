import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

import LoginContext from "../LoginContext.jsx";

import HeaderItem from "./HeaderItem.jsx"
import Button from "./Button.jsx";

import BACKEND_URL from "../URL.js";

const Header = () => {
	const loginContext = useContext(LoginContext);

	const logOut = () => {
		fetch(`${BACKEND_URL}/api/users/logout`,
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
		<header className="flex flex-row justify-center bg-sky-600 text-white">
			<div className="w-full md:w-2/3">
				<ul className="flex flex-row justify-between items-center mx-2 my-1">
					<div>
						<HeaderItem link="/">
							<h1 className="inline text-xl font-bold">Leaderboard</h1>
						</HeaderItem>

						<HeaderItem link="/submit">
							<Button label="+"/>
						</HeaderItem>
					</div>

					<div>
						{loginContext.isLoggedIn ? (
							<>
								<HeaderItem>
									<p className="inline">{loginContext.user.username}</p>
								</HeaderItem>
								<HeaderItem link="/submit">
									<Button label="Log out" onClick={logOut}/>
								</HeaderItem>
							</>
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

					</div>
				</ul>
			</div>
		</header>
	)
};

export default Header;
