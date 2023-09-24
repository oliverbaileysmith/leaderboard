import React, {useContext} from "react";
import {Link} from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import LoginContext from "../LoginContext.jsx";

const TableRow = (props) => {
	const loginContext = useContext(LoginContext);

	const s = props.data;
	let rankClasses = "";

	const relativeTimeString = dayjs(s.updatedAt).fromNow();

	if (!props.showRank) {
		rankClasses += " invisible";
	}

	return (
		<tr className="border-y drop-shadow-md hover:bg-slate-200 group/row">

			<td className="text-center py-1.5">
				<span className={rankClasses}>{props.rank}</span>
			</td>

			<td className="text-center py-1.5 font-semibold">
				<Link
					to={`/user/${s.username}`}
					className="hover:underline p-2"
				>
					{s.username}
				</Link>
			</td>

			<td className="text-center py-1.5">
				{s.score}
			</td>

			<td className="text-center py-1.5">
				<Link
					to={`/level/${s.level}`}
					className="hover:underline p-2"
				>
					{s.level}
				</Link>
			</td>

			<td className="text-center py-1.5">
				<span className="group/tooltip relative">
					{relativeTimeString}
					<span className="invisible group-hover/tooltip:visible absolute w-44 bottom-full left-1/2 bg-slate-700 text-white font-light rounded mb-1.5 py px-2" style={{marginLeft: "-88px"}}>
						{dayjs(s.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
					</span>
				</span>
			</td>

			<td className="text-center py-1.5">
				{loginContext.user.username === s.username ? (
					<Link
						to={`/edit/${s._id}`}
						className="hover:underline invisible group-hover/row:visible"
					>
						Edit
					</Link>
				) : null}
			</td>

		</tr>
	)
};

export default TableRow;
