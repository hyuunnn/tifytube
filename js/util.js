function checkAuth() {
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

function trackTableSetting(imageUrl, name, artist = null) {
  let tr = document.createElement("tr");
  let img = createImageCell(imageUrl);
  tr.appendChild(img);
  tr.appendChild(createCell(name));

  let artistName = Array.isArray(artist) ? arrToString(artist, "name") : artist;
  tr.appendChild(createCell(artistName));
  tr.appendChild(createCheckboxCell(name));

  img.addEventListener("click", function () {
    loadVideo(artistName, name);
  });
  return tr;
}
