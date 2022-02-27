window.onload = function() {
   fetch('/api/available/me')
  .then(response => response.json())
  .then(showData);
}

function showData(data) {
    const cardBody = document.querySelector("#cardbody");
    cardBody.innerHTML="";

    form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/available/me";

    formRow4 = document.createElement("div");
    formRow4.className = "form-row";

    l = document.createElement("label");
    l.innerHTML = "Name";
    l.className = "col-md-4 col-form-label text-md-right text-white";

    i = document.createElement("input");
    i.className = "col-md-6";
    i.value = data.name;
    i.name = "name";
    
    formRow4.append(l);
    formRow4.append(i);

    formRow = document.createElement("div");
    formRow.className = "form-row";

    l = document.createElement("label");
    l.innerHTML = "Quantity of food remaining";
    l.className = "col-md-4 col-form-label text-md-right text-white";

    i = document.createElement("input");
    i.className = "col-md-6";
    i.value = data.quantity;
    i.name = "quantity";
    
    formRow.append(l);
    formRow.append(i);

    formRow2 = document.createElement("div");
    formRow2.className = "form-row";

    l = document.createElement("label");
    l.innerHTML = "Restaurant Latitude";
    l.className = "col-md-4 col-form-label text-md-right text-white";

    p = document.createElement("input");
    p.className = "col-md-6";
    p.value = (data.location.lat).toFixed(2);
    p.name = "lat";
    
    formRow2.append(l);
    formRow2.append(p);

    formRow3 = document.createElement("div");
    formRow3.className = "form-row";

    l = document.createElement("label");
    l.innerHTML = "Restaurant Longitude";
    l.className = "col-md-4 col-form-label text-md-right text-white";

    p = document.createElement("input");
    p.className = "col-md-6";
    p.value = (data.location.long).toFixed(2);
    p.name = "lat";

    formRow3.append(l);
    formRow3.append(p);

    b = document.createElement("button");
    b.innerHTML = "Change Details";
    b.type = "submit";
    b.className = "btn btn-primary";

    form.append(formRow4);
    form.append(formRow);
    form.append(formRow2);
    form.append(formRow3);
    form.append(b);

    cardBody.append(form);
}