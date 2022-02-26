const PORT = 8080;

const express = require("express");

const app = express();

app.get("/api/food", (req, res) => {
	const data = [];
	for(let i = 1; i <= 3; i++)
		data.push({
			name: `Cafe ${i}`,
			quantity: Math.round(Math.random() * 20),
			location: { lat: Math.random() * 100, long: Math.random() * 100 }
			
		});
		for(let i = 1; i <= 3; i++)
		data.push({
			name: `Restaurant ${i}`,
			quantity: Math.round(Math.random() * 20),
			location: { lat: Math.random() * 100, long: Math.random() * 100 }
		});
	res.json(data);
});
app.use(express.static("./static"));

app.listen(PORT);

console.log(`Running on port ${PORT}`);
