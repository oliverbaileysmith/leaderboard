import React, {useState, useEffect} from "react";

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
		<table>
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
					<tr key={score._id}>
						<td>{score.username}</td>
						<td>{score.score}</td>
						<td>{score.level}</td>
						<td>{score.updatedAt}</td>
					</tr>
				)
			})}
			</tbody>
		</table>
	);
};

export default Home;
