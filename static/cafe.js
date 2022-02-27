window.onload = function() {
   fetch('/api/available/me')
  .then(response => response.json())
  .then(showData);
}

function showData(data) {
    const cardBody = document.querySelector("#cardbody");
    cardBody.innerHTML="";

    p = document.createElement("p");
    p.className = "card-title text-white";
    p.innerHTML = data.name;
    cardBody.append(p);

    p = document.createElement("p");
    p.className = "card-text text-white";
    p.innerHTML = "Quantity of food remaining: " + data.quantity;
    cardBody.append(p);

    p = document.createElement("p");
    p.className = "card-text text-white";
    p.innerHTML = "Restaurant Location: " + (data.location.lat).toFixed(2) + ", " + (data.location.long).toFixed(2) + "(Lat, Long)";
    cardBody.append(p);
}