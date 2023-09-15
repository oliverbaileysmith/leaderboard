const Header = () => {
	return (
		<header className="flex justify-center bg-red-100">
			<h1 className="text-xl font-bold">Leaderboard</h1>
			<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Submit score</button>
			<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Log in</button>
			<button className="bg-slate-400 border-solid border-black border-2 rounded p-1 hover:bg-slate-600" type="button">Sign up</button>
		</header>
	)
};

export default Header;
