import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

import ScoresTable from "../components/ScoresTable.jsx";

const Level = () => {
	const [scores, setScores] = useState();
	const [loading, setLoading] = useState(true);

	const location = useLocation();

	// Fetch scores for this level on page setup
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

	// To be incremented for leftmost rank column
	let rank = 1;

	return <ScoresTable scores={scores}/>;
};

export default Level;

