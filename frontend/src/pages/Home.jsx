import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import ScoresTable from "../components/ScoresTable.jsx";

const Home = () => {
	const [scores, setScores] = useState();
	const [loading, setLoading] = useState(true);

	// Fetch all scores on page setup
	useEffect(() => {
		fetch("http://localhost:5555/api/scores/")
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

	return <ScoresTable scores={scores} showRank={false}/>;
};

export default Home;
