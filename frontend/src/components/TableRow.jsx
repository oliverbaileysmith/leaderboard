import React, {useContext} from "react";
import {Link} from "react-router-dom";

import LoginContext from "../LoginContext.jsx"

const TableRow = (props) => {
	const loginContext = useContext(LoginContext);

	let s = props.data;
	let tdClasses = "text-center py-1.5";

	if (!props.showRank)
		tdClasses += " hidden";

	return (
		<tr className="border-y drop-shadow-md hover:bg-slate-200 group">

			<td className={tdClasses}>
				{props.rank}
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
				{s.updatedAt.substring(0,10)}
			</td>

			<td className="text-center py-1.5">
				{loginContext.user.username === s.username ? (
					<Link
						to={`/edit/${s._id}`}
						className="hover:underline invisible group-hover:visible"
					>
						Edit
					</Link>
				) : null}
			</td>

		</tr>
	)
};

export default TableRow;
