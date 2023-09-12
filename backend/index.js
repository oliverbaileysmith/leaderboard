import express from "express";

const PORT = 5555;

const app = express();

app.listen(PORT, () => {
	console.log(`App is listening to port: ${PORT}`);
});
