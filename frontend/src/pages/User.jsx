import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const User = () => {
	const [scores, setScores] = useState();
	const [loading, setLoading] = useState(true);

	// Fetch all scores on page setup
	useEffect(() => {
		fetch(`http://localhost:5555/scores${location.pathname}`)
		.then(res => {
			if (!res.ok)
				throw new Error("Network error.");
			return res.json();
		})
		.then(data => {
			setScores(data.data);
		})
		.catch(error => console.error(error.message))
		.finally(() => {
			setLoading(false);
		});
	}, []);

	// TODO: improve loading indicator
	if (loading)
		return "Loading...";

	return (
		<div className="flex justify-center">
			<div className="bg-slate-100 w-full mx-6 md:w-2/3 md:m-0">
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
					{scores.map((score) => {
						return (
							<tr key={score._id} className="rounded-md max-w-6xl">
								<td className="text-center">
									<Link to={`/user/${score.username}`}>
										{score.username}
									</Link>
								</td>
								<td className="text-center">
										{score.score}
								</td>
								<td className="text-center">
									<Link to={`/level/${score.level}`}>
										{score.level}
									</Link>
								</td>
								<td className="text-center">
										{score.updatedAt}
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default User;
