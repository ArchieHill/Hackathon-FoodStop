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
    i.setAttribute("required", true);
  
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
    i.setAttribute("type", "number");
    i.setAttribute("min", "0");
    
    formRow.append(l);
    formRow.append(i);

    formRow2 = document.createElement("div");
    formRow2.className = "form-row";

    l = document.createElement("label");
    l.innerHTML = "Restaurant Address";
    l.className = "col-md-4 col-form-label text-md-right text-white";

    p = document.createElement("input");
    p.className = "col-md-6";
    p.value = data.address;
    p.name = "address";
    p.setAttribute("required", true);
  
    formRow2.append(l);
    formRow2.append(p);

    b = document.createElement("button");
    b.innerHTML = "Change Details";
    b.type = "submit";
    b.className = "btn btn-primary";

    form.append(formRow4);
    form.append(formRow);
    form.append(formRow2);
    form.append(b);

    cardBody.append(form);
}