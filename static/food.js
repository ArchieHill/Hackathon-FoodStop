window.onload = (function() {
	fetch('/api/food')
		.then(res => res.json())
		.then(showData);
});

function showData(data) {
	const tbody = document.querySelector("#food-table > tbody");
	tbody.innerHTML = "";

	for(let p of data)
		tbody.append(createFoodRow(p));
}

function createFoodRow(place) {
	const r = document.createElement("tr");

	const n = document.createElement("td");
	n.innerHTML = place.name;
	r.append(n);
	const q = document.createElement("td");
	q.innerHTML = place.quantity;
	r.append(q);
	const l = document.createElement("td");
	const { lat, long } = place.location;
	l.innerHTML = `${Math.round(lat)}, ${Math.round(long)}`;
	r.append(l);

	return r;
}