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
		<tr className="border-y odd:bg-slate-200 hover:bg-slate-300 whitespace-nowrap">

			<td className="text-center py-1.5">
				<span className={rankClasses}>{props.rank}</span>
			</td>

			<td className="text-center py-1.5 font-semibold">
				<Link
					to={`/user/${s.username}`}
					className="hover:underline"
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
					className="hover:underline"
				>
					{s.level}
				</Link>
			</td>

			<td className="text-center py-1.5">
				<span className="group/tooltip relative">
					{relativeTimeString}
					<span className="absolute right-[105%] rounded px-2 invisible group-hover/tooltip:visible bg-sky-900 text-white font-light">
						{dayjs(s.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
					</span>
				</span>
			</td>

			<td className="text-center p-1.5">
				{loginContext.user.username === s.username ? (
					<Link
						to={`/edit/${s._id}`}
						className="hover:underline"
					>
						Edit
					</Link>
				) : null}
			</td>

		</tr>
	)
};

export default TableRow;
