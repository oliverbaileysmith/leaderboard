import React from "react";
import {NavLink} from "react-router-dom";

const HeaderItem = (props) => {
	return (
		<li className="inline px-1/2">
			{props.link ? (
				<NavLink to={props.link}>{props.children}</NavLink>
			) : (
				<>{props.children}</>
			)}
		</li>
	)
}

export default HeaderItem;
