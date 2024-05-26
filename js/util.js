function checkCred() {
  alert(
    "CLIENT_ID: " +
      localStorage.getItem("CLIENT_ID") +
      "\nCLIENT_SECRET: " +
      localStorage.getItem("CLIENT_SECRET")
  );
}

function arrToString(array, property) {
  return array.map((item) => item[property]).join(", ");
}

function createCell(text) {
  let td = document.createElement("td");
  td.textContent = text;
  return td;
}

function createImageCell(url) {
  let td = document.createElement("td");
  let img = document.createElement("img");
  img.src = url;
  img.style.width = "50px";
  img.style.height = "50px";
  td.appendChild(img);
  return td;
}

function createCheckboxCell(name) {
  let td = document.createElement("td");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.value = name;
  td.appendChild(input);
  return td;
}

function trackTableSetting(image_url, name, artist) {
  let tr = document.createElement("tr");
  let img = createImageCell(image_url);
  tr.appendChild(img);
  tr.appendChild(createCell(name));
  tr.appendChild(createCell(arrToString(artist, "name")));
  tr.appendChild(createCheckboxCell(name));
  img.addEventListener("click", function () {
    loadVideo(arrToString(artist, "name"), name);
  });
  return tr;
}
