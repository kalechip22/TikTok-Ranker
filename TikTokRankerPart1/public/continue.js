let cont = document.getElementById("continue");
cont.addEventListener("click", buttonAction);
function buttonAction() {
  window.location="index.html";
}

let nickname = document.getElementById("tiktok_name");
let name = sessionStorage.getItem("name");
nickname.textContent = "'" + name + "'";