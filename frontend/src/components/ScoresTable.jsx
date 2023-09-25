import React from "react";

import TableRow from "../components/TableRow.jsx";

const ScoresTable = (props) => {
	// Incremented while mapping
	let rank = 1;
	let rankClasses = "";

	if (!props.showRank)
		rankClasses += "invisible";

	return (
		<table className="w-full">
			<thead>
				<tr>
					<th>
						<span className={rankClasses}>#</span>
					</th>
					<th>User</th>
					<th>Score</th>
					<th>Level</th>
					<th>Date</th>
				</tr>
			</thead>

			<tbody>
				{props.scores.map((s) => {
					return (
						<TableRow
							key={s._id}
							data={s}
							rank={rank++}
							showRank={props.showRank}
						/>
					)
				})}
			</tbody>
		</table>
	)
};

export default ScoresTable;
