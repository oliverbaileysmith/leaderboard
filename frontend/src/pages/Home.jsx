import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const Home = () => {
	const [scores, setScores] = useState();
	const [loading, setLoading] = useState(true);

	// Fetch all scores on page setup
	useEffect(() => {
		fetch("http://localhost:5555/scores/")
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
							<tr
								key={score._id}
								className="rounded-md max-w-6xl border-y drop-shadow-md hover:bg-slate-200"
							>
								<td className="text-center font-semibold py-1.5">
									<Link to={`/user/${score.username}`} className="hover:underline p-2">
										{score.username}
									</Link>
								</td>
								<td className="text-center">
										{score.score}
								</td>
								<td className="text-center">
									<Link to={`/level/${score.level}`} className="hover:underline p-2">
										{score.level}
									</Link>
								</td>
								<td className="text-center">
										{score.updatedAt.substring(0,10)}
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

export default Home;
