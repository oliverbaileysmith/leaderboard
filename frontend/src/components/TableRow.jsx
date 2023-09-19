import React from "react";
import {Link} from "react-router-dom";

const TableRow = (props) => {
	let s = props.data;

	return (
		<tr className="max-w-6xl border-y drop-shadow-md hover:bg-slate-200">

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

		</tr>
	)
};

export default TableRow;
