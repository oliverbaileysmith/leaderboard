import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import ScoresTable from "../components/ScoresTable.jsx";

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
		<div className="flex justify-center bg-green-200">
			<div className="bg-slate-100 w-full mx-6 md:w-2/3 md:m-0">
				<ScoresTable scores={scores}/>
			</div>
		</div>
	);
};

export default Home;
