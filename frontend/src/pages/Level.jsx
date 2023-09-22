import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

import ScoresTable from "../components/ScoresTable.jsx";

const Level = () => {
	const [scores, setScores] = useState();
	const [loading, setLoading] = useState(true);

	const location = useLocation();

	// Fetch scores for this level on page setup
	useEffect(() => {
		fetch(`http://localhost:5555/api/scores${location.pathname}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		})
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

	return <ScoresTable scores={scores} showRank={true}/>;
};

export default Level;

