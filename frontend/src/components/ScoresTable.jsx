import React from "react";

import TableRow from "../components/TableRow.jsx";

const ScoresTable = (props) => {
	return (
		<table className="w-full">

			<thead>
				<tr>
					<th>User</th>
					<th>Score</th>
					<th>Level</th>
					<th>Date</th>
				</tr>
			</thead>

			<tbody>
				{props.scores.map((s) => <TableRow data={s} />)}
			</tbody>

		</table>
	)
};

export default ScoresTable;
